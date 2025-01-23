import React, { useState } from "react";
import { PlusIcon } from "lucide-react";

type Dish = {
  title: string;
  description: string;
  price: string;
  image: string | null;
  category: string; // Категори нэмэв
}

type AllDishesPageProps ={
  dishes?: Dish[]; // Хоолын жагсаалт
  onAddDish: (category: string) => void; // Категори дамжуулахад тохируулав
}

const categories = [
  { id: "all", name: "All Dishes" },
  { id: "appetizers", name: "Appetizers" },
  { id: "salads", name: "Salads" },
  { id: "pizzas", name: "Pizzas" },
  { id: "lunch", name: "Lunch favorites" },
  { id: "main", name: "Main dishes" },
  { id: "seafood", name: "Fish & Sea foods" },
  { id: "desserts", name: "Desserts" },
  { id: "beverages", name: "Beverages" },
];

 export const AllDishesPage: React.FC<AllDishesPageProps> = ({
  dishes = [],
  onAddDish,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Шүүх функц
  const filteredDishes =
    selectedCategory === "all"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <div className="p-5">
      {/* Дээд талын категори сонгох хэсэг */}
      <div className="mb-5">
        <div className="text-xl font-bold mb-3">Dishes category</div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category.id
                  ? "bg-[#EF4444] text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      
      <div>
        <div className="text-2xl font-bold mb-5">
          {selectedCategory === "all"
            ? "All Dishes"
            : categories.find((cat) => cat.id === selectedCategory)?.name}{" "}
          ({filteredDishes.length})
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
         
         
          <div
            onClick={() => onAddDish(selectedCategory)}
            className="flex flex-col items-center justify-center border-2 border-dashed border-[#EF4444] rounded-lg p-5 cursor-pointer hover:bg-gray-100"
          >
            <PlusIcon className="bg-[#EF4444] rounded-full" size={32} />
            <span className="mt-2 text-gray-600">Add new Dish</span>
          </div>
        
          
          {filteredDishes.map((dish, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md"
            >
              <img
                src={dish.image || ""}
                alt={dish.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="text-lg font-bold text-[#EF4444]">
                  {dish.title}
                </div>
                <div className="text-sm text-gray-600 my-2">
                  {dish.description}
                </div>
                <div className="text-base font-bold">{dish.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

