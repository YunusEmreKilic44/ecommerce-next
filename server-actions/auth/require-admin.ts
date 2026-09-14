"use server";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";
import { prisma } from "@/lib/prisma";

export const requireAdmin = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/sign-in");
  }

  // fetch the users role
  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      role: true,
    },
  });

  if (user?.role !== "ADMIN") {
    redirect("/account");
  }
};
