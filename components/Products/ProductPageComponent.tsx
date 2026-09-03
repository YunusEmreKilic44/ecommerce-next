"use client";

import Image from "next/image";
import React, { useState } from "react";
import BreadCrumb from "../ui/BreadCrumb";
import Button from "../ui/Button";
import { IoBagAddOutline } from "react-icons/io5";

const images = [
  "/images/gallery1.png",
  "/images/gallery2.png",
  "/images/gallery3.png",
  "/images/gallery4.png",
];

const sizes = ["S", "M", "L", "XL"];

const colors = [
  {
    name: "Charcoal",
    value: "#1F2937",
  },
  {
    name: "Brown",
    value: "#8B5E3C",
  },
  {
    name: "Light Gray",
    value: "#E5E7EB",
  },
];

const ProductPageComponent = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <section className="py-12">
      <BreadCrumb
        items={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Shop",
            href: "/shop",
          },
          {
            label: "Product Name",
          },
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* images */}
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          {/* galery images */}
          <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-visible">
            {images.map((image) => (
              <button
                key={image}
                className={`shrink-0 overflow-hidden rounded-xl border-2 transition ${selectedImage === image ? "border-primary" : "border-border"}`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt="Product"
                  width={90}
                  height={110}
                  className="h-24 w-20 object-cover md:h-28 md:w-24"
                />
              </button>
            ))}
          </div>
          {/* main images */}
          <div className="relative h-87.5 w-full overflow-hidden rounded-2xl bg-surface sm:h-125">
            <Image
              src={selectedImage}
              alt="Product"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* product details */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Classic Demin Jacket
          </h2>
          <p className="mt-6 text-2xl font-bold sm:text-3xl">$79.99</p>

          <p className="mt-6 leading-8 text-muted-foreground">
            Crafted from premium denim, this jacket offers a perfect fit and
            timeless style.
          </p>

          {/* sizes */}
          <div className="mt-8">
            <p className="mb-3 font-semibold">Select Size</p>

            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`flex h-11 w-11 items-center justify-center rounded-lg border font-medium transition ${selectedSize === size ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* colors */}
          <div className="mt-8">
            <p className="mb-3 font-semibold">Select Colors</p>

            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  title={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${selectedColor.name === color.name ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                >
                  <span
                    className="h-8 w-8 rounded-full"
                    style={{ backgroundColor: color.value }}
                  ></span>
                </button>
              ))}
            </div>
          </div>

          {/* selected values */}
          <div className="mt-6 rounded-xl bg-surface p-4">
            <p className="text-sm">
              <span className="font-semibold">Selected Size:</span>{" "}
              {selectedSize}
            </p>

            <p className="text-sm mt-2">
              <span className="font-semibold">Selected Color:</span>{" "}
              {selectedColor.name}
            </p>
          </div>

          <div className="mt-8">
            <Button
              className="w-full sm:w-fit"
              paddingX="px-20"
              leftIcon={<IoBagAddOutline size={20} />}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPageComponent;
