"use client";
import { useParams } from "next/navigation";
import { FilteredFood } from "./FilteredFoods";
import { useAuthFetch } from "@/app/(Hooks)/FetchData";

export type CategoryType = {
    _id: string;
    categoryName: string;
    };

    export type FoodType = {
        _id?: string;
        name: string;
        ingredients: string;
        price: number;
        image: string | null;
        category: string;
    };

    export const Dishes = () => {
        const params = useParams();
        const foodCategory: CategoryType[] = useAuthFetch("food-category") || [];
        const foods: FoodType[] = useAuthFetch("food") || [];

        if (!foods || foods.length === 0) return null;

        return (
            <div className="flex flex-col gap-[54px]">
               {!params.id
               ? foodCategory.map((category) => {
                const categoryFoods = foods.filter((food) => food.category === category._id);

                if (categoryFoods.length === 0) return null;
                return(
                    <div key={category._id}>
                        <FilteredFood
                        _id={category._id}
                        categoryName={category.categoryName}
                        foods={categoryFoods}
                        />
                    </div>
                );
               })
            : foodCategory
            ?.filter((category) => category._id === params.id)
            .map((category) => (
                <div   key={category._id}>
                    <FilteredFood
        
                    _id={category._id}
                    categoryName={category.categoryName}
                    foods={foods}
                    />  
                </div>
            ))}
            </div>
        );
    };
    