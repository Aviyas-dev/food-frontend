"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { Category } from "../_components/Categories";
import { Dishes } from "../_components/Dishes";
 
export default function Home() {
  return (
    <div className=" w-[100%] pl-6 pr-10 py-6 flex flex-col gap-6 overflow-scroll">
      <div className=" flex flex-col gap-6">
        <div className="flex justify-end">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <Category />
      </div>
      <div>
        <Dishes />
      </div>
    </div>
  );
}