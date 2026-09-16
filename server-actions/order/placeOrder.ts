"use server";

import { PaymentMethod, PaymentStatus } from "@/app/generated/prisma/enums";
import { getCurrentUser } from "../auth/getCurrentUser";
import { createOrder } from "./createOrder";

interface PlaceOrderInput {
  shippingAddress: {
    firstName: string;
    lastName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
  };

  cartItems: {
    productId: string;
    quantity: number;
    size: string;
    color: string;
  }[];

  paymentMethod: PaymentMethod;
}

export const placeOrder = async (data: PlaceOrderInput) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Place login first.",
      };
    }

    if (data.cartItems.length === 0) {
      return {
        success: false,
        message: "Your cart is empty.",
      };
    }

    //create the order
    const order = await createOrder({
      userId: currentUser.id,
      paymentMethod: data.paymentMethod,
      paymentStatus: PaymentStatus.PENDING,
      shippingAddress: data.shippingAddress,
      cartItems: data.cartItems,
    });


    return {
        success: true,
        orderNumber: order.orderNumber,
        message: "Order placed successfully"
    }

  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unable to place order.",
    };
  }
};
