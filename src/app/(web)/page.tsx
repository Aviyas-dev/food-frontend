"use client";
import { useEffect, useState } from "react";
import { Header } from "./(webcomponents)/Header";
import { Categories } from "./(webcomponents)/Categories";
import { Dishes } from "./(webcomponents)/Dishes";
import { Footer } from "./(webcomponents)/Footer";
 
export default function Home() {
  return (
    <div className="">
      <Header />
      <div
        className="bg-cover bg-no-repeat bg-center w-full h-[870px]"
        style={{ backgroundImage: `url(/header.png)` }}
      ></div>
      <div className="px-[240px]">
        <Categories />
        <Dishes/>
      </div>
      <div>
      <Footer/>
      </div>
    </div>
  );
}