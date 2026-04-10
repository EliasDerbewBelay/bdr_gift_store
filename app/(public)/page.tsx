import HomeHero from "@/components/public/sections/home/HomeHero";
import Collections from "@/components/public/sections/home/Collections";
import FeaturedGifts from "@/components/public/sections/home/FeaturedGifts";
import Testimonies from "@/components/public/sections/home/Testimonies";

export default function HomePage() {
  return (
    <section className="py-20 text-center">
      <HomeHero />
      <Collections />
      <FeaturedGifts />
      <Testimonies />
    </section>
  );
}
