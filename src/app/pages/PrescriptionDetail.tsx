import { useNavigate, useParams } from "react-router";
import { ArrowLeft, FileText, User, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

export function PrescriptionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sharedToPatient, setSharedToPatient] = useState(false);

  const handleShareToPatient = () => {
    // Send prescription to patient in Messages section
    setSharedToPatient(true);
    setTimeout(() => setSharedToPatient(false), 3000);
  };

  // Mock prescription data - would come from API in real app
  const prescription = {
    id: "247",
    number: "#247",
    patientName: "Rachit Sharma",
    patientId: "#168019",
    date: "Feb 8, 2026",
    chiefComplaints: ["Persistent cough", "Chest congestion"],
    medicalHistory: "No chronic conditions",
    provisionalDiagnosis: {
      title: "Acute Bronchitis",
      description: "Upper respiratory infection",
    },
    diagnosticTests: {
      title: "Chest X-Ray",
      description: "To rule out pneumonia",
    },
    medicines: [
      {
        name: "Crocin",
        genericName: "Acetaminophen",
        dosage: "500mg - Morning (After food)",
        duration: "Duration: 5 Days",
        instruction: "Take with plenty of water",
      },
    ],
    signature: "Digitally signed",
  };

  return (
    <div className="max-w-[900px] space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={() => navigate("/prescriptions")}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-5 md:size-6 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
          Prescriptions – Rachit
        </h1>
      </div>

      {/* Client Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="size-10 md:size-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <User className="size-5 md:size-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">{prescription.patientName}</h3>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{prescription.patientId}</p>
          </div>
        </div>
      </div>

      {/* Prescription Detail Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-4 md:p-6 space-y-5 md:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText className="size-4 md:size-5 text-blue-500" />
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                Prescription {prescription.number}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleShareToPatient}
                disabled={sharedToPatient}
                className="flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 bg-white dark:bg-gray-750 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors shadow-sm text-sm disabled:opacity-50"
              >
                <MessageCircle className="size-4" />
                <span>{sharedToPatient ? "Shared!" : "Share to Patient"}</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm text-sm">
                <Mail className="size-4" />
                <span>Email Prescription</span>
              </button>
            </div>
          </div>

          {/* Date */}
          <div>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1">Date</p>
            <p className="text-sm md:text-base text-gray-900 dark:text-white font-medium">{prescription.date}</p>
          </div>

          {/* Chief Complaints */}
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:mb-2.5">
              Chief Complaints
            </p>
            <div className="flex flex-wrap gap-2">
              {prescription.chiefComplaints.map((complaint, index) => (
                <span
                  key={index}
                  className="px-2.5 md:px-3 py-1 md:py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs md:text-sm font-medium"
                >
                  {complaint}
                </span>
              ))}
            </div>
          </div>

          {/* Medical History */}
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:mb-2.5">
              Medical History
            </p>
            <p className="text-xs md:text-sm text-purple-600 dark:text-purple-400 font-medium">
              {prescription.medicalHistory}
            </p>
          </div>

          {/* Provisional Diagnosis */}
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:mb-2.5">
              Provisional Diagnosis
            </p>
            <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-3 md:p-4">
              <p className="text-sm md:text-base font-semibold text-green-800 dark:text-green-400 mb-1">
                {prescription.provisionalDiagnosis.title}
              </p>
              <p className="text-xs md:text-sm text-green-700 dark:text-green-500">
                {prescription.provisionalDiagnosis.description}
              </p>
            </div>
          </div>

          {/* Diagnostic Tests */}
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:mb-2.5">
              Diagnostic Tests
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-3 md:p-4">
              <p className="text-sm md:text-base font-semibold text-amber-800 dark:text-amber-400 mb-1">
                {prescription.diagnosticTests.title}
              </p>
              <p className="text-xs md:text-sm text-amber-700 dark:text-amber-500">
                {prescription.diagnosticTests.description}
              </p>
            </div>
          </div>

          {/* Medicines */}
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:mb-2.5">Medicines</p>
            <div className="bg-gray-50 dark:bg-gray-750 rounded-xl p-3 md:p-4 space-y-1">
              {prescription.medicines.map((medicine, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
                    {medicine.name}{" "}
                    <span className="text-xs md:text-sm font-normal text-gray-600 dark:text-gray-400">
                      ({medicine.genericName})
                    </span>
                  </p>
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                    - {medicine.dosage}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {medicine.duration}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 italic">
                    {medicine.instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Signature */}
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:mb-2.5">Signature</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              ✓ {prescription.signature}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
