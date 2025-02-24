import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { CardContext } from "../../contexts/card";
import CardItem from "./card-item";

const CardSheet = () => {
  const { products, isOpen, toggleCard } = useContext(CardContext);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggleCard}>
        <SheetContent className="w-[80%]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <div className="py-5">
            {products.map((product) => (
              <CardItem key={product.id} product={product} />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CardSheet;
