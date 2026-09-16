"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SortOptions = () => {
  const router = useRouter();
  const searchParamss = useSearchParams();

  const sort = searchParamss.get("sort") ?? "newest";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParamss.toString());

    params.set("sort", value);

    router.replace(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
      <h2 className="text-primary font-semibold">Shop</h2>
      <select
        value={sort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="border border-border text-sm p-3"
      >
        <option value="low-high">Sort By: Low to High</option>
        <option value="high-low">Sort By: High to Low</option>
        <option value="newest">Sort By: Newest</option>
        <option value="oldest">Sort By: Oldest </option>
      </select>
    </div>
  );
};

export default SortOptions;
