"use client";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authClient } from "@/lib/auth-client";
import { signInWithGoogle } from "@/services/signInWithGoogle";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "better-auth/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import z from "zod";

export const signinSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

type SignInFormValues = z.infer<typeof signinSchema>;

const SignInPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message as string);
      return;
    }
    toast.success("Login successful");
    router.replace("/account");
  };

  return (
    <FrontendLayout>
      <section className="flex min-h-[70vh] items-center justify-center py-16">
        <div className="max-w-md w-full">
          {/* header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>

            <p className="mt-3 text-muted-foreground">
              Sign in to your account to continue shopping.
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
            <Input
              label="Email Address"
              placeholder="john@gmail.com"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              placeholder="Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />

            <Button disabled={isSubmitting} fullWidth>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>

            <Button
              onClick={signInWithGoogle}
              disabled={isSubmitting}
              leftIcon={<FcGoogle size={18} />}
              type="button"
              fullWidth
              variant="outline"
            >
              Continue with Google
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos; have an account?{" "}
            <Link href="/sign-up" className="font-semibold">
              Create Account
            </Link>
          </p>
        </div>
      </section>
    </FrontendLayout>
  );
};

export default SignInPage;
