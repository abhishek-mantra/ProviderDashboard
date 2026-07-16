import { useState } from "react";
import { CheckCircle2, Circle, ChevronRight, Clock, ChevronDown, ChevronUp, ChevronLeft, Calendar, Award, Trophy, Video, FileText, Play, Zap, BookOpen, Headphones, BarChart3 } from "lucide-react";
import { motion } from "motion/react";

interface TodayTask {
  id: string;
  title: string;
  type: "Activity" | "Article" | "Audio" | "Tracker";
  duration: string;
  points: number;
  completed: boolean;
  iconType: "zap" | "book" | "headphones" | "chart";
  color: string;
}

export function Tasks() {
  const [isTodayExpanded, setIsTodayExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedService, setSelectedService] = useState("All Services");
  const totalPages = 13;

  const services = [
    "All Services",
    "Therapy",
    "Nutrition",
    "Fitness",
    "Yoga",
    "Meditation",
    "Mental Health",
  ];

  const todayTasks: TodayTask[] = [
    {
      id: "1",
      title: "Future Storyboarding",
      type: "Activity",
      duration: "5 min",
      points: 10,
      completed: false,
      iconType: "zap",
      color: "orange",
    },
    {
      id: "2",
      title: "Discomfort Zone Dare",
      type: "Article",
      duration: "3 min",
      points: 10,
      completed: false,
      iconType: "book",
      color: "blue",
    },
    {
      id: "3",
      title: "Mindful Breathing",
      type: "Audio",
      duration: "5 min",
      points: 10,
      completed: false,
      iconType: "headphones",
      color: "purple",
    },
    {
      id: "4",
      title: "Mood Tracker",
      type: "Tracker",
      duration: "2 min",
      points: 10,
      completed: false,
      iconType: "chart",
      color: "green",
    },
    {
      id: "5",
      title: "Know What is Stress?",
      type: "Article",
      duration: "4 min",
      points: 5,
      completed: false,
      iconType: "book",
      color: "blue",
    },
    {
      id: "6",
      title: "Meditation on Gratitude",
      type: "Audio",
      duration: "10 min",
      points: 5,
      completed: true,
      iconType: "headphones",
      color: "purple",
    },
    {
      id: "7",
      title: "Daily Gratitude Journal",
      type: "Activity",
      duration: "5 min",
      points: 10,
      completed: true,
      iconType: "zap",
      color: "orange",
    },
  ];

  const journeyTasks = [
    {
      id: "1",
      title: "How to Book & Join a Session",
      date: "Jan 14, 2025",
      points: 10,
      type: "Video",
      completed: true,
    },
    {
      id: "2",
      title: "How TherapyMantra Works?",
      date: "Dec 24, 2023",
      points: 20,
      type: "Video",
      completed: true,
    },
    {
      id: "3",
      title: "Heart-Healthy Recipe Guide",
      date: "Jan 14, 2025",
      points: 5,
      type: "Article",
      completed: true,
    },
    {
      id: "4",
      title: "Refer a Provider",
      date: "Jan 1, 2023",
      points: 50,
      type: "Activity",
      completed: true,
    },
    {
      id: "5",
      title: "Publish a Post About MantraCare",
      date: "Nov 14, 2023",
      points: 0,
      type: "Activity",
      completed: true,
    },
  ];

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen md:p-6">
      <div className="max-w-[1000px] mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-0"
        >
          <div className="flex items-center gap-2 md:gap-4">
            <div className="size-8 md:size-10 rounded-lg md:rounded-xl flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CheckCircle2 className="size-4 md:size-5 text-[#00c0ff]" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white">Tasks</h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Track your daily wellness tasks & earn points</p>
            </div>
          </div>

          {/* Service Filter */}
          <div className="relative">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full md:w-auto appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 md:px-4 py-2 md:py-2.5 pr-10 text-xs md:text-sm font-medium text-gray-900 dark:text-white cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent"
            >
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <ChevronDown className="size-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </motion.div>

        {/* Three Metric Cards */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {/* Provider Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-[#00b4d8] to-[#0096c7] rounded-lg md:rounded-xl p-2 md:p-4 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 md:mb-3">
                <div className="text-[8px] md:text-xs font-semibold text-white/80 uppercase tracking-wide mb-1 md:mb-0 leading-tight">Provider Score</div>
                <div className="size-5 md:size-7 bg-white/15 backdrop-blur-sm rounded-md md:rounded-lg flex items-center justify-center hidden md:flex">
                  <Award className="size-2.5 md:size-3.5 text-white" />
                </div>
              </div>
              <div className="text-xl md:text-3xl font-bold text-white mb-0.5">471</div>
              <div className="text-[9px] md:text-xs text-white/70">Premium</div>
            </div>
          </motion.div>

          {/* Your Rank */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gradient-to-br from-[#a855f7] to-[#9333ea] rounded-lg md:rounded-xl p-2 md:p-4 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 md:mb-3">
                <div className="text-[8px] md:text-xs font-semibold text-white/80 uppercase tracking-wide mb-1 md:mb-0 leading-tight">Your Rank</div>
                <div className="size-5 md:size-7 bg-white/15 backdrop-blur-sm rounded-md md:rounded-lg flex items-center justify-center hidden md:flex">
                  <Trophy className="size-2.5 md:size-3.5 text-white" />
                </div>
              </div>
              <div className="flex items-baseline gap-1 md:gap-2 mb-0.5">
                <div className="text-xl md:text-3xl font-bold text-white">#2</div>
                <div className="px-1 md:px-1.5 py-0.5 bg-white/20 rounded text-[9px] md:text-xs font-bold text-white">↑1</div>
              </div>
              <div className="text-[9px] md:text-xs text-white/70">Top 3%</div>
            </div>
          </motion.div>

          {/* Activity Completed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] rounded-lg md:rounded-xl p-2 md:p-4 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 md:mb-3">
                <div className="text-[8px] md:text-xs font-semibold text-white/80 uppercase tracking-wide mb-1 md:mb-0 leading-tight">Activity</div>
                <div className="size-5 md:size-7 bg-white/15 backdrop-blur-sm rounded-md md:rounded-lg flex items-center justify-center hidden md:flex">
                  <CheckCircle2 className="size-2.5 md:size-3.5 text-white" />
                </div>
              </div>
              <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-1.5">60<span className="text-sm md:text-lg text-white/60">/106</span></div>
              <div className="w-full bg-white/20 rounded-full h-0.5 md:h-1 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '57%' }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  className="bg-white h-full rounded-full"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Today's Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Header */}
          <div
            onClick={() => setIsTodayExpanded(!isTodayExpanded)}
            className="flex items-start justify-between px-3 md:px-6 py-3 md:py-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors gap-2"
          >
            <div className="flex items-start gap-2 md:gap-3 flex-1 min-w-0">
              <Calendar className="size-4 md:size-5 text-[#00c0ff] mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                  Tasks to Boost Your Score
                </h2>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Complete tasks to earn points & unlock premium status
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{todayTasks.filter(t => t.completed).length}/{todayTasks.length}</span>
              {isTodayExpanded ? (
                <ChevronUp className="size-4 text-gray-400" />
              ) : (
                <ChevronDown className="size-4 text-gray-400" />
              )}
            </div>
          </div>

          {/* Tasks List */}
          {isTodayExpanded && (
            <div>
              {/* Info Banner */}
              <div className="px-3 md:px-6 pt-3 md:pt-6 pb-2 md:pb-4">
                <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-lg md:rounded-xl border border-blue-100 dark:border-blue-900/30">
                  <div className="size-7 md:size-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="size-3.5 md:size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-xs md:text-sm">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Your profile rank on Mantra depends on your provider score. <span className="font-semibold text-blue-600 dark:text-blue-400">Only premium providers (500+ score)</span> get referrals to corporate and individual clients. Complete the quick tasks below to earn points & unlock premium status.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {todayTasks.map((task, index) => {
                  const getIconColor = (color: string) => {
                    switch (color) {
                      case 'orange':
                        return 'bg-orange-100 dark:bg-orange-900/20';
                      case 'blue':
                        return 'bg-blue-100 dark:bg-blue-900/20';
                      case 'purple':
                        return 'bg-purple-100 dark:bg-purple-900/20';
                      case 'green':
                        return 'bg-emerald-100 dark:bg-emerald-900/20';
                      default:
                        return 'bg-gray-100 dark:bg-gray-700';
                    }
                  };

                  const getTypeColor = (type: string) => {
                    switch (type) {
                      case 'Activity':
                        return 'text-[#00c0ff] bg-[#00c0ff]/10';
                      case 'Article':
                        return 'text-[#00c0ff] bg-[#00c0ff]/10';
                      case 'Audio':
                        return 'text-[#00c0ff] bg-[#00c0ff]/10';
                      case 'Tracker':
                        return 'text-[#10b981] bg-[#10b981]/10';
                      default:
                        return 'text-gray-600 bg-gray-100';
                    }
                  };

                  const renderIcon = () => {
                    const iconClass = task.color === 'orange' ? 'text-orange-500' :
                                    task.color === 'blue' ? 'text-blue-500' :
                                    task.color === 'purple' ? 'text-purple-500' :
                                    task.color === 'green' ? 'text-emerald-500' : 'text-gray-500';

                    switch (task.iconType) {
                      case 'zap':
                        return <Zap className={`size-4 md:size-5 ${iconClass}`} />;
                      case 'book':
                        return <BookOpen className={`size-4 md:size-5 ${iconClass}`} />;
                      case 'headphones':
                        return <Headphones className={`size-4 md:size-5 ${iconClass}`} />;
                      case 'chart':
                        return <BarChart3 className={`size-4 md:size-5 ${iconClass}`} />;
                      default:
                        return <Circle className={`size-4 md:size-5 ${iconClass}`} />;
                    }
                  };

                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-2 md:gap-4 px-3 md:px-6 py-3 md:py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all cursor-pointer group"
                    >
                      {/* Checkbox */}
                      <div className="size-4 md:size-5 flex-shrink-0">
                        {task.completed ? (
                          <div className="size-4 md:size-5 bg-[#10b981] rounded-full flex items-center justify-center">
                            <svg className="size-2.5 md:size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : (
                          <div className="size-4 md:size-5 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-[#00c0ff] transition-colors"></div>
                        )}
                      </div>

                      {/* Icon */}
                      <div className={`size-10 md:size-12 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 ${getIconColor(task.color)}`}>
                        {renderIcon()}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm md:text-base font-medium mb-0.5 md:mb-1 ${task.completed ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>
                          {task.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                          <span className={`inline-flex items-center px-1.5 md:px-2 py-0.5 rounded text-[10px] md:text-xs font-semibold ${getTypeColor(task.type)}`}>
                            {task.type}
                          </span>
                          <span className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="size-2.5 md:size-3" />
                            {task.duration}
                          </span>
                          <span className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-xs font-semibold text-[#10b981]">
                            <svg className="size-2.5 md:size-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {task.points}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="size-4 md:size-5 text-gray-300 dark:text-gray-600 group-hover:text-[#00c0ff] group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Your journey so far */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Header */}
          <div className="px-3 md:px-6 py-3 md:py-5 flex items-center gap-2 md:gap-3">
            <div className="size-8 md:size-10 flex items-center justify-center flex-shrink-0">
              <svg className="size-5 md:size-6 text-[#00c0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                Your Journey So Far
              </h2>
              <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500">
                Completed activity following pathway.
              </p>
            </div>
          </div>

          {/* Journey Items */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {journeyTasks.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between px-3 md:px-6 py-3 md:py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all cursor-pointer gap-2 md:gap-4"
              >
                <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                  <div className="size-5 md:size-6 flex-shrink-0">
                    <div className="size-5 md:size-6 rounded-full border-2 border-[#00c0ff] flex items-center justify-center">
                      <svg className="size-2.5 md:size-3 text-[#00c0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 dark:text-white mb-0.5 md:mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500">
                      {item.date}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-xs md:text-sm font-semibold text-[#10b981] mb-0.5 md:mb-1">
                    {item.points} <span className="hidden sm:inline">Points</span>
                  </div>
                  <div className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-xs text-gray-400 dark:text-gray-500">
                    {item.type === "Video" && (
                      <>
                        <Play className="size-2.5 md:size-3" />
                        <span className="hidden sm:inline">Video</span>
                      </>
                    )}
                    {item.type === "Article" && (
                      <>
                        <FileText className="size-2.5 md:size-3" />
                        <span className="hidden sm:inline">Article</span>
                      </>
                    )}
                    {item.type === "Activity" && (
                      <>
                        <Zap className="size-2.5 md:size-3" />
                        <span className="hidden sm:inline">Activity</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="px-3 md:px-6 py-3 md:py-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
              <button className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Prev
              </button>
              <span className="text-gray-400">|</span>
              <span className="text-gray-900 dark:text-white">Page 1 of 1</span>
              <span className="text-gray-400">|</span>
              <button className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Next
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}