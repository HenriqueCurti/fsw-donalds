import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderStatus, Prisma } from "@prisma/client";
import Image from "next/image";
interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
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
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <div>
      <Card>
        <CardContent className="p-5 space-y-4">
          <div
            className={`w-fit rounded-full px-2 py-1 text-xs font-semibold text-white
            ${
              order.status === OrderStatus.FINISHED
                ? "bg-green-500"
                : "bg-gray-400"
            } 
            `}
          >
            {order.status}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative h-5 w-5">
              <Image
                src={order.restaurant.avatarImageUrl}
                alt={order.restaurant.name}
                fill
                className="rounded-full"
              />
            </div>
            <p className="font-semibold text-sm">{order.restaurant.name}</p>
          </div>
          <Separator />
          {order.orderProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-gray-400 text-white text-xs font-semibold">
                {product.quantity}
              </div>
              <p className="text-sm">{product.product.name}</p>
            </div>
          ))}
          <Separator />
          <p className="text-sm font-medium">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(order.total)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderItem;
