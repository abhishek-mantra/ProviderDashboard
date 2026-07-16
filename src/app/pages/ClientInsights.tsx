import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Info, ChevronLeft, ChevronRight, ChevronDown, Eye, Trash2, CheckCircle2, Circle, BarChart3 } from "lucide-react";

interface MetricData {
  id: string;
  title: string;
  severity?: string;
  severityLevel?: string;
  perfectlyFine?: string;
  value?: number;
  date?: string;
  hasData: boolean;
  color: string;
  dateRange: string;
  yAxisLabel: string;
}

interface EntryData {
  id: string;
  date: string;
  assessment: string;
  shared: boolean;
}

export function ClientInsights() {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState("Therapy");
  const [viewMode, setViewMode] = useState<"Charts" | "Entries">("Charts");
  const [timeFilter, setTimeFilter] = useState("Week");
  const [selectedClient, setSelectedClient] = useState("Sarah Johnson");

  const tabs = ["Therapy", "Addiction Treatment", "Coach"];

  const clients = [
    "Sarah Johnson",
    "Michael Chen",
    "Emily Rodriguez",
    "David Kim",
    "Jessica Martinez"
  ];

  const entries: EntryData[] = [
    { id: "1", date: "13th Dec 25", assessment: "Anxiety", shared: true },
    { id: "2", date: "19th Nov 25", assessment: "Anxiety", shared: false },
    { id: "3", date: "19th Nov 25", assessment: "Anxiety", shared: false },
    { id: "4", date: "13th May 25", assessment: "OCD", shared: false },
    { id: "5", date: "25th Mar 25", assessment: "Anxiety", shared: false },
    { id: "6", date: "18th Mar 25", assessment: "Anxiety", shared: false },
    { id: "7", date: "15th Mar 25", assessment: "Anxiety", shared: false },
    { id: "8", date: "15th Mar 25", assessment: "Depression", shared: false },
  ];

  const metrics: MetricData[] = [
    {
      id: "depression",
      title: "Depression",
      severity: "Severe Depression",
      severityLevel: "Moderate low",
      perfectlyFine: "Perfectly fine",
      value: 15.8,
      date: "9th Mar",
      hasData: true,
      color: "#00c0ff",
      dateRange: "5th Mar - 15th Mar",
      yAxisLabel: "Depression"
    },
    {
      id: "stress",
      title: "Stress",
      severity: "Severe Stress Level",
      severityLevel: "Moderate low",
      perfectlyFine: "Perfectly fine",
      value: 20.8,
      date: "11th Jan",
      hasData: true,
      color: "#00c0ff",
      dateRange: "5th Jan - 11th Jan",
      yAxisLabel: "Stress"
    },
    {
      id: "ocd",
      title: "OCD",
      severity: "Severe to have OCD",
      severityLevel: "Moderate",
      perfectlyFine: "",
      hasData: false,
      color: "#00c0ff",
      dateRange: "",
      yAxisLabel: "OCD"
    },
    {
      id: "anxiety",
      title: "Anxiety",
      severity: "Severe Anxiety",
      severityLevel: "Perfectly fine",
      perfectlyFine: "",
      value: 15.1,
      date: "8th Feb",
      hasData: true,
      color: "#00c0ff",
      dateRange: "8th Feb - 14th Feb",
      yAxisLabel: "Anxiety"
    },
    {
      id: "eating-disorder",
      title: "Eating Disorder",
      severity: "Severe Eating Disorder",
      severityLevel: "Perfectly fine",
      perfectlyFine: "",
      value: 25.8,
      date: "20th Jan",
      hasData: true,
      color: "#00c0ff",
      dateRange: "16th Jan - 22nd Jan",
      yAxisLabel: "Eating Disorder"
    },
    {
      id: "sleep",
      title: "Sleep",
      severity: "Overall sleep quality",
      severityLevel: "Overal sleep quality",
      perfectlyFine: "",
      value: 9.0,
      date: "3rd Mar",
      hasData: true,
      color: "#00c0ff",
      dateRange: "27th Feb - 5th Mar",
      yAxisLabel: "Sleep"
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

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Client Insights</h1>
          
          {/* Client Name Filter */}
          <div className="relative">
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent cursor-pointer min-w-[200px]"
            >
              {clients.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1000px]">
        {/* Tabs and Filters */}
        <div className="mb-6">
          {/* Top Tabs */}
          <div className="flex items-center gap-8 mb-6 border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  selectedTab === tab
                    ? "text-[#00c0ff]"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {tab}
                {selectedTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]"></div>
                )}
              </button>
            ))}
          </div>

          {/* View Mode and Time Filter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("Charts")}
                className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                  viewMode === "Charts"
                    ? "bg-[#00c0ff] text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Charts
              </button>
              <button
                onClick={() => setViewMode("Entries")}
                className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                  viewMode === "Entries"
                    ? "bg-[#00c0ff] text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Entries
              </button>
            </div>

            <div className="relative">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent cursor-pointer"
              >
                <option>Week</option>
                <option>Month</option>
                <option>Quarter</option>
                <option>Year</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content Based on View Mode */}
        {selectedTab === "Addiction Treatment" || selectedTab === "Coach" ? (
          /* Empty State for Addiction Treatment and Coach */
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="size-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6">
              <BarChart3 className="size-10 text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No Insights Available
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
              This client hasn't completed any assessments yet, or the data hasn't been shared. Assessment trends and entries will appear here once available.
            </p>
          </div>
        ) : viewMode === "Charts" ? (
          /* Metrics Grid */
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      {metric.title}
                    </h3>
                    <div className="space-y-0.5">
                      {metric.severity && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
                          {metric.severity}
                        </p>
                      )}
                      {metric.severityLevel && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-1.5"></span>
                          {metric.severityLevel}
                        </p>
                      )}
                      {metric.perfectlyFine && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                          {metric.perfectlyFine}
                        </p>
                      )}
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Info className="size-4" />
                  </button>
                </div>

                {/* Chart Area */}
                <div className="relative h-40 mb-3">
                  {metric.hasData ? (
                    <div className="h-full flex flex-col justify-between">
                      {/* Y-axis labels */}
                      <div className="flex items-start justify-between text-[10px] text-gray-400 dark:text-gray-500 mb-2">
                        <div className="flex flex-col items-start gap-2">
                          <span>21.0</span>
                          <span>17.5</span>
                          <span>14.0</span>
                          <span>7.0</span>
                          <span>0</span>
                        </div>
                        <div className="flex-1 ml-4 flex flex-col justify-between h-full relative">
                          {/* Grid lines */}
                          <div className="absolute inset-0 flex flex-col justify-between">
                            {[0, 1, 2, 3, 4].map((i) => (
                              <div key={i} className="border-t border-gray-100 dark:border-gray-700 w-full"></div>
                            ))}
                          </div>
                          {/* Data point */}
                          <div className="relative h-full flex items-center justify-center">
                            <div className="absolute" style={{ top: '30%', left: '50%' }}>
                              <div className="relative -translate-x-1/2">
                                <div className="size-2 bg-[#00c0ff] rounded-full border-2 border-white dark:border-gray-800"></div>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#00c0ff] text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
                                  {metric.value}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* X-axis label */}
                      <div className="flex items-center justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-2 border-t border-gray-100 dark:border-gray-700 pt-2">
                        <span className="ml-8">{metric.yAxisLabel}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-sm text-gray-400 dark:text-gray-500">No data available</p>
                    </div>
                  )}
                </div>

                {/* Date Navigation */}
                {metric.hasData && (
                  <div className="flex items-center justify-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <ChevronLeft className="size-4" />
                    </button>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {metric.dateRange}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Entries Table */
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#00c0ff]">
                  <th className="text-left py-4 px-6 text-white text-sm font-semibold">Date</th>
                  <th className="text-left py-4 px-6 text-white text-sm font-semibold">Assessment</th>
                  <th className="text-left py-4 px-6 text-white text-sm font-semibold">Share</th>
                  <th className="text-left py-4 px-6 text-white text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr 
                    key={entry.id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      {entry.date}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block bg-[#E6F7FF] text-[#043570] text-sm font-medium px-3 py-1 rounded">
                        {entry.assessment}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {entry.shared ? (
                        <CheckCircle2 className="size-5 text-green-500" />
                      ) : (
                        <Circle className="size-5 text-gray-300 dark:text-gray-600" />
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                          <Eye className="size-5" />
                        </button>
                        <button className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}