'use client';
import React, { useEffect, useState } from "react";
import AddNewCategory from "./AddNewCategory";


type CategoryType = {
  categoryName: string;
  _id: string;
};

type DishType = {
  _id: string;
  title: string;
  description: string;
  price: string;
  image: string | null;
  category: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [dishes, setDishes] = useState<DishType[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  
  // Fetch categories 
  useEffect(() => {
    const fetchCategories = async () => {
       const response = await fetch("http://localhost:8000/food-category");
        const data = await response.json();
        setCategories(data);
     
    };
    fetchCategories();
    
  }, []);
  
  // Add a category
  const addCategory = async (categoryName: string) => {
    try {
      const response = await fetch("http://localhost:8000/food-category/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName }),
      });
      const data = await response.json();
      setCategories([...categories, data.newItem]);
      setIsAddingCategory(false);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  // Delete a category
  const deleteCategory = async (_id: string) => {
    try {
      await fetch(`http://localhost:8000/food-category/${_id}`, {
        method: "DELETE",
      });
      setCategories(categories.filter((category) => category._id !== _id));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div >
      <div className="w-[1171px] mt-[24px]">
        <div className="bg-[#FFFFFF] w-[1171px] h-auto rounded-xl p-5">
          <h1 className="text-[#09090B] mb-5">Dishes Category</h1>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-full border border-gray-300 px-4 py-2">
              All Dishes <span className="text-red-500">({dishes.length})</span>
            </button>
            {categories.map((category) => (
              <div key={category._id} className="flex items-center gap-2">
                <button className="flex items-center gap-2 rounded-full bg-gray-200 px-4 py-2">
                  {category.categoryName}
                 
                </button>
                <button
                  className="text-red-500"
                  onClick={() => deleteCategory(category._id)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              className="rounded-full bg-[#EF4444] text-white px-4 py-2"
              onClick={() => setIsAddingCategory(true)}
            >
              Add Category
            </button>
          </div>
        </div>
        {isAddingCategory && (
          <AddNewCategory
            onAdd={(categoryName) => addCategory(categoryName)}
            onCancel={() => setIsAddingCategory(false)}
          />
        )}
        </div>
      </div>
  );
}
