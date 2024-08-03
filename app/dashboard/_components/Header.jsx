"use client";
import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Ana from "../../../public/Analogo.png";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Questions", path: "/dashboard/questions" },
  { label: "Upgrade", path: "/dashboard/upgrade" },
  { label: "How it Works?", path: "/dashboard/how" },
];

function Header() {
  const path = usePathname();

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src={Ana} width={60} height={60} alt="logo" />
      <ul className="hidden md:flex gap-6">
        {NAV_ITEMS.map(({ label, path: itemPath }) => (
          <Link
            key={itemPath}
            href={itemPath}
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === itemPath ? "text-primary font-bold" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
