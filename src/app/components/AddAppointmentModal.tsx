import { useState, useEffect } from "react";
import { X, ChevronLeft, Plus, Video, MessageSquare, MapPin, Monitor, Search, ChevronDown, Clock, ThumbsUp, Calendar, AlertCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

interface Client {
  id: string;
  name: string;
  avatar: string;
  service: string;
  lastSession?: string;
  clientType: "Mantra" | "Self";
  credits?: number;
}

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAppointment: (appointment: {
    clientId: string;
    clientName: string;
    service: string;
    date: string;
    time: string;
    sessionType: "video" | "chat" | "in-person";
    location: string;
  }) => void;
  preselectedClient?: {
    id: string;
    name: string;
    avatar: string;
    service: string;
    credits?: number;
  } | null;
}

export function AddAppointmentModal({ isOpen, onClose, onAddAppointment, preselectedClient }: AddAppointmentModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<"client" | "addClient" | "schedule" | "confirmation" | "success">("client");
  const [selectedClient, setSelectedClient] = useState<Client | null>(preselectedClient ? {
    id: preselectedClient.id,
    name: preselectedClient.name,
    avatar: preselectedClient.avatar,
    service: preselectedClient.service,
    clientType: "Self",
  } : null);
  const [selectedDate, setSelectedDate] = useState<{ day: number; month: string; weekday: string } | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [sessionType, setSessionType] = useState<"video" | "chat" | "in-person">("video");
  const [location, setLocation] = useState<string>("online");
  const [customAddress, setCustomAddress] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [timezone, setTimezone] = useState("Asia/Calcutta");
  const [getReminderCall, setGetReminderCall] = useState(false);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [addAITranscriber, setAddAITranscriber] = useState(true);

  // New client form
  const [newClientFirstName, setNewClientFirstName] = useState("");
  const [newClientLastName, setNewClientLastName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientService, setNewClientService] = useState("Therapy");

  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Sarah Jenkins",
      avatar: "SJ",
      service: "Therapy",
      lastSession: "Last session: Mar 05, 2024",
      clientType: "Mantra",
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "MC",
      service: "Emotional Wellbeing",
      lastSession: "Last session: Feb 28, 2024",
      clientType: "Self",
    },
    {
      id: "3",
      name: "Emily White",
      avatar: "EW",
      service: "Personal Coach",
      lastSession: "Last session: Mar 01, 2024",
      clientType: "Mantra",
    },
    {
      id: "4",
      name: "Rachel Green",
      avatar: "RG",
      service: "Meditation",
      lastSession: "Last session: Feb 10, 2024",
      clientType: "Self",
    },
    {
      id: "5",
      name: "Alex Turner",
      avatar: "AT",
      service: "Wellness Coaching",
      lastSession: "Last session: Feb 15, 2024",
      clientType: "Mantra",
    },
    {
      id: "6",
      name: "Lisa Anderson",
      avatar: "LA",
      service: "Nutrition",
      lastSession: "New client",
      clientType: "Self",
    },
  ]);

  const dates = [
    { day: 13, month: "Aug", weekday: "Sun" },
    { day: 14, month: "Aug", weekday: "Mon" },
    { day: 15, month: "Aug", weekday: "Tue" },
    { day: 16, month: "Aug", weekday: "Wed" },
    { day: 17, month: "Aug", weekday: "Thu" },
    { day: 18, month: "Aug", weekday: "Fri" },
    { day: 19, month: "Aug", weekday: "Sat" },
  ];

  const times = [
    "09:30", "10:00", "10:30", 
    "11:00", "11:30", "12:00",
    "12:30", "13:00", "13:30", 
    "14:00", "14:30", "15:00",
  ];

  const services = ["Therapy", "Emotional Wellbeing", "Personal Coach", "Meditation", "Wellness Coaching", "Nutrition"];

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-navigate to schedule step if client is preselected
  useEffect(() => {
    if (preselectedClient && isOpen) {
      setStep("schedule");
      const clientCredits = preselectedClient.credits;
      setSelectedClient({
        id: preselectedClient.id,
        name: preselectedClient.name,
        avatar: preselectedClient.avatar,
        service: preselectedClient.service,
        clientType: "Self",
        credits: clientCredits,
      });
      if (clientCredits === 0) {
        setAddAITranscriber(false);
      } else {
        setAddAITranscriber(true);
      }
    }
  }, [preselectedClient, isOpen]);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    if (client.credits === 0) {
      setAddAITranscriber(false);
    } else {
      setAddAITranscriber(true);
    }
  };

  const handleContinueFromClient = () => {
    if (selectedClient) {
      setStep("schedule");
    }
  };

  const handleAddNewClient = () => {
    setStep("addClient");
  };

  const handleSaveNewClient = () => {
    if (newClientFirstName && newClientLastName) {
      const fullName = `${newClientFirstName} ${newClientLastName}`;
      const avatar = `${newClientFirstName[0]}${newClientLastName[0]}`.toUpperCase();
      
      const newClient: Client = {
        id: `client-${Date.now()}`,
        name: fullName,
        avatar: avatar,
        service: newClientService,
        lastSession: "New client",
        clientType: "Self",
      };

      setClients([...clients, newClient]);
      setSelectedClient(newClient);
      
      // Reset form
      setNewClientFirstName("");
      setNewClientLastName("");
      setNewClientEmail("");
      setNewClientService("Therapy");
      
      // Go to date selection
      setStep("schedule");
    }
  };

  const handleDateSelect = (date: { day: number; month: string; weekday: string }) => {
    setSelectedDate(date);
  };

  const handleBack = () => {
    if (step === "confirmation") {
      setStep("schedule");
    } else if (step === "schedule") {
      setStep("client");
      setSelectedDate(null);
      setSelectedTime("");
    } else if (step === "addClient") {
      setStep("client");
      setNewClientFirstName("");
      setNewClientLastName("");
      setNewClientEmail("");
    }
  };

  const handleConfirm = () => {
    if (selectedClient && selectedDate && selectedTime) {
      setStep("confirmation");
    }
  };

  const handleFinalConfirm = () => {
    if (selectedClient && selectedDate && selectedTime) {
      onAddAppointment({
        clientId: selectedClient.id,
        clientName: selectedClient.name,
        service: selectedClient.service,
        date: `${selectedDate.month} ${selectedDate.day}`,
        time: selectedTime,
        sessionType,
        location: location === "enterAddress" ? customAddress : location,
      });
      setStep("success");
    }
  };

  const handleClose = () => {
    setStep("client");
    setSelectedClient(null);
    setSelectedDate(null);
    setSelectedTime("");
    setSessionType("video");
    setLocation("online");
    setCustomAddress("");
    setSearchQuery("");
    setNewClientFirstName("");
    setNewClientLastName("");
    setNewClientEmail("");
    setGetReminderCall(false);
    setAddAITranscriber(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:pl-[100px]"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-[520px] w-full max-h-[90vh] flex flex-col ${
            step === "client" && showClientDropdown && searchQuery.trim() ? "h-[600px]" : ""
          }`}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3.5 md:py-4 flex items-center justify-between z-10 flex-shrink-0 rounded-t-2xl">
            {step !== "client" && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleBack}
                className="p-1.5 md:p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="size-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
            )}
            <h2 className={`text-base md:text-lg font-semibold text-gray-900 dark:text-white ${step === "client" ? "" : "flex-1 text-center"}`}>
              {step === "client" && "Choose Client"}
              {step === "addClient" && "Add New Client"}
              {step === "schedule" && "Schedule Appointment"}
              {step === "confirmation" && "Schedule Appointment"}
              {step === "time" && "Schedule Appointment"}
              {step === "success" && "Appointment Request Sent"}
            </h2>
            <button
              onClick={handleClose}
              className="p-1.5 md:p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="size-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* Step 1: Choose Client */}
              {step === "client" && (
                <motion.div
                  key="client"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {/* Client Label */}
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Client
                  </label>

                  {/* Search Dropdown Container */}
                  <div className="relative mb-4">
                    {/* Search Input with Dropdown Style */}
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none z-10" />
                      <input
                        type="text"
                        placeholder="Search clients..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowClientDropdown(true);
                        }}
                        onFocus={() => setShowClientDropdown(true)}
                        className="w-full pl-12 pr-12 py-3 bg-white dark:bg-gray-750 border-2 border-[#00c0ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white placeholder-gray-400"
                      />
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Dropdown List */}
                    {showClientDropdown && searchQuery.trim() && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-[220px] overflow-y-auto z-20">
                        {filteredClients.length > 0 ? (
                          <div className="p-2">
                            {filteredClients.map((client) => (
                              <button
                                key={client.id}
                                onClick={() => {
                                  handleClientSelect(client);
                                  setShowClientDropdown(false);
                                  setSearchQuery(client.name);
                                }}
                                className="w-full p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left flex items-center gap-3"
                              >
                                <div className="size-10 bg-gradient-to-br from-[#00c0ff] to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                                  {client.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                    {client.name}
                                    {client.clientType === "Mantra" && (
                                      <span className="text-base">🔵</span>
                                    )}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{client.service}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-6 text-center">
                            <p className="text-gray-600 dark:text-gray-400 mb-3">
                              <span className="font-semibold">"{searchQuery}"</span> not found
                            </p>
                            <button
                              onClick={() => {
                                handleAddNewClient();
                                setShowClientDropdown(false);
                              }}
                              className="px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg transition-colors font-medium"
                            >
                              Add Client
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Continue Button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={handleContinueFromClient}
                    disabled={!selectedClient}
                    className={`w-full py-3 rounded-lg font-medium transition-all mt-4 ${
                      selectedClient
                        ? "bg-[#4169E1] hover:bg-[#3557c7] text-white shadow-sm hover:shadow-md"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </motion.button>
                </motion.div>
              )}

              {/* Add New Client Form */}
              {step === "addClient" && (
                <motion.div
                  key="addClient"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newClientFirstName}
                      onChange={(e) => setNewClientFirstName(e.target.value)}
                      placeholder="Enter first name"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newClientLastName}
                      onChange={(e) => setNewClientLastName(e.target.value)}
                      placeholder="Enter last name"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={newClientEmail}
                      onChange={(e) => setNewClientEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service Type
                    </label>
                    <select
                      value={newClientService}
                      onChange={(e) => setNewClientService(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                    >
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleSaveNewClient}
                    disabled={!newClientFirstName || !newClientLastName}
                    className={`w-full py-3 rounded-lg font-medium transition-all mt-6 ${
                      newClientFirstName && newClientLastName
                        ? "bg-[#00c0ff] hover:bg-[#00a8e8] text-white shadow-sm hover:shadow-md"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Save & Continue
                  </button>
                </motion.div>
              )}

              {/* Step 2: Schedule Appointment (Combined Date + Time + Details) */}
              {step === "schedule" && selectedClient && (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Selected Client Info with Timezone */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between gap-2 mb-6"
                  >
                    <div className="flex items-center gap-2.5 md:gap-3 flex-1 min-w-0">
                      <img 
                        src="https://images.unsplash.com/photo-1729337531424-198f880cb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMHdvbWFuJTIwY291bnNlbG9yJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0MzI5MjExfDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt={selectedClient.name}
                        className="size-10 md:size-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm md:text-[15px] text-gray-900 dark:text-white truncate">
                          {selectedClient.name}
                        </h3>
                        <p className="text-xs md:text-[12px] text-[#00A7E1] mt-0.5 truncate">
                          {selectedClient.service}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex-shrink-0">
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="appearance-none pl-5 md:pl-7 pr-6 md:pr-6 py-1.5 md:py-1.5 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded text-[10px] md:text-[12px] text-[#00A7E1] focus:outline-none focus:ring-1 focus:ring-[#00c0ff] cursor-pointer font-normal"
                      >
                        <option value="Asia/Calcutta">Asia/Calcutta</option>
                        <option value="America/New_York">America/New York</option>
                        <option value="Europe/London">Europe/London</option>
                        <option value="Asia/Tokyo">Asia/Tokyo</option>
                      </select>
                      <Clock className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 size-2.5 md:size-3 text-[#00A7E1] pointer-events-none" />
                      <ChevronDown className="absolute right-1 md:right-1.5 top-1/2 -translate-y-1/2 size-2.5 md:size-3 text-[#00A7E1] pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Date Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-3">
                      What day works best for you?
                    </h3>
                    <div className="flex justify-between gap-1">
                      {dates.map((date, index) => (
                        <motion.button
                          key={`${date.month}-${date.day}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + index * 0.03 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDateSelect(date)}
                          className={`flex-1 py-2.5 px-2 rounded-xl text-center transition-all ${
                            selectedDate?.day === date.day
                              ? "bg-[#00D4FF] text-white shadow-sm"
                              : "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          <div className={`text-[11px] mb-1 font-medium ${selectedDate?.day === date.day ? "text-white" : "text-[#6B7280]"}`}>
                            {date.weekday}
                          </div>
                          <div className={`text-[20px] font-bold mb-1 ${selectedDate?.day === date.day ? "text-white" : "text-[#1F2937]"}`}>
                            {date.day}
                          </div>
                          <div className={`text-[11px] font-medium ${selectedDate?.day === date.day ? "text-white" : "text-[#6B7280]"}`}>
                            {date.month}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Time Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mb-6"
                  >
                    <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-3">
                      What time works?
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {times.map((time, index) => {
                        const isDisabled = time === "09:30" || time === "11:30";
                        return (
                          <motion.button
                            key={time}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 + index * 0.02 }}
                            whileHover={{ scale: isDisabled ? 1 : 1.02 }}
                            whileTap={{ scale: isDisabled ? 1 : 0.98 }}
                            onClick={() => !isDisabled && setSelectedTime(time)}
                            disabled={isDisabled}
                            className={`py-2.5 rounded-lg text-center text-[14px] font-medium transition-all border ${
                              selectedTime === time
                                ? "bg-[#00D4FF] text-white border-[#00D4FF] shadow-sm"
                                : isDisabled
                                ? "bg-[#F5F5F5] dark:bg-gray-750 border-[#F5F5F5] dark:border-gray-600 text-[#D1D5DB] dark:text-gray-500 cursor-not-allowed"
                                : "bg-white dark:bg-gray-750 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                            }`}
                          >
                            {time}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Session Type */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Session type:
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSessionType("video")}
                        className={`py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
                          sessionType === "video"
                            ? "bg-[#00c0ff] text-white shadow-sm"
                            : "bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <Video className="size-4" />
                        <span className="font-medium">Video</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSessionType("chat")}
                        className={`py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
                          sessionType === "chat"
                            ? "bg-[#00c0ff] text-white shadow-sm"
                            : "bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <MessageSquare className="size-4" />
                        <span className="font-medium">Chat</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSessionType("in-person")}
                        className={`py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
                          sessionType === "in-person"
                            ? "bg-[#00c0ff] text-white shadow-sm"
                            : "bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <MapPin className="size-4" />
                        <span className="font-medium">In Person</span>
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Location */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mb-6"
                  >
                    <label className="block text-gray-900 dark:text-white font-medium mb-4">
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
                  </motion.div>

                  {/* AI Transcriber Checkbox */}
                  {sessionType !== "in-person" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28 }}
                      className="mb-6"
                    >
                      <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                        <div className="p-4 bg-gradient-to-r from-purple-50/80 via-indigo-50/50 to-teal-50/60 dark:from-purple-950/30 dark:via-indigo-950/30 dark:to-teal-950/30 rounded-2xl border border-purple-200 dark:border-purple-800/60">
                          <div className="flex items-center justify-between gap-3">
                            <label className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                              <input
                                type="checkbox"
                                checked={addAITranscriber}
                                onChange={(e) => setAddAITranscriber(e.target.checked)}
                                className="size-5 rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-600 cursor-pointer flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                    Add AI Transcriber to session
                                  </span>
                                  {selectedClient?.credits === 0 && !addAITranscriber ? (
                                    <span className="inline-flex items-center px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 text-[10px] font-bold rounded-full border border-amber-300/50 flex-shrink-0">
                                      0 Credits
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2 py-0.5 bg-purple-600 text-white text-[10px] font-bold rounded-full flex-shrink-0">
                                      AI
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 truncate">
                                  Automatically transcribe & generate SOAP note
                                </p>
                              </div>
                            </label>
                          </div>

                          {selectedClient?.credits === 0 && !addAITranscriber && (
                            <div className="mt-3 pt-2.5 border-t border-purple-200/60 dark:border-purple-800/60 flex items-center justify-between text-xs">
                              <span className="text-gray-500 dark:text-gray-400 text-[11px]">Need credits to enable AI Transcriber?</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate('/settings/billing/credit-usage');
                                }}
                                className="font-bold text-purple-700 dark:text-purple-300 hover:text-purple-800 flex items-center gap-1 cursor-pointer hover:underline text-xs"
                              >
                                <span>Buy Credits</span>
                                <ChevronRight className="size-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Confirm Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: selectedDate && selectedTime ? 1.02 : 1 }}
                    whileTap={{ scale: selectedDate && selectedTime ? 0.98 : 1 }}
                    onClick={handleConfirm}
                    disabled={!selectedDate || !selectedTime}
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      selectedDate && selectedTime
                        ? "bg-[#00c0ff] hover:bg-[#00a8e8] text-white shadow-sm hover:shadow-md"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Confirm Appointment
                  </motion.button>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {step === "confirmation" && selectedClient && selectedDate && selectedTime && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Overlapping Avatars */}
                  <div className="flex justify-center mb-4">
                    <div className="relative flex items-center justify-center">
                      {/* Partner Avatar (left) */}
                      <div className="size-[120px] rounded-full overflow-hidden border-4 border-white dark:border-gray-800 relative z-10 shadow-lg">
                        <img
                          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
                          alt="Dr. Michael Brown"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Client Avatar (right, overlapping) */}
                      <div className="size-[120px] rounded-full overflow-hidden border-4 border-white dark:border-gray-800 -ml-10 shadow-lg">
                        {typeof selectedClient.avatar === "string" && selectedClient.avatar.length === 2 ? (
                          <div className="w-full h-full bg-gradient-to-br from-[#00c0ff] to-purple-600 flex items-center justify-center text-white font-semibold text-2xl">
                            {selectedClient.avatar}
                          </div>
                        ) : (
                          <img
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
                            alt={selectedClient.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Names with Video Icon */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="size-9 bg-[#00d4ff] rounded-full flex items-center justify-center flex-shrink-0">
                      <Video className="size-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white text-base">Dr. Michael Brown</span>
                    <svg className="size-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8l-4 4m0 0l4 4m-4-4h18" />
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H3" />
                    </svg>
                    <span className="font-semibold text-gray-900 dark:text-white text-base">{selectedClient.name}</span>
                  </div>

                  {/* Details Box */}
                  <div className="bg-[#f8f9fa] dark:bg-gray-700/30 rounded-2xl p-6 space-y-5">
                    {/* Service Row */}
                    <div className="flex items-center gap-4">
                      <svg className="size-6 text-[#4169E1] flex-shrink-0" fill="none" viewBox="0 0 24 24">
                        <rect width="18" height="18" x="3" y="4" stroke="currentColor" strokeWidth="2" rx="2" />
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M8 3v4m8-4v4" />
                      </svg>
                      <div className="flex-1">
                        <span className="text-gray-900 dark:text-white font-semibold">Service: </span>
                        <span className="text-gray-700 dark:text-gray-300">{selectedClient.service}</span>
                      </div>
                    </div>

                    {/* Time Row */}
                    <div className="flex items-center gap-4">
                      <Clock className="size-6 text-[#4169E1] flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-gray-900 dark:text-white font-semibold">Time: </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {selectedDate.month}-{selectedDate.day} at {selectedTime}
                        </span>
                      </div>
                    </div>

                    {/* Duration Row */}
                    <div className="flex items-center gap-4">
                      <svg className="size-6 text-[#4169E1] flex-shrink-0" fill="none" viewBox="0 0 24 24">
                        <rect width="14" height="18" x="5" y="3" stroke="currentColor" strokeWidth="2" rx="2" />
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6M9 11h6M9 15h4" />
                      </svg>
                      <div className="flex-1">
                        <span className="text-gray-900 dark:text-white font-semibold">Duration: </span>
                        <span className="text-gray-700 dark:text-gray-300">30 mins</span>
                      </div>
                    </div>

                    {/* AI Transcriber Row (if enabled) */}
                    {addAITranscriber && (
                      <div className="flex items-center gap-4">
                        <svg className="size-6 text-[#14B8A6] flex-shrink-0" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                        </svg>
                        <div className="flex-1">
                          <span className="text-gray-900 dark:text-white font-semibold">AI Transcriber: </span>
                          <span className="text-[#14B8A6] font-medium">Enabled</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center justify-center gap-3 py-2">
                    <input
                      type="checkbox"
                      id="reminder-call"
                      checked={getReminderCall}
                      onChange={(e) => setGetReminderCall(e.target.checked)}
                      className="size-5 rounded border-gray-300 text-[#00d4ff] focus:ring-[#00d4ff] cursor-pointer"
                    />
                    <label htmlFor="reminder-call" className="text-base text-gray-700 dark:text-gray-300 cursor-pointer">
                      Get reminder over a call
                    </label>
                  </div>

                  {/* Confirm Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleFinalConfirm}
                    className="w-full py-4 bg-[#00d4ff] hover:bg-[#00bfe8] text-white rounded-xl font-semibold text-base transition-all shadow-sm hover:shadow-md"
                  >
                    Confirm
                  </motion.button>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="py-4"
                >
                  {/* Green Circle with Thumbs Up */}
                  <div className="flex justify-center mb-6">
                    <div className="size-20 bg-[#14B8A6] rounded-full flex items-center justify-center">
                      <ThumbsUp className="size-10 text-white" />
                    </div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">
                    Appointment Request Sent
                  </h3>

                  {/* Description Text */}
                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-900 dark:text-white text-left mb-3">
                      Next Steps
                    </p>
                    <div className="text-left space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        <span className="font-semibold">1. Wait for confirmation:</span> You'll get a notification once the client confirms.
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        <span className="font-semibold">2. Message early:</span> Chat with the client 5 minutes before the session starts.
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        <span className="font-semibold">3. Share the link:</span> Send the session link in the chat at the scheduled time.
                      </p>
                      {addAITranscriber && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          <span className="font-semibold">4. AI Transcriber:</span> Your AI Transcriber will automatically join and transcribe this session.
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-left mt-3">
                      <a href="#" className="text-[#00c0ff] hover:underline font-medium">
                        How it works?
                      </a>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleClose();
                        navigate('/sessions');
                      }}
                      className="py-3.5 bg-[#003459] hover:bg-[#002a47] text-white rounded-xl font-semibold text-sm transition-all shadow-sm"
                    >
                      View Appointment
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClose}
                      className="py-3.5 bg-white dark:bg-gray-800 border-2 border-[#00c0ff] text-[#00c0ff] rounded-xl font-semibold text-sm transition-all hover:bg-[#00c0ff]/5 flex items-center justify-center gap-2"
                    >
                      <Calendar className="size-4" />
                      Add to Calendar
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}