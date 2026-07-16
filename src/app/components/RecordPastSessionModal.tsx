import { useState } from "react";
import { X, Search, Video, MessageSquare, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import mantraIcon from "../../imports/MantraCare_(1)-2.svg";

interface Client {
  id: string;
  name: string;
  avatar: string;
  service: string;
  lastSession?: string;
  clientType: "Mantra" | "Self";
  isMantraReferred?: boolean;
}

interface RecordPastSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordPastSession: (session: {
    clientId: string;
    clientName: string;
    service: string;
    date: string;
    startTime: string;
    endTime: string;
    sessionType: "video" | "chat";
    location: string;
  }) => void;
}

export function RecordPastSessionModal({ isOpen, onClose, onRecordPastSession }: RecordPastSessionModalProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sessionDate, setSessionDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [sessionType, setSessionType] = useState<"video" | "chat">("video");
  const [location, setLocation] = useState<string>("online");
  const [customAddress, setCustomAddress] = useState<string>("");

  // Mix of Self and Mantra-referred clients
  const [clients] = useState<Client[]>([
    {
      id: "1",
      name: "Sarah Jenkins",
      avatar: "SJ",
      service: "Anxiety Management",
      lastSession: "Last session: Mar 15, 2024",
      clientType: "Self",
      isMantraReferred: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "MC",
      service: "Emotional Wellbeing",
      lastSession: "Last session: Feb 28, 2024",
      clientType: "Self",
      isMantraReferred: false,
    },
    {
      id: "3",
      name: "Emily Watson",
      avatar: "EW",
      service: "Stress Management",
      lastSession: "Last session: Mar 10, 2024",
      clientType: "Self",
      isMantraReferred: true,
    },
    {
      id: "4",
      name: "Rachel Green",
      avatar: "RG",
      service: "Meditation",
      lastSession: "Last session: Feb 10, 2024",
      clientType: "Self",
      isMantraReferred: false,
    },
    {
      id: "5",
      name: "David Miller",
      avatar: "DM",
      service: "Therapy",
      lastSession: "New client",
      clientType: "Self",
      isMantraReferred: true,
    },
    {
      id: "6",
      name: "Lisa Anderson",
      avatar: "LA",
      service: "Nutrition",
      lastSession: "New client",
      clientType: "Self",
      isMantraReferred: false,
    },
  ]);

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setSearchQuery(client.name);
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    if (selectedClient && sessionDate && startTime && endTime && location) {
      // Add the session to the done list
      onRecordPastSession({
        clientId: selectedClient.id,
        clientName: selectedClient.name,
        service: selectedClient.service,
        date: sessionDate,
        startTime: startTime,
        endTime: endTime,
        sessionType: sessionType,
        location: location === "enterAddress" ? customAddress : location,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedClient(null);
    setSearchQuery("");
    setSessionDate("");
    setStartTime("");
    setEndTime("");
    setSessionType("video");
    setLocation("online");
    setCustomAddress("");
    onClose();
  };

  const isFormValid = selectedClient && sessionDate && startTime && endTime && location;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        style={{ paddingLeft: '100px' }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-[750px] w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Record Past Session
            </h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="size-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="space-y-5">
              {/* Client Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Client
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none z-10" />
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full pl-12 pr-10 py-3 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white text-left"
                  >
                    {selectedClient ? (
                      <span className="text-gray-900 dark:text-white">{selectedClient.name}</span>
                    ) : (
                      <span className="text-gray-400">Select client</span>
                    )}
                  </button>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  
                  {/* Dropdown */}
                  {isDropdownOpen && (
                    <>
                      {/* Backdrop to close dropdown */}
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-80 overflow-hidden"
                      >
                        {/* Search Input inside dropdown */}
                        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search client..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white placeholder-gray-400 text-sm"
                            />
                          </div>
                        </div>
                        
                        {/* Client List */}
                        <div className="max-h-64 overflow-y-auto">
                          {filteredClients.length > 0 ? (
                            filteredClients.map((client) => (
                              <button
                                key={client.id}
                                onClick={() => handleClientSelect(client)}
                                className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                              >
                                <div className="size-10 bg-gradient-to-br from-[#00c0ff] to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                                  {client.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium text-gray-900 dark:text-white">{client.name}</h3>
                                    {client.isMantraReferred && (
                                      <img 
                                        src={mantraIcon} 
                                        alt="Mantra Referred" 
                                        className="size-5 flex-shrink-0"
                                        title="Referred by MantraCare"
                                      />
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{client.service}</p>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                              No clients found
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>

              {/* Mantra Client Warning */}
              {selectedClient && selectedClient.isMantraReferred && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                >
                  <img 
                    src={mantraIcon} 
                    alt="MantraCare" 
                    className="size-5 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-sm text-blue-900 dark:text-blue-200">
                    Sessions for Mantra clients are automatically tracked when you use our join links. Please add sessions manually only if they do not appear in the "Completed" tab.
                  </p>
                </motion.div>
              )}

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                />
              </div>

              {/* Time Section */}
              <div className="grid grid-cols-2 gap-4">
                {/* Start Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                  />
                </div>
              </div>

              {/* Session Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Session Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSessionType("video")}
                    className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${
                      sessionType === "video"
                        ? "border-[#4169E1] bg-[#4169E1]/5 dark:bg-[#4169E1]/10"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${sessionType === "video" ? "bg-[#4169E1]" : "bg-gray-100 dark:bg-gray-700"}`}>
                      <Video className={`size-5 ${sessionType === "video" ? "text-white" : "text-gray-600 dark:text-gray-400"}`} />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">Video</span>
                  </button>
                  <button
                    onClick={() => setSessionType("chat")}
                    className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${
                      sessionType === "chat"
                        ? "border-[#4169E1] bg-[#4169E1]/5 dark:bg-[#4169E1]/10"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${sessionType === "chat" ? "bg-[#4169E1]" : "bg-gray-100 dark:bg-gray-700"}`}>
                      <MessageSquare className={`size-5 ${sessionType === "chat" ? "text-white" : "text-gray-600 dark:text-gray-400"}`} />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">Chat</span>
                  </button>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                >
                  <option value="online">Online</option>
                  <option value="Practice Address A/10 Paschim Vihar">Practice Address A/10 Paschim Vihar</option>
                  <option value="Practice Address B/20 Noida">Practice Address B/20 Noida</option>
                  <option value="enterAddress">Enter Address</option>
                </select>
                {location === "enterAddress" && (
                  <motion.input
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    type="text"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    placeholder="Enter location"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white placeholder-gray-400 mt-2"
                  />
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`w-full py-3 rounded-lg font-medium transition-all mt-2 ${
                  isFormValid
                    ? "bg-[#4169E1] hover:bg-[#3557c7] text-white shadow-sm hover:shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                }`}
              >
                Record Session
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}