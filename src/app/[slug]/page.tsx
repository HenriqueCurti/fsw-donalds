import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;

  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant?.avatarImageUrl}
          alt={restaurant?.name}
          width={82}
          height={82}
        />

        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      <div className="pt-24 text-center space-y-2">
        <h3 className="text-2xl fonte-semibold">Seja bem-vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos à oferecer
          praticidade e sabor em cada detalhe!
        </p>
      </div>
      <div className="pt-14 grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center gap-8 py-8">
            <div className="relative w-[80px] h-[80px]">
              <Image
                src="/dine_in.png"
                alt="Para comer aqui"
                fill
                className="object-contain"
              />
            </div>

            <Button variant="secondary" className="rounded-full" asChild>
              <Link href={`${slug}/menu?consumptionMethod=DINE_IN`}>
                Para comer aqui
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center gap-8 py-8">
            <div className="relative h-[80px] w-[80px]">
              <Image
                src="/takeaway.png"
                alt="Para levar"
                fill
                className="object-contain"
              />
            </div>

            <Button variant="secondary" className="rounded-full" asChild>
              <Link href={`${slug}/menu?consumptionMethod=TAKEAWAY`}>
                Para levar
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RestaurantPage;
