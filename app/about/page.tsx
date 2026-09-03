import FrontendLayout from "@/components/layouts/FrontendLayout";
import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <FrontendLayout>
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* left content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              About Us
            </span>

            <h2 className="mt-4 text-4xl font-bold text-foreground sm:text-5xl">
              Timeless Fashion for Every Occasion
            </h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              At Fashion., we believe great style should be effortless. Our
              collections are thoughtfully designed with premium fabrics and
              modern trends to help you look and feel your best every day.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              Whether you&apos;re shopping for everyday essentials or statement
              pieces, we&apos;re committed to delivering quality, comfort, and
              exceptional customer service.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-3xl font-bold text-primary">20k+</h3>
                <p className="mt-1 text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary">500+</h3>
                <p className="mt-1 text-muted-foreground">Premium Products</p>
              </div>
            </div>
          </div>

          {/* right content */}
          <div className="overflow-hidden rounded-3xl">
            <Image
              src={"/images/about.png"}
              alt="About Fashion"
              width={700}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
};

export default AboutPage;
