"use client";

import { CardComp } from "./Card";
import { FoodType } from "@/app/(web)/(webcomponents)/Dishes";
import React from "react";

interface FilteredFoodsProps {
  _id: string;
  categoryName: string;
  foods: FoodType[];
}

export const FilteredFood = ({
  _id,
  categoryName,
  foods,
}: FilteredFoodsProps) => {
  return (
    <div>
      <div className="w-full p-5 flex flex-col gap-[54px] rounded-xl">
        <h4 className="text-3xl font-semibold text-primary-foreground">
          {categoryName}
        </h4>
        <div className="flex flex-wrap gap-9">
          {foods
            .filter((food) => food.category === _id)
            .map((food, index) => (
              <CardComp key={index} food={food} id={_id} />
            ))}
        </div>
      </div>
    </div>
  );
};
