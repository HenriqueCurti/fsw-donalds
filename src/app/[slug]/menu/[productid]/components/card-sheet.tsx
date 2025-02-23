import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { CardContext } from "../../contexts/card";

const CardSheet = () => {
  const { products, isOpen, toggleCard } = useContext(CardContext);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggleCard}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          {products.map((product) => (
            <h2 key={product.id}>{product.name}</h2>
          ))}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CardSheet;
