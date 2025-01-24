'use client';
import { useEffect, useState } from "react";
import Categories from './_components/Categories';
import Navigation from "./_components/Navigation";
import ProductListContainer from "./_components/ProductListContainer";
import Header from "./_components/Header";



export default function Home() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  return( <div>
    <div className="w-[1171px] flex justify-end" >
    <Header/>
    </div>
   
  <div className="flex gap-20 justify-center" >
   
    <Navigation/>
    <div >
    <Categories/>
    
    <ProductListContainer selectedCategoryId={selectedCategoryId} />
     </div>
  </div>
  </div>
  )
}
