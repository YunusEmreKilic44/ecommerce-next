import React, { Suspense } from "react";
import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../Products/ProductCard";
import { getLatestProducts } from "@/server-actions/product/getLatestProducts";
import ProductCardSkeleton from "../loading/skeletons/ProductCardSkeleton";

export const dynamic = "force-dynamic";

const LatestCollection = () => {
  return (
    <section>
      <SectionHeader
        title="Latest Collection"
        subTitle="New Arrivals added weekly."
      />

      <Suspense fallback={<ProductCardSkeleton number={5} />}>
        <LatestCollectionsContent />
      </Suspense>
    </section>
  );
};

export default LatestCollection;

async function LatestCollectionsContent() {
  const products = await getLatestProducts();

  return (
    <div className="my-10">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.name,
              image: product.images[0].imageUrl,
              price: product.price,
            }}
          />
        ))}
      </div>
    </div>
  );
}
