"use client";
import { useEffect, useState } from "react";
import { FilteredFood } from "./FilteredFood";
import { useParams } from "next/navigation";
import { useAuthFetch } from "@/app/(Hooks)/FetchData";
 
export type CategoryType = {
  categoryName: string;
  _id: string;
};
 
export const Dishes = () => {
  const params = useParams();
  const foodCategory: CategoryType[] = useAuthFetch("food-category") || [];
 
  //   const grouped = Object.groupBy(food, ({ category }) => category);
 
  //   console.log(grouped)
  return (
    <div className="flex flex-col gap-5">
      {!params.id
        ? foodCategory?.map((category) => (
            <div key={category._id}>
              <FilteredFood
                _id={category._id}
                categoryName={category.categoryName}
              />
            </div>
          ))
        : foodCategory
            ?.filter((category) => category._id === params.id)
            .map((category) => (
              <div key={category._id}>
                <FilteredFood
                  _id={category._id}
                  categoryName={category.categoryName}
                />
              </div>
            ))}
    </div>
  );
};
