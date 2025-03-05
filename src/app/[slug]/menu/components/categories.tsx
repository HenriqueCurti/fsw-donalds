"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import Products from "./products";
import { CardContext } from "../contexts/card";
import CardSheet from "../[productid]/components/card-sheet";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: { include: { products: true } };
    };
  }>;
}

type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
  include: {
    products: true;
  };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const { products, total, quantityCard, toggleCard } = useContext(CardContext);

  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoryWithProducts>(restaurant.menuCategories[0]);

  const handleSelectCategory = (category: MenuCategoryWithProducts) => {
    setSelectedCategory(category);
  };

  return (
    <div className="relative z-50 mt-[-1.5ren] rounded-tl-3xl border bg-white">
      <div className="p-5">
        <div className="flex items-center gap-5">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            height={45}
            width={45}
          />
          <div>
            <h2 className="font-semibold text-lg">{restaurant.name}</h2>
            <p className="text-xs opacity-55"> {restaurant.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-green-500 mt-3">
          <ClockIcon size={12} />
          <p>Aberto!</p>
        </div>
      </div>

      <ScrollArea className="w-full ">
        <div className="flex w-max space-x-4 px-4 pt-0">
          {restaurant.menuCategories.map((category) => (
            <Button
              onClick={() => handleSelectCategory(category)}
              key={category.id}
              variant={
                selectedCategory.id === category.id ? "default" : "secondary"
              }
              size="sm"
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal"></ScrollBar>
      </ScrollArea>

      <h3 className="px-5 font-semibold text-sm pt-3">
        {selectedCategory.name}
      </h3>
      <Products products={selectedCategory.products} />
      {products.length > 0 && (
        <div className="fixed bottom-0 left-0 flex w-full items-center justify-between border-t bg-white px-5 py-3">
          <div className="">
            <p className="text-xs text-muted-foreground">Total dos Pedidos</p>
            <p className="text-sm font-semibold">
              {" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(total)}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                {quantityCard} {quantityCard > 1 ? "Itens" : "Item"}
              </span>
            </p>
          </div>
          <Button onClick={toggleCard} variant="destructive">
            Ver Sacola
          </Button>
        </div>
      )}
      <CardSheet />
    </div>
  );
};

export default RestaurantCategories;
