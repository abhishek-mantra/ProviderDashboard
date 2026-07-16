import { X, Calendar, Clock, Video, CheckCircle, AlertCircle, User, Timer } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface MissedSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMissedSession: (session: {
    clientName: string;
    sessionType: string;
    duration: string;
    date: string;
    time: string;
  }) => void;
}

export function MissedSessionModal({ isOpen, onClose, onMissedSession }: MissedSessionModalProps) {
  const [clientName, setClientName] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock Mantra clients data
  const mantraClients = [
    { id: "1", name: "Sarah Jenkins" },
    { id: "2", name: "Emily White" },
    { id: "3", name: "Rachel Green" },
    { id: "4", name: "Alex Turner" },
  ];

  const handleSubmit = () => {
    // Show success message first
    setShowSuccess(true);
  };

  const handleDone = () => {
    // Call the callback to add session and switch tab
    onMissedSession({ clientName, sessionType, duration, date, time });
    // Reset and close
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setClientName("");
    setSessionType("");
    setDuration("");
    setDate("");
    setTime("");
    setShowSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ paddingLeft: '100px' }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-[550px] mx-4 overflow-hidden"
          >
            {!showSuccess ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <AlertCircle className="size-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Add Missed Session
                      </h2>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                        Submit a missed session for client approval
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="size-8 flex items-center justify-center rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <X className="size-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                {/* Form */}
                <div className="p-5 space-y-4">
                  {/* Info Banner */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-xs text-blue-800 dark:text-blue-300 font-medium">
                      Only Mantra clients are eligible for missed session requests. The client must approve before the session is marked valid.
                    </p>
                  </div>

                  {/* Client Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <User className="size-4 text-gray-500" />
                      Client Name
                    </label>
                    <div className="relative">
                      <select
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white appearance-none font-medium text-sm"
                      >
                        <option value="">Select a client</option>
                        {mantraClients.map((client) => (
                          <option key={client.id} value={client.name}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="size-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Video className="size-4 text-gray-500" />
                      Session Type
                    </label>
                    <div className="relative">
                      <select
                        value={sessionType}
                        onChange={(e) => setSessionType(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white appearance-none font-medium text-sm"
                      >
                        <option value="">Select session type</option>
                        <option value="Video Session">Video Session</option>
                        <option value="Chat Session">Chat Session</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="size-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Timer className="size-4 text-gray-500" />
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g., 30, 45, 60"
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white placeholder-gray-400 font-medium text-sm"
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <Calendar className="size-4 text-gray-500" />
                        Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white font-medium text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <Clock className="size-4 text-gray-500" />
                        Time
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] text-gray-900 dark:text-white font-medium text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                  <button
                    onClick={handleClose}
                    className="px-5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 font-semibold text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!clientName || !sessionType || !duration || !date || !time}
                    className="px-5 py-2.5 bg-[#00c0ff] hover:bg-[#00a8e0] text-white rounded-lg transition-colors font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#00c0ff] shadow-sm"
                  >
                    Submit Request
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Success Message */}
                <div className="p-10 text-center">
                  <div className="size-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5 ring-4 ring-green-100 dark:ring-green-900/20">
                    <CheckCircle className="size-9 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Request Submitted Successfully
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
                    Your missed session request has been submitted to <span className="font-semibold text-gray-900 dark:text-white">{clientName}</span>. Once the client approves, the session will be marked valid and added to your records.
                  </p>
                  <button
                    onClick={handleDone}
                    className="px-8 py-2.5 bg-[#00c0ff] hover:bg-[#00a8e0] text-white rounded-lg transition-colors font-semibold text-sm shadow-sm"
                  >
                    View Pending Sessions
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}