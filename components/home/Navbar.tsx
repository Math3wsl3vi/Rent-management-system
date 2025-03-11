"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("user");
      router.push("/auth/register");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full h-[58px] bg-slate-50 flex items-center fixed mb-20 z-50">
      <div className="w-[250px] h-full bg-[#21263c]">
        <div className="rounded-bl-xl bg-[#181c2e] w-[250px] h-full pl-4 pt-4">
          <Link href="/" className="text-2xl font-poppins text-white">
            Rent.io
          </Link>
        </div>
      </div>
      <div className="flex-1 flex justify-between px-5 gap-10 items-center">
        <h1 className="text-xl capitalize">{user?.role || "User"} Dashboard</h1>
        <div className="flex gap-5 flex-row">
          <div className="border p-2 rounded-md cursor-pointer">
            <h1 className="font-poppins">Add Listing</h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="cursor-pointer hover:bg-white hover:border hover:p-2 hover:rounded-full">
              <Image src="/images/bell.png" alt="Notifications" width={17} height={17} />
            </div>
            <div className="cursor-pointer hover:bg-white hover:border hover:p-2 hover:rounded-full">
              <Image src="/images/settings.png" alt="Settings" width={17} height={17} />
            </div>
            {/* Profile Menu */}
            <div className="relative">
              <div
                className="cursor-pointer hover:bg-white hover:border hover:p-2 hover:rounded-full"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Image src="/images/user.png" alt="User" width={25} height={25} />
              </div>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-poppins"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
