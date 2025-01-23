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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Хоол нэмэх хэсэг */}
        <div
          onClick={() => setIsAdding(true)}
          className="flex flex-col items-center justify-center border-2 border-dashed border-[#EF4444] rounded-lg p-5 cursor-pointer hover:bg-gray-100"
        >
          <PlusIcon className="bg-[#EF4444] rounded-full" size={32} />
          <span className="mt-2 text-gray-600">Add new Dish</span>
        </div>

        {/* Хоол харуулах хэсэг */}
        {cards.map((card) => (
          <div
            key={card._id}
            className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md"
          >
            <img
              src={card.image || "default-image.png"}
              alt={card.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#EF4444]">{card.title}</h3>
              <p className="text-sm text-gray-600 my-2">{card.description}</p>
              <p className="text-base font-bold">${card.price}</p>
            </div>
          </div>
        ))}
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
            <div className="flex justify-end space-x-4">
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



