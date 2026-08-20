import { useState } from "react";
import { X, User, FileText, Mic, CreditCard, Shield, Clock, CheckCircle2, ArrowRight, ExternalLink, Calendar, Stethoscope, Sparkles, AlertCircle, Play, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useFirstTimeUser } from "../../contexts/FirstTimeUserContext";
import { useNavigate } from "react-router";

export function DemoClientModal() {
  const { activeDemoModal, closeDemoModal, demoClient, toggleTask, isTaskComplete } = useFirstTimeUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "soap" | "scribe" | "superbill">(
    activeDemoModal === "chart" ? "overview" : activeDemoModal || "overview"
  );
  const [isSimulatingAudio, setIsSimulatingAudio] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");

  if (!activeDemoModal) return null;

  const handleSimulateScribe = () => {
    setIsSimulatingAudio(true);
    setTranscribedText("Listening to ambient session audio...");
    setTimeout(() => {
      setTranscribedText("Client: 'I’ve had a lot of racing thoughts at night before bed due to upcoming project milestones.'");
    }, 1000);
    setTimeout(() => {
      setTranscribedText((prev) => prev + "\nTherapist: 'Let’s review the thought-challenging exercise we discussed last week. How did you respond?'");
    }, 2200);
    setTimeout(() => {
      setTranscribedText((prev) => prev + "\nClient: 'I tried writing down the worst-case vs most likely outcome. It helped reduce my panic from an 8 down to a 4.'");
      setIsSimulatingAudio(false);
      if (!isTaskComplete("task-try-ai-scribe")) {
        toggleTask("task-try-ai-scribe");
      }
    }, 3600);
  };

  const handleGoToFullClient = () => {
    if (!isTaskComplete("task-explore-demo")) {
      toggleTask("task-explore-demo");
    }
    closeDemoModal();
    navigate(`/clients`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden ring-1 ring-black/10"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                CR
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {demoClient.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {demoClient.mrn} · DEMO CASE
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {demoClient.gender} · {demoClient.age} yrs (DOB: {demoClient.dob}) · {demoClient.insurance}
                </p>
              </div>
            </div>
            <button
              onClick={closeDemoModal}
              className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold">
            {[
              { id: "overview", label: "Patient Profile & Chart", icon: User },
              { id: "soap", label: "Clinical SOAP Note", icon: FileText },
              { id: "scribe", label: "AI Scribe Simulator", icon: Mic },
              { id: "superbill", label: "Superbill & CMS-1500", icon: CreditCard },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-1.5 pb-2.5 px-2.5 border-b-2 transition-all ${
                  activeTab === id
                    ? "border-blue-600 text-blue-600 dark:text-blue-400 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <Icon className="size-3.5" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {activeTab === "overview" && (
              <div className="space-y-4">
                {/* Clinical Diagnostic Tile */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Primary Clinical Diagnosis
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {demoClient.diagnosis}
                      </h4>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-[11px] font-mono text-blue-700 dark:text-blue-300 font-semibold mt-1.5">
                        ICD-10: {demoClient.diagnosisCode}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-lg border border-emerald-200 dark:border-emerald-800">
                      Active In Care
                    </span>
                  </div>
                </div>

                {/* Grid info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-850">
                    <p className="text-slate-400 text-[11px] font-medium">Insurance Coverage</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{demoClient.insurance}</p>
                    <p className="text-[11px] text-slate-500 mt-1">ID: {demoClient.memberId} · Co-pay: {demoClient.copay}</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-850">
                    <p className="text-slate-400 text-[11px] font-medium">Contact & Secure Communication</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{demoClient.email}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{demoClient.phone}</p>
                  </div>
                </div>

                {/* Treatment Pathway Summary */}
                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-2">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Stethoscope className="size-3.5 text-blue-600" />
                    Care Pathway & Treatment Goals
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Goal 1: Reduction in GAD-7 score from moderate (13) to mild (&le;7) within 8 weeks through cognitive restructuring.
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Goal 2: Implementation of diaphragmatic breathing and structured sleep hygiene protocol.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "soap" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">Session Note — {demoClient.recentSoapNote.date}</span>
                    <span className="text-slate-400 ml-2">CPT {demoClient.recentSoapNote.cptCode}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded">
                    Signed & Locked
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                    <h5 className="font-bold text-blue-700 dark:text-blue-400 mb-1">Subjective (S)</h5>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {demoClient.recentSoapNote.subjective}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                    <h5 className="font-bold text-blue-700 dark:text-blue-400 mb-1">Objective (O)</h5>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {demoClient.recentSoapNote.objective}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                    <h5 className="font-bold text-blue-700 dark:text-blue-400 mb-1">Assessment (A)</h5>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {demoClient.recentSoapNote.assessment}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                    <h5 className="font-bold text-blue-700 dark:text-blue-400 mb-1">Plan (P)</h5>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {demoClient.recentSoapNote.plan}
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                    <Shield className="size-3 text-emerald-500" />
                    <span>{demoClient.recentSoapNote.signedBy}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "scribe" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-xs">
                  <h4 className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
                    <Sparkles className="size-4 text-blue-600" />
                    Ambient AI Scribe Demonstration
                  </h4>
                  <p className="text-blue-800/80 dark:text-blue-300/80 mt-1 leading-relaxed">
                    Click the button below to test how Mantra ambient intelligence captures session dialog and auto-formats clinical documentation.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-900 text-slate-100 font-mono text-xs min-h-[140px] flex flex-col justify-between">
                  <div className="whitespace-pre-line leading-relaxed">
                    {transcribedText || "Press 'Simulate Live Recording' to stream clinical dialog..."}
                  </div>
                  {isSimulatingAudio && (
                    <div className="flex items-center gap-2 text-cyan-400 text-[11px] pt-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                      </span>
                      <span>Streaming medical audio & parsing semantic intent...</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSimulateScribe}
                  disabled={isSimulatingAudio}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
                >
                  <Play className="size-3.5 fill-white" />
                  <span>{isSimulatingAudio ? "Processing Audio Stream..." : "Simulate Live Recording (Demo Audio)"}</span>
                </button>
              </div>
            )}

            {activeTab === "superbill" && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Itemized Patient Superbill</h4>
                      <p className="text-[11px] text-slate-500">Ref #{demoClient.sampleSuperbill.billNumber} · Date of Service: {demoClient.sampleSuperbill.serviceDate}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 text-[11px] font-bold rounded-lg border border-amber-200 dark:border-amber-800">
                      {demoClient.sampleSuperbill.status}
                    </span>
                  </div>

                  <div className="pt-3 space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">CPT Code {demoClient.sampleSuperbill.cptCode} — {demoClient.sampleSuperbill.description}</span>
                      <span className="font-bold text-slate-900 dark:text-white">${demoClient.sampleSuperbill.fee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-slate-500">
                      <span>Patient Co-pay Collected</span>
                      <span className="text-emerald-600 font-semibold">-${demoClient.sampleSuperbill.patientPaid.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-1 font-bold text-sm text-slate-900 dark:text-white">
                      <span>Insurance Balance Pending</span>
                      <span className="text-blue-600 dark:text-blue-400">${demoClient.sampleSuperbill.balanceDue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed">
                  Superbills are formatted to standard CMS-1500 box specifications, ready for direct patient insurance reimbursement submission or clearinghouse EDI-837 batch dispatch.
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850 flex items-center justify-between">
            <p className="text-[11px] text-slate-400">
              Demo case pre-populated for onboarding review.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={closeDemoModal}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleGoToFullClient}
                className="px-4 py-2 bg-[#043570] hover:bg-[#032857] text-white rounded-xl text-xs font-bold transition-all shadow flex items-center gap-1.5"
              >
                <span>Open in Client Directory</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
