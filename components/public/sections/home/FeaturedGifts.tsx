import { getPublicProducts } from "@/lib/actions/products";
import FeaturedGiftsContent from "./FeaturedGiftsContent";

export default async function FeaturedGifts() {
  const products = await getPublicProducts();
  
  // Show only the top 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return <FeaturedGiftsContent products={featuredProducts} />;
}
