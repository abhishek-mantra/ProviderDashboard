import { X, Check } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

interface FreeTrialPricingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  toolIcon: string; // Kept for compatibility but not used
  onBeginTrial?: () => void;
}

interface Feature {
  name: string;
  description: string;
}

export function FreeTrialPricingPopup({
  isOpen,
  onClose,
  toolName,
  onBeginTrial,
}: FreeTrialPricingPopupProps) {
  if (!isOpen) return null;

  const lowerTool = toolName.toLowerCase();
  const isTranscriber = lowerTool.includes("transcriber");
  const isSessionNotes = lowerTool.includes("session notes") || lowerTool === "session notes";
  const isPrescriptions = lowerTool.includes("prescription");

  const features: Feature[] = isTranscriber
    ? [
        { name: "1 full session recording", description: "Record and transcribe one complete client session" },
        { name: "AI-generated session notes", description: "Automatic structured notes from your transcript" },
        { name: "Full transcript export", description: "Download the complete transcript as PDF or text" },
        { name: "Session history access", description: "View and revisit this session anytime after" },
      ]
    : isSessionNotes
    ? [
        { name: "Unlimited session note templates", description: "Choose from SOAP, Progress, and custom note formats" },
        { name: "SOAP, Progress, and custom note formats", description: "Structured templates tailored to your workflow" },
        { name: "Notes linked to client sessions", description: "Automatically connect notes to the right session" },
        { name: "Edit and export notes anytime", description: "Download notes as PDF or text whenever you need" },
      ]
    : isPrescriptions
    ? [
        { name: "Create and manage prescriptions", description: "Write, edit, and track all client prescriptions" },
        { name: "AI-assisted form filling from transcript", description: "Auto-populate prescription fields from session transcript" },
        { name: "Email prescription to client", description: "Send prescriptions directly to your client's inbox" },
        { name: "Full prescription history", description: "Access and review all past prescriptions anytime" },
      ]
    : [
        { name: "1 full workflow run", description: "Run one complete automated client communication workflow" },
        { name: "AI follow-up drafts", description: "Auto-generated follow-up messages for your clients" },
        { name: "Admin task automation", description: "One round of automated scheduling and reminders" },
        { name: "Workflow history access", description: "Review this workflow's activity and results anytime" },
      ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white dark:bg-gray-800 border dark:border-gray-700 w-full max-w-[400px]"
        style={{ padding: '28px', borderRadius: '16px', borderWidth: '0.5px', borderColor: '#E5E7EB' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Left: Tool name only */}
          <span className="text-[13px] font-normal text-[#6B7280] dark:text-gray-400">
            {toolName}
          </span>

          {/* Right: Close button */}
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <X className="size-[18px]" />
          </button>
        </div>

        {/* Heading Block */}
        <div style={{ marginTop: '12px' }}>
          <h2 className="text-[22px] font-semibold text-[#111827] dark:text-white">
            Begin your free trial
          </h2>
          <p className="text-[13px] font-normal text-[#6B7280] dark:text-gray-400" style={{ marginTop: '4px' }}>
            14 days free — no card required
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E5E7EB] dark:border-gray-700" style={{ borderTopWidth: '0.5px', margin: '20px 0' }} />

        {/* What You Get Section */}
        <div className="mb-5">
          <h3 className="text-[10px] font-medium text-[#9CA3AF] dark:text-gray-500 uppercase" style={{ letterSpacing: '0.08em', marginBottom: '14px' }}>
            What you get
          </h3>

          <div>
            {features.map((feature, index) => (
              <div key={index} className="flex items-start" style={{ gap: '10px', marginBottom: index < features.length - 1 ? '12px' : '0' }}>
                {/* Checkmark circle */}
                <div className="flex-shrink-0 size-[18px] rounded-full bg-[#E1F5EE] flex items-center justify-center">
                  <Check className="size-3 text-[#0F6E56]" strokeWidth={2.5} />
                </div>

                {/* Feature text */}
                <div>
                  <p className="text-[13px] font-medium text-[#111827] dark:text-white">
                    {feature.name}
                  </p>
                  <p className="text-[12px] font-normal text-[#6B7280] dark:text-gray-400" style={{ marginTop: '2px' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E5E7EB] dark:border-gray-700" style={{ borderTopWidth: '0.5px', margin: '20px 0' }} />

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => { onBeginTrial ? onBeginTrial() : onClose(); }}
            className="w-full bg-[#1EAAE7] hover:bg-[#1899d6] text-white text-[14px] font-medium rounded-[10px] transition-colors"
            style={{ padding: '14px' }}
          >
            Begin free trial
          </button>
          <Link
            to="/settings/billing"
            onClick={onClose}
            className="block w-full"
          >
            <button
              className="w-full bg-white dark:bg-gray-700 border border-[#D1D5DB] dark:border-gray-600 text-[#111827] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 text-[14px] font-normal rounded-[10px] transition-colors"
              style={{ padding: '14px' }}
            >
              View plans
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
