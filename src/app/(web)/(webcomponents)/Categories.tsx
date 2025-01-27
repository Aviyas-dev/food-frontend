'use client';
import { useAuthFetch } from "@/app/(Hooks)/FetchData";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import React, { use, useState } from "react";
import { CategoryType } from "./Dishes";

export const Categories = () => {
const categories: CategoryType[] = useAuthFetch("food-category") || [];
  return (
    <div className="py-8 flex flex-col gap-9">
      <h1 className="text-3xl font-semibold text-primary-foreground">Categories</h1>
      <Carousel
      opts={{
        align: "start",
      }}
      className="flex justify-center">
        <CarouselPrevious />
        <CarouselContent className="whitespace-nowrap flex gap-2 px-5 w-[1648px]">
          <Link href={"/"}>
          <Badge
          variant={"destructive"}
          className="rounded-full text-lg font-normal px-5 py-1">All dishes</Badge>
          </Link>
          {categories.map((category)=> (
            <Link href={`${category._id}`} key={category._id}>
            <Badge
            variant={"outline"}
            className="bg-background text-primary rounded-full text-lg font-normal px-5 py-1">{category.categoryName}</Badge>
            </Link>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    
    </div>
  );
};

