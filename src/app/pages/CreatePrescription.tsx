import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useSearchParams, useLocation } from "react-router";
import { ArrowLeft, FileText, User, Plus, X, ChevronDown, Search, Pill, Clock, ChevronLeft, ChevronRight, Sparkles, Mic, Paperclip, Upload } from "lucide-react";
import { usePlanMode } from "../contexts/PlanModeContext";
import { NoTranscriptState } from "../components/NoTranscriptState";
import { useTranscriberPrefill } from "../hooks/useTranscriberPrefill";

interface Medicine {
  name: string;
  genericName: string;
  dosage: string;
  duration: string;
}

interface SavedMedicine {
  id: string;
  name: string;
  saltName?: string;
  manufacturer?: string;
  dosageType?: string;
}

interface DosageRow {
  dosage: string;
  time: string;
  event: string;
}

interface SessionDate {
  id: string;
  date: string;
  displayDate: string;
}

// Mock session dates
const sessionDates: SessionDate[] = [
  { id: "1", date: "2026-03-14", displayDate: "Mar 14th, 2026 - 08:21 PM" },
  { id: "2", date: "2026-02-10", displayDate: "Feb 10, 2026 - 10:00 AM" },
  { id: "3", date: "2026-01-15", displayDate: "Jan 15, 2026 - 02:30 PM" },
];

// Mock transcript data
const mockTranscript = `Dr. Smith: Good afternoon, Rachit. How have you been feeling since our last session?

Rachit: Hi Dr. Smith. I've been okay, but work has been really overwhelming lately. The stress just keeps building up.

Dr. Smith: I understand. Can you tell me more about what's been causing the most stress at work?

Rachit: Well, I have multiple deadlines coming up, and I feel like I'm constantly falling behind. Even when I complete something, there's always something new waiting. It's exhausting.

Dr. Smith: That does sound challenging. Have you noticed any physical symptoms alongside these feelings?

Rachit: Yes, actually. I've been having trouble sleeping, and I get these tension headaches pretty often now. Sometimes my chest feels tight when I think about all the work I need to do.`;

// Mock AI noteworthy content
const mockAINotes = `**Session Overview**
This session focused on addressing work-related stress and anxiety with evidence-based coping strategies.

**Key Discussion Points**
• Client experiencing overwhelming stress from multiple work deadlines
• Physical symptoms: sleep difficulties, tension headaches, chest tightness
• Difficulty maintaining work-life boundaries
• Previous attempts at deep breathing not sustained

**Interventions Introduced**
1. **Progressive Muscle Relaxation**
   - Recommended 5-10 minutes daily practice
   - Client chose evening timing post-work

2. **5-4-3-2-1 Grounding Technique**
   - Taught for acute anxiety management
   - Involves identifying: 5 things seen, 4 touched, 3 heard, 2 smelled, 1 tasted`;


