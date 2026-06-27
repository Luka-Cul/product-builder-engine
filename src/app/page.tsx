"use client";

import { gymConfig } from "@/data/gymConfig";
import ItemCard from "@/components/ItemCard";
import { calculateTotalPrice } from "@/lib/priceCalculator";
import { useEffect, useState } from "react";
import { animateValue } from "@/lib/animations";
import BuildSummary from "@/components/BuildSummary";
import BuildDashboardPanel from "@/components/BuildDashboardPanel";

export default function Home() {
  // =====================
  // STATE
  // =====================
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [animatedPrice, setAnimatedPrice] = useState(0);

  // =====================
  // ACTIONS
  // =====================
  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // =====================
  // DERIVED DATA (ENGINE)
  // =====================

  //total price
  const totalPrice = calculateTotalPrice(gymConfig, selectedItems);
  
  //total price animation
  useEffect(() => {
    animateValue(animatedPrice, totalPrice, 400, setAnimatedPrice);
  }, [totalPrice]);

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

  // SCORE ENGINE
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

// =====================
// UI
// =====================

  return (
    <div className="min-h-screen bg-[#F8F8F8] p-10 space-y-10">

      {/* ===================== */}
      {/* TOP DASHBOARD */}
      {/* ===================== */}

      <div className="bg-[#111] text-white rounded-[20px] p-8">

        <h2 className="text-2xl font-bold mb-8">
          Your Setup
        </h2>

        <div className="grid grid-cols-2 gap-10">

          {/* LEFT COLUMN */}
          <div>
            <BuildSummary
              items={selectedProducts}
              selectedCount={selectedItems.length}
              progress={progress}
              score={score}
            />
          </div>

          {/* RIGHT COLUMN */}
          <BuildDashboardPanel
            progress={progress}
            score={score}
            recommendations={recommendations}
            animatedPrice={animatedPrice}
            selectedCount={selectedItems.length}
          />

        </div>

      </div>

      {/* ===================== */}
      {/* BUILDER */}
      {/* ===================== */}

      <div>

        <h1 className="text-[34px] font-black tracking-[-1.2px] mb-10">
          Build Your Home Gym
        </h1>

        {gymConfig.sections.map((section, index) => (

          <div
            key={section.id}
            className="mb-10"
          >

            <div className="flex items-baseline gap-2 mb-4">

              <span className="text-[11px] font-semibold tracking-[1px] text-gray-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h2 className="text-[18px] font-bold tracking-[-0.5px]">
                {section.title}
              </h2>

            </div>

            <div className="space-y-3">

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

    </div>
  );
}