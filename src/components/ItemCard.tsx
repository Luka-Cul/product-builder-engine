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
      className={`flex justify-between items-center border p-2 rounded cursor-pointer ${
        selected ? "border-black bg-gray-100" : ""
      }`}
    >
      <span>{name}</span>
      <span className="text-gray-500">
        €{price}
      </span>
    </div>
  );
}