"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";



const navLinks = [
  {
    label: "Browse Jobs",
    href: "/jobs",
  },
  {
    label: "Company",
    href: "/companies",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
const user = session?.user;
console.log(user)
const handleSignout=async()=>{
  await signOut()
}

  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-[#111111]/80 px-6 backdrop-blur-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-3xl font-bold">
              <span className="text-sky-500">hire</span>
              <span className="text-orange-500">loop</span>
            </h1>
          </Link>

          {/* Right Side */}
          <div className="hidden lg:flex items-center ml-auto">
            {/* Menu */}
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="py-3 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-8 h-5 w-px bg-white/20" />

            {/* Auth */}
            {user ? (
              <>
                Hi, {user.name}!
                <Button onClick={handleSignout} variant="ghost">
                  Sign Out
                </Button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
              >
                Sign In
              </Link>
            )}

            <Link href="/auth/signup">
              <Button
                radius="lg"
                className="ml-6 bg-violet-600 px-6 text-white hover:bg-violet-700"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-2 rounded-2xl border border-white/10 bg-[#111111]/95 backdrop-blur-xl lg:hidden">
            <div className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="py-3 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-3 h-px bg-white/10" />

              <Link
                href="/login"
                className="py-3 text-violet-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>

              <Button
                as={Link}
                href="/register"
                radius="lg"
                className="mt-3 bg-violet-600 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
