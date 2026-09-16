"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "../auth/require-admin";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (productId: string) => {
  try {
    await requireAdmin();

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    // delete product images
    await Promise.all(
      product.images.map((image) =>
        cloudinary.uploader.destroy(image.publicId),
      ),
    );

    // delete the product
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product deleted successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to delete product.",
    };
  }
};
