'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

// Order төрлийг тодорхойлох
type Order = {
  id: number;
  customer: string;
  food: string;
  date: string;
  total: string;
  deliveryAddress: string;
  deliveryState: string;
};

export default function AdminOrder() {
  const [orders, setOrders] = useState<Order[]>([]);

  // Захиалгуудыг татаж авах
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/food-order/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Захиалгын байдал шинэчлэх
  const updateDeliveryState = async (id: number, state: string) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/food-order/orders/${id}`,
        { deliveryState: state }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, deliveryState: response.data.deliveryState } : order
        )
      );
    } catch (error) {
      console.error("Error updating delivery state:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Customer</th>
            <th className="border border-gray-300 p-2">Food</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Total</th>
            <th className="border border-gray-300 p-2">Delivery Address</th>
            <th className="border border-gray-300 p-2">Delivery State</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-300 p-2">{order.id}</td>
              <td className="border border-gray-300 p-2">{order.customer}</td>
              <td className="border border-gray-300 p-2">{order.food}</td>
              <td className="border border-gray-300 p-2">{order.date}</td>
              <td className="border border-gray-300 p-2">{order.total}</td>
              <td className="border border-gray-300 p-2">{order.deliveryAddress}</td>
              <td className="border border-gray-300 p-2">
                <Button
                  onClick={() =>
                    updateDeliveryState(
                      order.id,
                      order.deliveryState === "Pending"
                        ? "Delivered"
                        : order.deliveryState === "Delivered"
                        ? "Cancelled"
                        : "Pending"
                    )
                  }
                  className={`${
                    order.deliveryState === "Delivered"
                      ? "bg-green-500 text-white"
                      : order.deliveryState === "Cancelled"
                      ? "bg-red-500 text-white"
                      : "bg-yellow-500 text-white"
                  } px-4 py-2 rounded`}
                >
                  {order.deliveryState}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
