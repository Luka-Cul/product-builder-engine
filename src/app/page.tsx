"use client";

import { useState } from "react";
import { gymConfig } from "@/data/gymConfig";
import ItemCard from "@/components/ItemCard";
import { calculateTotalPrice } from "@/lib/priceCalculator";

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  //total price
  const totalPrice = calculateTotalPrice(gymConfig, selectedItems);

  //product list
  const selectedProducts = gymConfig.sections
    .flatMap((section) => section.items)
    .filter((item) => selectedItems.includes(item.id));

  const totalItems = gymConfig.sections
  .flatMap((section) => section.items).length;

  //progress barr
  const progress = (selectedItems.length / totalItems) * 100;

  //score
  const selectedByCategory = gymConfig.sections.map((section) => {
    const count = section.items.filter((item) =>
      selectedItems.includes(item.id)
    ).length;

    return count;
  });

  const categoryBalanceScore = 
  selectedByCategory.filter((count) => count > 0).length *
  (100 / gymConfig.sections.length);

  const score = Math.round((progress + categoryBalanceScore) / 2);

  //coach recomendations
  //suggests a mid-tier option if available, otherwise fallbacks to first item
  const recommendations: string[] = [];

  gymConfig.sections.forEach((section) => {
    const hasAny = section.items.some((item) =>
      selectedItems.includes(item.id)
    );

    if (!hasAny) {
      const item =
        section.items.length > 1
          ? section.items[1]
          : section.items[0];

      if (item) {
        recommendations.push(
          `Add ${item.name} to start your ${section.title.toLowerCase()} setup`
        );
      }
    }
  });

  //UI Display
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

        {/* PROGRESS BAR */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Build Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="bg-black h-2 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* SCORE */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Build Score</span>
            <span>{score}/100</span>
          </div>

          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="bg-black h-2 rounded"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* COACH INSIGHTS */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">
            Recommendations
          </h3>

          <div className="space-y-2 text-sm text-gray-600">
            {recommendations.length === 0 ? (
              <p>Your setup looks complete 👍</p>
            ) : (
              recommendations.map((text, i) => (
                <p key={i}>• {text}</p>
              ))
            )}
          </div>
        </div>

        {/* TOTAL PRICE */}
        <div className="text-3xl font-bold">
          €{totalPrice.toLocaleString()}
        </div>

        <p className="text-gray-500 mt-2">
          Estimated Total
        </p>

        {/* ITEMS LIST */}
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