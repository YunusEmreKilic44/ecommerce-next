"use client";

import { useCartStore } from "@/store/cart-store";
import { useEffect } from "react";

const CartHydration = () => {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return null;
};

export default CartHydration;
