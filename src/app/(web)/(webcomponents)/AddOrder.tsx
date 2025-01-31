"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { FoodType } from "./Dishes";
import { useCart } from "@/context/CartContext"; // 🛒 CartContext холбох

export const AddOrder = ({ food }: { food: FoodType }) => {
  const [order, setOrder] = useState(1);
  const { addToCart } = useCart(); // 🛒 `addToCart`-г ашиглах

  return (
    <Dialog>
      <DialogTitle className="text-center">
        <DialogTrigger asChild>
          <Button variant={"outline"} className="rounded-full px-3 py-5">
            <Plus color={"red"} />
          </Button>
        </DialogTrigger>
      </DialogTitle>

      <DialogContent className="max-w-3xl flex rounded-[20px] gap-6 p-6">
        <div className="w-[377px] h-[364px] rounded-xl bg-cover bg-center bg-no-repeat"
             style={{ backgroundImage: `url(${food.image})` }}></div>
        <div className="flex flex-col justify-between mt-[36px] w-[377px]">
          <div className="grid gap-3">
            <h2 className="text-red-500 text-3xl font-semibold">{food.name}</h2>
            <h4 className="text-base font-normal text-foreground">{food.ingredients}</h4>
          </div>
          <div className="grid gap-6">
            <div className="flex w-full justify-between items-center">
              <div>
                <h4 className="text-base font-normal">Total price</h4>
                <h4 className="text-2xl font-semibold">${(food.price * order).toFixed(2)}</h4>
              </div>
              <div className="flex gap-3 items-center">
                <Button
                  variant={"outline"}
                  className="rounded-full px-3 py-5"
                  onClick={() => setOrder((prev) => Math.max(1, prev - 1))}
                >
                  <Minus />
                </Button>
                <span className="text-lg font-semibold">{order}</span>
                <Button
                  variant={"outline"}
                  className="rounded-full px-3 py-5"
                  onClick={() => setOrder((prev) => prev + 1)}
                >
                  <Plus />
                </Button>
              </div>
            </div>

            <DialogClose asChild>
              <Button
                className="rounded-full bg-red-500 text-white"
                onClick={() => {
                  addToCart({
                    _id: food.id,
                    name: food.name,
                    price: food.price,
                    quantity: order,
                    image: food.image 
                    
                  });
                  setOrder(1);
                }}
              >
                Add to cart
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

