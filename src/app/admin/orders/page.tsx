"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Order = {
  _id: string;
  customer: string;
  food: string;
  date: string;
  total: string;
  deliveryAddress: string;
  deliveryState: string;
};

export default function AdminOrder() {
  const [orders, setOrders] = useState<Order[]>([]);

  // ✅ Захиалгуудыг татаж авах
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/food-order");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // ✅ Захиалгын төлөв шинэчлэх
  const updateDeliveryState = async (id: string, state: string) => {
    try {
      const response = await axios.put(`http://localhost:8000/food-order/${id}`, {
        deliveryState: state,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, deliveryState: response.data.deliveryState } : order
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
    <div className="p-6 ml-52">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="w-full border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">#</th>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Food</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border">Delivery Address</th>
            <th className="p-3 border">Delivery State</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="p-3 border">{index + 1}</td>
              <td className="p-3 border">{order.customer}</td>
              <td className="p-3 border">{order.food}</td>
              <td className="p-3 border">{order.date}</td>
              <td className="p-3 border">{order.total}</td>
              <td className="p-3 border">{order.deliveryAddress}</td>
              <td className="p-3 border text-center">
                <Button
                  onClick={() =>
                    updateDeliveryState(
                      order._id,
                      order.deliveryState === "Pending"
                        ? "Delivered"
                        : order.deliveryState === "Delivered"
                        ? "Cancelled"
                        : "Pending"
                    )
                  }
                  className={`px-4 py-2 rounded ${
                    order.deliveryState === "Delivered"
                      ? "bg-green-500 text-white"
                      : order.deliveryState === "Cancelled"
                      ? "bg-red-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
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

  
