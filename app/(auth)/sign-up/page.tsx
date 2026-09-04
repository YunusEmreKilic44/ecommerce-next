"use client";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import z from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

type SignUpFormValues = z.infer<typeof signupSchema>;

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    console.log(data);
  };

  return (
    <FrontendLayout>
      <section className="flex min-h-[70vh] items-center justify-center py-16">
        <div className="max-w-md w-full">
          {/* header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Create Account
            </h2>

            <p className="mt-3 text-muted-foreground">
              Join us and start shopping your favorite styles.
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
            <Input
              label="Full Name"
              placeholder="John Doe"
              type="text"
              {...register("name")}
              error={errors.name?.message}
            />
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
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>

            <Button
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
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </FrontendLayout>
  );
};

export default SignUpPage;
