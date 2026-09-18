import CheckoutPageComponent from "@/components/Checkout/CheckoutPageComponent";
import { getProfile } from "@/server-actions/user/getProfile";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const CheckoutPage = async () => {
  const user = await getProfile();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <CheckoutPageComponent user={user} />
    </>
  );
};

export default CheckoutPage;
