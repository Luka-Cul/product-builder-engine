"use client";

import { useState } from "react";
import { gymConfig } from "@/data/gymConfig";
import ItemCard from "@/components/ItemCard";

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectedProducts = gymConfig.sections
    .flatMap((section) => section.items)
    .filter((item) => selectedItems.includes(item.id));

  const totalPrice = selectedProducts.reduce(
    (sum, item) => sum + item.price,
    0
  );

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
                <ItemCard
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  selected={selectedItems.includes(item.id)}
                  onClick={() => toggleItem(item.id)}
                />
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
          €{totalPrice.toLocaleString()}
        </div>

        <p className="text-gray-500 mt-2">
          Estimated Total
        </p>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">
            Selected Equipment
          </h3>

          <div className="space-y-2">
            {selectedProducts.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm"
              >
                <span>{item.name}</span>
                <span>€{item.price}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}