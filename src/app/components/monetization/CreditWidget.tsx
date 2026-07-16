import { Link } from "react-router";

interface CreditWidgetProps {
  credits: number;
  maxCredits: number;
  state?: "healthy" | "low" | "empty";
}

export function CreditWidget({ credits, maxCredits, state = "healthy" }: CreditWidgetProps) {
  const percentage = (credits / maxCredits) * 100;

  const getBarColor = () => {
    if (state === "empty") return "#E24B4A";
    if (state === "low") return "#EF9F27";
    return "#1EAAE7";
  };

  return (
    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 mb-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-medium text-[#6B7280]">AI Credits</span>
        <Link
          to="/billing"
          state={{ tab: "credits" }}
          className="text-[11px] text-[#1EAAE7] hover:underline"
        >
          Add more
        </Link>
      </div>
      <div className="mb-1">
        <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%`, backgroundColor: getBarColor() }}
          />
        </div>
      </div>
      <div className="text-[10px] text-[#9CA3AF]">
        {credits} of {maxCredits} credits remaining
      </div>
    </div>
  );
}
