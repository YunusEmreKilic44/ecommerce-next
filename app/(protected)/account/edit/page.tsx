import FrontendLayout from "@/components/layouts/FrontendLayout";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import React from "react";

const EditProfilePage = () => {
  return (
    <FrontendLayout>
      <section className="mx-auto max-w-4xl py-12">
        <BreadCrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Edit" },
          ]}
        />

        <p className="text-muted-foreground mt-2">Edit your profile.</p>

        <form className="mt-10 space-y-8">
          {/* personal information */}

          <div className="rounded-2xl border border-border p-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Input label="Full Name" placeholder="John Doe" />
              <Input label="Phone Number" placeholder=" 8123456789" />
              <div className="md:col-span-2">
                <Input
                  label="Email Address"
                  placeholder=" john@gmail.com"
                  type="email"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="rounded-2xl border-border p-6">
            <h2 className="text-xl font-semibold">Shipping Address</h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Input label="Country" />
              <Input label="State" />
              <Input label="City" />
              <Input label="Posta Code" />
              <div className="md:col-span-2">
                <Input label="Street Address" variant="textarea" />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </form>
      </section>
    </FrontendLayout>
  );
};

export default EditProfilePage;
