"use client";
import { Category, ProductType } from "@/app/generated/prisma/enums";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";

interface ProductTypeFilterComponent {
  label: string;
  value: ProductType;
}

interface CategoryTypeFilterComponent {
  label: string;
  value: Category;
}

const productTypes: ProductTypeFilterComponent[] = [
  { label: "T-Shirts", value: ProductType.T_SHIRTS },
  { label: "Shirts", value: ProductType.SHIRTS },
  { label: "Hoodies", value: ProductType.HOODIES },
  { label: "Jackets", value: ProductType.JACKETS },
  { label: "Jeans", value: ProductType.JEANS },
  { label: "Trousers", value: ProductType.TROUSERS },
  { label: "Shorts", value: ProductType.SHORTS },
  { label: "Shoes", value: ProductType.SHOES },
];

const categories: CategoryTypeFilterComponent[] = [
  {
    label: "Men",
    value: Category.MEN,
  },
  {
    label: "Women",
    value: Category.WOMEN,
  },
  {
    label: "Children",
    value: Category.CHILDREN,
  },
];

const FilterOptions = () => {
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategories =
    searchParams.get("category")?.split(",").filter(Boolean) ?? [];
  const selectedTypes =
    searchParams.get("productType")?.split(",").filter(Boolean) ?? [];

  const toggleFilter = (key: "category" | "productType", value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const values = params.get(key)?.split(",").filter(Boolean) ?? [];

    const updatedValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];

    if (updatedValues.length === 0) {
      params.delete(key);
    } else {
      params.set(key, updatedValues.join(","));
    }

    router.replace(`/shop?${params.toString()}`);
  };

  return (
    <aside className="w-full sm:min-w-60 sm:max-w-60">
      <button
        className="mb-4 flex items-center gap-2 text-xl font-semibold sm:cursor-default"
        onClick={() => setShowFilter(!showFilter)}
      >
        FILTERS
        <RiArrowRightDoubleFill
          className={`transition-transform duration-300 sm:hidden ${showFilter ? "rotate-90" : ""}`}
        />
      </button>

      {/* FILTERS */}

      <div className={`space-y-6 sm:block ${showFilter ? "block" : "hidden"}`}>
        {/* Categories */}
        <div className="rounded-xl border border-border p-5">
          <h3 className="mb-4 text-sm font-semibold tracking-wide">
            CATEGORIES
          </h3>

          <div className="space-y-3 text-sm text-muted-foreground">
            {categories.map((category) => (
              <label key={category.value} className="flex items-center gap-3">
                <input
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => toggleFilter("category", category.value)}
                  type="checkbox"
                />
                <span>{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Product Types */}
        <div className="rounded-xl border border-border p-5">
          <h3 className="mb-4 text-sm font-semibold tracking-wide">TYPE</h3>

          <div className="space-y-3 text-sm text-muted-foreground">
            {productTypes.map((type) => (
              <label key={type.value} className="flex items-center gap-3">
                <input
                  checked={selectedTypes.includes(type.value)}
                  onChange={() => toggleFilter("productType", type.value)}
                  type="checkbox"
                />
                <span>{type.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterOptions;
