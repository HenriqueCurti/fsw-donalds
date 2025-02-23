"use client";

import { Button } from "@/components/ui/button";
import { Product, Restaurant } from "@prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { CardContext } from "../../contexts/card";
import CardSheet from "./card-sheet";

interface ProductDeailsProps {
  restaurant: Pick<Restaurant, "avatarImageUrl" | "name">;
  product: Product;
}

const ProductsDetails = ({ product, restaurant }: ProductDeailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addProduct, toggleCard } = useContext(CardContext);

  const handleDecreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleOpenCard = () => {
    addProduct({
      ...product,
      quantity,
    });
    toggleCard();
  };

  return (
    <>
      <div className="relative z-50 rounded-tl-3xl py-5 mt-[-1.5rem] p-5 flex-auto flex flex-col overflow-hidden">
        <div className="flex-auto overflow-hidden">
          <div className="flex items-center gap-1.5">
            <Image
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p className="text-xs text-muted-foreground">{restaurant.name}</p>
          </div>

          <h2 className="text-xl font-semibold mt-1">{product.name}</h2>

          <div className="flex items-center justify-between mt-3">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}
            <div className="flex items-center gap-3 text-center">
              <Button
                variant="secondary"
                className="h-8 w-8 rounded-xl"
                onClick={handleDecreaseQuantity}
              >
                {" "}
                <ChevronLeftIcon />
              </Button>
              <p className="w-4">{quantity}</p>
              <Button
                variant="destructive"
                className="h-8 w-8 rounded-xl"
                onClick={handleIncreaseQuantity}
              >
                {" "}
                <ChevronRightIcon />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-full">
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold">Sobre</h4>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-1">
                <ChefHatIcon size={18} />
                <h4 className="font-semibold">Ingredientes</h4>
              </div>

              <div className="text-sm text-muted-foreground">
                <ul className="list-disc px-5 text-sm text-muted-foreground">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
        </div>

        <Button
          variant="destructive"
          className="rounded-full w-full mt-6"
          onClick={handleOpenCard}
        >
          Adicionar à sacola
        </Button>
      </div>

      <CardSheet />
    </>
  );
};

export default ProductsDetails;
