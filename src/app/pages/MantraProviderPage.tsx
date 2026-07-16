import {
  Globe, Building2, BadgeCheck, TrendingUp, ShieldCheck,
  Crown, PlayCircle, ChevronDown, ChevronUp, ArrowRight
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const forAllProviders = [
  {
    icon: BadgeCheck,
    color: "bg-[#FFFBEB]",
    iconColor: "text-[#D97706]",
    label: "Online Listing & Higher Visibility",
    desc: "Get a professionally optimized, SEO-friendly provider profile that helps clients discover you through search engines and the Mantra directory.",
  },
  {
    icon: TrendingUp,
    color: "bg-[#FDF2F8]",
    iconColor: "text-[#DB2777]",
    label: "Marketing & Practice Growth Tools",
    desc: "Access profile optimization, marketing tools, practice management software, and resources designed to help you attract and retain more clients.",
  },
  {
    icon: Crown,
    color: "bg-[#FFF7ED]",
    iconColor: "text-[#EA580C]",
    label: "Work on Your Terms",
    desc: "Set your own schedule, define your rates, choose the clients you work with, and grow your practice at your own pace.",
  },
];

const forPremiumProviders = [
  {
    icon: Globe,
    color: "bg-[#EFF6FF]",
    iconColor: "text-[#2563EB]",
    label: "Session Requests & Client Referrals",
    desc: "Receive opportunities from Mantra's network of individuals, employers, insurance partners, and EAP programs.",
  },
  {
    icon: Building2,
    color: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
    label: "Access to 2,000+ Organizations",
    desc: "Become eligible to work with employers, healthcare partners, universities, and wellness programs worldwide.",
  },
  {
    icon: ShieldCheck,
    color: "bg-[#F0FDF4]",
    iconColor: "text-[#16A34A]",
    label: "Free Insurance Credentialing & Enrollment Support",
    desc: "Get help with insurance credentialing, enrollment, payer setup, and network participation to expand your access to insured clients.",
  },
];

const faqs = [
  {
    q: "Who can become a Mantra Provider?",
    a: "Any licensed mental health or wellness professional can apply. We verify credentials during onboarding to ensure quality for our network of clients.",
  },
  {
    q: "Do all listed providers receive client referrals?",
    a: "Not immediately. All providers begin with a Basic Listing, which is completely free and allows you to create your professional profile and be discoverable on the platform.\n\nAs you build your profile, complete training programs, receive positive reviews, and demonstrate engagement, you earn a Provider Trust Score. Providers with strong trust scores may be invited to become Premium Providers.\n\nPremium Providers receive priority visibility and may become eligible for client referrals, insurance opportunities, EAP programs, and other growth initiatives.",
  },
  {
    q: "Is there a cost to get listed?",
    a: "Getting listed on the Mantra Care network is included with your existing Mantra EHR plan at no additional cost.",
  },
  {
    q: "How do session requests work?",
    a: "Once listed, you'll receive session requests from individuals and corporate clients in your area and specialty. You can accept or decline requests based on your availability.",
  },
  {
    q: "How long does the approval process take?",
    a: "Most providers are approved within 3–5 business days after submitting their credentials and completing the onboarding form.",
  },
  {
    q: "Can I set my own rates?",
    a: "Yes. You set your own session rates. Mantra Care takes no commission — you keep 100% of what you earn from sessions booked through the platform.",
  },
  {
    q: "What happens to my existing EHR data?",
    a: "Nothing changes. Your client records, session notes, and all EHR data remain fully intact. Becoming a Mantra Provider simply adds network visibility on top of your existing plan.",
  },
];

export function MantraProviderPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (i: number) =>
    setExpandedFaq(prev => (prev === i ? null : i));

  return (
    <div className="max-w-[900px] mx-auto px-4 md:px-6 py-6 space-y-6">

      {/* ── Section 1 — Hero banner ───────────────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #043570 0%, #0a5ca8 100%)" }}
      >
        <div className="px-8 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/30 shadow-lg">
              <Crown className="size-7 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white mb-1">
                Become a Mantra Provider
              </h1>
              <p className="text-sm text-blue-100 leading-relaxed max-w-[520px]">
                Get listed on MantraCare and grow your practice with access to 1M+ individuals and 20K+ corporate clients.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/onboarding")}
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-blue-50 text-[#043570] rounded-xl font-bold text-sm transition-colors shadow-md whitespace-nowrap flex-shrink-0"
          >
            Get Listed Now
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* ── Section 2 — Video ───────────────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-2xl p-6">
        <h2 className="text-base font-bold text-[#111827] dark:text-white mb-4">
          See how it works
        </h2>
        <div
          className="w-full rounded-xl overflow-hidden bg-[#F9FAFB] dark:bg-gray-750 border border-[#E5E7EB] dark:border-gray-600 flex flex-col items-center justify-center gap-3"
          style={{ aspectRatio: "16/9" }}
        >
          <div className="size-14 bg-[#043570] rounded-full flex items-center justify-center shadow-md">
            <PlayCircle className="size-8 text-white" />
          </div>
          <p className="text-sm font-semibold text-[#111827] dark:text-white">
            Provider onboarding walkthrough
          </p>
          <p className="text-xs text-[#6B7280] dark:text-gray-400">
            Placeholder for embedded video player
          </p>
        </div>
      </div>

      {/* ── Section 3 — Benefits comparison ─────────────────────────────── */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-2xl overflow-hidden">

        {/* Column headers */}
        <div className="grid grid-cols-2">
          <div className="px-6 py-4 border-b border-r border-[#E5E7EB] dark:border-gray-700 bg-[#F9FAFB] dark:bg-gray-750">
            <span className="text-xs font-bold text-[#6B7280] dark:text-gray-400 uppercase tracking-wider">
              For All Providers
            </span>
          </div>
          <div className="px-6 py-4 border-b border-[#E5E7EB] dark:border-gray-700 bg-[#FFFBEB] dark:bg-yellow-900/20">
            <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider flex items-center gap-1.5">
              <Crown className="size-3.5" strokeWidth={2} />
              Additional Benefits for Premium Providers
            </span>
          </div>
        </div>

        {/* Rows */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`grid grid-cols-2 ${i < 2 ? "border-b border-[#E5E7EB] dark:border-gray-700" : ""}`}
          >
            {/* Left — For All Providers */}
            <div className="px-6 py-4 border-r border-[#E5E7EB] dark:border-gray-700 flex items-start gap-3">
              <div className={`size-9 ${forAllProviders[i].color} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border border-white shadow-sm`}>
                {(() => { const Icon = forAllProviders[i].icon; return <Icon className={`size-[18px] ${forAllProviders[i].iconColor}`} strokeWidth={1.75} />; })()}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111827] dark:text-white leading-tight">
                  {forAllProviders[i].label}
                </p>
                <p className="text-xs text-[#64748B] dark:text-gray-400 mt-0.5 leading-relaxed">
                  {forAllProviders[i].desc}
                </p>
              </div>
            </div>

            {/* Right — Premium Providers */}
            <div className="px-6 py-4 flex items-start gap-3 bg-[#FEFCE8]/40 dark:bg-yellow-900/10">
              <div className={`size-9 ${forPremiumProviders[i].color} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border border-white shadow-sm`}>
                {(() => { const Icon = forPremiumProviders[i].icon; return <Icon className={`size-[18px] ${forPremiumProviders[i].iconColor}`} strokeWidth={1.75} />; })()}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111827] dark:text-white leading-tight">
                  {forPremiumProviders[i].label}
                </p>
                <p className="text-xs text-[#64748B] dark:text-gray-400 mt-0.5 leading-relaxed">
                  {forPremiumProviders[i].desc}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Footer CTA */}
        <div className="px-6 py-5 border-t border-[#E5E7EB] dark:border-gray-700 bg-[#F9FAFB] dark:bg-gray-750 flex justify-center">
          <button
            onClick={() => navigate("/onboarding")}
            className="flex items-center gap-2.5 px-8 py-3.5 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-bold text-base transition-colors shadow-md"
          >
            Get Listed Now
            <ArrowRight className="size-5" />
          </button>
        </div>

      </div>

      {/* ── Section 3 — FAQs ─────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-2xl p-6">
        <h2 className="text-base font-bold text-[#111827] dark:text-white mb-1">
          Frequently Asked Questions
        </h2>
        <p className="text-[13px] text-[#6B7280] dark:text-gray-400 mb-5">
          Everything you need to know about joining the Mantra Provider network.
        </p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`pb-3 ${i < faqs.length - 1 ? "border-b border-[#E5E7EB] dark:border-gray-700" : ""}`}
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full flex items-center justify-between text-left gap-4"
              >
                <span className="text-[14px] font-semibold text-[#111827] dark:text-white">
                  {faq.q}
                </span>
                {expandedFaq === i
                  ? <ChevronUp className="size-4 text-[#6B7280] flex-shrink-0" />
                  : <ChevronDown className="size-4 text-[#6B7280] flex-shrink-0" />
                }
              </button>
              {expandedFaq === i && (
                <div className="mt-2 space-y-2">
                  {faq.a.split("\n\n").map((para, j) => (
                    <p key={j} className="text-[13px] text-[#6B7280] dark:text-gray-400 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
