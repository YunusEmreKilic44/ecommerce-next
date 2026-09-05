"use client";

import { useSearchStore } from "@/store/search-store";
import { FaSearch } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const SearchInput = () => {
  const { isOpen, closeSearch } = useSearchStore();

  if (!isOpen) return null;

  return (
    <div className="border-b border-border bg-surface py-5">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="rounded-xl border border-border bg-background">
          {/* search input */}
          <div className="flex h-14 items-center gap-4 px-5">
            <FaSearch className="shrink-0 text-muted-foreground" size={18} />
            <input
              placeholder="Search Products..."
              className="h-full w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
            />

            <button
              onClick={() => closeSearch()}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-surface hover:text-foreground"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
