import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createOrder } from "../../actions/create-order";
import { useParams, useSearchParams } from "next/navigation";
import { ConsumptionMethod } from "@prisma/client";
import { useContext, useTransition } from "react";
import { CardContext } from "../../contexts/card";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  clientName: z.string().trim().min(1, {
    message: "Por favor, informe seu no para o pedido",
  }),
  clientPhone: z.string().trim().min(1, {
    message: "Por favor, informe um telefone de contato para o pedido",
  }),
});

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type FormSchema = z.infer<typeof formSchema>;

export const CardButtonFooter = ({
  open,
  onOpenChange,
}: FinishOrderDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      clientPhone: "",
    },
  });

  const searcParams = useSearchParams();
  const { products } = useContext(CardContext);
  const { slug } = useParams<{ slug: string }>();
  const [isPending, startTransition] = useTransition();

  async function onSubmit(data: FormSchema) {
    try {
      const consumptionMethod = searcParams.get(
        "consumptionMethod"
      ) as ConsumptionMethod;

      startTransition(async () => {
        await createOrder({
          consumptionMethod,
          customerName: data.clientName,
          customerPhone: data.clientPhone,
          products,
          slug,
        });
        onOpenChange(false);
        toast.success("Pedido Finalizado com Sucesso!");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-5">
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild></DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Finalizar Pedido</DrawerTitle>
            <DrawerDescription>
              Insira suas informações abaixo para finalizar o seu pedido
            </DrawerDescription>
          </DrawerHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-5"
            >
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whatsapp</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu whatsapp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button type="submit" disabled={isPending}>
                  {" "}
                  {isPending && <Loader2Icon className="animate-spin" />}{" "}
                  Finalizar
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
