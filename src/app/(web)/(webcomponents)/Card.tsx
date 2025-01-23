"use client";
import { useEffect, useState } from "react";
import { Food } from "./Cards";



export const Card = ({ id }: { id: string }) => {
  const [foods, setFoods] = useState<Food[]>();

  useEffect(() => {
    const fetchFood = async () => {
      const response = await fetch(`http://localhost:8000/food?category=${id}`);
      const data = await response.json();
      setFoods(data);
    };
    fetchFood();
  }, [id]);

  console.log(foods);

  return <div className="bg-white rounded-lg shadow overflow-hidden">{foods?.map((food)=> 
  <div className="text-gray-600 text-sm">{food?.foodName}</div>)}</div>

};
{/* <div class="bg-white rounded-lg shadow overflow-hidden">
        <img src="image-url" alt="Finger food" class="w-full h-40 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-bold text-gray-900">Finger food</h3>
          <p class="text-gray-600 text-sm">Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.</p>
          <div class="flex justify-between items-center mt-4">
            <span class="text-red-600 text-lg font-bold">$12.99</span>
            <button class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
              <span class="text-lg">+</span>
            </button>
          </div> */}
