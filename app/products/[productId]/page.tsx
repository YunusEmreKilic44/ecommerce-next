import FrontendLayout from "@/components/layouts/FrontendLayout";
import ProductPageSkeleton from "@/components/loading/skeletons/ProductPageSkeleton";
import ProductPageComponent from "@/components/Products/ProductPageComponent";
import { getProduct } from "@/server-actions/product/getProduct";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params;

  return (
    <FrontendLayout>
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductContent productId={productId} />
      </Suspense>
    </FrontendLayout>
  );
};

export default ProductPage;

async function ProductContent({ productId }: { productId: string }) {
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return <ProductPageComponent product={product} />;
}
