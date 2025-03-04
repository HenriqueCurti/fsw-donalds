"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
  phone: z.string().trim().min(1, {
    message: "O telefone não pode ser nulo",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const PhoneForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const pathName = usePathname();

  const onSubmit = (data: FormSchema) => {
    router.push(`${pathName}\?phone=${data.phone}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div>
      <Drawer open>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Visualizar Pedidos</DrawerTitle>
            <DrawerDescription>
              Insira o número do seu Whatsapp para visualizar seus pedidos.
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="px-4">
                    <FormLabel>Whatsapp</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o número de seu whatsapp"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button
                  variant="destructive"
                  className="w-full rounded-full"
                  type="submit"
                >
                  Confirmar
                </Button>
                <DrawerClose asChild>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="w-full rounded-full"
                  >
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PhoneForm;
