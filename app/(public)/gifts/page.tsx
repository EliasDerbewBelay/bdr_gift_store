import { getPublicProducts, getPublicCategories } from "@/lib/actions/products";
import GiftsContent from "@/components/public/GiftsContent";

export default async function GiftsPage() {
  const [products, categories] = await Promise.all([
    getPublicProducts(),
    getPublicCategories(),
  ]);

  return (
    <GiftsContent 
      initialProducts={products} 
      initialCategories={categories} 
    />
  );
}
