"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
 
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuthFetch } from "@/app/(Hooks)/FetchData";
import { CategoryType } from "./Dishes";
 
export const Category = () => {
  const foodCategory : CategoryType[] = useAuthFetch("food-category") || [];
  const [newCategory, setNewCategory] = useState<string>();
 
  const addCategory = () => {
    fetch("http://localhost:8000/food-category", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ categoryName: newCategory }),
    });
    setNewCategory("");
  };
 
  return (
    <div className=" w-full p-6 rounded-xl  flex flex-col gap-4 bg-background ">
      <h4 className=" text-xl font-semibold  ">Dishes Category</h4>
      <div className="flex flex-wrap gap-3 ">
        <Link href={`/admin/menu`}>
          <Badge
            variant="outline"
            className=" rounded-full border py-2 px-4 flex gap-2 text-sm font-medium "
          >
            All dishes
          </Badge>
        </Link>
        {foodCategory?.map((category: { _id: string; categoryName: string }) => {
          return (
            <Link href={`/admin/menu/${category._id}`} key={category._id}>
              <Badge
                variant="outline"
                className=" rounded-full border py-2 px-4 flex gap-2 text-sm font-medium "
              >
                {category.categoryName}
              </Badge>
            </Link>
          );
        })}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="rounded-full  p-[10px]">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-6 w-[460px] p-6">
            <DialogHeader className="pb-4">
              <DialogTitle>Add new category</DialogTitle>
            </DialogHeader>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="categoryName">Category name</Label>
              <Input
                id="categoryName"
                type="text"
                className="w-[412px]"
                placeholder="Type category name..."
                onChange={(e) => setNewCategory(e.target.value)}
                required
                pattern="[A-Za-z]"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  onClick={() => {
                    if (newCategory) {
                      addCategory();
                    }
                  }}
                >
                  Add category
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};