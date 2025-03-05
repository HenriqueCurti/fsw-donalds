"use server";

import { db } from "@/lib/prisma";
import { ConsumptionMethod } from "@prisma/client";
import { redirect } from "next/navigation";

interface CreateOrderProps {
  customerName: string;
  customerPhone: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderProps) => {
  const productWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });

  const productsWithPricesAndQuantity = input.products.map((product) => ({
    productId: product.id,
    price: productWithPrices.find((p) => p.id === product.id)!.price,
    quantity: product.quantity,
  }));

  await db.order.create({
    data: {
      consumptionMethod: input.consumptionMethod,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      restaurantId: restaurant!.id,
      status: "PENDING",
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantity,
        },
      },
      total: productsWithPricesAndQuantity.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      ),
    },
  });

  redirect(`/${input.slug}/orders?phone=${input.customerPhone}`);
};
