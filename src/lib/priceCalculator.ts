import { GymConfig } from "@/types/gym";

export function calculateTotalPrice(
  config: GymConfig,
  selectedItems: string[]
) {
  return config.sections
    .flatMap((section) => section.items)
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);
}