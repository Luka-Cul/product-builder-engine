"use client";

type Props = {
  progress: number;
  score: number;
  recommendations: string[];
  animatedPrice: number;
  selectedCount: number;
};

export default function BuildDashboardPanel({
  progress,
  score,
  recommendations,
  animatedPrice,
  selectedCount,
}: Props) {
  return (
    <div className="space-y-8">

      {/* PROGRESS */}
      <div>
        <div className="flex justify-between text-sm uppercase tracking-[1.2px] text-white/60 mb-2">
          <span>Build Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>

        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C8F135] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* SCORE */}
      <div>
        <div className="flex justify-between text-sm uppercase tracking-[1.2px] text-white/60 mb-2">
          <span>Build Score</span>
          <span>{score}/100</span>
        </div>

        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C8F135] transition-all"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <div>
        <h3 className="font-semibold mb-3">
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

      {/* PRICE + CTA */}
      <div className="bg-[#C8F135] rounded-[16px] p-6 text-[#111]">

        <p className="uppercase tracking-[1.2px] text-xs mb-3">
          Estimated Total
        </p>

        <div className="text-[42px] font-black tracking-[-2px] mb-5">
          €{animatedPrice.toLocaleString()}
        </div>

        <button className="w-full bg-[#111] text-white rounded-[12px] py-3 font-semibold hover:opacity-90 transition">
          Go to Purchase
        </button>

      </div>

    </div>
  );
}