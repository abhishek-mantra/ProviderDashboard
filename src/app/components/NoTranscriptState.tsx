import { Mic, Upload } from "lucide-react";

interface NoTranscriptStateProps {
  onUpload?: () => void;
  onRecord?: () => void;
}

export function NoTranscriptState({ onUpload, onRecord }: NoTranscriptStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      {/* Icon */}
      <div className="mb-4">
        <Mic className="size-12 text-[#CBD5E1]" />
      </div>

      {/* Title */}
      <h3 className="text-[#374151] text-base font-bold mb-1">
        No transcript added
      </h3>

      {/* Subtitle */}
      <p className="text-[#94A3B8] text-[13px] text-center mb-6 max-w-xs">
        Add a transcript to unlock AI-powered auto-fill
      </p>

      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-2">
        <button
          onClick={onUpload}
          className="w-full h-11 px-4 flex items-center justify-center gap-2 bg-white border-[1.5px] border-[#E2E8F0] rounded-xl text-[#374151] text-[14px] font-semibold hover:border-[#CBD5E1] hover:bg-gray-50 transition-all"
        >
          <Upload className="size-4" />
          Upload Transcript
        </button>
        <button
          onClick={onRecord}
          className="w-full h-11 px-4 flex items-center justify-center gap-2 bg-[#EFF6FF] border-[1.5px] border-[#BFDBFE] rounded-xl text-[#2563EB] text-[14px] font-semibold hover:bg-[#DBEAFE] transition-all"
        >
          <Mic className="size-4" />
          Record Session
        </button>
      </div>
    </div>
  );
}
