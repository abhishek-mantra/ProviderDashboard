import { useState } from "react";
import { X, Search, ChevronRight, ChevronLeft, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

interface Client {
  id: string;
  name: string;
  initials: string;
  lastSession: string;
  transcriptCount: number;
  avatar?: string;
}

interface AddPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockClients: Client[] = [
  { id: "1", name: "Sarah Johnson", initials: "SJ", lastSession: "Mar 14, 2026", transcriptCount: 0 },
  { id: "2", name: "Michael Chen", initials: "MC", lastSession: "Mar 12, 2026", transcriptCount: 0 },
  { id: "3", name: "David Martinez", initials: "DM", lastSession: "Mar 8, 2026", transcriptCount: 0 },
  { id: "4", name: "Emily Watson", initials: "EW", lastSession: "Mar 6, 2026", transcriptCount: 0 },
  { id: "5", name: "Priya Sharma", initials: "PS", lastSession: "Feb 20, 2026", transcriptCount: 0 },
];

const mockSessions: Record<string, { id: string; date: string; time: string; mode: string; duration: string }[]> = {
  "1": [
    { id: "s1", date: "Mar 14, 2026", time: "10:00 AM", mode: "Video Call", duration: "50 min" },
    { id: "s2", date: "Mar 7, 2026", time: "10:00 AM", mode: "Video Call", duration: "50 min" },
  ],
  "2": [{ id: "s3", date: "Mar 12, 2026", time: "09:00 AM", mode: "Video Call", duration: "45 min" }],
  "3": [{ id: "s4", date: "Mar 8, 2026", time: "03:00 PM", mode: "In-Person", duration: "60 min" }],
  "4": [{ id: "s5", date: "Mar 6, 2026", time: "11:30 AM", mode: "Video Call", duration: "45 min" }],
  "5": [],
};

export function AddPrescriptionModal({ isOpen, onClose }: AddPrescriptionModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<"clients" | "sessions">("clients");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setStep("sessions");
  };

  const handleSessionSelect = (_session: { id: string }) => {
    navigate(`/clients/${selectedClient?.id}/prescriptions/create`);
    onClose();
  };

  const handleNoSession = () => {
    navigate(`/clients/${selectedClient?.id}/prescriptions/create`, { state: { hasSession: false } });
    onClose();
  };

  const handleBackToClients = () => {
    setStep("clients");
    setSelectedClient(null);
  };

  const clientSessions = selectedClient ? mockSessions[selectedClient.id] || [] : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-[24px] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
              {/* Gradient Header */}
              <div className="bg-gradient-to-br from-[#043570] to-[#0a5ca8] rounded-t-[24px] px-8 pt-7 pb-6 relative">
                <button
                  onClick={onClose}
                  className="absolute top-7 right-8 text-white/80 hover:text-white transition-colors"
                >
                  <X className="size-5" />
                </button>
                <h2 className="text-white text-[20px] font-bold mb-1">
                  Add Prescription
                </h2>
                <p className="text-white/60 text-[13px]">
                  AI-powered documentation from your sessions
                </p>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {step === "clients" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Search Bar */}
                    <div className="relative mb-4">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search clients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-11 pl-11 pr-4 border-[1.5px] border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#EC4899] focus:ring-2 focus:ring-[#EC4899]/20 transition-all"
                      />
                    </div>

                    {/* Client Cards */}
                    <div className="space-y-3">
                      {filteredClients.length === 0 ? (
                        <div className="text-center py-12">
                          <Search className="size-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 text-sm">No clients match your search</p>
                        </div>
                      ) : (
                        filteredClients.map((client) => (
                          <button
                            key={client.id}
                            onClick={() => handleClientSelect(client)}
                            className="w-full bg-white border-[1.5px] border-[#F1F5F9] rounded-2xl p-3.5 flex items-center gap-3.5 hover:border-[#EC4899] hover:bg-[#FFF1F7] hover:shadow-[0_4px_16px_rgba(236,72,153,0.08)] transition-all group"
                          >
                            {/* Avatar */}
                            <div className="size-12 rounded-full bg-gradient-to-br from-[#EC4899] to-[#DB2777] flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">{client.initials}</span>
                            </div>

                            {/* Client Info */}
                            <div className="flex-1 text-left min-w-0">
                              <div className="font-semibold text-[15px] text-gray-900 mb-0.5">
                                {client.name}
                              </div>
                              <div className="text-[13px] text-gray-500">
                                Last session: {client.lastSession}
                              </div>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                  client.transcriptCount > 0
                                    ? "bg-[#EFF6FF] text-[#2563EB]"
                                    : "bg-[#FEF3C7] text-[#D97706]"
                                }`}>
                                  {client.transcriptCount > 0 ? `${client.transcriptCount} transcripts` : "No transcripts"}
                                </span>
                              </div>
                            </div>

                            {/* Chevron */}
                            <ChevronRight className="size-5 text-[#CBD5E1] group-hover:text-[#EC4899] transition-colors flex-shrink-0" />
                          </button>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}

                {step === "sessions" && selectedClient && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Back Button */}
                    <button
                      onClick={handleBackToClients}
                      className="flex items-center gap-1.5 text-[#64748B] hover:text-[#043570] text-[13px] font-medium mb-4 transition-colors"
                    >
                      <ChevronLeft className="size-4" />
                      Back to clients
                    </button>

                    {/* Selected Client Pill */}
                    <div className="bg-gradient-to-br from-[#FFF1F7] to-[#FCE7F3] border-[1.5px] border-[#FBCFE8] rounded-xl px-3.5 py-2.5 mb-5 flex items-center gap-3">
                      <div className="size-9 rounded-full bg-gradient-to-br from-[#EC4899] to-[#DB2777] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">{selectedClient.initials}</span>
                      </div>
                      <span className="text-[14px] font-semibold text-gray-900">
                        {selectedClient.name}
                      </span>
                      <span className="text-[13px] text-[#DB2777] font-medium ml-auto">
                        {clientSessions.length} sessions available
                      </span>
                    </div>

                    {/* Session Cards */}
                    <div className="space-y-3">
                      {clientSessions.length === 0 ? (
                        <div className="text-center py-10">
                          <p className="text-gray-500 text-sm">No sessions found</p>
                        </div>
                      ) : (
                        clientSessions.map((session) => (
                          <button
                            key={session.id}
                            onClick={() => handleSessionSelect(session)}
                            className="w-full bg-white border-[1.5px] border-[#F1F5F9] rounded-2xl p-4 hover:border-[#EC4899] hover:bg-[#FFF1F7] hover:shadow-[0_4px_16px_rgba(236,72,153,0.08)] transition-all group text-left"
                          >
                            <div className="flex items-start gap-3.5">
                              {/* Calendar Icon */}
                              <div className="size-10 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#DB2777] flex items-center justify-center flex-shrink-0">
                                <Calendar className="size-5 text-white" />
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-[14px] text-gray-900 mb-1.5">
                                  {session.date} • {session.time}
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF1F7] text-[#DB2777]">
                                    {session.mode}
                                  </span>
                                  <span className="text-[11px] px-2 py-0.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] font-medium">
                                    {session.duration}
                                  </span>
                                </div>
                              </div>

                              <ChevronRight className="size-5 text-[#CBD5E1] group-hover:text-[#EC4899] transition-colors flex-shrink-0 mt-0.5" />
                            </div>
                          </button>
                        ))
                      )}
                    </div>

                    {/* Add Prescription Without Session */}
                    <div className="mt-4">
                      <button
                        onClick={handleNoSession}
                        className="w-full h-12 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl font-semibold text-[14px] transition-all flex items-center justify-center gap-2"
                      >
                        + Add Prescription Without Session
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
