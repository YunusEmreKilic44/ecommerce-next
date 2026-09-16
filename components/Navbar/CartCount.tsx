import { useCartStore } from "@/store/cart-store";
import React from "react";

const CartCount = () => {

    const {totalItems} = useCartStore()

    if(totalItems() === 0) {
        return null;
    }

  return (
    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[11px] font-semibold text-white">
        {totalItems()}
    </span>
  );
};

export default CartCount;
