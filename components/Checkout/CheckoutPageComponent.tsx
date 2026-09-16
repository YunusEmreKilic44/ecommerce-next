"use client";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Input from "@/components/ui/Input";
import React, { useState } from "react";
import { FaStripe } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import z from "zod";
import Button from "../ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProfile } from "@/server-actions/user/getProfile";
import { useCartStore } from "@/store/cart-store";
import { placeOrder } from "@/server-actions/order/placeOrder";
import { PaymentMethod } from "@/app/generated/prisma/enums";
import toast from "react-hot-toast";

interface CheckoutPageComponentProps {
  user: Awaited<ReturnType<typeof getProfile>>;
}

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  state: z.string().min(2, "State is required."),
  city: z.string().min(2, "City is required"),
  address: z.string().min(5, "Street address is required"),
  country: z.string().min(2, "Country is required."),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutPageComponent = ({ user }: CheckoutPageComponentProps) => {
  const { cartItems, clearCart, subtotal } = useCartStore();
  const address = user?.addresses[0];

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "stripe">("cod");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: address?.firstName ?? "",
      lastName: address?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      state: address?.state ?? "",
      city: address?.city ?? "",
      address: address?.street ?? "",
      country: address?.country ?? "",
    },
  });

  const shipping = 0;
  const tax = subtotal() * 0.05;
  const total = subtotal() + shipping + tax;

  const onSubmit = async (data: CheckoutFormValues) => {
    // pay with cash on delivery
    if (paymentMethod === "cod") {
      const result = await placeOrder({
        paymentMethod: PaymentMethod.CASH_ON_DELIVERY,
        shippingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          street: data.address,
          city: data.city,
          state: data.state,
          country: data.country,
        },
        cartItems: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
      });

      if (!result.success) {
        return toast.error(result.message as string);
      }

      toast.success("Order placed successfully.");
      clearCart();
      router.push(`/account/orders/${result.orderNumber}`);
      return;
    }

    //continue to stripe
  };

  return (
    <FrontendLayout>
      <section className="mx-auto max-w-7xl py-12">
        <div className="mb-10">
          <BreadCrumb
            items={[
              {
                label: "Home",
                href: "/",
              },
              {
                label: "Cart",
                href: "/cart",
              },
              {
                label: "Checkout",
              },
            ]}
          />

          <p className="mt-2 text-muted-foreground">
            Complete your order securely.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-10 lg:grid-cols-[2fr_1fr]"
        >
          {/* left */}
          <div className="space-y-8">
            {/* shipping address */}
            <div className="rounded-2xl border border-border p-6">
              <h2 className="font-semibold text-2xl">Shipping Address</h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <Input
                  label="First Name"
                  placeholder="John"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  {...register("lastName")}
                  error={errors.lastName?.message}
                />
                <Input
                  label="Email Address"
                  placeholder="john@gmail.com"
                  type="email"
                  {...register("email")}
                  error={errors.email?.message}
                />
                <Input
                  label="Phone Number"
                  placeholder="+234..."
                  {...register("phone")}
                  error={errors.phone?.message}
                />
                <Input
                  label="Country"
                  placeholder="USA"
                  {...register("country")}
                  error={errors.country?.message}
                />
                <Input
                  label="State"
                  placeholder="California"
                  {...register("state")}
                  error={errors.state?.message}
                />
                <Input
                  label="City"
                  placeholder="Burbank"
                  {...register("city")}
                  error={errors.city?.message}
                />
              </div>
              <div>
                <Input
                  label="Street Address"
                  placeholder="No 11..."
                  variant="textarea"
                  {...register("address")}
                  error={errors.address?.message}
                />
              </div>
            </div>

            {/* payment method */}
            <div className="rounded-2xl border border-border p-6">
              <h2 className="text-xl font-semibold">Payment Method</h2>

              <div className="mt-6 space-y-4">
                <button
                  onClick={() => setPaymentMethod("cod")}
                  type="button"
                  className={`flex w-full items-center rounded-xl border p-5 text-left transition ${paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${paymentMethod === "cod" ? "border-primary" : "border-border"}`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      )}
                    </div>

                    <FaMoneyBillWave className="text-green-600" size={24} />

                    <div>
                      <p className="font-semibold">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Pay when your order arrives.
                      </p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setPaymentMethod("stripe")}
                  type="button"
                  className={`flex w-full items-center rounded-xl border p-5 text-left transition ${paymentMethod === "stripe" ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${paymentMethod === "stripe" ? "border-primary" : "border-border"}`}
                    >
                      {paymentMethod === "stripe" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      )}
                    </div>

                    <FaStripe className="text-indigo-600" size={30} />

                    <div>
                      <p className="font-semibold">Pay with Stripe</p>
                      <p className="text-sm text-muted-foreground">
                        Visa, Mastercard and more.
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="rounded-2xl border border-border p-6 h-fit">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="mt-6 space-y-5">
              {cartItems.map((item) => (
                <div key={item.cartKey} className="flex gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={70}
                    height={85}
                    className="rounded-lg"
                  />

                  <div className="flex flex-1 justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
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
              disabled={isSubmitting}
              fullWidth
              className="mt-8"
              onClick={() => router.push("/checkout")}
            >
              {isSubmitting
                ? "Processing..."
                : paymentMethod === "stripe"
                  ? "Continue to Stripe"
                  : "Place Order"}
            </Button>

            <Link
              href="/shop"
              className="mt-5 block text-center text-sm font-medium text-primary hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </form>
      </section>
    </FrontendLayout>
  );
};

export default CheckoutPageComponent;
