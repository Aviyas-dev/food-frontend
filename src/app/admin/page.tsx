'use client';
import { useEffect, useState } from "react";
import Categories from './_components/Categories';
import ProductListContainer from "./_components/ProductListContainer";


export default function Home() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  return( <div>
   <Categories />
   <ProductListContainer selectedCategoryId={selectedCategoryId} />

  </div>
  )
}
