"use client";

import Button from "@/components/ui/Button";
import { getOrderByStripeSessionId } from "@/server-actions/order/getOrderBySessionId";
import { useCartStore } from "@/store/cart-store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const session_id = searchParams.get("session_id");

    if (!session_id) {
      router.replace("/");
      return;
    }

    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;

      // fetch the order by the sesssion id
      const order = await getOrderByStripeSessionId(session_id);

      if (order) {
        clearInterval(interval);
        toast.success("Order placed successfully");
        clearCart();
        router.replace(`/account/orders/${order.orderNumber}`);
        return;
      }

      if (attempts >= 10) {
        clearInterval(interval);
        setTimedOut(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [router, searchParams, clearCart]);

  if (timedOut) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-lg rounded-2xl border border-border p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <FiCheckCircle className="text-3xl text-green-600" />
          </div>

          <h2 className="mt-6 text-3xl font-bold">Payment Received</h2>

          <p className="mt-4 text-muted-foreground">
            Your payment was successful, but we&apos;re still finalizing your
            order. This usually only takes a few more seconds.
          </p>

          <Button className="mt-8" onClick={() => window.location.reload()}>
            Check Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-lg rounded-2xl border border-border p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>

        <h2 className="mt-6 text-3xl font-bold">Finalizing your Order</h2>

        <p className="mt-4 text-muted-foreground">
          Your payment was successful. Please wait while we confirm your order.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          You&apos;ll be redirected automatically.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
