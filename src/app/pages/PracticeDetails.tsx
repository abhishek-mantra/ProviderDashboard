import { useState } from "react";
import {
  Building2,
  Hospital,
  Stethoscope,
  TestTube,
  Baby,
  Smile,
  Eye,
  Plus,
  Check,
  Upload,
  Link as LinkIcon,
  ChevronRight,
  Pencil,
  ChevronLeft,
  ChevronDown,
  MapPin,
  Info,
  Navigation,
  X,
  XCircle,
  CheckCircle2,
  DollarSign,
  Users,
  Tags,
  Video,
  Headphones,
  HeartHandshake,
  CreditCard,
  SlidersHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { EstablishmentViewMode } from "../components/EstablishmentViewMode";
import type { Establishment, EstablishmentType } from "../types/partnerDashboard";
import {
  AGE_GROUPS,
  PARTICIPANTS,
  PAYMENT_METHODS,
  THERAPY_MODALITIES,
  SESSION_FORMATS,
} from "../types/partnerDashboard";
import { MultiSelect } from "../components/MultiSelect";
import { usePartnerDashboard } from "../contexts/PartnerDashboardContext";

type EstablishmentTypeOption = {
  id: EstablishmentType;
  icon: any;
  label: string;
};

const establishmentTypes: EstablishmentTypeOption[] = [
  { id: "hospital", icon: Hospital, label: "Hospital" },
  { id: "clinic", icon: Stethoscope, label: "Clinic / OPD" },
  { id: "diagnostic", icon: TestTube, label: "Diagnostic Center" },
  { id: "nursing", icon: Baby, label: "Nursing Home" },
  { id: "dental", icon: Smile, label: "Dental Clinic" },
  { id: "eyecare", icon: Eye, label: "Eye Care" },
  { id: "practice", icon: Stethoscope, label: "Practice (therapy, diet, physiotherapy etc.)" }
];

import { SPECIALTIES } from "../types/partnerDashboard";

const specialtyOptions = [...SPECIALTIES];

// Services mapped by specialty
const specialtyServicesMap: { [key: string]: string[] } = {
  "Therapy": [
    "ADHD",
    "Self Esteem",
    "Addiction",
    "Anger",
    "Anxiety",
    "Bipolar",
    "Child Or Teen",
    "Depression",
    "Family",
    "Insomnia / Sleep Disorder",
    "LGBTQ+ Friendly",
    "OCD",
    "Panic Attacks",
    "Relationship/ Couple",
    "Sex Therapy",
    "Grief / Loss",
    "Stress / Burnout",
    "Trauma/ PTSD",
    "Workplace Issues",
    "Employee Mental Health / EAP",
    "Marriage",
    "Divorce",
    "Online Therapy",
    "Lesbian",
    "Gay",
    "Bisexual",
    "Transgender",
    "Queer",
    "Coming out",
    "Gender Dysphoria",
    "Relationship",
    "Harm",
    "Cleaning or Contamination",
    "Checking",
    "Just right",
    "Existential",
    "Pure-O",
    "Hoarding",
    "Religious",
    "Sexual orientation",
    "Real events",
    "Health",
    "Exposure Response Prevention (ERP)",
    "Online OCD Treatment"
  ],
  "Endocrinologist": [
    "Diabetes Diet",
    "PCOS",
    "Diabetic Eye Care",
    "Diabetic Foot Care",
    "Endocrinologist",
    "Type 1 Diabetes",
    "Type 2 Diabetes",
    "Hypoglycemia",
    "Gestational diabetes",
    "Diabetes Reversal",
    "Thyroid",
    "Diabetologist"
  ],
  "Yoga": [
    "Hypertension",
    "Mindfulness Meditation",
    "Vipassana",
    "Chakra",
    "Yoga Meditation",
    "Mantra Meditation",
    "Zen Meditation",
    "Yoga For High BP",
    "Yoga For Diabetes",
    "Postnatal Yoga",
    "Yoga For Wellness",
    "Yoga For PCOS",
    "Yoga For Back Pain",
    "Yoga For Pregnancy",
    "Hatha Yoga",
    "Ashtanga Yoga",
    "Bikram Yoga",
    "Iyengar Yoga",
    "Kundalini Yoga",
    "Restorative Yoga",
    "Yin Yoga",
    "Pranayam",
    "Vinyasa Yoga",
    "Power Yoga",
    "Corporate Yoga"
  ],
  "Diet": [
    "Weight Loss",
    "Weight Gain",
    "PCOS/ PCOD Diet",
    "Diabetes Diet",
    "Cholestrol/ Hypertension  Diet",
    "Keto Diet",
    "Vegan Diet",
    "Low-Carb Diet",
    "Thyriod Diet",
    "Sports Nutrition",
    "Cancer Nutrition",
    "Intermittent Fasting",
    "Mediterranean Diet",
    "GLP-1 Weight loss",
    "Prenatal Nutrition",
    "Eating Disorder Treatment",
    "Anorexia Treatment",
    "Liver Health / Fatty Liver Diet",
    "Anxiety, Depression Diet",
    "Food Allergies Diet",
    "Anti-inflammatory Diet",
    "Bulimia treatment"
  ],
  "Physiotherapy": [
    "Back Pain",
    "Hand / Wrist Pain",
    "Knee Pain",
    "Hip Pain",
    "Neck Pain",
    "Shoulder Pain",
    "Elbow Pain",
    "Leg Pain",
    "Foot / Ankle Pain",
    "Arthritis",
    "Orthopedic",
    "Cardio-Respiratory",
    "Pediatric",
    "Sports Injury",
    "Vestibular Or Vertigo",
    "Geriatric"
  ],
  "Women Wellness": [
    "PCOD",
    "Fertility / IVF",
    "Women Sexual health",
    "Prenatal",
    "Postnatal",
    "Postpartum"
  ],
  "Psychiatrist": [
    "ADHD",
    "Self Esteem",
    "Addiction",
    "Anger",
    "Anxiety",
    "Bipolar",
    "Child Or Teen",
    "Depression",
    "Family",
    "Insomnia / Sleep Disorder",
    "LGBTQ+ Friendly",
    "OCD",
    "Panic Attacks",
    "Relationship/ Couple",
    "Sex Therapy",
    "Grief / Loss",
    "Stress / Burnout",
    "Trauma/ PTSD",
    "Workplace Issues"
  ],
  "General Physician": [
    "Diabetes",
    "Hypertension",
    "Common Illnesses(Colds, flu, fevers, Infections)",
    "Chronic Conditions (asthma, and high cholesterol)",
    "Preventive Care (health check-ups & immunizations)",
    "Child Care",
    "Injuries (Cuts, sprains, burns)",
    "ENT",
    "Digestive Issues (Indigestion, acid reflux, food allergies)",
    "Skin Conditions (Rashes, acne, infections)",
    "Musculoskeletal Pain (Back, Neck)"
  ],
  "Fitness": [
    "Weight Loss",
    "Weight Gain",
    "Diabetes",
    "Personal Training/ Exercise",
    "Aerobics",
    "Zumba",
    "Muscle building",
    "PCOS",
    "Hypertension",
    "Pilates",
    "Senior Fitness",
    "Nutrition",
    "Employee Wellness",
    "Group Fitness"
  ],
  "Hypertension": [
    "Heart disease",
    "Angioplasty",
    "Arrhythmias",
    "Preventive Cardiology",
    "High Cholesterol (Hyperlipidemia)"
  ],
  "Addiction Treatment": [
    "Alcohol Addiction",
    "Smoking Addiction",
    "Tobacco Addiction",
    "Opiod Addiction",
    "Substance Abuse",
    "Withdrawal Medication (Suboxone, Ritalin)",
    "Relapse prevention",
    "Drug/ Alcohol Detox"
  ],
  "Coach": [
    "Career",
    "Executive",
    "Entrepreneur/Startup",
    "Leadership",
    "Finance",
    "Productivity / Performance",
    "Mindset",
    "Spirituality",
    "Work-Life Balance",
    "Life",
    "Communication",
    "Business",
    "Creativity",
    "Confidence",
    "Change Management",
    "Working Parents",
    "Sales Performance",
    "Diversity and Inclusion (DEI)",
    "Habit"
  ],
  "Gynecologist": [
    "PCOD",
    "Fertility / IVF",
    "Pregnancy /Obgyn",
    "Menopause",
    "Women Sexual health",
    "Prenatal",
    "Postnatal"
  ],
  "LGBTQ": ["LGBTQ Support", "LGBTQ Counseling"],
  "OCD": ["OCD Treatment", "OCD Therapy"],
  "Cardiologist": [
    "Hypertension",
    "Heart disease",
    "Angioplasty",
    "Arrhythmias",
    "Preventive Cardiology",
    "High Cholesterol (Hyperlipidemia)",
    "ECG",
    "Echocardiography",
    "Cardiac Catheterization",
    "Pacemaker Implantation"
  ],
  "Orthopedician": [
    "Arthritis",
    "Joint replacement",
    "Bone fractures",
    "Sports injuries",
    "Osteoporosis",
    "Spinal disorders",
    "Soft Tissue Injuries"
  ],
  "ENT Specialist": [
    "Sinus and Allergy Issues",
    "Ear Disorders (Infections, hearing loss, tinnitus)",
    "Throat Disorder (tonsillitis, swallowing difficulties)",
    "Voice and Speech Disorder",
    "Sleep Disorders",
    "Thyroid Disorder",
    "Pediatric ENT",
    "Nose Disorders (Sinusitis, nasal congestion, allergic rhinitis, nose bleeds)"
  ],
  "Gastroenterologist": [
    "Acid reflux",
    "IBS",
    "Liver disease",
    "Pancreatitis",
    "Gastrointestinal cancers",
    "Stomach Disorders"
  ],
  "Paediatrician": [
    "Growth and development",
    "Immunizations",
    "Childhood diseases (flu, colds, ear infections, strep throat, and respiratory)",
    "NewBorn Care(vaccination, feeding, sleeping, colic)",
    "Chronic Conditions(Asthma, allergies, diabetes, epilepsy, and congenital heart conditions)",
    "Behavioral issues",
    "Skin Conditions (Eczema, acne, rashes, and allergies)",
    "Respiratory Disorders (Bronchiolitis, pneumonia, and croup)"
  ],
  "Sexologist": [
    "Sexual dysfunction",
    "Counseling",
    "Reproductive health",
    "Sexually transmitted infections",
    "Performance Anxiety",
    "Painful Intercourse"
  ],
  "Dermatologist": [
    "Acne",
    "Eczema",
    "Psoriasis",
    "Fungal infections",
    "Warts",
    "Contact Dermatitis",
    "Dandruff",
    "Pimples Treatment",
    "Cosmetological Procedures",
    "Hairfall/ Hair Loss Treatment",
    "Hair Regrowth and Transplant",
    "Acute Disease Treatment",
    "Nail Disorders"
  ],
  "Financial Wellbeing": [
    "Budgeting & Expense Management",
    "Debt Reduction Strategies",
    "Savings & Investment Planning",
    "Retirement & Pension Planning",
    "Credit Score Improvement",
    "Tax Planning Basics",
    "Financial Goal Setting",
    "Emergency Fund Strategies"
  ],
  "Dentist": [
    "Bad Breath",
    "Broken or Chipped Teeth",
    "Crowns and Bridges",
    "Dental Bonding",
    "Dental Check-up",
    "Dental Cleaning",
    "Dental Fillings for cavities",
    "Gum Disease",
    "Root Canal",
    "Teeth Whitening",
    "Tooth Extractions",
    "Tooth Sensitivity",
    "Orthodontic Issues - Braces Clear Aligners",
    "Dental Implants"
  ],
  "Neurosurgeon": [
    "Brain Aneurysm",
    "Brain Fluid Buildup - Hydrocephalus",
    "Brain Tumors",
    "Carpal Tunnel Syndrome",
    "Degenerative Disc Disease",
    "Epilepsy",
    "Fixing Curved Spine (Scoliosis Surgery)",
    "Herniated Slipped Disc",
    "Lumbar and Cervical Spinal Stenosis",
    "Movement Disorders",
    "Peripheral Nerve Tumors",
    "Pinched Nerves (Ulnar Nerve Surgery)",
    "Pituitary Tumors",
    "Spinal Cord Injury / Tumors",
    "Traumatic Brain Injury"
  ],
  "Oncologist": [
    "Brain Tumors",
    "Breast Cancer",
    "Lung Cancer",
    "Prostate Cancer",
    "Colorectal Cancer",
    "Blood Cancers",
    "Cervical Cancer",
    "Ovarian Cancer",
    "Pancreatic Cancer",
    "Liver Cancer",
    "Stomach Cancer",
    "Esophageal Cancer",
    "Kidney Cancer",
    "Bladder Cancer",
    "Testicular Cancer",
    "Skin Cancer",
    "Thyroid Cancer",
    "Bone Cancer",
    "Sarcomas",
    "Metastatic Cancers"
  ],
  "Ophthalmologist": [
    "Glaucoma",
    "Cataract",
    "Conjunctivitis",
    "Corneal Transplant - Keratoplasty",
    "Corneal Ulcers",
    "DCR for blocked tear ducts",
    "Diabetic Retinopathy",
    "Dry Eye",
    "Eye Infections",
    "Intravitreal Injections",
    "Keratoconus-Corneal Cross-linking",
    "Pterygium Removal",
    "Ptosis",
    "Refractive Errors",
    "Refractive Lens Exchange (RLE)",
    "Retinal Detachment",
    "Specs removal - Lasik Laser",
    "Strabismus / Squint",
    "Trabeculectomy for eye pressure",
    "Uveitis",
    "Vitrectomy",
    "ICL surgery"
  ],
  "Urologist (Kidney & Urinary Tract)": [
    "Prostate Cancer",
    "Kidney Cancer",
    "Testicular Cancer",
    "Bladder Cancer /Tumor Removal",
    "Circumcision",
    "Cystectomy - bladder removal",
    "Erectile Dysfunction / Male Infertility",
    "Kidney Stones",
    "Laser Prostate Surgery",
    "Shock Wave Therapy",
    "Urinary Tract Infections",
    "Varicocele",
    "Vasectomy"
  ],
  "Nephrologist": [
    "Kidney Stones",
    "Anemia (Low Blood Count)",
    "Chronic Kidney Disease",
    "Diabetic Nephropathy",
    "Dialysis Management",
    "Renal Disease",
    "Hemodialysis",
    "Kidney transplant Management",
    "Nephrotic Syndrome",
    "Peritoneal Dialysis",
    "Polycystic Kidney Disease",
    "Renal Tubular Acidosis"
  ],
  "Pulmonologist (Lung)": [
    "Asthma",
    "Sleep Apnea",
    "Tuberculosis",
    "Airway Stent Placement",
    "Allergy",
    "Bronchitis",
    "Chest X-ray Scan",
    "Lung Disease / Biopsy/ Cancer",
    "Nebulization",
    "Non-invasive Ventilation (BiPAP/CPAP)",
    "Pleurodesis / Thoracentesis",
    "Pneumonia",
    "Pulmonary Disease/  Fibrosis / PFT",
    "Respiratory Failure",
    "Sarcoidosis",
    "Ventilation Management"
  ],
  "Rheumatologist": [
    "Arthritis",
    "Bone Density Testing (DEXA Scan)",
    "Chronic Fatigue",
    "Fibromyalgia",
    "Inflammatory Back Pain",
    "Joint Aspiration (Arthrocentesis)",
    "Joint Injection",
    "Joint Pain",
    "Osteoarthritis",
    "Skin Biopsy",
    "Spondylitis",
    "Tendinitis"
  ],
  "Fertility/ IVF Specialist": [
    "Infertility",
    "Age-related Fertility Decline",
    "Donor Egg / Sperm IVF",
    "Sperm / Egg Freezing",
    "Laser Assisted Hatching",
    "Male Factor Infertility",
    "Ovarian Disorder / Cysts",
    "Ovulation Disorders",
    "Recurrent Pregnancy Loss"
  ],
  "General Surgery": [
    "Pancreatitis",
    "Hernia Repair",
    "Abscess Drainage",
    "Appendicitis / Appendectomy",
    "Bowel Resection (Small or Large Intestine)",
    "Breast Lumps / Biopsy",
    "Colectomy",
    "Fistula (including Anal Fistulas)",
    "Gallbladder Removal (Cholecystectomy)",
    "Gallstones",
    "Gastrectomy",
    "Hemorrhoids (Piles)",
    "Intestinal Obstruction",
    "Laparoscopic Surgeries",
    "Liver Resections",
    "Lumpectomy",
    "Mastectomy",
    "Pilonidal Sinus",
    "Skin and Soft Tissue Infections",
    "Skin Lesion/Biopsy/Excision",
    "Spleen Disorders / Splenectomy",
    "Thyroid Issues (Nodules and Goiter)",
    "Thyroidectomy",
    "Trauma and Emergency Surgeries",
    "Varicose Veins",
    "Abdominal Tumors"
  ],
  "Legal Counsellor": [
    "Legal consultations",
    "Contract drafting & review",
    "Compliance advice",
    "Litigation support",
    "Dispute resolution guidance",
    "Second opinions",
    "Policy drafting",
    "Employment law advisory",
    "Tax advisory & dispute handling"
  ]
};

const accreditationOptions = [
  "Not accredited",
  "NABH",
  "JCI",
  "NABH Entry Level"
];

const insuranceOptions = [
  "Star Health",
  "HDFC ERGO",
  "Niva Bupa",
  "Max Bupa",
  "CGHS",
  "ESI",
  "Ayushman Bharat"
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Mock establishments for dev mode
const mockEstablishments: Establishment[] = [
  {
    id: "1",
    type: "hospital",
    name: "MantraCare",
    specialties: ["General Medicine", "Cardiology", "Orthopedics"],
    specialtyServices: {
      "General Medicine": ["General OPD", "Emergency Care", "ICU"],
      "Cardiology": ["ECG", "Echocardiography"],
      "Orthopedics": ["Fracture Treatment", "Joint Replacement"]
    },
    yearsInOperation: "15",
    about: "Leading healthcare provider offering comprehensive medical services with state-of-the-art facilities and experienced medical professionals.",
    bedCapacity: "100",
    accreditation: "NABH",
    streetAddress: "123 Healthcare Avenue, Medical District",
    city: "Mumbai",
    state: "Maharashtra",
    pinCode: "400001",
    visitingHours: {
      Monday: { isOpen: true, from: "09:00", to: "19:00" },
      Tuesday: { isOpen: true, from: "09:00", to: "19:00" },
      Wednesday: { isOpen: true, from: "09:00", to: "19:00" },
      Thursday: { isOpen: true, from: "09:00", to: "19:00" },
      Friday: { isOpen: true, from: "09:00", to: "19:00" },
      Saturday: { isOpen: true, from: "09:00", to: "17:00" },
      Sunday: { isOpen: false, from: "09:00", to: "19:00" }
    },
    coverPhoto: "",
    photos: [],
    videoUrl: "",
    insurance: ["Star Health", "HDFC ERGO", "Max Bupa", "CGHS"],
    status: "under-review",
    lastConfirmedAt: "2026-03-01T00:00:00Z",
    planTier: "GROWTH",
    members: []
  },
  {
    id: "2",
    type: "eyecare",
    name: "EyeMantra",
    specialties: ["Ophthalmology"],
    specialtyServices: {
      "Ophthalmology": ["Eye Examination", "Cataract Surgery", "LASIK"]
    },
    yearsInOperation: "10",
    about: "Specialized eye care center providing advanced treatments for all eye conditions including cataract surgery, LASIK, and comprehensive eye examinations.",
    bedCapacity: "20",
    accreditation: "NABH Entry Level",
    streetAddress: "456 Vision Plaza, Eye Care Complex",
    city: "Delhi",
    state: "Delhi",
    pinCode: "110001",
    visitingHours: {
      Monday: { isOpen: true, from: "10:00", to: "18:00" },
      Tuesday: { isOpen: true, from: "10:00", to: "18:00" },
      Wednesday: { isOpen: true, from: "10:00", to: "18:00" },
      Thursday: { isOpen: true, from: "10:00", to: "18:00" },
      Friday: { isOpen: true, from: "10:00", to: "18:00" },
      Saturday: { isOpen: true, from: "10:00", to: "14:00" },
      Sunday: { isOpen: false, from: "10:00", to: "18:00" }
    },
    coverPhoto: "",
    photos: [],
    videoUrl: "",
    insurance: ["Star Health", "Niva Bupa", "Ayushman Bharat"],
    status: "under-review",
    lastConfirmedAt: "2026-03-01T00:00:00Z",
    planTier: "SCALER",
    members: []
  }
];

export function PracticeDetails() {
  const { isCurrentUserAdmin, currentEstablishmentId, members } = usePartnerDashboard();
  const [establishments, setEstablishments] = useState<Establishment[]>(mockEstablishments);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [viewingEstablishment, setViewingEstablishment] = useState<Establishment | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form data for new/edit establishment
  const [formData, setFormData] = useState(({
    type: "hospital",
    name: "",
    nameDescription: "",
    specialties: [] as string[],
    specialtyServices: {} as { [key: string]: string[] },
    specialtiesDescription: "",
    therapyModalities: [] as string[],
    therapyModalitiesDescription: "",
    yearsInOperation: "",
    yearsInOperationDescription: "",
    about: "",
    bedCapacity: "",
    accreditation: accreditationOptions[0],
    insuranceDescription: "",
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
    visitingHours: {
      Monday: { isOpen: true, from: "09:00", to: "19:00" },
      Tuesday: { isOpen: true, from: "09:00", to: "19:00" },
      Wednesday: { isOpen: true, from: "09:00", to: "19:00" },
      Thursday: { isOpen: true, from: "09:00", to: "19:00" },
      Friday: { isOpen: true, from: "09:00", to: "19:00" },
      Saturday: { isOpen: true, from: "09:00", to: "19:00" },
      Sunday: { isOpen: false, from: "09:00", to: "19:00" }
    },
    coverPhoto: "",
    photos: [] as string[],
    videoUrl: "",
    insurance: [] as string[],
    fees: [] as { sessionType: string; price: number }[],
    slidingScaleAvailable: false,
    paymentMethodsAccepted: [] as string[],
    clientFocus: { ageGroups: [] as string[], participants: [] as string[] },
    clientFocusDescription: "",
    sessionFormat: "in-person" as "in-person" | "online" | "both",
    freeConsultation: { offered: false, durationMinutes: undefined }
  }));

  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Services & Offerings" },
    { number: 3, label: "Location" },
    { number: 4, label: "Photos" },
    { number: 5, label: "Review" }
  ];

  const handleOpenForm = () => {
    setShowForm(true);
    setCurrentStep(1);
    setEditingId(null);
    // Reset form data
    setFormData({
      type: "hospital",
      name: "",
      nameDescription: "",
      specialties: [],
      specialtyServices: {},
      specialtiesDescription: "",
      therapyModalities: [],
      therapyModalitiesDescription: "",
      yearsInOperation: "",
      yearsInOperationDescription: "",
      about: "",
      bedCapacity: "",
      accreditation: accreditationOptions[0],
      insuranceDescription: "",
      streetAddress: "",
      city: "",
      state: "",
      pinCode: "",
      visitingHours: {
        Monday: { isOpen: true, from: "09:00", to: "19:00" },
        Tuesday: { isOpen: true, from: "09:00", to: "19:00" },
        Wednesday: { isOpen: true, from: "09:00", to: "19:00" },
        Thursday: { isOpen: true, from: "09:00", to: "19:00" },
        Friday: { isOpen: true, from: "09:00", to: "19:00" },
        Saturday: { isOpen: true, from: "09:00", to: "19:00" },
        Sunday: { isOpen: false, from: "09:00", to: "19:00" }
      },
      coverPhoto: "",
      photos: [],
      videoUrl: "",
      insurance: [],
      insuranceDescription: "",
      fees: [],
      slidingScaleAvailable: false,
      paymentMethodsAccepted: [],
      clientFocus: { ageGroups: [], participants: [] },
      clientFocusDescription: "",
      sessionFormat: "in-person",
      freeConsultation: { offered: false, durationMinutes: undefined }
    });
  };

  const handleEditEstablishment = (establishment: Establishment) => {
    setEditingId(establishment.id);
    setShowForm(true);
    setViewMode(false);
    setCurrentStep(1);
    setFormData({
      type: establishment.type,
      name: establishment.name,
      specialties: establishment.specialties,
      specialtyServices: establishment.specialtyServices,
      yearsInOperation: establishment.yearsInOperation,
      about: establishment.about,
      bedCapacity: establishment.bedCapacity,
      accreditation: establishment.accreditation,
      streetAddress: establishment.streetAddress,
      city: establishment.city,
      state: establishment.state,
      pinCode: establishment.pinCode,
      visitingHours: establishment.visitingHours,
      coverPhoto: establishment.coverPhoto,
      photos: establishment.photos,
      videoUrl: establishment.videoUrl,
      insurance: establishment.insurance,
      fees: establishment.fees || [],
      slidingScaleAvailable: establishment.slidingScaleAvailable ?? false,
      paymentMethodsAccepted: establishment.paymentMethodsAccepted || [],
      clientFocus: establishment.clientFocus || { ageGroups: [], participants: [] },
      communitiesServed: establishment.communitiesServed || [],
      therapyModalities: establishment.therapyModalities || [],
      sessionFormat: establishment.sessionFormat || "in-person",
      freeConsultation: establishment.freeConsultation || { offered: false, durationMinutes: undefined }
    });
  };

  const handleViewEstablishment = (establishment: Establishment) => {
    setViewingEstablishment(establishment);
    setViewMode(true);
    setShowForm(false);
  };

  const handleCloseView = () => {
    setViewMode(false);
    setViewingEstablishment(null);
  };

  const handleEditFromView = () => {
    if (viewingEstablishment) {
      handleEditEstablishment(viewingEstablishment);
      setViewMode(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setCurrentStep(1);
    setEditingId(null);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    if (editingId) {
      setEstablishments(establishments.map(est => 
        est.id === editingId 
          ? {
              ...est,
              type: formData.type,
              name: formData.name || "Unnamed Establishment",
              specialties: formData.specialties,
              specialtyServices: formData.specialtyServices,
              yearsInOperation: formData.yearsInOperation,
              about: formData.about,
              bedCapacity: formData.bedCapacity,
              accreditation: formData.accreditation,
              streetAddress: formData.streetAddress,
              city: formData.city,
              state: formData.state,
              pinCode: formData.pinCode,
              visitingHours: formData.visitingHours,
      coverPhoto: formData.coverPhoto,
      photos: formData.photos,
      videoUrl: formData.videoUrl,
      insurance: formData.insurance,
      fees: formData.fees,
      slidingScaleAvailable: formData.slidingScaleAvailable,
      paymentMethodsAccepted: formData.paymentMethodsAccepted,
      clientFocus: formData.clientFocus,
      communitiesServed: formData.communitiesServed,
      therapyModalities: formData.therapyModalities,
      sessionFormat: formData.sessionFormat,
      freeConsultation: formData.freeConsultation,
      status: "under-review",
      lastConfirmedAt: new Date().toISOString(),
      planTier: est.planTier,
      members: est.members
    }
          : est
      ));
    } else {
      // Create new establishment
      const newEstablishment: Establishment = {
        id: Date.now().toString(),
        type: formData.type,
        name: formData.name || "Unnamed Establishment",
        specialties: formData.specialties,
        specialtyServices: formData.specialtyServices,
        yearsInOperation: formData.yearsInOperation,
        about: formData.about,
        bedCapacity: formData.bedCapacity,
        accreditation: formData.accreditation,
        streetAddress: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
        visitingHours: formData.visitingHours,
        coverPhoto: formData.coverPhoto,
        photos: formData.photos,
        videoUrl: formData.videoUrl,
        insurance: formData.insurance,
        fees: formData.fees,
        slidingScaleAvailable: formData.slidingScaleAvailable,
        paymentMethodsAccepted: formData.paymentMethodsAccepted,
        clientFocus: formData.clientFocus,
        communitiesServed: formData.communitiesServed,
        therapyModalities: formData.therapyModalities,
        sessionFormat: formData.sessionFormat,
        freeConsultation: formData.freeConsultation,
        status: "under-review",
        lastConfirmedAt: new Date().toISOString(),
        planTier: "BASIC",
        members: []
      };
      
      setEstablishments([...establishments, newEstablishment]);
    }
    
    handleCloseForm();
  };

  const handleSpecialtyChange = (newSpecialties: string[]) => {
    setFormData(prev => {
      // If removing specialty, also remove its services
      const newSpecialtyServices = { ...prev.specialtyServices };
      prev.specialties.forEach(specialty => {
        if (!newSpecialties.includes(specialty)) {
          delete newSpecialtyServices[specialty];
        }
      });
      
      return {
        ...prev,
        specialties: newSpecialties,
        specialtyServices: newSpecialtyServices
      };
    });
  };

  const handleSpecialtyServiceChange = (specialty: string, newServices: string[]) => {
    setFormData(prev => ({
      ...prev,
      specialtyServices: {
        ...prev.specialtyServices,
        [specialty]: newServices
      }
    }));
  };

  const handleInsuranceChange = (newInsurance: string[]) => {
    setFormData(prev => ({
      ...prev,
      insurance: newInsurance
    }));
  };

  const handleFeesChange = (fees: { sessionType: string; price: number }[]) => {
    setFormData(prev => ({ ...prev, fees }));
  };

  const addFeeRow = () => {
    setFormData(prev => ({
      ...prev,
      fees: [...prev.fees, { sessionType: "", price: 0 }]
    }));
  };

  const updateFeeRow = (index: number, field: "sessionType" | "price", value: string | number) => {
    setFormData(prev => {
      const fees = [...prev.fees];
      fees[index] = { ...fees[index], [field]: value };
      return { ...prev, fees };
    });
  };

  const removeFeeRow = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fees: prev.fees.filter((_, i) => i !== index)
    }));
  };

  const toggleSlidingScale = () => {
    setFormData(prev => ({ ...prev, slidingScaleAvailable: !prev.slidingScaleAvailable }));
  };

  const handlePaymentMethodsChange = (methods: string[]) => {
    setFormData(prev => ({ ...prev, paymentMethodsAccepted: methods }));
  };

  const handleAgeGroupsChange = (groups: string[]) => {
    setFormData(prev => ({
      ...prev,
      clientFocus: { ...prev.clientFocus, ageGroups: groups }
    }));
  };

  const handleParticipantsChange = (participants: string[]) => {
    setFormData(prev => ({
      ...prev,
      clientFocus: { ...prev.clientFocus, participants }
    }));
  };

  const handleTherapyModalitiesChange = (modalities: string[]) => {
    setFormData(prev => ({ ...prev, therapyModalities: modalities }));
  };

  const handleSessionFormatChange = (format: "in-person" | "online" | "both") => {
    setFormData(prev => ({ ...prev, sessionFormat: format }));
  };

  const toggleFreeConsultation = () => {
    setFormData(prev => ({
      ...prev,
      freeConsultation: {
        offered: !prev.freeConsultation.offered,
        durationMinutes: !prev.freeConsultation.offered ? 15 : undefined
      }
    }));
  };

  const toggleSpecialty = (specialty: string) => {
    setFormData(prev => {
      const newSpecialties = prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty];
      
      // If removing specialty, also remove its services
      const newSpecialtyServices = { ...prev.specialtyServices };
      if (!newSpecialties.includes(specialty)) {
        delete newSpecialtyServices[specialty];
      }
      
      return {
        ...prev,
        specialties: newSpecialties,
        specialtyServices: newSpecialtyServices
      };
    });
  };

  const toggleSpecialtyService = (specialty: string, service: string) => {
    setFormData(prev => {
      const currentServices = prev.specialtyServices[specialty] || [];
      const newServices = currentServices.includes(service)
        ? currentServices.filter(s => s !== service)
        : [...currentServices, service];
      
      return {
        ...prev,
        specialtyServices: {
          ...prev.specialtyServices,
          [specialty]: newServices
        }
      };
    });
  };

  const toggleInsurance = (insurance: string) => {
    setFormData(prev => ({
      ...prev,
      insurance: prev.insurance.includes(insurance)
        ? prev.insurance.filter(i => i !== insurance)
        : [...prev.insurance, insurance]
    }));
  };

  const updateVisitingHours = (day: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      visitingHours: {
        ...prev.visitingHours,
        [day]: {
          ...prev.visitingHours[day],
          [field]: value
        }
      }
    }));
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Basic information";
      case 2: return "Services & offerings";
      case 3: return "Location & hours";
      case 4: return "Photos & media";
      case 5: return "Review & publish";
      default: return "";
    }
  };

  const getEstablishmentIcon = (type: string) => {
    const typeObj = establishmentTypes.find(t => t.id === type);
    return typeObj?.icon || Building2;
  };

  const getEstablishmentLabel = (type: string) => {
    const typeObj = establishmentTypes.find(t => t.id === type);
    return typeObj?.label || "Establishment";
  };

  // If view mode is active, show establishment details
  if (viewMode && viewingEstablishment) {
    return (
      <EstablishmentViewMode
        establishment={viewingEstablishment}
        onClose={handleCloseView}
        onEdit={handleEditFromView}
        getEstablishmentIcon={getEstablishmentIcon}
        getEstablishmentLabel={getEstablishmentLabel}
      />
    );
  }

  // If form is shown, render the step wizard
  if (showForm) {
    return (
      <div>
        {/* Header with back button */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={handleCloseForm}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Establishments</span>
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      step.number === currentStep
                        ? "bg-[#00c0ff] text-white"
                        : step.number < currentStep
                        ? "bg-[#00c0ff]/20 text-[#00c0ff]"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                    }`}
                  >
                    {step.number < currentStep ? (
                      <Check className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className={`text-xs md:text-sm mt-2 whitespace-nowrap ${
                    step.number === currentStep
                      ? "text-[#00c0ff] font-medium"
                      : "text-gray-400"
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 md:mx-4 -mt-6 ${
                    step.number < currentStep
                      ? "bg-[#00c0ff]"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content Card */}
        <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-4 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {getStepTitle()}
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step 1: Basic Information (merged with establishment type) */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Establishment Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white text-base"
                    >
                      {establishmentTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Establishment Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white text-base"
                      placeholder="Enter establishment name"
                    />
                    <textarea
                      value={formData.nameDescription}
                      onChange={(e) => setFormData({ ...formData, nameDescription: e.target.value })}
                      rows={2}
                      className="w-full mt-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-xs text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 resize-none"
                      placeholder="Description for listing (will appear on your public profile)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      About the Establishment
                    </label>
                    <textarea
                      value={formData.about}
                      onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white resize-none text-base"
                      placeholder="Brief description of your establishment"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Primary Specialty *
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Select all specialties available at this establishment.
                    </p>
                    <MultiSelect
                      options={specialtyOptions}
                      selected={formData.specialties}
                      onChange={handleSpecialtyChange}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white text-base"
                      allowAdd
                      onAdd={(val) => {
                        if (!specialtyOptions.includes(val)) {
                          specialtyOptions.push(val);
                        }
                      }}
                    />
                    <textarea
                      value={formData.specialtiesDescription}
                      onChange={(e) => setFormData({ ...formData, specialtiesDescription: e.target.value })}
                      rows={2}
                      className="w-full mt-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-xs text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 resize-none"
                      placeholder="Description for listing (will appear on your public profile)"
                    />
                  </div>

                  {/* Specializations Section */}
                  <div className="pt-2">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      Specializations
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Please choose Primary Specialty to select Specializations
                    </p>
                    
                    {/* Services for each selected specialty */}
                    {formData.specialties.length > 0 && (
                      <div className="space-y-4">
                        {formData.specialties.map((specialty) => (
                          <div key={specialty} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <MultiSelect
                              label={specialty}
                              options={specialtyServicesMap[specialty] || []}
                              selected={formData.specialtyServices[specialty] || []}
                              onChange={(services) => handleSpecialtyServiceChange(specialty, services)}
                              placeholder="Select services..."
                              allowAdd
                              onAdd={(val) => {
                                if (specialtyServicesMap[specialty]) {
                                  specialtyServicesMap[specialty].push(val);
                                }
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Therapy Modalities — shown only when Therapy is selected */}
                  {formData.specialties.includes("Therapy") && (
                    <div className="pt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <Tags className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                          Therapy Modalities
                        </h4>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        Select the therapeutic approaches offered.
                      </p>
                      <MultiSelect
                        options={[...THERAPY_MODALITIES]}
                        selected={formData.therapyModalities}
                        onChange={handleTherapyModalitiesChange}
                        placeholder="Select modalities..."
                      />
                      <textarea
                        value={formData.therapyModalitiesDescription}
                        onChange={(e) => setFormData({ ...formData, therapyModalitiesDescription: e.target.value })}
                        rows={2}
                        className="w-full mt-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-xs text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 resize-none"
                        placeholder="Description for listing (will appear on your public profile)"
                      />
                    </div>
                  )}

                  {/* Insurance panels */}
                  <div className="pt-2">
                    <MultiSelect
                      label="Insurance panels accepted"
                      options={insuranceOptions}
                      selected={formData.insurance}
                      onChange={handleInsuranceChange}
                      placeholder="Select insurance providers..."
                    />
                    <textarea
                      value={formData.insuranceDescription}
                      onChange={(e) => setFormData({ ...formData, insuranceDescription: e.target.value })}
                      rows={2}
                      className="w-full mt-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-xs text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 resize-none"
                      placeholder="Description for listing (will appear on your public profile)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Years in Operation
                    </label>
                    <input
                      type="number"
                      value={formData.yearsInOperation}
                      onChange={(e) => setFormData({ ...formData, yearsInOperation: e.target.value })}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white text-base"
                      placeholder="e.g. 10"
                    />
                    <textarea
                      value={formData.yearsInOperationDescription}
                      onChange={(e) => setFormData({ ...formData, yearsInOperationDescription: e.target.value })}
                      rows={2}
                      className="w-full mt-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-xs text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/50 resize-none"
                      placeholder="Description for listing (will appear on your public profile)"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Services & Offerings */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {/* Fees */}
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                        Session Fees
                      </h4>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Add the session types and prices your establishment offers.
                    </p>
                    <div className="space-y-3">
                      {formData.fees.map((fee, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={fee.sessionType}
                            onChange={(e) => updateFeeRow(index, "sessionType", e.target.value)}
                            className="flex-1 px-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white text-base"
                            placeholder="e.g. Initial Consultation, Follow-up"
                          />
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                            <input
                              type="number"
                              value={fee.price || ""}
                              onChange={(e) => updateFeeRow(index, "price", parseInt(e.target.value) || 0)}
                              className="w-28 px-4 pl-7 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white text-base"
                              placeholder="0"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFeeRow(index)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addFeeRow}
                        className="flex items-center gap-2 text-sm font-medium text-[#00c0ff] hover:text-[#00a8e6] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add session type
                      </button>
                    </div>
                  </div>

                  {/* Sliding Scale */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                          Sliding Scale Available
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={toggleSlidingScale}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.slidingScaleAvailable ? "bg-[#00c0ff]" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.slidingScaleAvailable ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Offer income-based pricing to make services more accessible.
                    </p>
                  </div>

                  {/* Payment Methods */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <MultiSelect
                      label="Payment Methods Accepted"
                      options={[...PAYMENT_METHODS]}
                      selected={formData.paymentMethodsAccepted}
                      onChange={handlePaymentMethodsChange}
                      placeholder="Select payment methods..."
                    />
                  </div>

                  {/* Client Focus */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                        Client Focus
                      </h4>
                    </div>
                    <div className="space-y-4">
                      <MultiSelect
                        label="Age Groups"
                        options={[...AGE_GROUPS]}
                        selected={formData.clientFocus.ageGroups}
                        onChange={handleAgeGroupsChange}
                        placeholder="Select age groups..."
                      />
                      <MultiSelect
                        label="Participants"
                        options={[...PARTICIPANTS]}
                        selected={formData.clientFocus.participants}
                        onChange={handleParticipantsChange}
                        placeholder="Select participant types..."
                      />
                    </div>
                  </div>

                  {/* Session Format */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-3">
                      <Video className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                        Session Format
                      </h4>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {SESSION_FORMATS.map((format) => (
                        <button
                          key={format}
                          type="button"
                          onClick={() => handleSessionFormatChange(format)}
                          className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                            formData.sessionFormat === format
                              ? "border-[#00c0ff] bg-[#00c0ff]/10 text-[#00c0ff]"
                              : "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                          }`}
                        >
                          {format === "in-person" ? "In-Person" : format === "online" ? "Online" : "Both"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Free Consultation */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Headphones className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                          Free Consultation
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={toggleFreeConsultation}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.freeConsultation.offered ? "bg-[#00c0ff]" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.freeConsultation.offered ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                    {formData.freeConsultation.offered && (
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Duration (minutes)
                        </label>
                        <input
                          type="number"
                          value={formData.freeConsultation.durationMinutes || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              freeConsultation: {
                                ...formData.freeConsultation,
                                durationMinutes: parseInt(e.target.value) || undefined
                              }
                            })
                          }
                          className="w-full max-w-[200px] px-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white text-base"
                          placeholder="e.g. 15"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Location & Hours */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Practice Address with Visible toggle */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Practice Address <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={formData.streetAddress}
                        onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                        className="flex-1 px-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white text-base"
                        placeholder="Enter practice address"
                      />
                      <div className="flex items-center gap-3 px-4 py-3 bg-[#f3faff] dark:bg-[#043570]/20 border border-gray-300 dark:border-gray-600 rounded-lg">
                        <MapPin className="w-5 h-5 text-[#00c0ff]" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Visible</span>
                        <button
                          type="button"
                          className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#00c0ff] transition-colors"
                        >
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                        </button>
                        <Info className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Location/Landmark with Current Location button */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Location/Landmark <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={`${formData.city}, ${formData.state}, ${formData.pinCode}`}
                        onChange={(e) => {
                          // Parse the location string back into city, state, pincode
                          const parts = e.target.value.split(',').map(s => s.trim());
                          setFormData({ 
                            ...formData, 
                            city: parts[0] || '',
                            state: parts[1] || '',
                            pinCode: parts[2] || ''
                          });
                        }}
                        className="flex-1 px-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white text-base"
                        placeholder="Rohtak Road, Punjabi Bagh Tehsil, West Delhi, Delhi, 110056, India"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          // Get current location (placeholder for now)
                          alert('Current location feature - would use browser geolocation API');
                        }}
                        className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Navigation className="w-5 h-5 text-[#00c0ff]" />
                        <span className="text-sm font-medium text-[#043570] dark:text-[#00c0ff]">Current Location</span>
                        <MapPin className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                      Visiting Hours
                    </h4>
                    <div className="space-y-3">
                      {daysOfWeek.map((day) => (
                        <div key={day} className="flex items-center gap-3 md:gap-4">
                          <div className="w-20 md:w-24">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {day.slice(0, 3)}
                            </span>
                          </div>
                          
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.visitingHours[day].isOpen}
                              onChange={(e) => updateVisitingHours(day, "isOpen", e.target.checked)}
                              className="w-4 h-4 text-[#00c0ff] border-gray-300 rounded focus:ring-[#00c0ff]"
                            />
                          </label>

                          {formData.visitingHours[day].isOpen ? (
                            <div className="flex items-center gap-2 flex-1">
                              <input
                                type="time"
                                value={formData.visitingHours[day].from}
                                onChange={(e) => updateVisitingHours(day, "from", e.target.value)}
                                className="px-3 py-2 text-sm bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                              />
                              <span className="text-gray-400 text-sm">to</span>
                              <input
                                type="time"
                                value={formData.visitingHours[day].to}
                                onChange={(e) => updateVisitingHours(day, "to", e.target.value)}
                                className="px-3 py-2 text-sm bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white"
                              />
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">Closed</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Photos & Media */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Upload photos of your facility — facade, reception, wards, equipment. Listings with photos get 3× more views.
                  </p>

                  {/* Cover Photo Section */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Cover Photo <span className="text-red-500">*</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {formData.coverPhoto ? (
                        <div className="relative col-span-1 md:col-span-2 md:row-span-2">
                          <div className="w-full h-full min-h-[250px] md:min-h-[300px] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                            <img 
                              src={formData.coverPhoto} 
                              alt="Cover"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, coverPhoto: "" })}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-lg"
                            aria-label="Remove cover photo"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button 
                          type="button"
                          onClick={() => {
                            // Simulating photo upload
                            const mockPhotoUrl = `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop`;
                            setFormData({ ...formData, coverPhoto: mockPhotoUrl });
                          }}
                          className="col-span-1 md:col-span-2 md:row-span-2 w-full h-full min-h-[250px] md:min-h-[300px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#00c0ff] hover:bg-[#00c0ff]/5 transition-all flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-[#00c0ff]"
                        >
                          <Upload className="w-10 h-10" />
                          <div className="text-center">
                            <span className="text-base font-medium block">Cover Photo</span>
                            <span className="text-sm">Click to upload</span>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Additional Photos Section */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Additional Photos
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Show uploaded photos */}
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative aspect-square">
                          <div className="w-full h-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                            <img 
                              src={photo} 
                              alt={`Photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newPhotos = formData.photos.filter((_, i) => i !== index);
                              setFormData({ ...formData, photos: newPhotos });
                            }}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-lg"
                            aria-label={`Remove photo ${index + 1}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      
                      {/* Add Photo Button */}
                      <button
                        type="button"
                        onClick={() => {
                          // Simulating photo upload - using random Unsplash images
                          const randomId = Math.floor(Math.random() * 1000);
                          const mockPhotoUrl = `https://images.unsplash.com/photo-${1519494026892 + randomId}-80bbd2d6fd0d?w=400&h=400&fit=crop`;
                          setFormData({ ...formData, photos: [...formData.photos, mockPhotoUrl] });
                        }}
                        className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#00c0ff] hover:bg-[#00c0ff]/5 transition-all flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-[#00c0ff]"
                      >
                        <Plus className="w-6 h-6" />
                        <span className="text-xs font-medium">Add photo</span>
                      </button>
                    </div>
                  </div>

                  {/* Video Link */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Video tour link (optional)
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-750 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c0ff] dark:text-white text-base"
                        placeholder="https://youtube.com/... or https://vimeo.com/..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Review & Publish */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  {/* Establishment */}
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                      Establishment
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600 dark:text-gray-400">Type:</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {getEstablishmentLabel(formData.type)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600 dark:text-gray-400">Name:</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {formData.name || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600 dark:text-gray-400">Specialties:</span>
                        <span className="text-gray-900 dark:text-white font-medium text-right">
                          {formData.specialties.join(", ") || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600 dark:text-gray-400">Years in Operation:</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {formData.yearsInOperation || "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Location & Hours */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                      Location & Hours
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600 dark:text-gray-400">Address:</span>
                        <span className="text-gray-900 dark:text-white font-medium text-right max-w-md">
                          {formData.streetAddress || "—"}, {formData.city || "—"}, {formData.state || "—"} {formData.pinCode || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600 dark:text-gray-400">Open days:</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {Object.entries(formData.visitingHours)
                            .filter(([_, hours]) => hours.isOpen)
                            .map(([day]) => day.slice(0, 3))
                            .join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Services by Specialty */}
                  {Object.keys(formData.specialtyServices).length > 0 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                        Services Offered
                      </h4>
                      <div className="space-y-3">
                        {Object.entries(formData.specialtyServices).map(([specialty, services]) => (
                          services.length > 0 && (
                            <div key={specialty}>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {specialty}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {services.map((service) => (
                                  <span
                                    key={service}
                                    className="px-3 py-1 bg-[#00c0ff]/10 text-[#00c0ff] rounded-full text-xs font-medium"
                                  >
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Insurance */}
                  {formData.insurance.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                        Insurance
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.insurance.map((insurance) => (
                          <span
                            key={insurance}
                            className="px-3 py-1 bg-[#00c0ff]/10 text-[#00c0ff] rounded-full text-xs font-medium"
                          >
                            {insurance}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fees */}
                  {formData.fees.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                        Session Fees
                      </h4>
                      <div className="space-y-1.5 text-sm">
                        {formData.fees.map((fee, i) => (
                          <div key={i} className="flex justify-between py-1.5">
                            <span className="text-gray-700 dark:text-gray-300">{fee.sessionType}</span>
                            <span className="text-gray-900 dark:text-white font-medium">₹{fee.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sliding Scale */}
                  {formData.slidingScaleAvailable && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                        Sliding Scale
                      </h4>
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Available
                      </p>
                    </div>
                  )}

                  {/* Payment Methods */}
                  {formData.paymentMethodsAccepted.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                        Payment Methods Accepted
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.paymentMethodsAccepted.map((method) => (
                          <span key={method} className="px-3 py-1 bg-[#00c0ff]/10 text-[#00c0ff] rounded-full text-xs font-medium">
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Client Focus */}
                  {(formData.clientFocus.ageGroups.length > 0 || formData.clientFocus.participants.length > 0) && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                        Client Focus
                      </h4>
                      <div className="space-y-1.5 text-sm">
                        {formData.clientFocus.ageGroups.length > 0 && (
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600 dark:text-gray-400">Age Groups:</span>
                            <span className="text-gray-900 dark:text-white font-medium text-right">{formData.clientFocus.ageGroups.join(", ")}</span>
                          </div>
                        )}
                        {formData.clientFocus.participants.length > 0 && (
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600 dark:text-gray-400">Participants:</span>
                            <span className="text-gray-900 dark:text-white font-medium text-right">{formData.clientFocus.participants.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Communities Served */}
                  {formData.communitiesServed.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                        Communities Served
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.communitiesServed.map((c) => (
                          <span key={c} className="px-3 py-1 bg-[#00c0ff]/10 text-[#00c0ff] rounded-full text-xs font-medium">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Therapy Modalities */}
                  {formData.therapyModalities.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                        Therapy Modalities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.therapyModalities.map((m) => (
                          <span key={m} className="px-3 py-1 bg-[#00c0ff]/10 text-[#00c0ff] rounded-full text-xs font-medium">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Session Format */}
                  {formData.sessionFormat && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                        Session Format
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium capitalize">
                        {formData.sessionFormat === "both" ? "In-Person & Online" : formData.sessionFormat}
                      </p>
                    </div>
                  )}

                  {/* Free Consultation */}
                  {formData.freeConsultation.offered && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                        Free Consultation
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {formData.freeConsultation.durationMinutes
                          ? `${formData.freeConsultation.durationMinutes} minutes`
                          : "Available"}
                      </p>
                    </div>
                  )}

                  {/* Plan & Team */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                      Plan & Team
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600 dark:text-gray-400">Plan Tier:</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {editingId
                            ? establishments.find((e) => e.id === editingId)?.planTier || "—"
                            : "Free"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600 dark:text-gray-400">Members:</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {editingId
                            ? `${establishments.find((e) => e.id === editingId)?.members.filter((m) => m.memberStatus !== "offboarded").length || 0} added`
                            : "0 (add after creation)"}
                        </span>
                      </div>
                    </div>
                    {editingId && (
                      <div className="mt-3">
                        {(() => {
                          const est = establishments.find((e) => e.id === editingId);
                          const activeMembers = est?.members.filter((m) => m.memberStatus !== "offboarded") || [];
                          if (activeMembers.length === 0) return null;
                          return (
                            <div className="flex flex-wrap gap-2">
                              {activeMembers.map((m) => (
                                <span
                                  key={m.providerId}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-750 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300"
                                >
                                  {m.roles.isAdmin && (
                                    <span className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded text-[10px]">
                                      Admin
                                    </span>
                                  )}
                                  {m.roles.clinical}
                                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                                    m.memberStatus === "active"
                                      ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                                      : m.memberStatus === "verification-pending"
                                        ? "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                                        : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                                  }`}>
                                    {m.memberStatus.replace("-", " ")}
                                  </span>
                                </span>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Listing Health */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                      Listing Health
                    </h4>
                    {(() => {
                      const checks = [
                        { label: "Name", filled: !!formData.name },
                        { label: "About / Description", filled: !!formData.about },
                        { label: "Specialties", filled: formData.specialties.length > 0 },
                        { label: "Insurance", filled: formData.insurance.length > 0 },
                        { label: "Photos", filled: formData.photos.length > 0 },
                        { label: "Session Fees", filled: formData.fees.length > 0 },
                        { label: "Client Focus", filled: formData.clientFocus.ageGroups.length > 0 || formData.clientFocus.participants.length > 0 },
                        { label: "Session Format", filled: !!formData.sessionFormat },
                        { label: "Visiting Hours", filled: Object.values(formData.visitingHours).some((h) => h.isOpen) },
                        { label: "Address", filled: !!formData.streetAddress && !!formData.city },
                      ];
                      const filled = checks.filter((c) => c.filled).length;
                      const pct = Math.round((filled / checks.length) * 100);
                      return (
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500"
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className={`text-sm font-semibold ${
                              pct >= 80 ? "text-green-600 dark:text-green-400" : pct >= 50 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"
                            }`}>
                              {pct}%
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {checks.map((c) => (
                              <div key={c.label} className="flex items-center gap-2 text-xs">
                                {c.filled ? (
                                  <CheckCircle2 className="size-3.5 text-green-500" />
                                ) : (
                                  <XCircle className="size-3.5 text-red-400" />
                                )}
                                <span className={c.filled ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}>
                                  {c.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Info Box */}
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex gap-3">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-800 dark:text-green-300">
                      Your listing will be reviewed by our team and go live within 24 hours of submission.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-[#00c0ff] hover:bg-[#00a8e6] text-white rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="px-6 py-2.5 bg-[#00c0ff] hover:bg-[#00a8e6] text-white rounded-lg transition-colors font-medium"
              >
                {editingId ? "Update Listing" : "Publish Listing"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main view - list of establishments or empty state
  // An establishment must exist if the current user is an Admin who has an
  // active establishment membership, so the "No establishments" empty state
  // is only reachable for genuinely establishment-less solo providers.
  const hasActiveEstablishmentMembership = members.some(
    (m) =>
      m.establishmentId === currentEstablishmentId &&
      m.memberStatus === "active"
  );
  const isAdminWithEstablishment =
    isCurrentUserAdmin && !!currentEstablishmentId && hasActiveEstablishmentMembership;
  const showEmptyState = establishments.length === 0 && !isAdminWithEstablishment;

  return (
    <div>
      {showEmptyState ? (
        // Empty State
        <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#00c0ff]/10 flex items-center justify-center mb-4 md:mb-6">
            <Building2 className="w-6 h-6 md:w-8 md:h-8 text-[#00c0ff]" strokeWidth={1.5} />
          </div>
          
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No establishments added yet
          </h3>
          
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-md mb-6 md:mb-8">
            Add your clinic, hospital or diagnostic center to get listed on MantraCare's directory and reach more patients.
          </p>
          
          <button
            onClick={handleOpenForm}
            className="bg-[#00c0ff] hover:bg-[#00a8e6] text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 text-sm md:text-base"
          >
            <Plus className="w-5 h-5" />
            Create Establishment
          </button>
        </div>
      ) : (
        // Establishments List
        <div className="space-y-4">
          {establishments.map((establishment) => {
            const Icon = getEstablishmentIcon(establishment.type);
            return (
              <div
                key={establishment.id}
                className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="flex items-start gap-4 p-4 md:p-6">
                  <button
                    onClick={() => handleViewEstablishment(establishment)}
                    className="flex items-start gap-4 flex-1 min-w-0 text-left hover:opacity-80 transition-opacity"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#00c0ff]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#00c0ff]" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {establishment.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {establishment.streetAddress}, {establishment.city}, {establishment.state} {establishment.pinCode}
                      </p>
                    </div>
                  </button>
                  
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                      establishment.status === "live"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : establishment.status === "under-review"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    }`}>
                      {establishment.status === "live" ? "Live" : establishment.status === "under-review" ? "Under Review" : "Draft"}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditEstablishment(establishment);
                      }}
                      className="text-gray-400 hover:text-[#00c0ff] transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      title="Edit establishment"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Add Another Establishment Card */}
          <button
            onClick={handleOpenForm}
            className="w-full bg-white dark:bg-gray-800 md:rounded-xl md:border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 md:p-8 hover:border-[#00c0ff] hover:bg-[#00c0ff]/5 transition-all flex items-center justify-center gap-2 text-[#00c0ff] font-medium"
          >
            <Plus className="w-5 h-5" />
            Add another establishment
          </button>
        </div>
      )}
    </div>
  );
}
