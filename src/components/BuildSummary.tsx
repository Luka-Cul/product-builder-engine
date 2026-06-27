type Product = {
  id: string;
  name: string;
  price: number;
};

type Props = {
  items: Product[];
  progress: number;
  score: number;
  selectedCount: number;
};

export default function BuildSummary({
  items, 
  progress, 
  score,
  selectedCount
}: Props) {

    return (
        <div>
            {/* SMALL HEADER STATS */}
            <div className="text-xs uppercase tracking-[1.2px] text-white/60 space-y-1 mb-4">
                <p>Items Selected: {selectedCount} | 
                    Progress: {Math.round(progress)}% | 
                    Score: {score}/100</p>
            </div>

            <h3 className="text-xs uppercase tracking-[1.2px] text-white/60 mb-4">
            Selected Equipment
            </h3>

            {items.length === 0 ? (
            <p className="text-white/40">
                Nothing selected yet.
            </p>
            ) : (
            <div className="space-y-3">
                {items.map((item) => (
                <div
                    key={item.id}
                    className="flex justify-between border-b border-white/10 pb-2 text-sm"
                >
                    <span>{item.name}</span>
                    <span>€{item.price}</span>
                </div>
                ))}
            </div>
            )}

        </div>
    );
}