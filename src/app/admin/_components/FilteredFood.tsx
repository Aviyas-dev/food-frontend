"use client";
import { useEffect, useState } from "react";
import { CategoryType } from "./Dishes";
 
import { Card } from "@/components/ui/card";
import { AddDish } from "./AddDish";
import { CardComp } from "./Card";
 
export type FoodType = {
  _id: string;
  name: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};
 
export const FilteredFood = ({ _id, categoryName }: CategoryType) => {
  const [foods, setFoods] = useState<FoodType[]>();
 
  useEffect(() => {
    const fetchFood = async () => {
      const response = await fetch("http://localhost:8000/food");
      const data = await response.json();
      setFoods(data);
    };
 
    fetchFood();
  }, [_id, categoryName]);
 
  return (
    <div className="w-full p-5 flex flex-col gap-5 rounded-xl bg-background">
      <h4 className=" text-xl font-semibold  ">{categoryName}</h4>
      <div className="flex flex-wrap gap-4">
        <Card className="border border-dashed border-red-500 px-2 py-4 w-[270.75px] h-[241px] flex flex-col items-center  justify-center ">
          <AddDish categoryName={categoryName} _id={_id} />
        </Card>
        {foods?.map(
          (food) =>
            food.category === _id && (
              <div key={food._id}>
                <CardComp food={food} _id={_id} />
              </div>
            )
        )}
      </div>
    </div>
  );
};


