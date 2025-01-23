'use client';

import React, { useState, useEffect } from "react";
import Navigation from "../_components/Navigation";
import { AllDishesPage } from "../_components/AllDishesPage";

type DishType = {
  title: string;
  description: string;
  price: string;
  image: string | null;
  category: string;
};

export default function FoodMenu() {
  const [dishes, setDishes] = useState<DishType[]>([]);

  // Серверээс хоол татах функц
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("http://localhost:8000/food");
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  // Хоол нэмэх функц (жишээ байдлаар нэмсэн)
  const handleAddDish = (category: string) => {
    console.log(`Adding a new dish to category: ${category}`);
    // Та энд хоол нэмэх логикыг нэмэх боломжтой
  };

  return (
    <div className="flex">
      {/* Navigation */}
      <Navigation />

      {/* Content */}
      <div className="flex-1">
        <AllDishesPage dishes={dishes} onAddDish={handleAddDish} />
      </div>
    </div>
  );
}
