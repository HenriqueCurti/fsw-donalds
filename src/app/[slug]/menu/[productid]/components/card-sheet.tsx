import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { CardContext } from "../../contexts/card";
import CardItem from "./card-item";
import { CardButtonFooter } from "./card-button-footer";
import { Card, CardContent } from "@/components/ui/card";

const CardSheet = () => {
  const { products, isOpen, toggleCard, total } = useContext(CardContext);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggleCard}>
        <SheetContent className="w-[80%]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col">
            <div className="py-5 flex-auto">
              {products.map((product) => (
                <CardItem key={product.id} product={product} />
              ))}
            </div>

            <div className="mb-8">
              <Card className="mb-4">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Total do Pedido</p>
                    <p className="font-semibold text-xs">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(total)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <CardButtonFooter />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CardSheet;
