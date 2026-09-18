"use server";

import { prisma } from "@/lib/prisma";

export const getDashboardStats = async () => {
  try {
    const [totalUsers, totalProducts, totalOrders] = await prisma.$transaction([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
    ]);

    return {
      totalUsers,
      totalProducts,
      totalOrders,
    };
  } catch (error) {
    console.error(error);

    return {
      totalUsers: 0,
      totalProducts: 0,
      totalOrders: 0,
    };
  }
};
