'use client';
import { useEffect, useState } from "react";


import ProductListContainer from "../_components/ProductListContainer";
import Navigation from "../_components/Navigation";
import Categories from "../_components/Categories";




export default function Home() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  return( <div className="flex gap-20 justify-center" >
   
    <Navigation/>
    <div >
    <Categories/>
    
    <ProductListContainer selectedCategoryId={selectedCategoryId} />
     </div>
  </div>
  )
}
