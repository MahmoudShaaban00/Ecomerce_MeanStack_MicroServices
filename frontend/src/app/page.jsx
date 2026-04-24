"use client";

import { useState } from "react";
import Pay from "@/components/Pay";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

const Page = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Nike Air Max",
      price: 129.9,
      image: "/product1.jpg",
      description: "Comfortable running shoes",
      quantity: 1,
    },
    {
      id: 2,
      name: "Adidas Cap",
      price: 29.9,
      image: "/product2.jpg",
      description: "Stylish cap",
      quantity: 1,
    },
  ]);

  // ✅ add quantity
  const addToCart = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ✅ remove or decrease
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="mb-16">
      <h1 className="text-3xl font-bold mb-8">🛒 Cart Products</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* PRODUCTS */}
        <div className="flex flex-col gap-10 w-full lg:w-2/3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={140}
                height={100}
                className="rounded-lg object-cover"
              />

              <div className="flex flex-col justify-between w-full">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <h2 className="font-bold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </h2>

                  {/* ✅ controls */}
                  <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-red-200 rounded-full transition"
                    >
                      <Minus className="w-4 h-4 text-red-500" />
                    </button>

                    <span className="text-sm font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => addToCart(item.id)}
                      className="p-1 hover:bg-green-200 rounded-full transition"
                    >
                      <Plus className="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAY */}
        <div className="w-full lg:w-1/3 sticky top-10">
          <Pay cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Page;