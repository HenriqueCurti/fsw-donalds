"use client";

import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import OrderItem from "./order-item";
import { useRouter } from "next/navigation";

interface OrderListProps {
  orders: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>[];
}

const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();

  const handleBackPage = () => {
    router.back();
  };

  return (
    <div className="space-y-6 p-6">
      <Button
        onClick={handleBackPage}
        size="icon"
        variant="outline"
        className="rounded-full"
      >
        <ChevronLeftIcon />
      </Button>

      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      {orders.map((order) => (
        <div key={order.id}>
          <OrderItem order={order} />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
