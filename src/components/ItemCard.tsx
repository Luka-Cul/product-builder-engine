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
        className={`flex justify-between items-center border rounded-[10px] p-3 cursor-pointer transition ${
            selected
                ? "bg-[#F3F3F3] border-[#111]"
                : "border-[#E5E5E5] bg-white"
        }`}
    >
        <div className="flex items-center gap-2">
            <div
            className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                selected
                    ? "border-[#111] bg-[#C8F135]"
                    : "border-gray-300"
            }`}
            />
            <span className="font-medium">{name}</span>
        </div>

        <span className="text-sm opacity-70">
            €{price}
        </span>
    </div>
  );
}