"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { IoBagOutline, IoSearch } from "react-icons/io5";

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/shop",
    label: "Shop",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          Fashion
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium uppercase transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* desktop buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {/* search */}
            <button className="rounded-full p-2 text-foreground transition-colors hover:bg-surface">
              <IoSearch size={22} />
            </button>

            {/* user */}
            <button
              className="rounded-full p-2 text-foreground transition-colors hover:bg-surface"
              onClick={() => router.push("/sign-in")}
            >
              <FaRegUser size={22} />
            </button>

            {/* cart badge */}
            <button
              className="rounded-full p-2 text-foreground transition-colors hover:bg-surface"
              onClick={() => router.push("/cart")}
            >
              <IoBagOutline size={23} />
            </button>
          </div>

          {/* mobile menu button */}
          <button
            className="text-2xl text-foreground md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-2 py-3 text-muted-foreground transition hover:bg-surface hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            <button
              className="mt-4 rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
