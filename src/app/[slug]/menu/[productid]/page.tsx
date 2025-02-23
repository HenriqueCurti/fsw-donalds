import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductHeader from "./components/product-header";
import ProductsDetails from "./components/products-details";

interface ProductPageProps {
  params: Promise<{ slug: string; productid: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productid } = await params;

  const restaurant = await db.restaurant.findUnique({
    select: { avatarImageUrl: true, name: true },
    where: { slug },
  });

  const product = await db.product.findFirst({ where: { id: productid } });

  if (!product || !restaurant) {
    return notFound();
  }

  return (
    <div className="h-full flex flex-col">
      <ProductHeader product={product} />
      <ProductsDetails product={product} restaurant={restaurant} />
    </div>
  );
};

export default ProductPage;
