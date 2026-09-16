"use server";

import { prisma } from "@/lib/prisma";

export const getBestSellerProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      where: {
        bestSeller: true,
      },
      take: 10,
      include: {
        images: {
          take: 1,
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products.map((product) => ({
      ...product,
      price: Number(product.price),
    }));
  } catch (error) {
    console.error("Failed to fetch best seller products:", error);
    return [];
  }
};
