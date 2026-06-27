"use client";

import { gymConfig } from "@/data/gymConfig";
import ItemCard from "@/components/ItemCard";
import { calculateTotalPrice } from "@/lib/priceCalculator";
import { useEffect, useState } from "react";
import { animateValue } from "@/lib/animations";

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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-[16px] shadow-lg overflow-hidden grid grid-cols-[1fr_360px]">
      
        {/* LEFT: Builder */}
        <div className="p-10">
          <h1 className="text-[34px] font-black tracking-[-1.2px] mb-10">
            Home Gym Builder
          </h1>

          {gymConfig.sections.map((section, index) => (
            <div key={section.id} className="mb-6">

              {/* ITEM CARD DESIGN */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-[11px] text-gray-400 font-semibold tracking-[1px]">
                  0{index + 1}
                </span>

                <h2 className="font-bold tracking-[-0.5px] text-[16px]">
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

        {/* RIGHT: Dashboard */}
        <div className="bg-[#111] text-white p-8">
          <h2 className="text-xl font-semibold mb-4">
            Your Setup
          </h2>
          
          <div className="space-y-6 mb-5">
            {/* PROGRESS BAR */}
            <div className="">
              <div className="flex justify-between text-[14px] text-white/60 uppercase tracking-[1.2px] mb-2">
                <span>Build Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C8F135] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* SCORE */}
            <div className="">
              <div className="flex justify-between text-[14px] text-white/60 uppercase tracking-[1.2px] mb-2">
                <span>Build Score</span>
                <span>{score}/100</span>
              </div>

              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C8F135] transition-all duration-300"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>

            {/* COACH INSIGHTS */}
            <div className="">
              <h3 className="font-semibold mb-2">
                Recommendations
              </h3>

              <div className="space-y-2 text-sm text-white/60">
                {recommendations.length === 0 ? (
                  <p>Your setup looks complete 👍</p>
                ) : (
                  recommendations.map((text, i) => (
                    <p key={i}>• {text}</p>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* TOTAL PRICE */}
          <div className="mb-8">
            <p className="mb-3 text-[12px] text-white/80 uppercase tracking-[1.2px] text-xs mb-2">
              Estimated Total
            </p>

            <div className="bg-[#C8F135] text-[#111] rounded-[12px] p-5 shadow-lg">
              <div className="text-[42px] font-black tracking-[-2px] leading-none">
                €{animatedPrice.toLocaleString()}
              </div>
            </div>
          </div>

          {/* ITEMS LIST */}
          <div className="space-y-2">
            <h3 className="text-[12px] text-white/80 uppercase tracking-[1.2px] text-xs mb-2">
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
    </div>
  );
}