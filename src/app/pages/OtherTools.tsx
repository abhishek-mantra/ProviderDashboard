import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ClipboardList,
  CreditCard,
  ExternalLink,
  Zap,
  Users,
  MoreHorizontal,
  ChevronRight,
  Eye,
  Send,
  ArrowLeft,
  Check,
  X,
  Sparkles,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type ServiceType = "therapy" | "diet" | "physio" | "all";

interface Tool {
  id: string;
  name: string;
  category: string;
  service: ServiceType[];
  description?: string;
}

interface ToolCategory {
  id: string;
  name: string;
  icon: typeof ClipboardList;
  iconColor: string;
  subtext: string;
}

export function OtherTools() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceType>("therapy");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [showClientList, setShowClientList] = useState(false);
  const [sentConfirmation, setSentConfirmation] = useState<{ client: string; tool: string } | null>(
    null
  );

  const categories: ToolCategory[] = [
    {
      id: "free-assessments",
      name: "Free Assessments",
      icon: ClipboardList,
      iconColor: "text-blue-600",
      subtext: "Access free assessment tools for your clients",
    },
    {
      id: "paid-assessments-self",
      name: "Paid Assessments (Refer to Self)",
      icon: CreditCard,
      iconColor: "text-purple-600",
      subtext: "Premium assessments you can administer",
    },
    {
      id: "paid-assessments-outside",
      name: "Paid Assessments (Refer Outside)",
      icon: ExternalLink,
      iconColor: "text-pink-600",
      subtext: "Refer clients to external assessment providers",
    },
    {
      id: "exercises",
      name: "Exercises",
      icon: Zap,
      iconColor: "text-teal-600",
      subtext: "Therapeutic exercises and activities",
    },
    {
      id: "refer-services",
      name: "Refer Other Services",
      icon: Users,
      iconColor: "text-pink-600",
      subtext: "Connect clients with additional services",
    },
    {
      id: "others",
      name: "Others",
      icon: MoreHorizontal,
      iconColor: "text-red-600",
      subtext: "Additional tools and resources",
    },
  ];

  const tools: Record<string, Tool[]> = {
    "free-assessments": [
      {
        id: "phq9",
        name: "PHQ-9",
        category: "free-assessments",
        service: ["therapy"],
        description: "Patient Health Questionnaire - Depression",
      },
      {
        id: "gad7",
        name: "GAD-7",
        category: "free-assessments",
        service: ["therapy"],
        description: "Generalized Anxiety Disorder Assessment",
      },
      {
        id: "bmi",
        name: "BMI Calculator",
        category: "free-assessments",
        service: ["diet", "physio"],
        description: "Body Mass Index Calculator",
      },
      {
        id: "food-diary",
        name: "Food Diary",
        category: "free-assessments",
        service: ["diet"],
        description: "Track daily food intake",
      },
    ],
    "paid-assessments-self": [
      {
        id: "ham-a",
        name: "HAM-A",
        category: "paid-assessments-self",
        service: ["therapy"],
        description: "Hamilton Anxiety Rating Scale",
      },
      {
        id: "ham-d",
        name: "HAM-D",
        category: "paid-assessments-self",
        service: ["therapy"],
        description: "Hamilton Depression Rating Scale",
      },
      {
        id: "ybocs",
        name: "YBOCS",
        category: "paid-assessments-self",
        service: ["therapy"],
        description: "Yale-Brown Obsessive Compulsive Scale",
      },
      {
        id: "tat",
        name: "TAT",
        category: "paid-assessments-self",
        service: ["therapy"],
        description: "Thematic Apperception Test",
      },
      {
        id: "mcmi",
        name: "MCMI",
        category: "paid-assessments-self",
        service: ["therapy"],
        description: "Millon Clinical Multiaxial Inventory",
      },
      {
        id: "adhd",
        name: "ADHD",
        category: "paid-assessments-self",
        service: ["therapy"],
        description: "ADHD Assessment Scale",
      },
      {
        id: "dapt",
        name: "DAPT",
        category: "paid-assessments-self",
        service: ["therapy"],
        description: "Depression and Anxiety in Youth Scale",
      },
      {
        id: "panss",
        name: "PANSS",
        category: "paid-assessments-self",
        service: ["therapy"],
        description: "Positive and Negative Syndrome Scale",
      },
      {
        id: "gender-dysphoria",
        name: "Gender Dysphoria",
        category: "paid-assessments-self",
        service: ["therapy"],
        description: "Gender Dysphoria Assessment",
      },
      {
        id: "mbti",
        name: "MBTI",
        category: "paid-assessments-self",
        service: ["therapy"],
        description: "Myers-Briggs Type Indicator",
      },
      {
        id: "big-five",
        name: "Big Five Test",
        category: "paid-assessments-self",
        service: ["therapy"],
        description: "Five Factor Personality Test",
      },
      {
        id: "career-profiler",
        name: "Career Profiler",
        category: "paid-assessments-self",
        service: ["therapy"],
        description: "Career Assessment and Guidance",
      },
    ],
    "paid-assessments-outside": [
      {
        id: "neuropsych",
        name: "Neuropsychological Testing",
        category: "paid-assessments-outside",
        service: ["therapy"],
        description: "Comprehensive cognitive assessment",
      },
      {
        id: "iq-test",
        name: "IQ Testing",
        category: "paid-assessments-outside",
        service: ["therapy"],
        description: "Intelligence Quotient Assessment",
      },
    ],
    exercises: [
      {
        id: "breathing",
        name: "Breathing Exercises",
        category: "exercises",
        service: ["therapy", "physio"],
        description: "Guided breathing techniques",
      },
      {
        id: "meditation",
        name: "Meditation",
        category: "exercises",
        service: ["therapy"],
        description: "Mindfulness meditation exercises",
      },
      {
        id: "stretching",
        name: "Stretching Routines",
        category: "exercises",
        service: ["physio"],
        description: "Daily stretching exercises",
      },
      {
        id: "meal-plans",
        name: "Meal Plans",
        category: "exercises",
        service: ["diet"],
        description: "Customized meal planning",
      },
    ],
    "refer-services": [
      {
        id: "psychiatry",
        name: "Psychiatry",
        category: "refer-services",
        service: ["therapy"],
        description: "Refer to psychiatrist for medication",
      },
      {
        id: "nutrition",
        name: "Nutrition Counseling",
        category: "refer-services",
        service: ["therapy", "diet"],
        description: "Specialized nutrition support",
      },
      {
        id: "physical-therapy",
        name: "Physical Therapy",
        category: "refer-services",
        service: ["physio"],
        description: "Advanced physical rehabilitation",
      },
    ],
    others: [
      {
        id: "worksheets",
        name: "Therapy Worksheets",
        category: "others",
        service: ["therapy"],
        description: "Printable therapy worksheets",
      },
      {
        id: "journals",
        name: "Journaling Prompts",
        category: "others",
        service: ["therapy"],
        description: "Daily journaling exercises",
      },
      {
        id: "recipes",
        name: "Healthy Recipes",
        category: "others",
        service: ["diet"],
        description: "Nutritious recipe collection",
      },
    ],
  };

  // Mock clients
  const clients = [
    { id: "1", name: "Sarah Johnson", initials: "SJ", avatarColor: "bg-blue-500" },
    { id: "2", name: "Michael Chen", initials: "MC", avatarColor: "bg-purple-500" },
    { id: "3", name: "David Martinez", initials: "DM", avatarColor: "bg-green-500" },
    { id: "4", name: "Emily Watson", initials: "EW", avatarColor: "bg-orange-500" },
    { id: "5", name: "Priya Sharma", initials: "PS", avatarColor: "bg-pink-500" },
  ];

  const filteredTools = (categoryId: string) => {
    const categoryTools = tools[categoryId] || [];
    if (selectedService === "all") return categoryTools;
    return categoryTools.filter((tool) => tool.service.includes(selectedService));
  };

  const handleSendToClient = (tool: Tool, client: typeof clients[0]) => {
    setSentConfirmation({ client: client.name, tool: tool.name });
    setShowClientList(false);
    setSelectedTool(null);
    setSelectedCategory(null);

    // Auto-hide confirmation after 3 seconds
    setTimeout(() => {
      setSentConfirmation(null);
    }, 3000);
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen p-2 md:p-6">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 md:mb-8">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="size-8 md:size-10 rounded-lg flex items-center justify-center bg-[#F1F5F9] dark:bg-gray-800">
              <BookOpen className="size-4 md:size-5 text-[#1E293B] dark:text-gray-300" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                Resources
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Access assessments, exercises, and resources for your clients
              </p>
            </div>
          </div>

          {/* Service Filter */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Service:</span>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value as ServiceType)}
              className="px-3 md:px-4 py-2 md:py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent text-gray-900 dark:text-white font-medium shadow-sm text-sm"
            >
              <option value="therapy">Therapy</option>
              <option value="diet">Diet</option>
              <option value="physio">Physiotherapy</option>
              <option value="all">All Services</option>
            </select>
          </div>
        </div>

        {/* Success Confirmation Toast */}
        <AnimatePresence>
          {sentConfirmation && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 md:top-6 right-4 md:right-6 left-4 md:left-auto bg-gradient-to-r from-green-500 to-green-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3"
            >
              <div className="size-7 md:size-8 bg-white/20 rounded-xl flex items-center justify-center">
                <Check className="size-4 md:size-5" />
              </div>
              <div>
                <div className="font-bold text-sm md:text-base">{sentConfirmation.tool} sent!</div>
                <div className="text-xs md:text-sm text-white/90">
                  Sent to {sentConfirmation.client}'s chat
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main View - Categories */}
        {!selectedCategory && (
          <div className="space-y-3 md:space-y-4">
            {categories.map((category, index) => {
              const toolCount = filteredTools(category.id).length;
              const Icon = category.icon;

              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className="w-full bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-all group flex items-center gap-3 md:gap-4"
                >
                  {/* Icon */}
                  <div className="size-8 md:size-10 flex items-center justify-center flex-shrink-0">
                    <Icon className={`size-4 md:size-5 ${category.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3 className="text-base md:text-lg font-medium text-[#020817] dark:text-white mb-0.5">
                      {category.name}
                    </h3>
                    <p className="text-xs md:text-sm font-normal text-[#64748B] dark:text-gray-400">
                      {category.subtext}
                    </p>
                  </div>

                  {/* Tool Count and Arrow */}
                  <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                    <span className={`text-xs md:text-sm font-semibold ${category.iconColor}`}>
                      {toolCount} {toolCount === 1 ? "tool" : "tools"}
                    </span>
                    <ChevronRight className="size-4 md:size-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Tool List View */}
        {selectedCategory && (
          <div>
            {/* Back Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#043570] dark:hover:text-[#00c0ff] mb-4 md:mb-6 transition-colors font-semibold p-2 md:p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl"
            >
              <ArrowLeft className="size-4 md:size-5" />
              <span className="text-sm md:text-base">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </span>
            </button>

            {/* Tools List */}
            <div className="space-y-3 md:space-y-4">
              {filteredTools(selectedCategory).map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-3 md:p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-0 group"
                >
                  <div className="flex items-center gap-3 md:gap-4 flex-1">
                    {/* Tool Icon */}
                    <div className="size-9 md:size-11 bg-gradient-to-br from-[#f3faff] to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="size-4 md:size-5 text-[#00c0ff]" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-base md:text-lg font-medium text-[#020817] dark:text-white mb-0.5">
                        {tool.name}
                      </h4>
                      {tool.description && (
                        <p className="text-xs md:text-sm font-normal text-[#64748B] dark:text-gray-400">
                          {tool.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      className="p-2 md:p-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg md:rounded-xl transition-all group/btn"
                      title="Preview"
                    >
                      <Eye className="size-4 md:size-5 text-gray-500 dark:text-gray-400 group-hover/btn:text-[#00c0ff]" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTool(tool);
                        setShowClientList(true);
                      }}
                      className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-[#043570] hover:bg-[#032554] text-white rounded-lg md:rounded-xl transition-all font-bold shadow-sm hover:shadow-md text-sm"
                      title="Send to Client"
                    >
                      <Send className="size-3.5 md:size-4" />
                      <span>Send</span>
                    </button>
                  </div>
                </motion.div>
              ))}

              {filteredTools(selectedCategory).length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-12 md:p-20 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <div className="size-16 md:size-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5">
                    <MoreHorizontal className="size-8 md:size-10 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    No tools available
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    No tools found for the selected service type
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Client Selection Modal */}
        {showClientList && selectedTool && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 md:p-4"
            onClick={() => {
              setShowClientList(false);
              setSelectedTool(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl max-w-2xl w-full max-h-[85vh] md:max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 md:p-6 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      Send {selectedTool.name}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      Select a client to send this assessment
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowClientList(false);
                      setSelectedTool(null);
                    }}
                    className="size-8 md:size-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:rounded-xl flex items-center justify-center transition-colors"
                  >
                    <X className="size-4 md:size-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Modal Content - Client List */}
              <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(85vh-100px)] md:max-h-[calc(80vh-120px)]">
                <div className="space-y-2">
                  {clients.map((client, index) => (
                    <motion.button
                      key={client.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      onClick={() => handleSendToClient(selectedTool, client)}
                      className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg md:rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-10 md:size-12 ${client.avatarColor} rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm text-sm md:text-base`}
                        >
                          {client.initials}
                        </div>
                        <div className="text-left">
                          <div className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                            {client.name}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="size-4 md:size-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}