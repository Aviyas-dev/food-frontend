'use client';

import { useState } from "react";
import Cards from "../(webcomponents)/Cards";
import Categories from "../(webcomponents)/Categories";
import Footer from "../(webcomponents)/Footer";
import UserHeader from "../(webcomponents)/UserHeader";

export default function Page(){
    const [choosenCategoryId, setChoosenCategoryId] = useState('rtyuiopopo5678')
    return <div>
        <UserHeader/>
        <div>
        <Categories/>
        </div>
        <Cards />
        <Footer/>
    </div>
    
 }