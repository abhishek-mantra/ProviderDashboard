import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Check, Circle, CheckCircle2, ChevronDown, ChevronRight, Clock, X, User, TrendingUp, Brain, Briefcase, Activity, FileText, Dumbbell } from "lucide-react";
import { motion } from "motion/react";

interface Task {
  id: string;
  title: string;
  status: "active" | "completed" | "locked";
  duration: string;
  points: number;
  color: string;
  icon: string;
  tag: string;
  tagColor: string;
}

interface PathwayItem {
  id: string;
  title: string;
  date: string;
  points: number;
  type: string;
}

interface FocusAreaOption {
  id: string;
  label: string;
  icon: string;
}

export function ClientPathway() {
  const { id } = useParams();
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedClient, setSelectedClient] = useState("Sarah Johnson");
  const [showFocusModal, setShowFocusModal] = useState(false);
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>(["stress"]);

  const focusAreaOptions: FocusAreaOption[] = [
    { id: "leadership", label: "Leadership", icon: "user" },
    { id: "stress", label: "Stress", icon: "brain" },
    { id: "work-performance", label: "Work Performance", icon: "trending-up" },
    { id: "career", label: "Career", icon: "briefcase" },
    { id: "ocd", label: "OCD", icon: "circle" },
    { id: "diabetes", label: "Diabetes", icon: "activity" },
    { id: "back-pain", label: "Back Pain", icon: "file" },
    { id: "neck-pain", label: "Neck Pain", icon: "file" },
    { id: "elbow-pain", label: "Elbow Pain", icon: "file" },
    { id: "fitness", label: "Fitness", icon: "dumbbell" }
  ];

  const toggleFocusArea = (focusId: string) => {
    setSelectedFocusAreas(prev => 
      prev.includes(focusId) 
        ? prev.filter(id => id !== focusId)
        : [...prev, focusId]
    );
  };

  const renderIcon = (iconName: string, className: string = "") => {
    switch (iconName) {
      case "user": return <User className={className} />;
      case "brain": return <Brain className={className} />;
      case "trending-up": return <TrendingUp className={className} />;
      case "briefcase": return <Briefcase className={className} />;
      case "circle": return <Circle className={className} />;
      case "activity": return <Activity className={className} />;
      case "file": return <FileText className={className} />;
      case "dumbbell": return <Dumbbell className={className} />;
      default: return <Circle className={className} />;
    }
  };

  const tasks: Task[] = [
    {
      id: "1",
      title: "Future Storyboarding",
      status: "active",
      duration: "5 min",
      points: 10,
      color: "bg-[#ffcc80]",
      icon: "⚡",
      tag: "Activity",
      tagColor: "bg-[#00c0ff]"
    },
    {
      id: "2",
      title: "Discomfort Zone Dare",
      status: "active",
      duration: "3 min",
      points: 10,
      color: "bg-[#b39ddb]",
      icon: "📖",
      tag: "Article",
      tagColor: "bg-[#00c0ff]"
    },
    {
      id: "3",
      title: "Mindful Breathing",
      status: "active",
      duration: "5 min",
      points: 10,
      color: "bg-[#b39ddb]",
      icon: "🎧",
      tag: "Audio",
      tagColor: "bg-[#00c0ff]"
    },
    {
      id: "4",
      title: "Mood Tracker",
      status: "active",
      duration: "2 min",
      points: 10,
      color: "bg-[#a5d6a7]",
      icon: "📊",
      tag: "Tracker",
      tagColor: "bg-[#00c0ff]"
    },
    {
      id: "5",
      title: "Know What is Stress?",
      status: "active",
      duration: "4 min",
      points: 5,
      color: "bg-[#b39ddb]",
      icon: "📖",
      tag: "Article",
      tagColor: "bg-[#00c0ff]"
    },
    {
      id: "6",
      title: "Meditation on Gratitude",
      status: "completed",
      duration: "10 min",
      points: 5,
      color: "bg-[#b39ddb]",
      icon: "🎧",
      tag: "Audio",
      tagColor: "bg-[#00c0ff]"
    },
    {
      id: "7",
      title: "Daily Gratitude Journal",
      status: "completed",
      duration: "5 min",
      points: 10,
      color: "bg-[#ffcc80]",
      icon: "⚡",
      tag: "Activity",
      tagColor: "bg-[#00c0ff]"
    },
    {
      id: "8",
      title: "Fitness Level Assessment",
      status: "locked",
      duration: "10 min",
      points: 15,
      color: "bg-[#fff59d]",
      icon: "✏️",
      tag: "Assessment",
      tagColor: "bg-[#00c0ff]"
    },
    {
      id: "9",
      title: "Morning Yoga Flow",
      status: "active",
      duration: "20 min",
      points: 15,
      color: "bg-[#90caf9]",
      icon: "▶️",
      tag: "Video",
      tagColor: "bg-[#00c0ff]"
    }
  ];

  const pathwayItems: PathwayItem[] = [
    {
      id: "1",
      title: "How to Book & Join a Session",
      date: "Jan 14, 2025",
      points: 10,
      type: "Session"
    },
    {
      id: "2",
      title: "How TherapyMantra Works?",
      date: "Dec 24, 2023",
      points: 20,
      type: "Information"
    },
    {
      id: "3",
      title: "Heart-Healthy Recipe Guide",
      date: "Jan 14, 2025",
      points: 5,
      type: "Guide"
    },
    {
      id: "4",
      title: "Refer a Provider",
      date: "Jan 1, 2023",
      points: 50,
      type: "Referral"
    },
    {
      id: "5",
      title: "Publish a Post About MantraCare",
      date: "Nov 14, 2023",
      points: 0,
      type: "Post"
    }
  ];

  return (
    <div className="bg-[#f8f9fb] dark:bg-gray-900 min-h-screen p-6">
      {/* Back Button & Header */}
      <div className="max-w-[1000px] mb-6">
        <Link
          to={`/clients/${id}`}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Client Profile</span>
        </Link>
        
        {/* Page Heading and Filters */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Client Pathways</h1>
          
          <div className="flex items-center gap-3">
            {/* Client Name Filter */}
            <div className="relative">
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent cursor-pointer min-w-[180px]"
              >
                <option>Sarah Johnson</option>
                <option>Michael Chen</option>
                <option>Emily Rodriguez</option>
                <option>David Kim</option>
                <option>Jessica Williams</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Service Filter */}
            <div className="relative">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent cursor-pointer min-w-[160px]"
              >
                <option>All Services</option>
                <option>Therapy</option>
                <option>Nutrition</option>
                <option>Fitness</option>
                <option>Psychiatry</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] space-y-4">
        {/* Focus Area Section - Top */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="size-9 bg-[#e3f2fd] dark:bg-cyan-900/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="size-5 text-[#00c0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-0.5">
                  Focus Area
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Select the key concern areas for you
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white border-2 border-[#00c0ff] text-[#00c0ff] rounded-full text-sm font-medium">
                    Stress
                  </span>
                </div>
              </div>
            </div>
            <button className="text-[#00c0ff] hover:text-[#00a8e0] transition-colors p-2" onClick={() => setShowFocusModal(true)}>
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
          {/* Tasks Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="size-9 bg-[#e3f2fd] dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="size-5 text-[#00c0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-0.5">Today's Tasks</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Take just a few minutes each day to prioritise your health and wellness.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">2/10 done</span>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <ChevronDown className="size-4" />
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-1">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className={`flex items-center gap-4 py-4 px-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group cursor-pointer rounded-lg ${""}`}
              >
                {/* Checkbox */}
                <div className="flex-shrink-0">
                  {task.status === "completed" ? (
                    <div className="size-5 border-2 border-[#10b981] rounded-full flex items-center justify-center bg-white dark:bg-gray-800">
                      <div className="size-2 bg-[#10b981] rounded-full"></div>
                    </div>
                  ) : (
                    <div className="size-5 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-full"></div>
                  )}
                </div>

                {/* Icon */}
                <div className={`size-12 ${task.color} rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                  <span className="text-2xl">{task.icon}</span>
                </div>

                {/* Task Info */}
                <div className="flex-1 min-w-0">
                  <h4 className={`text-[15px] font-semibold mb-1.5 ${
                    task.status === "completed" ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-white"
                  }`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2.5 text-xs">
                    <span className="font-bold text-[#00c0ff]">
                      {task.tag}
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                      <Clock className="size-3.5" />
                      <span className="font-medium">{task.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#10b981] font-bold">
                      <svg className="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{task.points} Points</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="size-5 text-gray-300 group-hover:text-gray-400 dark:group-hover:text-gray-500 transition-colors flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Activity Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-3">
              <div className="size-9 bg-[#e3f2fd] dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="size-5 text-[#00c0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-0.5">Activity Stats</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Complete daily activity to get more reward points.
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#00c0ff] hover:bg-[#00a8e0] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Redeem
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            {/* Completed Card */}
            <div className="bg-[#f3faff] dark:bg-gray-700/50 rounded-xl border border-[#00c0ff4d] dark:border-gray-700 p-3 flex items-center gap-3">
              <div className="size-9 bg-[#043570] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[20px] font-bold text-[#043570] dark:text-white mb-0.5">5</p>
                <p className="text-[10px] text-[#043570] dark:text-gray-400">Completed</p>
              </div>
            </div>

            {/* Today Card */}
            <div className="bg-[#f3faff] dark:bg-gray-700/50 rounded-xl border border-[#00c0ff4d] dark:border-gray-700 p-3 flex items-center gap-3">
              <div className="size-9 bg-[#00c0ff] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-[20px] font-bold text-[#043570] dark:text-white mb-0.5">2/10</p>
                <p className="text-[10px] text-[#043570] dark:text-gray-400">Today</p>
              </div>
            </div>

            {/* Points Card */}
            <div className="bg-[#f3faff] dark:bg-gray-700/50 rounded-xl border border-[#00c0ff4d] dark:border-gray-700 p-3 flex items-center gap-3">
              <div className="size-9 bg-[#00c0ff] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="size-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="text-[20px] font-bold text-[#043570] dark:text-white mb-0.5">50</p>
                <p className="text-[10px] text-[#043570] dark:text-gray-400">Points</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Journey So Far */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start gap-3 mb-5">
            <div className="size-9 bg-[#e3f2fd] dark:bg-cyan-900/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="size-5 text-[#00c0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-0.5">
                Your Journey So Far
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Completed activity following pathway.
              </p>
            </div>
          </div>

          {/* Journey Items */}
          <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-700">
            {pathwayItems.map((item, index) => (
              <div
                key={item.id}
                className="flex items-start justify-between py-4 first:pt-0 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group cursor-pointer px-2 -mx-2 rounded-lg"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="size-7 bg-[#f1f5f9] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="size-3.5 text-[#0d9488]" strokeWidth={3} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-normal text-[#020817] dark:text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-gray-400 dark:text-gray-400">
                      {item.date}
                    </p>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm font-semibold text-[#10b981]">
                    {item.points} Points
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                    <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Video</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-6 text-xs">
            <button className="px-3 py-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
              Prev
            </button>
            <span className="text-gray-500 dark:text-gray-400">Page 1 of 1</span>
            <button className="px-3 py-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Focus Area Modal */}
      {showFocusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-[680px] w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Available Services</h2>
              <button 
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" 
                onClick={() => setShowFocusModal(false)}
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Focus Area Options Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {focusAreaOptions.map(option => {
                const isSelected = selectedFocusAreas.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => toggleFocusArea(option.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left ${
                      isSelected 
                        ? "bg-[#4169e1] border-[#4169e1] text-white" 
                        : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    {renderIcon(option.icon, isSelected ? "size-5 text-white" : "size-5 text-gray-600 dark:text-gray-400")}
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Save Button */}
            <button 
              className="w-full py-3 bg-[#4169e1] hover:bg-[#3557c7] text-white rounded-xl text-base font-medium transition-colors"
              onClick={() => setShowFocusModal(false)}
            >
              Save
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}