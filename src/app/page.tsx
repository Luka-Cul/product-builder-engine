"use client";

import { useState } from "react";
import { gymConfig } from "@/data/gymConfig";

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const totalPrice = gymConfig.sections
  .flatMap((section) => section.items)
  .filter((item) => selectedItems.includes(item.id))
  .reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="h-screen grid grid-cols-2">
      
      {/* LEFT: Builder */}
      <div className="p-6 border-r">
        <h1 className="text-2xl font-bold mb-6">
          Home Gym Builder
        </h1>

        {gymConfig.sections.map((section) => (
          <div key={section.id} className="mb-6">
            <h2 className="font-semibold mb-2">
              {section.title}
            </h2>

            <div className="space-y-2">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`flex justify-between items-center border p-2 rounded cursor-pointer ${
                    selectedItems.includes(item.id)
                      ? "border-black bg-gray-100"
                      : ""
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-gray-500">
                    €{item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT: Dashboard */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Your Setup
        </h2>

        <div className="text-3xl font-bold">
          €{totalPrice}
        </div>

        <p className="text-gray-500 mt-2">
          Estimated Total
        </p>
      </div>

    </div>
  );
}