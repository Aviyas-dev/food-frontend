'use client';
import React, { useState } from "react";

const Categories: React.FC = () => {
  const categories = [
    "Appetizers",
    "Salads",
    "Pizzas",
    "Lunch favorites",
    "Main dishes",
    "Fish & Sea foods",
    "Side dish",
    "Brunch",
    "Desserts",
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("Appetizers");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-4 bg-gray-800 text-white mx-auto">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
        {/* Left Scroll Button */}
        <button className="text-white px-2 text-lg">{"<"}</button>

        {/* Categories */}
        <div className="flex space-x-2 flex-nowrap mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-800"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button className="text-white px-2 text-lg">{">"}</button>
      </div>
    </div>
  );
};

export default Categories;

