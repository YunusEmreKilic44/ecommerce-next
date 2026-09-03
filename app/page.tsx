import BestSellers from "@/components/Home/BestSellers";
import HeroSection from "@/components/Home/HeroSection";
import LatestCollection from "@/components/Home/LatestCollection";
import ShopWithUs from "@/components/Home/ShopWithUs";
import FrontendLayout from "@/components/layouts/FrontendLayout";

export default function Home() {
  return (
    <FrontendLayout>
      <HeroSection />
      <LatestCollection />
      <BestSellers />
      <ShopWithUs />
    </FrontendLayout>
  );
}
