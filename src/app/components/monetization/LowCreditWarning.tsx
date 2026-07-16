import { AlertTriangle } from "lucide-react";
import { Link } from "react-router";

interface LowCreditWarningProps {
  creditsRemaining: number;
  sessionsRemaining: number;
}

export function LowCreditWarning({ creditsRemaining, sessionsRemaining }: LowCreditWarningProps) {
  return (
    <div className="bg-[#FAEEDA] border border-[#FAC775] rounded-lg p-3 mb-4">
      <div className="flex items-start gap-2">
        <AlertTriangle className="size-3.5 text-[#633806] flex-shrink-0 mt-0.5" />
        <div className="text-[11px] text-[#633806] leading-relaxed">
          You have {creditsRemaining} credits left — enough for {sessionsRemaining} more session{sessionsRemaining !== 1 ? 's' : ''}.{" "}
          <Link
            to="/billing"
            state={{ tab: "credits" }}
            className="text-[#1EAAE7] underline hover:text-[#1899d6]"
          >
            Top up
          </Link>
        </div>
      </div>
    </div>
  );
}
