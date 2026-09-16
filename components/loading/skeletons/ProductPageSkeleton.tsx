import React from "react";

const ProductPageSkeleton = () => {
  return (
    <section className="animate-pulse py-12">
      {/* breadcrumb */}
      <div className="mb-8 flex items-center gap-2">
        <div className="h-4 w-12 rounded bg-surface" />
        <div className="h-4 w-2 rounded bg-surface" />
        <div className="h-4 w-12 rounded bg-surface" />
        <div className="h-4 w-2 rounded bg-surface" />
        <div className="h-4 w-28 rounded bg-surface" />
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* images */}
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          {/* gallery images */}
          <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-visible">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-24 w-20 shrink-0 rounded-xl border-2 border-border bg-surface md:h-28 md:w-24"
              />
            ))}
          </div>
          {/* main image */}
          <div className="h-87.5 w-full rounded-2xl bg-surface sm:h-125" />
        </div>

        {/* product details */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          {/* name */}
          <div className="h-9 w-3/4 rounded bg-surface sm:h-10" />
          {/* price */}
          <div className="mt-6 h-8 w-32 rounded bg-surface sm:h-9" />
          {/* stock */}
          <div className="mt-2 h-5 w-40 rounded bg-surface" />

          {/* description */}
          <div className="mt-6 space-y-3">
            <div className="h-4 w-full rounded bg-surface" />
            <div className="h-4 w-full rounded bg-surface" />
            <div className="h-4 w-11/12 rounded bg-surface" />
            <div className="h-4 w-2/3 rounded bg-surface" />
          </div>

          {/* sizes */}
          <div className="mt-8">
            <div className="mb-3 h-5 w-24 rounded bg-surface" />
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-11 w-11 rounded-lg border border-border bg-surface"
                />
              ))}
            </div>
          </div>

          {/* colors */}
          <div className="mt-8">
            <div className="mb-3 h-5 w-28 rounded bg-surface" />
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-11 w-11 rounded-full border border-border bg-surface"
                />
              ))}
            </div>
          </div>

          {/* selected values */}
          <div className="mt-6 space-y-2 rounded-xl border border-border p-4">
            <div className="h-4 w-40 rounded bg-surface" />
            <div className="h-4 w-44 rounded bg-surface" />
          </div>

          {/* button */}
          <div className="mt-8">
            <div className="h-12 w-full rounded-lg bg-surface sm:w-64" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPageSkeleton;
