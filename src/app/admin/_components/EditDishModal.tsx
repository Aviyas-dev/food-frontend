'use client';
import { useState } from "react";

// Dish интерфейс тодорхойлох
interface Dish {
  _id: string;
  title: string;
  description: string;
  price: string;
  image: string | null;
}

// Props интерфейс
interface Props {
  dish: Dish;
  onClose: () => void;
}

export default function EditDishModal({ dish, onClose }: Props) {
  const [editedDish, setEditedDish] = useState<Dish>(dish);

  const handleSave = () => {
    console.log("Updated Dish:", editedDish);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Dish Info</h2>
        <input
          type="text"
          value={editedDish.title}
          onChange={(e) => setEditedDish({ ...editedDish, title: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        <input
          type="text"
          value={editedDish.price}
          onChange={(e) => setEditedDish({ ...editedDish, price: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        <button
          className="bg-[#EF4444] text-white px-4 py-2 rounded-md"
          onClick={handleSave}
        >
          Save changes
        </button>
        <button className="ml-2 text-gray-600" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
