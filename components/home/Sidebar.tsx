"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu } from "lucide-react";

const SidebarLinks = [
  { id: 1, label: "Dashboard", route: "/dashboard", imgUrl: "/images/home.png" },
  { id: 2, label: "Tenants", route: "/dashboard/tenants", imgUrl: "/images/tenant.png" },
  { id: 3, label: "Property", route: "/dashboard/property", imgUrl: "/images/house.png" },
  { id: 4, label: "Finances", route: "/dashboard/payments", imgUrl: "/images/bars.png" },
  { id: 5, label: "Invoices", route: "/dashboard/invoices", imgUrl: "/images/invoice.png" },
  { id: 6, label: "Settings", route: "/dashboard/settings", imgUrl: "/images/setting.png" },
];

const SideBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 md:hidden z-50 bg-gray-800 text-white p-2 rounded-md"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Container */}
      <div
        className={cn(
          "bg-[#21263c] mt-[48px] overflow-hidden text-white p-2 fixed md:relative z-40 transition-all duration-300",
          isOpen ? "w-[250px]" : "w-[80px] md:w-[250px]"
        )}
      >
        <div className="flex flex-col gap-4 mt-10">
          {SidebarLinks.map((item) => {
            const isActive =
              pathname === item.route || (item.route !== "/dashboard" && pathname.startsWith(`${item.route}/`));

            return (
              <Link
                href={item.route}
                key={item.id}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-md transition-all duration-300",
                  isActive ? "bg-green-500 text-white" : "hover:bg-gray-700"
                )}
              >
                <Image src={item.imgUrl} alt={item.label} width={25} height={25} className="invert" />
                <p className={cn("font-poppins text-[15px] transition-all duration-300", !isOpen && "hidden md:block")}>
                  {item.label}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SideBar;
