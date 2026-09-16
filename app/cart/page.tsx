"use client";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiTrash2,
} from "react-icons/fi";

const CartPage = () => {
  const router = useRouter();
  const {
    subtotal,
    totalItems,
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const shipping = 0;
  const tax = subtotal() * 0.08;
  const total = subtotal() + shipping + tax;

  if (totalItems() === 0) {
    return (
      <FrontendLayout>
        <section className="mx-auto max-w-6xl py-12">
          <BreadCrumb
            items={[
              {
                label: "Home",
                href: "/",
              },
              {
                label: "Cart",
              },
            ]}
          />

          <div className="mt-10 flex min-h-96 flex-col items-center justify-center rounded-2xl border border-border bg-background px-6 py-16 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface">
              <FiShoppingCart size={44} className="text-muted-foreground" />
            </div>

            <h2 className="mt-6 text-2xl font-bold">Your cart is empty</h2>

            <p className="mt-3 max-w-md text-muted-foreground">
              Looks like you haven&apos;t added anything to your cart yet.
              Browse our products and find something you love.
            </p>

            <Button
              className="mt-8"
              paddingX="px-8"
              leftIcon={<FiArrowLeft />}
              onClick={() => router.push("/shop")}
            >
              Continue Shopping
            </Button>
          </div>
        </section>
      </FrontendLayout>
    );
  }

  return (
    <FrontendLayout>
      <section className="mx-auto max-w-6xl py-12">
        {/* header */}
        <div>
          <BreadCrumb
            items={[
              {
                label: "Home",
                href: "/",
              },
              {
                label: "Cart",
              },
            ]}
          />

          <p className="mt-2 text-muted-foreground">
            {totalItems()} Item{totalItems() !== 1 && "s"} in your cart
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          {/* left */}
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.cartKey}
                className="flex flex-col gap-5 rounded-2xl border border-border p-5 transition hover:shadow-sm sm:flex-row"
              >
                {/* product image */}
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={150}
                    height={180}
                    className="h-44 w-full object-cover sm:w-36"
                  />
                </div>

                {/* details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>

                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                      <span className="rounded-full bg-surface px-3 py-1">
                        Size: {item.size}
                      </span>
                      <span className="rounded-full bg-surface px-3 py-1">
                        Color: {item.color}
                      </span>
                    </div>

                    <p className="mt-5 text-2xl font-bold">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    {/* quantity */}
                    <div className="flex items-center rounded-lg border border-border">
                      <button
                        className="p-3 transition hover:bg-surface"
                        onClick={() => decreaseQuantity(item.cartKey)}
                      >
                        <FiMinus />
                      </button>
                      <span className="min-w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        className="p-3 transition hover:bg-surface"
                        onClick={() => increaseQuantity(item.cartKey)}
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <button
                      className="flex items-center gap-2 text-destructive transition hover:opacity-80"
                      onClick={() => removeFromCart(item.cartKey)}
                    >
                      <FiTrash2 />
                      <span className="text-sm font-medium">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* right */}
          <div className="rounded-2xl border border-border p-6 h-fit">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{totalItems() - 1}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal().toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>free</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between border-t border-border pt-4 text-xl font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              fullWidth
              className="mt-8"
              onClick={() => router.push("/checkout")}
            >
              Proceed to Checkout
            </Button>

            <Link
              href="/shop"
              className="mt-5 block text-center text-sm font-medium text-primary hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
};

export default CartPage;
