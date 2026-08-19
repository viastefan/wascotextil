import { Hero } from "@/components/sections/Hero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { CustomizationSection } from "@/components/sections/CustomizationSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <CustomizationSection />
      <TrustSection />
      <CTASection />
    </>
  );
}
