import React, { useEffect, useState } from "react";
import { Card } from "./Card";

export type Food =  {
  id: number;
  foodName: string;
  price: string;
  image: string;
  category: string;
  ingredients: string;
}

export type category = {
  categoryName: string;
  _id: string
}

const Cards: React.FC = () => {

  const [category, setCategory] = useState<category[]>();

  useEffect(()=> {
    const fetchCategory = async () =>{
      const response = await fetch('http://localhost:8000/food-category')
      const data = await response.json()
      setCategory(data)
    }
    fetchCategory()
  },[])
  return (
    <div className="bg-gray-800 p-8 ">
      {/* Картуудыг ангиллаар хуваах */}

        <h2 className="text-white text-2xl font-bold mb-4">{}</h2>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {category?.map((item) => (
             <Card id={item._id}/>
          ))}
        </div>
   
    </div>
  );
};
{/* <div class="bg-gray-800 p-8">
  <!-- Appetizers Section -->
  <div class="mb-8">
    <h2 class="text-white text-2xl font-bold mb-4">Appetizers</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <img src="image-url" alt="Finger food" class="w-full h-40 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-bold text-gray-900">Finger food</h3>
          <p class="text-gray-600 text-sm">Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.</p>
          <div class="flex justify-between items-center mt-4">
            <span class="text-red-600 text-lg font-bold">$12.99</span>
            <button class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
              <span class="text-lg">+</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Repeat for other appetizers -->
    </div>
  </div> */}

export default Cards;