export function CreatePrescription() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { planMode } = usePlanMode();
  const { isFromTranscriber, demoTranscript, demoPrescriptionData } = useTranscriberPrefill();

  // Check if coming from AI Transcriber via location.state
  const locationState = location.state as {
    source?: string;
    prefilled?: boolean;
    clientName?: string;
    sessionDate?: string;
    sessionTime?: string;
    sessionMode?: string;
    noteType?: string;
    briefOverview?: string;
    hasTranscript?: boolean;
    transcriptId?: string;
  } | null;

  const prefilledClient = locationState?.clientName || "";
  const prefilledDate = locationState?.sessionDate || "";
  const prefilledOverview = locationState?.briefOverview || "";
  const hasTranscriptFromState = locationState?.hasTranscript ?? false;

  // Check if in transcriber-only mode
  const isTranscriberOnly = planMode === "transcriber-only";

  const [chiefComplaints, setChiefComplaints] = useState<string[]>(
    isFromTranscriber ? demoPrescriptionData.chiefComplaints : []
  );
  const [medicalHistory, setMedicalHistory] = useState<string[]>(
    isFromTranscriber ? demoPrescriptionData.medicalHistory : []
  );
  const [allergies, setAllergies] = useState<string[]>([]);
  const [provisionalDiagnoses, setProvisionalDiagnoses] = useState<string[]>(
    isFromTranscriber ? [demoPrescriptionData.provisionalDiagnosis] : []
  );
  const [diagnosticTests, setDiagnosticTests] = useState<string[]>(
    isFromTranscriber ? demoPrescriptionData.diagnosticTests : []
  );
  const [medicines, setMedicines] = useState<Medicine[]>(
    isFromTranscriber ? demoPrescriptionData.medicines.map(m => ({ ...m })) : []
  );
  const [hasSignature, setHasSignature] = useState(isFromTranscriber);
  const [showComplaintsModal, setShowComplaintsModal] = useState(false);
  const [complaintSearch, setComplaintSearch] = useState("");
  const [customComplaint, setCustomComplaint] = useState("");
  const [showMedicalHistoryModal, setShowMedicalHistoryModal] = useState(false);
  const [medicalHistorySearch, setMedicalHistorySearch] = useState("");
  const [showAllergiesModal, setShowAllergiesModal] = useState(false);
  const [allergySearch, setAllergySearch] = useState("");
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);
  const [diagnosisSearch, setDiagnosisSearch] = useState("");
  const [showDiagnosticTestsModal, setShowDiagnosticTestsModal] = useState(false);
  const [diagnosticTestSearch, setDiagnosticTestSearch] = useState("");
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  // Medicine management states
  const [savedMedicines, setSavedMedicines] = useState<SavedMedicine[]>([]);
  const [showMedicineSearchModal, setShowMedicineSearchModal] = useState(false);
  const [medicineSearch, setMedicineSearch] = useState("");
  const [showCreateMedicineModal, setShowCreateMedicineModal] = useState(false);
  const [showAddMedicineModal, setShowAddMedicineModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<SavedMedicine | null>(null);
  
  // Create medicine form states
  const [newMedicineName, setNewMedicineName] = useState("");
  const [newMedicineSaltName, setNewMedicineSaltName] = useState("");
  const [newMedicineManufacturer, setNewMedicineManufacturer] = useState("");
  const [newMedicineDosageType, setNewMedicineDosageType] = useState("");
  
  // Add medicine form states
  const [dosageRows, setDosageRows] = useState<DosageRow[]>([]);
  const [medicineDuration, setMedicineDuration] = useState("");
  const [medicineDurationType, setMedicineDurationType] = useState("");
  const [medicineNotes, setMedicineNotes] = useState("");
  const [showAddDosageModal, setShowAddDosageModal] = useState(false);
  const [newDosage, setNewDosage] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newEvent, setNewEvent] = useState("");

  // Signature states
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Right sidebar states
  const [activeTab, setActiveTab] = useState<"transcript" | "noteworthy">("transcript");
  const [selectedSessionId, setSelectedSessionId] = useState("1");
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const defaultComplaints = [
    "Fever",
    "Chills",
    "Cold",
    "Sore throat",
    "Headache",
    "Runny nose",
    "Nasal congestion",
    "Sneezing",
    "Shortness of breath",
    "Chest pain",
    "Palpitations",
    "Dizziness",
    "Weakness",
    "Fatigue",
    "Nausea",
    "Vomiting",
    "Diarrhea",
    "Constipation",
    "Abdominal pain",
    "Indigestion",
    "Bloating",
    "Heartburn",
    "Loss of appetite",
    "Weight loss",
    "Weight gain",
    "Joint pain",
    "Back pain",
    "Muscle cramps",
    "Numbness or tingling",
    "Burning sensation while urinating",
    "Increased frequency of urination",
    "Blood in urine",
    "Difficulty urinating",
    "Excessive thirst",
    "Night sweats",
    "Hoarseness of voice",
    "Difficulty swallowing",
    "Ear pain",
    "Ringing in ears (Tinnitus)",
    "Hearing loss",
    "Blurred vision",
    "Red eyes",
    "Eye pain",
    "Double vision",
    "Dry eyes",
    "Skin rash",
    "Itching (Pruritus)",
    "Hives",
    "Hair loss",
    "Increased sweating",
    "Cold hands and feet",
    "Choking sensation",
    "Seizures",
    "Loss of consciousness",
    "Fainting",
    "Tremors",
    "Memory loss",
    "Confusion",
    "Anxiety",
    "Depression",
    "Insomnia",
    "Panic attacks",
    "Mood swings",
    "Irritability",
    "Difficulty concentrating",
    "Hallucinations",
    "Paranoia",
    "Suicidal thoughts"
  ];

  const availableComplaints = ["Persistent cough", "Chest congestion", "Fever", "Headache", "Body ache"];
  const availableHistory = [" Hypertension", "Type 2 Diabetes", "Heart Disease", "No chronic conditions"];
  
  const defaultAllergies = [
    "Peanut Allergy",
    "Tree Nut Allergy",
    "Milk Allergy",
    "Egg Allergy",
    "Soy Allergy",
    "Wheat Allergy",
    "Gluten Allergy",
    "Shellfish Allergy",
    "Fish Allergy",
    "Sesame Allergy",
    "Corn Allergy",
    "Strawberry Allergy",
    "Citrus Allergy",
    "Chocolate Allergy",
    "Food Dye Allergy",
    "Pollen Allergy",
    "Dust Mite Allergy",
    "Mold Allergy",
    "Pet Dander Allergy",
    "Cat Allergy",
    "Dog Allergy",
    "Insect Sting Allergy",
    "Bee Sting Allergy",
    "Wasp Sting Allergy",
    "Mosquito Bite Allergy",
    "Penicillin Allergy",
    "Sulfa Drug Allergy",
    "Aspirin Allergy",
    "Ibuprofen Allergy",
    "Latex Allergy",
    "Nickel Allergy",
    "Fragrance Allergy",
    "Cosmetic Allergy",
    "Detergent Allergy",
    "Preservative Allergy",
    "Sun Allergy",
    "Cold Urticaria (Cold Allergy)",
    "Exercise-Induced Allergy",
    "Alcohol Intolerance"
  ];

  const defaultMedicalIssues = [
    "Heart Disease",
    "Chronic Obstructive Pulmonary Disease (COPD)",
    "Liver Disease",
    "Hepatitis B",
    "Hepatitis C",
    "Kidney Stones",
    "Osteoporosis",
    "Gout",
    "Thyroid Disorder",
    "Parkinson's Disease",
    "Alzheimer's Disease",
    "Multiple Sclerosis",
    "Cancer",
    "Breast Cancer",
    "Lung Cancer",
    "Prostate Cancer",
    "Colon Cancer",
    "Leukemia",
    "Lymphoma",
    "Sickle Cell Disease",
    "Hemophilia",
    "Sexually Transmitted Infections (STIs)",
    "Eczema",
    "Lupus",
    "Celiac Disease",
    "Crohn's Disease",
    "Ulcerative Colitis",
    "Gastric Ulcer",
    "GERD (Gastroesophageal Reflux Disease)",
    "Alcohol Use Disorder",
    "Substance Abuse",
    "Obesity",
    "PCOS",
    "Endometriosis",
    "Infertility",
    "Pregnancy Complications",
    "Menopause",
    "Benign Prostatic Hyperplasia (BPH)",
    "Erectile Dysfunction"
  ];

  const defaultDiagnoses = [
    "Upper Respiratory Tract Infection",
    "Gastroenteritis",
    "Hypertension",
    "Diabetes Mellitus",
    "Pneumonia",
    "Urinary Tract Infection",
    "Anemia",
    "Migraine",
    "Dengue Fever",
    "Typhoid Fever",
    "Bronchitis",
    "Asthma",
    "Tuberculosis",
    "Sinusitis",
    "Allergic Rhinitis",
    "Otitis Media",
    "Gastritis",
    "Peptic Ulcer Disease",
    "Hepatitis",
    "Cholecystitis"
  ];

  const defaultDiagnosticTests = [
    "Complete Blood Count (CBC)",
    "Blood Sugar Test",
    "Liver Function Test (LFT)",
    "Renal Function Test (RFT)",
    "Lipid Profile",
    "Thyroid Function Test (TFT)",
    "Urine Routine Examination",
    "Electrolyte Panel",
    "ECG (Electrocardiogram)",
    "Echocardiogram",
    "X-ray Chest",
    "MRI Brain",
    "CT Scan Abdomen",
    "Ultrasound Pelvis",
    "HbA1c Test",
    "D-Dimer Test",
    "PT/INR (Prothrombin Time/International Normalized Ratio)",
    "COVID-19 RT-PCR Test",
    "HIV Test",
    "Hepatitis B Test",
    "Hepatitis C Test",
    "Stool Routine Examination",
    "Blood Culture",
    "Skin Allergy Test",
    "Pulmonary Function Test (PFT)",
    "Bone Mineral Density Test (BMD)",
    "Serum Calcium Test",
    "C-Reactive Protein (CRP) Test",
    "Rheumatoid Factor (RF) Test",
    "ANA (Antinuclear Antibody) Test",
    "Vitamin D Test",
    "Vitamin B12 Test",
    "Pap Smear Test",
    "Mammogram",
    "PSA (Prostate-Specific Antigen) Test"
  ];

  // Filter complaints based on search
  const filteredComplaints = defaultComplaints.filter(complaint =>
    complaint.toLowerCase().includes(complaintSearch.toLowerCase())
  );

  // Filter medical history based on search
  const filteredMedicalHistory = defaultMedicalIssues.filter(issue =>
    issue.toLowerCase().includes(medicalHistorySearch.toLowerCase())
  );

  // Filter allergies based on search
  const filteredAllergies = defaultAllergies.filter(allergy =>
    allergy.toLowerCase().includes(allergySearch.toLowerCase())
  );

  // Filter diagnoses based on search
  const filteredDiagnoses = defaultDiagnoses.filter(diagnosis =>
    diagnosis.toLowerCase().includes(diagnosisSearch.toLowerCase())
  );

  // Filter diagnostic tests based on search
  const filteredDiagnosticTests = defaultDiagnosticTests.filter(test =>
    test.toLowerCase().includes(diagnosticTestSearch.toLowerCase())
  );

  // Filter saved medicines based on search
  const filteredSavedMedicines = savedMedicines.filter(medicine =>
    medicine.name.toLowerCase().includes(medicineSearch.toLowerCase())
  );

  const handleAddComplaint = (complaint: string) => {
    if (!chiefComplaints.includes(complaint)) {
      setChiefComplaints([...chiefComplaints, complaint]);
    }
  };

  const handleAddHistory = (history: string) => {
    if (!medicalHistory.includes(history)) {
      setMedicalHistory([...medicalHistory, history]);
    }
  };

  const handleAddAllergy = (allergy: string) => {
    if (!allergies.includes(allergy)) {
      setAllergies([...allergies, allergy]);
    }
  };

  const handleSelectDiagnosis = (diagnosis: string) => {
    if (!provisionalDiagnoses.includes(diagnosis)) {
      setProvisionalDiagnoses([...provisionalDiagnoses, diagnosis]);
    }
  };

  const handleAddDiagnosis = () => {
    setShowDiagnosisModal(true);
  };

  const handleAddTest = () => {
    setShowDiagnosticTestsModal(true);
  };

  const handleAddMedicine = () => {
    setShowMedicineSearchModal(true);
  };

  const handleCreateMedicine = () => {
    if (!newMedicineName.trim()) return;
    
    const newMedicine: SavedMedicine = {
      id: Date.now().toString(),
      name: newMedicineName,
      saltName: newMedicineSaltName,
      manufacturer: newMedicineManufacturer,
      dosageType: newMedicineDosageType
    };
    
    setSavedMedicines([...savedMedicines, newMedicine]);
    setSelectedMedicine(newMedicine);
    
    // Reset create medicine form
    setNewMedicineName("");
    setNewMedicineSaltName("");
    setNewMedicineManufacturer("");
    setNewMedicineDosageType("");
    
    // Close create modal and open add medicine modal
    setShowCreateMedicineModal(false);
    setShowMedicineSearchModal(false);
    setShowAddMedicineModal(true);
  };

  const handleSelectExistingMedicine = (medicine: SavedMedicine) => {
    setSelectedMedicine(medicine);
    setShowMedicineSearchModal(false);
    setShowAddMedicineModal(true);
  };

  const handleAddDosageRow = () => {
    if (!newDosage || !newTime || !newEvent) return;
    
    setDosageRows([...dosageRows, {
      dosage: newDosage,
      time: newTime,
      event: newEvent
    }]);
    
    setNewDosage("");
    setNewTime("");
    setNewEvent("");
    setShowAddDosageModal(false);
  };

  const handleSubmitMedicine = () => {
    if (!selectedMedicine || dosageRows.length === 0 || !medicineDuration || !medicineDurationType) return;
    
    const dosageText = dosageRows.map(row => `${row.dosage} - ${row.event} (${row.time})`).join(", ");
    const durationText = `Duration: ${medicineDuration} ${medicineDurationType}`;
    
    const medicine: Medicine = {
      name: selectedMedicine.name,
      genericName: selectedMedicine.saltName || "",
      dosage: dosageText,
      duration: durationText
    };
    
    setMedicines([...medicines, medicine]);
    
    // Reset form
    setSelectedMedicine(null);
    setDosageRows([]);
    setMedicineDuration("");
    setMedicineDurationType("");
    setMedicineNotes("");
    setShowAddMedicineModal(false);
  };

  const handleAddSignature = () => {
    setShowSignatureModal(true);
  };

  const setupCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    updatePreview();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePreview();
  };

  const updatePreview = () => {
    const canvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!canvas || !previewCanvas) return;

    const previewCtx = previewCanvas.getContext("2d");
    if (!previewCtx) return;

    previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    previewCtx.drawImage(canvas, 0, 0);
  };

  const handleSubmitSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL();
    setSignatureDataUrl(dataUrl);
    setHasSignature(true);
    setShowSignatureModal(false);
  };

  useEffect(() => {
    if (showSignatureModal && canvasRef.current) {
      setupCanvas(canvasRef.current);
    }
  }, [showSignatureModal]);


  const isFormValid =
    chiefComplaints.length > 0 &&
    provisionalDiagnoses.length > 0 &&
    (isFromTranscriber || (medicalHistory.length > 0 && medicines.length > 0 && hasSignature));

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen md:fixed md:inset-0 md:left-[64px] md:flex">
      {/* Main Content Area */}
      <div
        className={`flex-1 md:overflow-auto md:transition-all md:duration-300 ${
          isRightSidebarOpen ? 'md:mr-[400px]' : 'md:mr-0'
        }`}
      >
        <div className="p-3 md:p-6 max-w-[900px] mx-auto">
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4">
        <button
          onClick={() => navigate(`/clients/${id}/prescriptions`)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Prescriptions – Rachit
        </h1>
      </div>

      {/* Client Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <User className="size-6 text-[#4169E1]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Rachit Sharma</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">#168019</p>
          </div>
        </div>
      </div>

      {/* Transcriber prefill banner */}
      {isFromTranscriber && (
        <div className="bg-[#f3faff] dark:bg-blue-900/20 border border-[#00c0ff]/30 rounded-xl p-3 flex items-center gap-2">
          <Sparkles className="size-4 text-[#00c0ff] flex-shrink-0" />
          <p className="text-sm text-[#043570] dark:text-blue-300">
            Prescription pre-filled from your AI Transcriber session. Review and edit as needed.
          </p>
        </div>
      )}

      {/* Create Prescription Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <FileText className="size-5 text-[#4169E1]" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Prescription
            </h2>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Chief Complaints */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chief Complaints
              </label>
              <button
                type="button"
                onClick={() => setShowComplaintsModal(true)}
                className="w-full px-3 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white text-left flex items-center justify-between hover:border-[#4169E1] transition-colors"
              >
                <span className="text-gray-500 dark:text-gray-400">Select chief complaints...</span>
                <Plus className="size-4 text-gray-400" />
              </button>
              {chiefComplaints.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {chiefComplaints.map((complaint) => (
                    <span
                      key={complaint}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm"
                    >
                      {complaint}
                      <button
                        onClick={() =>
                          setChiefComplaints(chiefComplaints.filter((c) => c !== complaint))
                        }
                        className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Medical History */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Medical History
              </label>
              <button
                type="button"
                onClick={() => setShowMedicalHistoryModal(true)}
                className="w-full px-3 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white text-left flex items-center justify-between hover:border-[#4169E1] transition-colors"
              >
                <span className="text-gray-500 dark:text-gray-400">Select medical history...</span>
                <Plus className="size-4 text-gray-400" />
              </button>
              {medicalHistory.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {medicalHistory.map((history) => (
                    <span
                      key={history}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm"
                    >
                      {history}
                      <button
                        onClick={() =>
                          setMedicalHistory(medicalHistory.filter((h) => h !== history))
                        }
                        className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Allergies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Allergies
              </label>
              <button
                type="button"
                onClick={() => setShowAllergiesModal(true)}
                className="w-full px-3 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white text-left flex items-center justify-between hover:border-[#4169E1] transition-colors"
              >
                <span className="text-gray-500 dark:text-gray-400">Select allergies...</span>
                <Plus className="size-4 text-gray-400" />
              </button>
              {allergies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {allergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm"
                    >
                      {allergy}
                      <button
                        onClick={() => setAllergies(allergies.filter((a) => a !== allergy))}
                        className="hover:bg-red-200 dark:hover:bg-red-800 rounded-full p-0.5"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            {/* Provisional Diagnosis */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Provisional Diagnosis
                </label>
                <button
                  onClick={handleAddDiagnosis}
                  className="flex items-center gap-2 text-[#4169E1] hover:text-[#3557c7] text-sm font-medium"
                >
                  <Plus className="size-4" />
                  Add
                </button>
              </div>
              {provisionalDiagnoses.length > 0 && (
                <div className="space-y-2">
                  {provisionalDiagnoses.map((diagnosis, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg px-3 py-2"
                    >
                      <span className="text-sm">{diagnosis}</span>
                      <button
                        onClick={() =>
                          setProvisionalDiagnoses(
                            provisionalDiagnoses.filter((_, i) => i !== index)
                          )
                        }
                        className="hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-1"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Diagnostic Tests */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Diagnostic Tests
                </label>
                <button
                  onClick={handleAddTest}
                  className="flex items-center gap-2 text-[#4169E1] hover:text-[#3557c7] text-sm font-medium"
                >
                  <Plus className="size-4" />
                  Add
                </button>
              </div>
              {diagnosticTests.length > 0 && (
                <div className="space-y-2">
                  {diagnosticTests.map((test, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg px-3 py-2"
                    >
                      <span className="text-sm">{test}</span>
                      <button
                        onClick={() =>
                          setDiagnosticTests(diagnosticTests.filter((_, i) => i !== index))
                        }
                        className="hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded-full p-1"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            {/* Medicine */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Medicine
                </label>
                <button
                  onClick={handleAddMedicine}
                  className="flex items-center gap-2 text-[#4169E1] hover:text-[#3557c7] text-sm font-medium"
                >
                  <Plus className="size-4" />
                  Add
                </button>
              </div>
              {medicines.length > 0 && (
                <div className="space-y-3">
                  {medicines.map((medicine, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl p-4 relative hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => setMedicines(medicines.filter((_, i) => i !== index))}
                        className="absolute top-3 right-3 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full p-1.5 transition-colors"
                      >
                        <X className="size-4 text-gray-500 dark:text-gray-400" />
                      </button>
                      
                      {/* Medicine Name & Salt */}
                      <div className="flex items-start gap-3 mb-3 pr-8">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                          <Pill className="size-5 text-[#4169E1]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-base">
                            {medicine.name}
                          </h4>
                          {medicine.genericName && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                              {medicine.genericName}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Dosage Info */}
                      <div className="space-y-2 pl-11">
                        <div className="flex items-start gap-2">
                          <div className="inline-flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                            <span className="font-medium">Dosage:</span>
                            <span>{medicine.dosage}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="size-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {medicine.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            {/* Signature */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Signature
                </label>
                {!hasSignature && (
                  <button
                    onClick={handleAddSignature}
                    className="flex items-center gap-2 text-[#4169E1] hover:text-[#3557c7] text-sm font-medium"
                  >
                    <Plus className="size-4" />
                    Add Signature
                  </button>
                )}
              </div>
              {hasSignature && (
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ✓ Signature added
                  </span>
                  <button
                    className="text-[#4169E1] hover:text-[#3557c7] text-sm font-medium"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            {/* Submit Button */}
            <button
              disabled={!isFormValid}
              onClick={() => navigate("/prescriptions")}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isFormValid
                  ? "bg-[#4169E1] hover:bg-[#3557c7] text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50"
              }`}
            >
              Submit Prescription
            </button>
          </div>
        </div>
      </div>

      {/* Chief Complaints Modal */}
      {showComplaintsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Select Chief Complaints
              </h3>
              <button
                onClick={() => {
                  setShowComplaintsModal(false);
                  setComplaintSearch("");
                  setCustomComplaint("");
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Search Box */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={complaintSearch}
                  onChange={(e) => setComplaintSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                />
              </div>
            </div>

            {/* Complaints List */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredComplaints.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    {filteredComplaints.map((complaint) => {
                      const isSelected = chiefComplaints.includes(complaint);
                      return (
                        <button
                          key={complaint}
                          onClick={() => {
                            if (isSelected) {
                              setChiefComplaints(chiefComplaints.filter((c) => c !== complaint));
                            } else {
                              handleAddComplaint(complaint);
                            }
                          }}
                          className={`px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                            isSelected
                              ? "bg-[#4169E1] text-white"
                              : "bg-gray-100 dark:bg-gray-750 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          {complaint}
                        </button>
                      );
                    })}
                  </div>
                  {complaintSearch.trim() !== "" && !defaultComplaints.includes(complaintSearch.trim()) && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          if (complaintSearch.trim()) {
                            handleAddComplaint(complaintSearch.trim());
                            setComplaintSearch("");
                            setShowComplaintsModal(false);
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-750 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors border-2 border-dashed border-gray-300 dark:border-gray-600"
                      >
                        <Plus className="size-4" />
                        Add "{complaintSearch}" as custom complaint
                      </button>
                    </div>
                  )}
                </>
              ) : complaintSearch.trim() !== "" ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No complaints found for "{complaintSearch}"
                  </p>
                  <button
                    onClick={() => {
                      if (complaintSearch.trim()) {
                        handleAddComplaint(complaintSearch.trim());
                        setComplaintSearch("");
                        setShowComplaintsModal(false);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-colors"
                  >
                    <Plus className="size-4" />
                    Add "{complaintSearch}" as custom complaint
                  </button>
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  Start typing to search complaints
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {chiefComplaints.length} complaint{chiefComplaints.length !== 1 ? "s" : ""} selected
              </p>
              <button
                onClick={() => {
                  setShowComplaintsModal(false);
                  setComplaintSearch("");
                  setCustomComplaint("");
                }}
                className="px-6 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Medical History Modal */}
      {showMedicalHistoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Select Medical History
              </h3>
              <button
                onClick={() => {
                  setShowMedicalHistoryModal(false);
                  setMedicalHistorySearch("");
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Search Box */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medical history..."
                  value={medicalHistorySearch}
                  onChange={(e) => setMedicalHistorySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                />
              </div>
            </div>

            {/* Medical History List */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredMedicalHistory.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    {filteredMedicalHistory.map((history) => {
                      const isSelected = medicalHistory.includes(history);
                      return (
                        <button
                          key={history}
                          onClick={() => {
                            if (isSelected) {
                              setMedicalHistory(medicalHistory.filter((h) => h !== history));
                            } else {
                              handleAddHistory(history);
                            }
                          }}
                          className={`px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                            isSelected
                              ? "bg-[#4169E1] text-white"
                              : "bg-gray-100 dark:bg-gray-750 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          {history}
                        </button>
                      );
                    })}
                  </div>
                  {medicalHistorySearch.trim() !== "" && !defaultMedicalIssues.includes(medicalHistorySearch.trim()) && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          if (medicalHistorySearch.trim()) {
                            handleAddHistory(medicalHistorySearch.trim());
                            setMedicalHistorySearch("");
                            setShowMedicalHistoryModal(false);
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-750 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors border-2 border-dashed border-gray-300 dark:border-gray-600"
                      >
                        <Plus className="size-4" />
                        Add "{medicalHistorySearch}" as custom medical history
                      </button>
                    </div>
                  )}
                </>
              ) : medicalHistorySearch.trim() !== "" ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No medical history found for "{medicalHistorySearch}"
                  </p>
                  <button
                    onClick={() => {
                      if (medicalHistorySearch.trim()) {
                        handleAddHistory(medicalHistorySearch.trim());
                        setMedicalHistorySearch("");
                        setShowMedicalHistoryModal(false);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-colors"
                  >
                    <Plus className="size-4" />
                    Add "{medicalHistorySearch}" as custom medical history
                  </button>
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  Start typing to search medical history
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {medicalHistory.length} history{medicalHistory.length !== 1 ? "ies" : ""} selected
              </p>
              <button
                onClick={() => {
                  setShowMedicalHistoryModal(false);
                  setMedicalHistorySearch("");
                }}
                className="px-6 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Allergies Modal */}
      {showAllergiesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Select Allergies
              </h3>
              <button
                onClick={() => {
                  setShowAllergiesModal(false);
                  setAllergySearch("");
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Search Box */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search allergies..."
                  value={allergySearch}
                  onChange={(e) => setAllergySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                />
              </div>
            </div>

            {/* Allergies List */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredAllergies.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    {filteredAllergies.map((allergy) => {
                      const isSelected = allergies.includes(allergy);
                      return (
                        <button
                          key={allergy}
                          onClick={() => {
                            if (isSelected) {
                              setAllergies(allergies.filter((a) => a !== allergy));
                            } else {
                              handleAddAllergy(allergy);
                            }
                          }}
                          className={`px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                            isSelected
                              ? "bg-[#4169E1] text-white"
                              : "bg-gray-100 dark:bg-gray-750 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          {allergy}
                        </button>
                      );
                    })}
                  </div>
                  {allergySearch.trim() !== "" && !defaultAllergies.includes(allergySearch.trim()) && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          if (allergySearch.trim()) {
                            handleAddAllergy(allergySearch.trim());
                            setAllergySearch("");
                            setShowAllergiesModal(false);
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-750 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors border-2 border-dashed border-gray-300 dark:border-gray-600"
                      >
                        <Plus className="size-4" />
                        Add "{allergySearch}" as custom allergy
                      </button>
                    </div>
                  )}
                </>
              ) : allergySearch.trim() !== "" ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No allergies found for "{allergySearch}"
                  </p>
                  <button
                    onClick={() => {
                      if (allergySearch.trim()) {
                        handleAddAllergy(allergySearch.trim());
                        setAllergySearch("");
                        setShowAllergiesModal(false);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-colors"
                  >
                    <Plus className="size-4" />
                    Add "{allergySearch}" as custom allergy
                  </button>
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  Start typing to search allergies
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {allergies.length} allergy{allergies.length !== 1 ? "ies" : ""} selected
              </p>
              <button
                onClick={() => {
                  setShowAllergiesModal(false);
                  setAllergySearch("");
                }}
                className="px-6 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diagnosis Modal */}
      {showDiagnosisModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Select Diagnosis
              </h3>
              <button
                onClick={() => {
                  setShowDiagnosisModal(false);
                  setDiagnosisSearch("");
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Search Box */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search diagnoses..."
                  value={diagnosisSearch}
                  onChange={(e) => setDiagnosisSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                />
              </div>
            </div>

            {/* Diagnoses List */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredDiagnoses.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    {filteredDiagnoses.map((diagnosis) => {
                      const isSelected = provisionalDiagnoses.includes(diagnosis);
                      return (
                        <button
                          key={diagnosis}
                          onClick={() => {
                            if (isSelected) {
                              setProvisionalDiagnoses(provisionalDiagnoses.filter((d) => d !== diagnosis));
                            } else {
                              handleSelectDiagnosis(diagnosis);
                            }
                          }}
                          className={`px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                            isSelected
                              ? "bg-[#4169E1] text-white"
                              : "bg-gray-100 dark:bg-gray-750 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          {diagnosis}
                        </button>
                      );
                    })}
                  </div>
                  {diagnosisSearch.trim() !== "" && !defaultDiagnoses.includes(diagnosisSearch.trim()) && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          if (diagnosisSearch.trim()) {
                            handleSelectDiagnosis(diagnosisSearch.trim());
                            setDiagnosisSearch("");
                            setShowDiagnosisModal(false);
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-750 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors border-2 border-dashed border-gray-300 dark:border-gray-600"
                      >
                        <Plus className="size-4" />
                        Add "{diagnosisSearch}" as custom diagnosis
                      </button>
                    </div>
                  )}
                </>
              ) : diagnosisSearch.trim() !== "" ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No diagnoses found for "{diagnosisSearch}"
                  </p>
                  <button
                    onClick={() => {
                      if (diagnosisSearch.trim()) {
                        handleSelectDiagnosis(diagnosisSearch.trim());
                        setDiagnosisSearch("");
                        setShowDiagnosisModal(false);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-colors"
                  >
                    <Plus className="size-4" />
                    Add "{diagnosisSearch}" as custom diagnosis
                  </button>
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  Start typing to search diagnoses
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {provisionalDiagnoses.length} diagnosis{provisionalDiagnoses.length !== 1 ? "es" : ""} selected
              </p>
              <button
                onClick={() => {
                  setShowDiagnosisModal(false);
                  setDiagnosisSearch("");
                }}
                className="px-6 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diagnostic Tests Modal */}
      {showDiagnosticTestsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Select Diagnostic Tests
              </h3>
              <button
                onClick={() => {
                  setShowDiagnosticTestsModal(false);
                  setDiagnosticTestSearch("");
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Search Box */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search diagnostic tests..."
                  value={diagnosticTestSearch}
                  onChange={(e) => setDiagnosticTestSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                />
              </div>
            </div>

            {/* Diagnostic Tests List */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredDiagnosticTests.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    {filteredDiagnosticTests.map((test) => {
                      const isSelected = diagnosticTests.includes(test);
                      return (
                        <button
                          key={test}
                          onClick={() => {
                            if (isSelected) {
                              setDiagnosticTests(diagnosticTests.filter((t) => t !== test));
                            } else {
                              setDiagnosticTests([...diagnosticTests, test]);
                            }
                          }}
                          className={`px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                            isSelected
                              ? "bg-[#4169E1] text-white"
                              : "bg-gray-100 dark:bg-gray-750 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          {test}
                        </button>
                      );
                    })}
                  </div>
                  {diagnosticTestSearch.trim() !== "" && !defaultDiagnosticTests.includes(diagnosticTestSearch.trim()) && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          if (diagnosticTestSearch.trim()) {
                            setDiagnosticTests([...diagnosticTests, diagnosticTestSearch.trim()]);
                            setDiagnosticTestSearch("");
                            setShowDiagnosticTestsModal(false);
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-750 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors border-2 border-dashed border-gray-300 dark:border-gray-600"
                      >
                        <Plus className="size-4" />
                        Add "{diagnosticTestSearch}" as custom diagnostic test
                      </button>
                    </div>
                  )}
                </>
              ) : diagnosticTestSearch.trim() !== "" ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No diagnostic tests found for "{diagnosticTestSearch}"
                  </p>
                  <button
                    onClick={() => {
                      if (diagnosticTestSearch.trim()) {
                        setDiagnosticTests([...diagnosticTests, diagnosticTestSearch.trim()]);
                        setDiagnosticTestSearch("");
                        setShowDiagnosticTestsModal(false);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-colors"
                  >
                    <Plus className="size-4" />
                    Add "{diagnosticTestSearch}" as custom diagnostic test
                  </button>
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  Start typing to search diagnostic tests
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {diagnosticTests.length} test{diagnosticTests.length !== 1 ? "s" : ""} selected
              </p>
              <button
                onClick={() => {
                  setShowDiagnosticTestsModal(false);
                  setDiagnosticTestSearch("");
                }}
                className="px-6 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Medicine Search Modal */}
      {showMedicineSearchModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Select Medicine
              </h3>
              <button
                onClick={() => {
                  setShowMedicineSearchModal(false);
                  setMedicineSearch("");
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Search Box */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={medicineSearch}
                  onChange={(e) => setMedicineSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                />
              </div>
            </div>

            {/* Medicines List */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredSavedMedicines.length > 0 ? (
                <>
                  <div className="space-y-3">
                    {filteredSavedMedicines.map((medicine) => (
                      <button
                        key={medicine.id}
                        onClick={() => handleSelectExistingMedicine(medicine)}
                        className="w-full text-left p-4 bg-white dark:bg-gray-750 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-[#4169E1] dark:hover:border-[#4169E1] rounded-xl transition-all shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                            <Pill className="size-5 text-[#4169E1]" />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 dark:text-white text-base mb-0.5">
                              {medicine.name}
                            </div>
                            {medicine.saltName && (
                              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {medicine.saltName}
                              </div>
                            )}
                            {medicine.dosageType && (
                              <div className="inline-flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md">
                                {medicine.dosageType}
                              </div>
                            )}
                            {medicine.manufacturer && (
                              <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                Mfr: {medicine.manufacturer}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        setShowMedicineSearchModal(false);
                        setShowCreateMedicineModal(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-750 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors border-2 border-dashed border-gray-300 dark:border-gray-600"
                    >
                      <Plus className="size-4" />
                      Create New Medicine
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {medicineSearch ? `No medicines found for "${medicineSearch}"` : "No saved medicines yet"}
                  </p>
                  <button
                    onClick={() => {
                      setShowMedicineSearchModal(false);
                      setShowCreateMedicineModal(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-colors"
                  >
                    <Plus className="size-4" />
                    Create New Medicine
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Medicine Modal */}
      {showCreateMedicineModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create Medicine
              </h3>
              <button
                onClick={() => {
                  setShowCreateMedicineModal(false);
                  setNewMedicineName("");
                  setNewMedicineSaltName("");
                  setNewMedicineManufacturer("");
                  setNewMedicineDosageType("");
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Medicine Name
                </label>
                <input
                  type="text"
                  placeholder="Crocin"
                  value={newMedicineName}
                  onChange={(e) => setNewMedicineName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Salt Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Acetaminophen"
                  value={newMedicineSaltName}
                  onChange={(e) => setNewMedicineSaltName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Manufactured By (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Pfizer"
                  value={newMedicineManufacturer}
                  onChange={(e) => setNewMedicineManufacturer(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dosage Type (Optional)
                </label>
                <select
                  value={newMedicineDosageType}
                  onChange={(e) => setNewMedicineDosageType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                >
                  <option value="">Select an option</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Capsule">Capsule</option>
                  <option value="Syrup">Syrup</option>
                  <option value="Injection">Injection</option>
                  <option value="Cream">Cream</option>
                  <option value="Drops">Drops</option>
                  <option value="Inhaler">Inhaler</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleCreateMedicine}
                disabled={!newMedicineName.trim()}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  newMedicineName.trim()
                    ? "bg-[#4169E1] hover:bg-[#3557c7] text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                }`}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Medicine Modal */}
      {showAddMedicineModal && selectedMedicine && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add medicine
              </h3>
              <button
                onClick={() => {
                  setShowAddMedicineModal(false);
                  setSelectedMedicine(null);
                  setDosageRows([]);
                  setMedicineDuration("");
                  setMedicineDurationType("");
                  setMedicineNotes("");
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Medicine Name */}
              <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {selectedMedicine.name}
                </h4>
                {selectedMedicine.dosageType && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedMedicine.dosageType}
                  </p>
                )}
              </div>

              {/* Dosage & Frequency */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Dosage & frequency
                </h4>
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 mb-3">
                  <div className="grid grid-cols-3 gap-2 text-center text-sm font-medium text-gray-900 dark:text-white">
                    <div>Dosage</div>
                    <div>Time</div>
                    <div>Event</div>
                  </div>
                </div>
                
                {dosageRows.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {dosageRows.map((row, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 flex items-center justify-between"
                      >
                        <div className="grid grid-cols-3 gap-2 flex-1 text-sm text-gray-700 dark:text-gray-300">
                          <div className="text-center">{row.dosage}</div>
                          <div className="text-center">{row.time}</div>
                          <div className="text-center">{row.event}</div>
                        </div>
                        <button
                          onClick={() => setDosageRows(dosageRows.filter((_, i) => i !== index))}
                          className="ml-3 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors"
                        >
                          <X className="size-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <button
                  onClick={() => setShowAddDosageModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-colors"
                >
                  <Plus className="size-4" />
                  Add
                </button>
              </div>

              {/* Duration */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Duration :
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration
                    </label>
                    <input
                      type="number"
                      placeholder="Enter number"
                      value={medicineDuration}
                      onChange={(e) => setMedicineDuration(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration type
                    </label>
                    <select
                      value={medicineDurationType}
                      onChange={(e) => setMedicineDurationType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                    >
                      <option value="">Select duration type</option>
                      <option value="Days">Days</option>
                      <option value="Weeks">Weeks</option>
                      <option value="Months">Months</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Notes :
                </h4>
                <textarea
                  placeholder="Write here..."
                  value={medicineNotes}
                  onChange={(e) => setMedicineNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSubmitMedicine}
                disabled={dosageRows.length === 0 || !medicineDuration || !medicineDurationType}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  dosageRows.length > 0 && medicineDuration && medicineDurationType
                    ? "bg-[#4169E1] hover:bg-[#3557c7] text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Dosage Modal */}
      {showAddDosageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Dosage
              </h3>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dosage
                </label>
                <input
                  type="text"
                  placeholder="Enter amount"
                  value={newDosage}
                  onChange={(e) => setNewDosage(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time
                </label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                >
                  <option value="">Select time</option>
                  <option value="Before food">Before food</option>
                  <option value="After food">After food</option>
                  <option value="With food">With food</option>
                  <option value="Empty stomach">Empty stomach</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event
                </label>
                <select
                  value={newEvent}
                  onChange={(e) => setNewEvent(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:text-white"
                >
                  <option value="">Select event</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleAddDosageRow}
                disabled={!newDosage || !newTime || !newEvent}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  newDosage && newTime && newEvent
                    ? "bg-[#4169E1] hover:bg-[#3557c7] text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                }`}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Signature
              </h3>
              <button
                onClick={() => setShowSignatureModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="size-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Instructions */}
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Draw your signature below
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This signature will be used on prescriptions/notes
                </p>
              </div>

              {/* Drawing Canvas */}
              <div className="bg-white dark:bg-gray-750 border-2 border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={450}
                  height={300}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full cursor-crosshair touch-none"
                  style={{ touchAction: 'none' }}
                />
              </div>

              {/* Clear Button */}
              <button
                onClick={clearCanvas}
                className="px-6 py-2 bg-[#00BFFF] hover:bg-[#00A8E1] text-white rounded-lg font-medium transition-colors"
              >
                Clear
              </button>

              {/* Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Preview:
                </label>
                <div className="bg-white dark:bg-gray-750 border-2 border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                  <canvas
                    ref={previewCanvasRef}
                    width={450}
                    height={150}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSubmitSignature}
                className="w-full py-3 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-lg font-medium transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
        </div>
      </div>

      {/* Right Sidebar - Desktop Only */}
      <div
        className={`hidden md:block fixed top-0 right-0 bottom-0 w-[400px] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transition-transform duration-300 ${
          isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-l-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-md"
          title={isRightSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
        >
          {isRightSidebarOpen ? (
            <ChevronRight className="size-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="size-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Sidebar Content - Always show transcript panel */}
        <div className="h-full flex flex-col">
          {/* Session Selector Dropdown */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              SELECT SESSION
            </label>
            <div className="relative">
              <select
                value={selectedSessionId}
                onChange={(e) => setSelectedSessionId(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white appearance-none cursor-pointer pr-10 font-medium"
              >
                {sessionDates.map((session) => (
                  <option key={session.id} value={session.id}>
                    {session.displayDate}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab("transcript")}
                className={`relative flex-1 px-4 py-3 font-semibold transition-colors ${
                  activeTab === "transcript"
                    ? "text-[#00c0ff]"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Transcript
                {activeTab === "transcript" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("noteworthy")}
                className={`relative flex-1 px-4 py-3 font-semibold transition-colors ${
                  activeTab === "noteworthy"
                    ? "text-[#00c0ff]"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Noteworthy
                {activeTab === "noteworthy" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]"></div>
                )}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4 pb-24">
            {activeTab === "transcript" && (
              <div className="space-y-3">
                {/* Demo transcript attached card (from transcriber) */}
                {isFromTranscriber && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Paperclip className="size-4 text-[#00c0ff] flex-shrink-0" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Transcript attached</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{demoTranscript.overview}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                      <span>{demoTranscript.date}</span>
                      <span>·</span>
                      <span>{demoTranscript.duration}</span>
                    </div>
                  </div>
                )}
                {/* Show transcript only if hasTranscript is true */}
                {!isFromTranscriber && hasTranscriptFromState && mockTranscript.split('\n\n').map((paragraph, index) => {
                  const isDrSmith = paragraph.startsWith('Dr. Smith:');
                  const isRachit = paragraph.startsWith('Rachit:');

                  if (isDrSmith || isRachit) {
                    const [speaker, ...textParts] = paragraph.split(':');
                    const text = textParts.join(':').trim();

                    return (
                      <div key={index} className="mb-4">
                        <div className="flex items-start gap-2 mb-1">
                          <div className={`size-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isDrSmith ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-purple-100 dark:bg-purple-900/30'
                          }`}>
                            <User className={`size-3 ${isDrSmith ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'}`} />
                          </div>
                          <span className={`text-sm font-bold ${isDrSmith ? 'text-[#2563EB]' : 'text-[#043570]'}`}>
                            {speaker}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pl-8">
                          {text}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <p key={index} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                })}
                {/* Show empty state when no transcript is available */}
                {!isFromTranscriber && !hasTranscriptFromState && (
                  <div className="flex flex-col items-center justify-center h-full gap-3 py-12 text-center px-4">
                    <div className="size-14 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-1">
                      <FileText className="size-7 text-gray-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">No transcript added</p>
                    <button
                      onClick={() => navigate(`/clients/${id}/notes`)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00c0ff] hover:bg-[#00a8e6] text-white rounded-xl transition-all font-semibold text-sm mt-1"
                    >
                      <Upload className="size-4" />
                      Add Transcript
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "noteworthy" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <Sparkles className="size-5 text-[#00c0ff]" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    AI-Generated Summary
                  </span>
                </div>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {mockAINotes.split('\n').map((line, index) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      // Section headers
                      return (
                        <h3 key={index} className="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">
                          {line.replace(/\*\*/g, '')}
                        </h3>
                      );
                    } else if (line.startsWith('•')) {
                      // Bullet points
                      return (
                        <p key={index} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed ml-4 mb-1">
                          {line}
                        </p>
                      );
                    } else if (line.trim() === '') {
                      // Empty lines
                      return <div key={index} className="h-2"></div>;
                    } else {
                      // Regular paragraphs
                      return (
                        <p key={index} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                          {line}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Fill with AI Button - Sticky at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                // Auto-fill prescription fields from transcript
                setChiefComplaints(["Anxiety", "Insomnia", "Difficulty concentrating"]);
                setMedicalHistory(["No chronic conditions"]);
                setProvisionalDiagnoses(["Adjustment Disorder with Anxiety (F43.22)"]);
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#00c0ff] hover:bg-[#00a8e6] text-white rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Sparkles className="size-5" />
              Fill with AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}