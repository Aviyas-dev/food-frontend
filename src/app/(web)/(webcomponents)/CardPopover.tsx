"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ShoppingCart, X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export const CartPopover = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // 🛒 Нийт үнийг тооцоолох
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <Popover>
      {/* 🛒 Cart Icon with Badge */}
      <PopoverTrigger className="relative bg-transparent text-red-500 p-3 rounded-full">
        <ShoppingCart size={22} />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        )}
      </PopoverTrigger>

      {/* 🛒 Cart Popup Content */}
      <PopoverContent className="w-96 bg-white shadow-lg rounded-lg p-4">
        <div>
          {/* 🛍 My Cart Title */}
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="text-2xl">🛍</span> My Cart
          </h3>

          {/* 🛒 Хоосон сагс */}
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-6">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((food) => (
                <div
                  key={food._id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  {/* 🖼 Бүтээгдэхүүний зураг, нэр, үнэ */}
                  <div className="flex items-center gap-3">
                    <img
                      src={food.image || "/placeholder.jpg"}
                      alt={food.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-red-500">
                        {food.name}
                      </h4>
                      <p className="text-gray-500 text-xs">
                        ${(food.price || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* ➖ 🔢 ➕ Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="p-1 border-gray-300"
                      onClick={() => updateQuantity(food._id, -1)}
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="text-sm font-semibold">{food.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="p-1 border-gray-300"
                      onClick={() => updateQuantity(food._id, 1)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>

                  {/* ❌ Remove Button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="p-1 text-red-500"
                    onClick={() => removeFromCart(food._id)}
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* 🍽 "Add food" button */}
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              className="w-full border-red-500 text-red-500 py-2 text-sm"
            >
              Add food
            </Button>
          </div>

          {/* 💰 Total & Checkout Button */}
          {cart.length > 0 && (
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Items</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Shipping</span>
                <span>$0.99</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>${(totalPrice + 0.99).toFixed(2)}</span>
              </div>

              <Button className="w-full bg-red-500 text-white py-3 mt-3 text-lg">
                Checkout
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
