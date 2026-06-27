type ItemCardProps = {
  name: string;
  price: number;
  selected: boolean;
  onClick: () => void;
};

export default function ItemCard({
  name,
  price,
  selected,
  onClick,
}: ItemCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group flex justify-between items-center border border-[#E5E5E5] rounded-[10px] p-3 cursor-pointer transition hover:scale-[1.01] active:scale-[0.99] ${
        selected ? "bg-[#F3F3F3]" : "bg-white"
      }`}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-2">
        {/* DOT */}
        <div
        className={`w-3 h-3 rounded-full border flex items-center justify-center transition ${
            selected
            ? "border-[#111] bg-[#111]"
            : "border-gray-300 group-hover:border-[#111]"
        }`}
        >
        <div
            className={`w-1.5 h-1.5 rounded-full transition ${
            selected
                ? "bg-[#C8F135]"
                : "group-hover:bg-[#C8F135] bg-transparent"
            }`}
        />
        </div>

        <span className="font-medium">{name}</span>
      </div>

      {/* PRICE */}
      <span className="text-sm opacity-70">€{price}</span>
    </div>
  );
}