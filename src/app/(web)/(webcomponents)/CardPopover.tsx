"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ShoppingCart, X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext"; // 🛒 Cart context ашиглах

export const CartPopover = () => {
  const { cart, updateQuantity, removeFromCart } = useCart(); // ✅ Зөв state ашиглах

  // 🛒 `cart` доторх нийт үнийг тооцоолох
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  console.log({cart})

  return (
    <Popover>
      <PopoverTrigger className="relative bg-secondary text-secondary-foreground rounded-full p-3">
        <ShoppingCart size={18} />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-96 bg-white shadow-lg rounded-lg p-4">
        <div>
          <h3 className="text-lg font-semibold mb-3">My cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((food, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={food.image || "/placeholder.jpg"}
                      alt={food.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-red-500">
                        {food.name}
                      </h4>
                      <p className="text-gray-500">
                        ${(food.price || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(food._id, -1)}
                    >
                      <Minus size={14} />
                    </Button>
                    <span>{food.quantity || 1}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(food._id, 1)}
                    >
                      <Plus size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFromCart(food._id)}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="border-t pt-3 mt-3">
            <p className="text-gray-600">
              Total:{" "}
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </p>
            <Button className="w-full bg-red-500 text-white mt-3">
              Checkout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
