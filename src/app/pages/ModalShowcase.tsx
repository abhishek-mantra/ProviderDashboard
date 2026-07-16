import { useState } from "react";
import { FileText, Pill, Sparkles } from "lucide-react";
import { AddSessionNoteModal } from "../components/AddSessionNoteModal";
import { AddPrescriptionModal } from "../components/AddPrescriptionModal";
import { NoTranscriptState } from "../components/NoTranscriptState";

export function ModalShowcase() {
  const [isSessionNoteModalOpen, setIsSessionNoteModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full mb-4">
            <Sparkles className="size-4 text-[#00c0ff]" />
            <span className="text-sm font-semibold text-gray-700">Premium UI Showcase</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            MantraCare EHR Modals
          </h1>
          <p className="text-lg text-gray-600">
            Premium modal flows for Session Notes & Prescriptions
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Session Notes Card */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-[#043570] to-[#0a5ca8] p-8">
              <div className="size-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                <FileText className="size-7 text-white" />
              </div>
              <h2 className="text-white text-2xl font-bold mb-2">
                Add Session Notes
              </h2>
              <p className="text-white/70 text-sm">
                AI-powered documentation with transcript integration
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-[#00c0ff]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#00c0ff] text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">With/Without Transcript Toggle</p>
                    <p className="text-xs text-gray-500">Flexible workflow for all scenarios</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-[#00c0ff]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#00c0ff] text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Premium Client Cards</p>
                    <p className="text-xs text-gray-500">Search, select, and track transcripts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-[#00c0ff]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#00c0ff] text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Session Details Form</p>
                    <p className="text-xs text-gray-500">Date, time, mode with optional upload</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsSessionNoteModalOpen(true)}
                className="w-full h-12 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] text-white rounded-xl font-semibold shadow-[0_4px_16px_rgba(37,99,235,0.30)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.40)] transition-all"
              >
                Open Modal
              </button>
            </div>
          </div>

          {/* Prescription Card */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-[#043570] to-[#0a5ca8] p-8">
              <div className="size-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                <Pill className="size-7 text-white" />
              </div>
              <h2 className="text-white text-2xl font-bold mb-2">
                Add Prescription
              </h2>
              <p className="text-white/70 text-sm">
                AI-powered prescription with pink accent theme
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-[#EC4899]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#EC4899] text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Pink Accent Colors</p>
                    <p className="text-xs text-gray-500">Distinct visual identity for prescriptions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-[#EC4899]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#EC4899] text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Same Premium Flow</p>
                    <p className="text-xs text-gray-500">Consistent UX across features</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-[#EC4899]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#EC4899] text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Context Preservation</p>
                    <p className="text-xs text-gray-500">Session data flows to destination page</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsPrescriptionModalOpen(true)}
                className="w-full h-12 bg-gradient-to-br from-[#DB2777] to-[#be185d] text-white rounded-xl font-semibold shadow-[0_4px_16px_rgba(219,39,119,0.28)] hover:shadow-[0_6px_20px_rgba(219,39,119,0.38)] transition-all"
              >
                Open Modal
              </button>
            </div>
          </div>
        </div>

        {/* Empty State Preview */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">No Transcript Empty State</h3>
            <p className="text-sm text-gray-600">Appears when user arrives without selecting a transcript</p>
          </div>
          <div className="bg-gray-50">
            <NoTranscriptState
              onUpload={() => alert("Upload clicked")}
              onRecord={() => alert("Record clicked")}
            />
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-6">
            <div className="size-10 rounded-lg bg-gradient-to-br from-[#00c0ff] to-[#2563EB] flex items-center justify-center mb-3">
              <span className="text-white text-lg">🎨</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Premium Design</h4>
            <p className="text-sm text-gray-600">
              Dark navy gradient headers, rounded-[24px] cards, shadow-heavy UI
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-6">
            <div className="size-10 rounded-lg bg-gradient-to-br from-[#EC4899] to-[#DB2777] flex items-center justify-center mb-3">
              <span className="text-white text-lg">⚡</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Smooth Animations</h4>
            <p className="text-sm text-gray-600">
              200ms transitions, sliding toggle, modal scale effects
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-6">
            <div className="size-10 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center mb-3">
              <span className="text-white text-lg">🔄</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Flexible Workflow</h4>
            <p className="text-sm text-gray-600">
              Support for with/without transcript paths, auto-fill ready
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddSessionNoteModal
        isOpen={isSessionNoteModalOpen}
        onClose={() => setIsSessionNoteModalOpen(false)}
      />
      <AddPrescriptionModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
      />
    </div>
  );
}
