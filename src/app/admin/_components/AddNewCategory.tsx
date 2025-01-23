import React, { useState } from "react";

interface AddNewCategoryProps {
  onAdd: (category: string) => void;
  onCancel: () => void;
}

const AddNewCategory: React.FC<AddNewCategoryProps> = ({ onAdd, onCancel }) => {
  const [category, setCategory] = useState<string>("");

  const handleAdd = () => {
    if (category.trim()) {
      onAdd(category.trim());
      setCategory("");
    } else {
      alert("Please enter a category name.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
        <input
          type="text"
          placeholder="Type category name..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="bg-[#EF4444] text-white px-4 py-2 rounded-md hover:bg-[#dc2626]"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewCategory;
