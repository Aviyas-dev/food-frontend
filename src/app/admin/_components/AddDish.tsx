// 'use client';
// import { useState } from "react";


// type Dish = {
//     _id?: string;
//     title: string;
//     description: string;
//     price: string;
//     image: string | null;
//     category: string;
//   };
// export const AddDish = () => {
//     const [isAdding, setIsAdding] = useState<boolean>(false);
    
// {isAdding && (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Add new Dish</h2>
//         <input
//           type="text"
//           placeholder="Food name"
//           value={newDish.title}
//           onChange={(e) =>
//             setNewDish((prevDish) => ({ ...prevDish, title: e.target.value }))
//           }
//           className="w-full border border-gray-300 rounded-md p-2 mb-4"
//         />
//         <textarea
//           placeholder="Ingredients / Description"
//           value={newDish.description}
//           onChange={(e) =>
//             setNewDish((prevDish) => ({
//               ...prevDish,
//               description: e.target.value,
//             }))
//           }
//           className="w-full border border-gray-300 rounded-md p-2 mb-4"
//         />
//         <input
//           type="text"
//           placeholder="Food price"
//           value={newDish.price}
//           onChange={(e) =>
//             setNewDish((prevDish) => ({ ...prevDish, price: e.target.value }))
//           }
//           className="w-full border border-gray-300 rounded-md p-2 mb-4"
//         />
//         <select
//           value={newDish.category}
//           onChange={(e) =>
//             setNewDish((prevDish) => ({
//               ...prevDish,
//               category: e.target.value,
//             }))
//           }
//           className="w-full border border-gray-300 rounded-md p-2 mb-4"
//         >
//           <option value="" disabled>
//             Select a category
//           </option>
//           {categories.map((category) => (
//             <option key={category._id} value={category.categoryName}>
//               {category.categoryName}
//             </option>
//           ))}
//         </select>
//         <label>
//           <input
//             onChange={handleFileChange}
//             className="block"
//             type="file"
//             disabled={uploading}
//           />
//           {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
//         </label>
//         <div className="flex justify-end space-x-4 mt-5">
//           <button
//             onClick={() => setIsAdding(false)}
//             className="bg-gray-300 text-black px-4 py-2 rounded-md"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={addDish}
//             className="bg-[#EF4444] text-white px-4 py-2 rounded-md"
//             disabled={uploading}
//           >
//             Add Dish
//           </button>
//         </div>
//       </div>
//     </div>
//   )}
// }