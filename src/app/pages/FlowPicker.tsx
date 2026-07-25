import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Zap, FileText, Receipt } from "lucide-react";

const FLOWS = [
  {
    id: "mantra",
    title: "Submit via Mantra",
    description: "Electronic claim submission through our intermediary network. We handle the transmission and tracking.",
    icon: Zap,
    color: "from-[#00c0ff] to-[#0090c0]",
    features: ["Real-time status tracking", "Eligibility checks", "Auto-scrubbing", "Denial management"],
  },
  {
    id: "manual",
    title: "Manual Self-Filing",
    description: "Generate a claim document for you to submit directly to the insurer through their portal or mail.",
    icon: FileText,
    color: "from-[#4169E1] to-[#3557c7]",
    features: ["CMS-1500 form (US)", "Itemized summary (UK/CA/AE)", "Downloadable PDF", "You handle transmission"],
  },
  {
    id: "superbill",
    title: "Superbill",
    description: "Generate a receipt-like document for your client to submit directly to their insurer for reimbursement.",
    icon: Receipt,
    color: "from-[#10b981] to-[#059669]",
    features: ["Client-submitted", "No payer selection needed", "Quick generation", "Terminal state - no tracking"],
  },
];

export function FlowPicker() {
  const navigate = useNavigate();
  const { clientId } = useParams();

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-2 md:gap-4 pb-3 md:pb-4">
        <button
          onClick={() => navigate("/claims")}
          className="size-8 md:size-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
        >
          <ArrowLeft className="size-4 md:size-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
            New Claim
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            Choose how you want to submit this claim
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {FLOWS.map((flow) => {
          const Icon = flow.icon;
          return (
            <button
              key={flow.id}
              onClick={() => {
                if (flow.id === "mantra") {
                  navigate(`/claims/new/${clientId}/mantra/eligibility`);
                } else if (flow.id === "manual") {
                  navigate(`/claims/new/${clientId}/manual/sessions`);
                } else {
                  navigate(`/claims/new/${clientId}/superbill/sessions`);
                }
              }}
              className="text-left bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-[#00c0ff]/50 transition-all p-4 md:p-6 group"
            >
              <div className={`inline-flex items-center justify-center size-12 md:size-14 bg-gradient-to-br ${flow.color} rounded-xl md:rounded-2xl shadow-lg mb-3 md:mb-4`}>
                <Icon className="size-6 md:size-7 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1.5 md:mb-2 group-hover:text-[#00c0ff] transition-colors">
                {flow.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3 md:mb-4 leading-relaxed">
                {flow.description}
              </p>
              <ul className="space-y-1.5">
                {flow.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    <span className="size-1.5 rounded-full bg-[#00c0ff] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}
