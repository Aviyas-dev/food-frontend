"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { PlusIcon } from "lucide-react";

type Dish = {
  _id?: string;
  title: string;
  description: string;
  price: string;
  image: string | null;
  category: string;
};

type ProductListContainerProps = {
  selectedCategoryId: string;
};

export default function ProductListContainer({
  selectedCategoryId,
}: ProductListContainerProps) {
  const [cards, setCards] = useState<Dish[]>([]); // Хоолын жагсаалт
  const [newDish, setNewDish] = useState<Dish>({
    title: "",
    description: "",
    price: "",
    image: null,
    category: "",
  });
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [categories, setCategories] = useState<{ _id: string; categoryName: string }[]>([]);

  // Серверээс категори татах
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/food-category");
        const data = await response.json();
        setCategories(data); // Категорийн өгөгдлийг state-д хадгалах
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Серверээс хоол татах
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(
          selectedCategoryId
            ? `http://localhost:8000/food?category=${selectedCategoryId}`
            : "http://localhost:8000/food"
        );
        const data = await response.json();
        setCards(data); // Хоолын өгөгдлийг state-д хадгалах
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      }
    };
    fetchDishes();
  }, [selectedCategoryId]);

  // Зураг оруулах функц
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target?.files?.[0];
      if (!file) return;

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "food-delivery");

      setUploading(true);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dh2wfy12t/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const dataJson = await response.json();
      setNewDish((prevDish) => ({
        ...prevDish,
        image: dataJson.secure_url,
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  // Хоол нэмэх функц
  const addDish = async () => {
    try {
      if (!newDish.title || !newDish.description || !newDish.price || !newDish.category) {
        alert("Please fill out all fields before adding a dish.");
        return;
      }

      const response = await fetch("http://localhost:8000/food/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDish),
        
      });
      console.log(newDish);

      if (!response.ok) {
        throw new Error("Failed to add dish");
      }

      const addedDish = await response.json();

      // Шинэ хоолыг жагсаалтад нэмэх
      setCards((prevCards) => [...prevCards, addedDish]);

      // Оруулсан мэдээллийг цэвэрлэх
      setNewDish({
        title: "",
        description: "",
        price: "",
        image: null,
        category: "",
      });
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to add dish:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Dishes ({cards.length})</h2>
      <div className="grid grid-cols-4 gap-4 p-4">
       <div
          onClick={() => setIsAdding(true)}
          className="border-2 border-dashed border-red-400 rounded-lg flex flex-col justify-center items-center p-4"
        >
          <PlusIcon className="bg-[#EF4444] rounded-full" size={32} />
          <span className="text-sm text-gray-500 text-center mt-2">Add new Dish</span>
        </div>
        <div className="rounded-lg shadow-lg overflow-hidden border border-gray-200">
    <img
      src="https://via.placeholder.com/150"
      alt="Dish"
      className="w-full h-32 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">Grilled Chicken Cobb Salad</h3>
      <p className="text-sm text-gray-600 mt-2">
        Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.
      </p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-red-500 font-semibold">$12.99</p>
        <button className="text-red-500 hover:bg-red-100 p-1 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536M9 11l6 6m0 0l-6-6m6 6L9 11"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
        

        
        
        </div>

      {/* Хоол нэмэх модал */}
      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add new Dish</h2>
            <input
              type="text"
              placeholder="Food name"
              value={newDish.title}
              onChange={(e) =>
                setNewDish((prevDish) => ({ ...prevDish, title: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <textarea
              placeholder="Ingredients / Description"
              value={newDish.description}
              onChange={(e) =>
                setNewDish((prevDish) => ({
                  ...prevDish,
                  description: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <input
              type="text"
              placeholder="Food price"
              value={newDish.price}
              onChange={(e) =>
                setNewDish((prevDish) => ({ ...prevDish, price: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <select
              value={newDish.category}
              onChange={(e) =>
                setNewDish((prevDish) => ({
                  ...prevDish,
                  category: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            <label>
              <input
                onChange={handleFileChange}
                className="block"
                type="file"
                disabled={uploading}
              />
              {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
            </label>
            <div className="flex justify-end space-x-4 mt-5">
              <button
                onClick={() => setIsAdding(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={addDish}
                className="bg-[#EF4444] text-white px-4 py-2 rounded-md"
                disabled={uploading}
              >
                Add Dish
              </button>
            </div>
          </div>
        </div>
      )}
      
      
      
     

      
    </div>
  );
}



