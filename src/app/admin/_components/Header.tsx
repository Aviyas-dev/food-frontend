'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


type CategoryType = {
  categoryName: string;
  _id: string;
}
export default function Category() {
  const [categories, setCategories] = useState <CategoryType[]>([]);

  const addCategory = async () => {
    const categoryName = prompt('Enter new category name');
    const response = await fetch('http://localhost:8000/food-category/', {
        method: 'Post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName }),
    });
    const data = await response.json();
    setCategories([...categories, data.newItem]);
  };

  useEffect(()=> {
    const fetchData = async ()=> {
      const response = await fetch('http://localhost:8000/food-category');
      const data = await response.json();
      setCategories(data);
    };
    fetchData();
  },[]);
  return( 
  <div className="w-[1171px ]" >
    <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
<div>
    {categories.map((category)=> (
      <div key={category._id}>{category.categoryName}</div>
    ))}
    

     <Button variant="outline" onClick={addCategory}>Outline</Button>


    {/* <button className="bg-green-400 p-4" onClick={addCategory}>ADD NEW{' '}</button> */}
  </div>
  </div>
  )
}
