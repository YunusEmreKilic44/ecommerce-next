import React from "react";
import SectionHeader from "../ui/SectionHeader";
import { dummyLatestCollections } from "@/constants/dummyProducts";
import ProductCard from "../Products/ProductCard";

const LatestCollection = () => {
  return (
    <section>
      <SectionHeader
        title="Latest Collection"
        subTitle="New Arrivals added weekly."
      />

      <div className="my-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {dummyLatestCollections.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
