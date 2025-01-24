"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct hook for App Router in Next.js
import { Button } from "@/components/ui/button";
import { TruckIcon, LayoutDashboard, SettingsIcon } from "lucide-react";

export default function Navigation() {
  const router = useRouter();

  return (
    <div className="h-screen bg-[#FFFFFF]">
      <div className="mt-6 ml-5 w-[165px] h-[44px]">
        <img src="Logo Container.png" alt="Logo" />
      </div>
      <div className="flex flex-col items-center mt-10 space-y-5">
        <Link href="/admin/food-menu" onClick={() => router.push("/admin/food-menu")}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-600"><LayoutDashboard />
          Food Menu</div>
        </Link>
      </div>
      <div className="flex justify-center mt-5">
      <Link href="/admin/orders" onClick={() => router.push("/admin/orders")}>
      <div className="flex items-center gap-2  px-4 py-2 rounded-full hover:bg-gray-600">
          <TruckIcon />
          Order</div>
        </Link>
      </div>
      <div className="flex justify-center mt-5">
        <Button variant="outline" onClick={() => router.push("/admin/settings")}>
          <SettingsIcon className="border-none"/>
          Settings
        </Button>
      </div>
    </div>
  );
}

