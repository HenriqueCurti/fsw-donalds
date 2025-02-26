import Image from "next/image";
import { CardContext, CardProduct } from "../../contexts/card";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CardItemProps {
  product: CardProduct;
}

const CardItem = ({ product }: CardItemProps) => {
  const { encreaseProductQuantity, decreaseProductQuantity } =
    useContext(CardContext);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 bg-gray-100 rounded-xl">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>

        <div className="spacey-1">
          <p className="text-xs max-w-[90%] truncate text-ellipsis">
            {" "}
            {product.name}{" "}
          </p>
          <p className="text-sm font-semibold">
            {" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}{" "}
          </p>

          <div className="flex items-center gap-1">
            <Button
              className="h-7 w-7 rounded-lg"
              variant="outline"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon />
            </Button>

            <p className="text-xs w-7 text-center"> {product.quantity}</p>

            <Button
              className="h-7 w-7 rounded-lg"
              variant="destructive"
              onClick={() => encreaseProductQuantity(product.id)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>

      <Button className="h-7 w-7 rounded-lg" variant="outline">
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CardItem;
