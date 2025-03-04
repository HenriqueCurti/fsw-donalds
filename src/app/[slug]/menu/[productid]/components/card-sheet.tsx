import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { useContext, useState } from "react";
import { CardContext } from "../../contexts/card";
import CardItem from "./card-item";
import { CardButtonFooter } from "./card-button-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CardSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
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
              <Card className="mb-6">
                <CardContent className="p-5">
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
              <Button
                className="w-full rounded-full"
                onClick={() => setFinishOrderDialogIsOpen(true)}
              >
                Finalizar pedido
              </Button>

              <CardButtonFooter
                open={finishOrderDialogIsOpen}
                onOpenChange={setFinishOrderDialogIsOpen}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CardSheet;
