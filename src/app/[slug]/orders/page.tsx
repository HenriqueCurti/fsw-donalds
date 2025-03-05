import { db } from "@/lib/prisma";
import PhoneForm from "./components/phone-form";
import { notFound } from "next/navigation";
import OrderList from "./components/order-list";

interface OrderPageProps {
  searchParams: Promise<{ phone: string }>;
}

const OrdersPage = async ({ searchParams }: OrderPageProps) => {
  const { phone } = await searchParams;
  if (!phone) {
    return <PhoneForm />;
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerPhone: phone,
    },
    include: {
      restaurant: true,
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!orders) {
    return notFound();
  }

  return (
    <div>
      <OrderList orders={orders} />
    </div>
  );
};

export default OrdersPage;
