import { Link } from "react-router";
import { Sparkles, Gift, CreditCard, DollarSign, Mic, Wrench, Layout, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export function MonetizationShowcase() {
  const features = [
    {
      title: "AI Discovery Banner",
      description: "Dismissible banner on dashboard promoting AI tools with free trials",
      icon: Sparkles,
      link: "/",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-500/10",
    },
    {
      title: "Tools Page with Badges",
      description: "Badges positioned inside card boundaries (top: 16px, right: 16px) - plain text, no icons",
      icon: Wrench,
      link: "/tools",
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-500/10",
    },
    {
      title: "Free Trial Pricing Popup",
      description: "Simplified modal - colored square + tool name, heading, and 2 buttons (Begin trial / View plans)",
      icon: Gift,
      link: "/tools",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-500/10",
    },
    {
      title: "AI Transcriber Demo",
      description: "Pre-session free trial notice, in-progress state, and post-session paywall modal",
      icon: Mic,
      link: "/ai-transcriber-demo",
      color: "from-teal-500 to-teal-600",
      bgColor: "from-teal-500/10",
    },
    {
      title: "Settings - Billing & Credits",
      description: "Complete billing section with 5 sub-screens: Overview, Plans, Payments, Usage, Manage Credits",
      icon: CreditCard,
      link: "/settings/billing",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-500/10",
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-12 bg-gradient-to-br from-[#1EAAE7] to-[#185FA5] rounded-xl flex items-center justify-center">
            <Sparkles className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              AI Tools Monetization Layer
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore all implemented monetization features
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.link}
            state={feature.state}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-[#1EAAE7] dark:hover:border-[#1EAAE7] hover:shadow-lg transition-all cursor-pointer overflow-hidden"
            >
              {/* Background Decoration */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.bgColor} to-transparent rounded-full -mr-16 -mt-16`} />

              <div className="relative">
                {/* Icon */}
                <div className={`size-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="size-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-[#1EAAE7] font-medium text-sm">
                  <span>View feature</span>
                  <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Component Demos Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Reusable Components Created
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-xl">
            <div className="font-medium text-sm text-gray-900 dark:text-white mb-1">
              AIDiscoveryBanner
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Blue banner with sparkle icon, dismissible
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-xl">
            <div className="font-medium text-sm text-gray-900 dark:text-white mb-1">
              FreeTrialBadge
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Green pill badge with sparkle icon, clickable
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-xl">
            <div className="font-medium text-sm text-gray-900 dark:text-white mb-1">
              PlanIncludedBadge
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Blue pill badge for included features
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-xl">
            <div className="font-medium text-sm text-gray-900 dark:text-white mb-1">
              FreeTrialPricingPopup
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Modal with trial features & pricing
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-xl">
            <div className="font-medium text-sm text-gray-900 dark:text-white mb-1">
              LowCreditWarning
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Amber warning banner with top-up link
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-xl">
            <div className="font-medium text-sm text-gray-900 dark:text-white mb-1">
              PaywallModal
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Post-session modal with pricing options
            </div>
          </div>
        </div>
      </div>

      {/* Design Tokens Reference */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Design Tokens Used
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
            <div className="size-8 bg-[#1EAAE7] rounded mb-2" />
            <div className="text-xs font-mono text-gray-700 dark:text-gray-300">
              #1EAAE7
            </div>
            <div className="text-[10px] text-gray-500">Primary Blue</div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
            <div className="size-8 bg-[#E1F5EE] rounded mb-2" />
            <div className="text-xs font-mono text-gray-700 dark:text-gray-300">
              #E1F5EE
            </div>
            <div className="text-[10px] text-gray-500">Free Trial BG</div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
            <div className="size-8 bg-[#EFF6FF] rounded mb-2" />
            <div className="text-xs font-mono text-gray-700 dark:text-gray-300">
              #EFF6FF
            </div>
            <div className="text-[10px] text-gray-500">Included Badge BG</div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
            <div className="size-8 bg-[#1D4ED8] rounded mb-2" />
            <div className="text-xs font-mono text-gray-700 dark:text-gray-300">
              #1D4ED8
            </div>
            <div className="text-[10px] text-gray-500">Included Badge Text</div>
          </div>
        </div>
      </div>

      {/* Implementation Notes */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">
          ✅ Final Implementation Notes
        </h2>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• All badges positioned INSIDE card boundaries (top: 16px, right: 16px)</li>
          <li>• Badges use plain text only - no icons, no emojis</li>
          <li>• Free Trial Popup simplified - removed feature lists and pricing details</li>
          <li>• AI Credits tab removed from Billing page</li>
          <li>• Credit widget removed from sidebar</li>
          <li>• "View plans" button routes to Settings → Billing & Credits</li>
        </ul>
      </div>
    </div>
  );
}
