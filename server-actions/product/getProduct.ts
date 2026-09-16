"use server";

import { prisma } from "@/lib/prisma";

export const getProduct = async (productId: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: {
          orderBy: {
            createdAt: "asc",
          },
        },
        sizes: {
          orderBy: {
            createdAt: "asc",
          },
        },
        colors: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if(!product) {
        return null;
    }

    return {
        ...product, price: Number(product.price)
    }

  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
};
