import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { ArrowLeft, Download } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  initials: string;
  avatarColor: string;
}

export function CMS1500Form() {
  const navigate = useNavigate();
  const { id, clientId } = useParams();
  const location = useLocation();
  const clientData = location.state?.client as Client | undefined;

  // Determine if we're coming from the new claims flow or old client-based flow
  const isNewClaimsFlow = location.pathname.includes('/claims/new/');
  
  const handleBack = () => {
    if (isNewClaimsFlow && clientId) {
      navigate(`/claims/new/${clientId}`, { state: { client: clientData } });
    } else {
      navigate(`/clients/${id}/insurance/claims/create`);
    }
  };

  const [formData, setFormData] = useState({
    // All form fields here
    payerId: "",
    insuranceType: [] as string[],
    insuredIdNumber: "",
    patientName: "John",
    patientSex: "",
    insuredName: "",
    patientAddress: "Street",
    patientCity: "City",
    patientState: "State",
    patientZip: "ZIP",
    patientTelephone: "",
    patientRelationship: "",
    insuredAddress: "",
    insuredCity: "",
    insuredState: "",
    insuredZip: "",
    insuredTelephone: "",
    reservedNucc: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4">
        <div className="max-w-[1280px] mx-auto flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="size-6 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            CMS-1500 Health Insurance Claim Form
          </h1>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-8 py-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            {/* Form Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                CMS-1500 Health Insurance Claim Form
              </h2>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#364153] text-white text-xs font-medium rounded">
                  APPROVED
                </span>
                <button className="px-3 py-1 bg-[#dbeafe] dark:bg-blue-900/30 text-[#1447e6] dark:text-blue-400 text-xs font-medium rounded">
                  Claim Details ▼
                </button>
              </div>
            </div>

            {/* Form Grid */}
            <div className="p-6">
              {/* Row 1: PAYER ID + Insurance Type Checkboxes and INSURED'S ID NUMBER */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                {/* Left Column - Box 1 */}
                <div className="border border-[#d1d5dc] p-2">
                  <div className="mb-2">
                    <p className="text-[10px] font-semibold text-[#0a0a0a] mb-1">PAYER ID</p>
                    <div className="border-b border-[#d1d5dc] h-[21px]"></div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-[#0a0a0a] mb-1">Carrier</p>
                    <div className="space-y-[2px]">
                      <div className="border-b border-[#d1d5dc] h-[21px] flex items-center px-1">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">Name</p>
                      </div>
                      <div className="border-b border-[#d1d5dc] h-[21px] flex items-center px-1">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">Address line 1</p>
                      </div>
                      <div className="border-b border-[#d1d5dc] h-[21px] flex items-center px-1">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">Address line 2</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Split into Insurance checkboxes and Insured's ID */}
                <div className="flex gap-2">
                  {/* Insurance Type Checkboxes */}
                  <div className="flex-1 border border-[#d1d5dc] p-2">
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-[12px]">
                      1. MEDICARE MEDICAID TRICARE CHAMPVA GROUP<br/>HEALTH PLAN FECA BLK LUNG OTHER
                    </p>
                    <div className="flex gap-3 mt-2">
                      <label className="flex items-center gap-1">
                        <input type="checkbox" className="size-3" />
                        <span className="text-base">Medicare</span>
                      </label>
                      <label className="flex items-center gap-1">
                        <input type="checkbox" className="size-3" />
                        <span className="text-base">Medicaid</span>
                      </label>
                      <label className="flex items-center gap-1">
                        <input type="checkbox" className="size-3" />
                        <span className="text-base">TRICARE</span>
                      </label>
                    </div>
                  </div>

                  {/* 1a. INSURED'S ID NUMBER */}
                  <div className="flex-1 border border-[#d1d5dc] p-2">
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-[12px]">1a. INSURED'S I.D. NUMBER</p>
                    <div className="border-b border-[#d1d5dc] h-[21px] mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Row 2: Patient's Name, Birth Date, Insured's Name */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                {/* 2. PATIENT'S NAME */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1">2. PATIENT'S NAME</p>
                  <div className="border-b border-[#d1d5dc] h-[21px] flex items-center px-1">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">John</p>
                  </div>
                  <div className="border-b border-[#d1d5dc] h-[21px] flex items-center px-1 mt-[2px]">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">First name</p>
                  </div>
                  <div className="border-b border-[#d1d5dc] h-[21px] flex items-center px-1 mt-[2px]">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">Middle name</p>
                  </div>
                </div>

                {/* 3. PATIENT'S BIRTH DATE & SEX */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1">3. PATIENT'S BIRTH DATE</p>
                  <div className="flex gap-1">
                    <div className="border border-[#d1d5dc] h-[22px] flex-1 flex items-center justify-center">
                      <p className="text-xs text-[rgba(10,10,10,0.5)]">MM</p>
                    </div>
                    <div className="border border-[#d1d5dc] h-[22px] flex-1 flex items-center justify-center">
                      <p className="text-xs text-[rgba(10,10,10,0.5)]">DD</p>
                    </div>
                    <div className="border border-[#d1d5dc] h-[22px] flex-1 flex items-center justify-center">
                      <p className="text-xs text-[rgba(10,10,10,0.5)]">YY</p>
                    </div>
                  </div>
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mt-2 mb-1">SEX</p>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-1">
                      <input type="radio" name="sex" className="size-3" />
                      <span className="text-base">M</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="radio" name="sex" className="size-3" />
                      <span className="text-base">F</span>
                    </label>
                  </div>
                </div>

                {/* 4. INSURED'S NAME */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1">4. INSURED'S NAME</p>
                  <div className="border-b border-[#d1d5dc] h-[21px] flex items-center px-1">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">Last name</p>
                  </div>
                  <div className="border-b border-[#d1d5dc] h-[21px] flex items-center px-1 mt-[2px]">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">First name</p>
                  </div>
                  <div className="border-b border-[#d1d5dc] h-[21px] flex items-center px-1 mt-[2px]">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">Middle</p>
                  </div>
                </div>
              </div>

              {/* Row 3: Patient's Address, Relationship, Insured's Address, Reserved */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                {/* 5. PATIENT'S ADDRESS */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1">5. PATIENT'S ADDRESS</p>
                  <div className="border-b border-[#d1d5dc] h-[21px] flex items-center px-1">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">Street</p>
                  </div>
                  <div className="border-b border-[#d1d5dc] h-[21px] flex items-center px-1 mt-[2px]">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">City</p>
                  </div>
                  <div className="flex gap-1 mt-[2px]">
                    <div className="border-b border-[#d1d5dc] h-[21px] flex-1 flex items-center px-1">
                      <p className="text-xs text-[rgba(10,10,10,0.5)]">State</p>
                    </div>
                    <div className="border-b border-[#d1d5dc] h-[21px] flex-1 flex items-center px-1">
                      <p className="text-xs text-[rgba(10,10,10,0.5)]">ZIP</p>
                    </div>
                  </div>
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mt-2 mb-1">TELEPHONE</p>
                  <div className="border-b border-[#d1d5dc] h-[21px]"></div>
                </div>

                {/* 6. PATIENT RELATIONSHIP TO INSURED */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1">6. PATIENT RELATIONSHIP TO INSURED</p>
                  <div className="space-y-0">
                    <label className="flex items-center gap-1">
                      <input type="radio" name="relationship" className="size-3" />
                      <span className="text-base">Self</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="radio" name="relationship" className="size-3" />
                      <span className="text-base">Spouse</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="radio" name="relationship" className="size-3" />
                      <span className="text-base">Child</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="radio" name="relationship" className="size-3" />
                      <span className="text-base">Other</span>
                    </label>
                  </div>
                </div>

                {/* 7. INSURED'S ADDRESS */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1">7. INSURED'S ADDRESS</p>
                  <div className="border-b border-[#d1d5dc] h-[21px] flex items-center px-1">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">Street</p>
                  </div>
                  <div className="border-b border-[#d1d5dc] h-[21px] flex items-center px-1 mt-[2px]">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">City</p>
                  </div>
                  <div className="flex gap-1 mt-[2px]">
                    <div className="border-b border-[#d1d5dc] h-[21px] flex-1 flex items-center px-1">
                      <p className="text-xs text-[rgba(10,10,10,0.5)]">State</p>
                    </div>
                    <div className="border-b border-[#d1d5dc] h-[21px] flex-1 flex items-center px-1">
                      <p className="text-xs text-[rgba(10,10,10,0.5)]">ZIP</p>
                    </div>
                  </div>
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mt-2 mb-1">TELEPHONE</p>
                  <div className="border-b border-[#d1d5dc] h-[21px]"></div>
                </div>

                {/* 8. RESERVED FOR NUCC USE */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1">8. RESERVED FOR NUCC USE</p>
                  <div className="border-b border-[#d1d5dc] h-[21px]"></div>
                </div>
              </div>

              {/* Row 4: Other Insured's Name, Employer, Insurance Plan, Condition Related To */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                {/* Left side: Boxes 9-9d */}
                <div className="grid grid-cols-2 gap-2">
                  {/* 9. OTHER INSURED'S NAME */}
                  <div className="border border-[#d1d5dc] p-2">
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1">9. OTHER INSURED'S NAME</p>
                    <div className="border-b border-[#d1d5dc] h-[21px]"></div>
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mt-2 mb-1">a. OTHER INSURED'S POLICY OR GROUP NUMBER</p>
                    <div className="border-b border-[#d1d5dc] h-[21px]"></div>
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mt-2 mb-1">b. RESERVED FOR NUCC USE</p>
                    <div className="border-b border-[#d1d5dc] h-[21px]"></div>
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mt-2 mb-1">c. RESERVED FOR NUCC USE</p>
                    <div className="border-b border-[#d1d5dc] h-[21px]"></div>
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mt-2 mb-1">d. INSURANCE PLAN NAME OR PROGRAM NAME</p>
                    <div className="border-b border-[#d1d5dc] h-[21px]"></div>
                  </div>

                  {/* 10. IS PATIENT'S CONDITION RELATED TO */}
                  <div className="border border-[#d1d5dc] p-2">
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                      10. IS PATIENT'S CONDITION RELATED TO:<br/>
                      <span className="text-[8px]">INSURANCE PLAN NAME OR PROGRAM NAME</span>
                    </p>
                    <div className="mt-1">
                      <p className="text-[9px] font-semibold text-[#0a0a0a] mb-0.5">a. EMPLOYMENT? (Current or Previous)</p>
                      <div className="flex gap-2">
                        <label className="flex items-center gap-1">
                          <input type="radio" name="employment" className="size-3" />
                          <span className="text-xs">YES</span>
                        </label>
                        <label className="flex items-center gap-1">
                          <input type="radio" name="employment" className="size-3" />
                          <span className="text-xs">NO</span>
                        </label>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-[9px] font-semibold text-[#0a0a0a] mb-0.5">b. AUTO ACCIDENT?</p>
                      <div className="flex gap-2 items-center">
                        <label className="flex items-center gap-1">
                          <input type="radio" name="auto" className="size-3" />
                          <span className="text-xs">YES</span>
                        </label>
                        <label className="flex items-center gap-1">
                          <input type="radio" name="auto" className="size-3" />
                          <span className="text-xs">NO</span>
                        </label>
                        <span className="text-[9px] ml-2">PLACE (State)</span>
                        <div className="border border-[#d1d5dc] h-[18px] w-12"></div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-[9px] font-semibold text-[#0a0a0a] mb-0.5">c. OTHER ACCIDENT?</p>
                      <div className="flex gap-2">
                        <label className="flex items-center gap-1">
                          <input type="radio" name="other" className="size-3" />
                          <span className="text-xs">YES</span>
                        </label>
                        <label className="flex items-center gap-1">
                          <input type="radio" name="other" className="size-3" />
                          <span className="text-xs">NO</span>
                        </label>
                      </div>
                    </div>
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mt-2 mb-1">d. CLAIM CODES (Designated by NUCC)</p>
                    <div className="border-b border-[#d1d5dc] h-[21px]"></div>
                  </div>
                </div>

                {/* Right side: Boxes 11-11d */}
                <div className="grid grid-cols-2 gap-2">
                  {/* 11. INSURED'S POLICY GROUP OR FECA NUMBER */}
                  <div className="border border-[#d1d5dc] p-2">
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                      11. INSURED'S POLICY GROUP OR FECA NUMBER
                    </p>
                    <div className="border-b border-[#d1d5dc] h-[21px]"></div>
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mt-2 mb-1">a. INSURED'S DATE OF BIRTH</p>
                    <div className="flex gap-1">
                      <div className="border-b border-[#d1d5dc] h-[21px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">MM</p>
                      </div>
                      <div className="border-b border-[#d1d5dc] h-[21px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">DD</p>
                      </div>
                      <div className="border-b border-[#d1d5dc] h-[21px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">YY</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <label className="flex items-center gap-1">
                        <input type="radio" name="insuredSex" className="size-3" />
                        <span className="text-base">M</span>
                      </label>
                      <label className="flex items-center gap-1">
                        <input type="radio" name="insuredSex" className="size-3" />
                        <span className="text-base">F</span>
                      </label>
                    </div>
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mt-2 mb-1">b. OTHER CLAIM ID (Designated by NUCC)</p>
                    <div className="border-b border-[#d1d5dc] h-[21px]"></div>
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mt-2 mb-1">c. INSURANCE PLAN NAME OR PROGRAM NAME</p>
                    <div className="border-b border-[#d1d5dc] h-[21px]"></div>
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mt-2 mb-1">d. IS THERE ANOTHER HEALTH BENEFIT PLAN?</p>
                    <div className="flex gap-2">
                      <label className="flex items-center gap-1">
                        <input type="radio" name="benefit" className="size-3" />
                        <span className="text-xs">YES</span>
                      </label>
                      <label className="flex items-center gap-1">
                        <input type="radio" name="benefit" className="size-3" />
                        <span className="text-xs">NO</span>
                      </label>
                    </div>
                  </div>

                  {/* 12-13 */}
                  <div className="grid grid-rows-2 gap-2">
                    {/* 12. PATIENT'S OR AUTHORIZED PERSON'S SIGNATURE */}
                    <div className="border border-[#d1d5dc] p-2">
                      <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                        12. PATIENT'S OR AUTHORIZED PERSON'S SIGNATURE
                      </p>
                      <p className="text-[8px] text-gray-600 leading-tight mb-1">
                        I authorize the release of any medical or other information necessary
                        to process this claim. I also request payment of government benefits
                        either to myself or to the party who accepts assignment below.
                      </p>
                      <div className="border-b border-[#d1d5dc] h-[18px] mt-1"></div>
                      <p className="text-[8px] text-right mt-0.5">Date</p>
                    </div>

                    {/* 13. INSURED'S OR AUTHORIZED PERSON'S SIGNATURE */}
                    <div className="border border-[#d1d5dc] p-2">
                      <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                        13. INSURED'S OR AUTHORIZED PERSON'S SIGNATURE
                      </p>
                      <p className="text-[8px] text-gray-600 leading-tight mb-1">
                        I authorize payment of medical benefits to the undersigned physician or
                        supplier for services described below.
                      </p>
                      <div className="border-b border-[#d1d5dc] h-[18px] mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 5: Dates and Referring Provider */}
              <div className="grid grid-cols-6 gap-2 mb-2">
                {/* 14. DATE OF CURRENT ILLNESS */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    14. DATE OF CURRENT ILLNESS, INJURY, or PREGNANCY (LMP)
                  </p>
                  <div className="flex gap-1 items-center">
                    <div className="border-b border-[#d1d5dc] h-[21px] flex-1 flex items-center justify-center">
                      <p className="text-xs text-[rgba(10,10,10,0.5)]">MM</p>
                    </div>
                    <div className="border-b border-[#d1d5dc] h-[21px] flex-1 flex items-center justify-center">
                      <p className="text-xs text-[rgba(10,10,10,0.5)]">DD</p>
                    </div>
                    <div className="border-b border-[#d1d5dc] h-[21px] flex-1 flex items-center justify-center">
                      <p className="text-xs text-[rgba(10,10,10,0.5)]">YY</p>
                    </div>
                  </div>
                  <p className="text-[8px] text-gray-600 mt-1">QUAL.</p>
                </div>

                {/* 15. OTHER DATE */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    15. OTHER DATE
                  </p>
                  <div className="flex gap-1 items-center">
                    <div className="border-b border-[#d1d5dc] h-[21px] flex-1 flex items-center justify-center">
                      <p className="text-xs text-[rgba(10,10,10,0.5)]">MM</p>
                    </div>
                    <div className="border-b border-[#d1d5dc] h-[21px] flex-1 flex items-center justify-center">
                      <p className="text-xs text-[rgba(10,10,10,0.5)]">DD</p>
                    </div>
                    <div className="border-b border-[#d1d5dc] h-[21px] flex-1 flex items-center justify-center">
                      <p className="text-xs text-[rgba(10,10,10,0.5)]">YY</p>
                    </div>
                  </div>
                  <p className="text-[8px] text-gray-600 mt-1">QUAL.</p>
                </div>

                {/* 16. DATES UNABLE TO WORK */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    16. DATES PATIENT UNABLE TO WORK IN CURRENT OCCUPATION
                  </p>
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      <span className="text-[8px]">FROM</span>
                      <div className="border-b border-[#d1d5dc] h-[18px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">MM</p>
                      </div>
                      <div className="border-b border-[#d1d5dc] h-[18px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">DD</p>
                      </div>
                      <div className="border-b border-[#d1d5dc] h-[18px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">YY</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-[8px]">TO</span>
                      <div className="border-b border-[#d1d5dc] h-[18px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">MM</p>
                      </div>
                      <div className="border-b border-[#d1d5dc] h-[18px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">DD</p>
                      </div>
                      <div className="border-b border-[#d1d5dc] h-[18px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">YY</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 17. NAME OF REFERRING PROVIDER */}
                <div className="col-span-2 border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    17. NAME OF REFERRING PROVIDER OR OTHER SOURCE
                  </p>
                  <div className="border-b border-[#d1d5dc] h-[21px]"></div>
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    <div>
                      <p className="text-[8px] text-gray-600 mb-0.5">17a. ID NUMBER OF REFERRING PHYSICIAN</p>
                      <div className="border-b border-[#d1d5dc] h-[18px]"></div>
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-600 mb-0.5">17b.</p>
                      <div className="border border-[#d1d5dc] h-[18px]"></div>
                    </div>
                  </div>
                </div>

                {/* 18. HOSPITALIZATION DATES */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    18. HOSPITALIZATION DATES RELATED TO CURRENT SERVICES
                  </p>
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      <span className="text-[8px]">FROM</span>
                      <div className="border-b border-[#d1d5dc] h-[18px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">MM</p>
                      </div>
                      <div className="border-b border-[#d1d5dc] h-[18px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">DD</p>
                      </div>
                      <div className="border-b border-[#d1d5dc] h-[18px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">YY</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-[8px]">TO</span>
                      <div className="border-b border-[#d1d5dc] h-[18px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">MM</p>
                      </div>
                      <div className="border-b border-[#d1d5dc] h-[18px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">DD</p>
                      </div>
                      <div className="border-b border-[#d1d5dc] h-[18px] flex-1 flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">YY</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 6: Additional Claim Info, Outside Lab, Diagnosis, Resubmission, Prior Auth */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                {/* 19. ADDITIONAL CLAIM INFORMATION */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    19. ADDITIONAL CLAIM INFORMATION (Designated by NUCC)
                  </p>
                  <div className="border-b border-[#d1d5dc] h-[40px]"></div>
                </div>

                {/* 20. OUTSIDE LAB */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    20. OUTSIDE LAB?
                  </p>
                  <div className="flex gap-2 items-center">
                    <label className="flex items-center gap-1">
                      <input type="radio" name="outsidelab" className="size-3" />
                      <span className="text-xs">YES</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="radio" name="outsidelab" className="size-3" />
                      <span className="text-xs">NO</span>
                    </label>
                  </div>
                  <p className="text-[8px] text-gray-600 mt-1 mb-0.5">$ CHARGES</p>
                  <div className="border border-[#d1d5dc] h-[18px]"></div>
                </div>

                {/* 21. DIAGNOSIS OR NATURE OF ILLNESS */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    21. DIAGNOSIS OR NATURE OF ILLNESS OR INJURY Relate A-L to service line below (24E)
                  </p>
                  <div className="grid grid-cols-4 gap-1">
                    {['A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.', 'H.'].map((letter) => (
                      <div key={letter} className="flex items-center gap-0.5">
                        <span className="text-[8px]">{letter}</span>
                        <div className="border border-[#d1d5dc] h-[16px] flex-1"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 22-23 */}
                <div className="grid grid-rows-2 gap-2">
                  {/* 22. RESUBMISSION CODE */}
                  <div className="border border-[#d1d5dc] p-2">
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                      22. RESUBMISSION CODE
                    </p>
                    <div className="border border-[#d1d5dc] h-[18px]"></div>
                    <p className="text-[8px] text-gray-600 mt-0.5">ORIGINAL REF. NO.</p>
                  </div>

                  {/* 23. PRIOR AUTHORIZATION NUMBER */}
                  <div className="border border-[#d1d5dc] p-2">
                    <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                      23. PRIOR AUTHORIZATION NUMBER
                    </p>
                    <div className="border-b border-[#d1d5dc] h-[18px]"></div>
                  </div>
                </div>
              </div>

              {/* Row 7: Service Lines (Box 24) */}
              <div className="border border-[#d1d5dc] mb-2">
                {/* Header */}
                <div className="grid grid-cols-12 gap-px bg-[#d1d5dc]">
                  <div className="col-span-2 bg-white p-1">
                    <p className="text-[8px] font-semibold text-center">A. DATE(S) OF SERVICE</p>
                    <div className="flex">
                      <p className="text-[7px] flex-1 text-center">From</p>
                      <p className="text-[7px] flex-1 text-center">To</p>
                    </div>
                  </div>
                  <div className="bg-white p-1">
                    <p className="text-[8px] font-semibold text-center">B.</p>
                    <p className="text-[7px] text-center">PLACE OF SERVICE</p>
                  </div>
                  <div className="bg-white p-1">
                    <p className="text-[8px] font-semibold text-center">C.</p>
                    <p className="text-[7px] text-center">EMG</p>
                  </div>
                  <div className="col-span-2 bg-white p-1">
                    <p className="text-[8px] font-semibold text-center">D. PROCEDURES, SERVICES, OR SUPPLIES</p>
                    <p className="text-[7px] text-center">(Explain Unusual Circumstances)</p>
                    <p className="text-[7px] text-center">CPT/HCPCS | MODIFIER</p>
                  </div>
                  <div className="bg-white p-1">
                    <p className="text-[8px] font-semibold text-center">E.</p>
                    <p className="text-[7px] text-center">DIAGNOSIS POINTER</p>
                  </div>
                  <div className="bg-white p-1">
                    <p className="text-[8px] font-semibold text-center">F.</p>
                    <p className="text-[7px] text-center">$ CHARGES</p>
                  </div>
                  <div className="bg-white p-1">
                    <p className="text-[8px] font-semibold text-center">G.</p>
                    <p className="text-[7px] text-center">DAYS OR UNITS</p>
                  </div>
                  <div className="bg-white p-1">
                    <p className="text-[8px] font-semibold text-center">H.</p>
                    <p className="text-[7px] text-center">EPSDT Family Plan</p>
                  </div>
                  <div className="bg-white p-1">
                    <p className="text-[8px] font-semibold text-center">I.</p>
                    <p className="text-[7px] text-center">ID QUAL</p>
                  </div>
                  <div className="col-span-2 bg-white p-1">
                    <p className="text-[8px] font-semibold text-center">J. RENDERING PROVIDER ID. #</p>
                  </div>
                </div>

                {/* Service Lines - 6 rows */}
                {[1, 2, 3, 4, 5, 6].map((line) => (
                  <div key={line} className="grid grid-cols-12 gap-px bg-[#d1d5dc] border-t border-[#d1d5dc]">
                    <div className="col-span-2 bg-white p-1">
                      <div className="flex gap-px">
                        <div className="flex-1 border-b border-[#d1d5dc] h-[20px] flex items-center justify-center">
                          <p className="text-xs text-[rgba(10,10,10,0.5)]">MM DD YY (MM DD YY)</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-1">
                      <div className="border-b border-[#d1d5dc] h-[20px]"></div>
                    </div>
                    <div className="bg-white p-1">
                      <div className="border-b border-[#d1d5dc] h-[20px]"></div>
                    </div>
                    <div className="col-span-2 bg-white p-1">
                      <div className="flex gap-px">
                        <div className="flex-1 border-b border-[#d1d5dc] h-[20px] flex items-center px-1">
                          <p className="text-xs text-[rgba(10,10,10,0.5)]">Description</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-1">
                      <div className="border-b border-[#d1d5dc] h-[20px] flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">1</p>
                      </div>
                    </div>
                    <div className="bg-white p-1">
                      <div className="border-b border-[#d1d5dc] h-[20px] flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">2</p>
                      </div>
                    </div>
                    <div className="bg-white p-1">
                      <div className="border-b border-[#d1d5dc] h-[20px] flex items-center justify-center">
                        <p className="text-xs text-[rgba(10,10,10,0.5)]">3</p>
                      </div>
                    </div>
                    <div className="bg-white p-1">
                      <div className="border-b border-[#d1d5dc] h-[20px]"></div>
                    </div>
                    <div className="bg-white p-1">
                      <div className="border-b border-[#d1d5dc] h-[20px]"></div>
                    </div>
                    <div className="col-span-2 bg-white p-1">
                      <div className="border-b border-[#d1d5dc] h-[20px]"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 8: Federal Tax, Patient Account, Accept Assignment, Total Charge, Amount Paid, Rsvd NUCC */}
              <div className="grid grid-cols-6 gap-2 mb-2">
                {/* 25. FEDERAL TAX ID NUMBER */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    25. FEDERAL TAX I.D. NUMBER
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="border border-[#d1d5dc] h-[18px] flex-1 flex items-center px-1">
                      <p className="text-xs text-[rgba(10,10,10,0.5)]">SSN EIN</p>
                    </div>
                    <div className="flex gap-1">
                      <label className="flex items-center gap-0.5">
                        <input type="radio" name="taxtype" className="size-2.5" />
                        <span className="text-[8px]">SSN</span>
                      </label>
                      <label className="flex items-center gap-0.5">
                        <input type="radio" name="taxtype" className="size-2.5" />
                        <span className="text-[8px]">EIN</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* 26. PATIENT'S ACCOUNT NO. */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    26. PATIENT'S ACCOUNT NO.
                  </p>
                  <div className="border-b border-[#d1d5dc] h-[18px]"></div>
                </div>

                {/* 27. ACCEPT ASSIGNMENT */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    27. ACCEPT ASSIGNMENT?
                  </p>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-1">
                      <input type="radio" name="assignment" className="size-3" />
                      <span className="text-xs">YES</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="radio" name="assignment" className="size-3" />
                      <span className="text-xs">NO</span>
                    </label>
                  </div>
                </div>

                {/* 28. TOTAL CHARGE */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    28. TOTAL CHARGE
                  </p>
                  <div className="border border-[#d1d5dc] h-[18px] flex items-center justify-center">
                    <p className="text-xs">$</p>
                  </div>
                </div>

                {/* 29. AMOUNT PAID */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    29. AMOUNT PAID
                  </p>
                  <div className="border border-[#d1d5dc] h-[18px] flex items-center justify-center">
                    <p className="text-xs">$</p>
                  </div>
                </div>

                {/* 30. RSVD FOR NUCC USE */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    30. RSVD FOR NUCC USE
                  </p>
                  <div className="border-b border-[#d1d5dc] h-[18px]"></div>
                </div>
              </div>

              {/* Row 9: Signature, Service Facility, Billing Provider */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                {/* 31. SIGNATURE OF PHYSICIAN OR SUPPLIER */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    31. SIGNATURE OF PHYSICIAN OR SUPPLIER INCLUDING DEGREES OR CREDENTIALS
                  </p>
                  <p className="text-[8px] text-gray-600 mb-0.5">
                    I certify that the statements on the reverse apply to this bill and are made a part thereof.
                  </p>
                  <div className="border-b border-[#d1d5dc] h-[18px] mt-1"></div>
                  <p className="text-[8px] text-right mt-0.5">DATE</p>
                </div>

                {/* 32. SERVICE FACILITY LOCATION INFORMATION */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    32. SERVICE FACILITY LOCATION INFORMATION
                  </p>
                  <div className="border-b border-[#d1d5dc] h-[18px] flex items-center px-1 mb-0.5">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">Name</p>
                  </div>
                  <div className="border-b border-[#d1d5dc] h-[18px] flex items-center px-1 mb-0.5">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">Address</p>
                  </div>
                  <div className="border-b border-[#d1d5dc] h-[18px] flex items-center px-1 mb-1">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">City, State, ZIP</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div>
                      <p className="text-[8px] text-gray-600 mb-0.5">a. NPI</p>
                      <div className="border-b border-[#d1d5dc] h-[16px]"></div>
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-600 mb-0.5">b. Other ID</p>
                      <div className="border-b border-[#d1d5dc] h-[16px]"></div>
                    </div>
                  </div>
                </div>

                {/* 33. BILLING PROVIDER INFO & PH # */}
                <div className="border border-[#d1d5dc] p-2">
                  <p className="text-[9px] font-semibold text-[#0a0a0a] mb-1 leading-tight">
                    33. BILLING PROVIDER INFO & PH #
                  </p>
                  <div className="border-b border-[#d1d5dc] h-[18px] flex items-center px-1 mb-0.5">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">Name</p>
                  </div>
                  <div className="border-b border-[#d1d5dc] h-[18px] flex items-center px-1 mb-0.5">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">Address</p>
                  </div>
                  <div className="border-b border-[#d1d5dc] h-[18px] flex items-center px-1 mb-1">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">City, State, ZIP</p>
                  </div>
                  <div className="border-b border-[#d1d5dc] h-[18px] flex items-center px-1 mb-1">
                    <p className="text-xs text-[rgba(10,10,10,0.5)]">Phone #</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div>
                      <p className="text-[8px] text-gray-600 mb-0.5">a. NPI</p>
                      <div className="border-b border-[#d1d5dc] h-[16px]"></div>
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-600 mb-0.5">b. Other ID</p>
                      <div className="border-b border-[#d1d5dc] h-[16px]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <p className="text-[9px] text-gray-500 dark:text-gray-400">
                  NUCC Instruction Manual available at: www.nucc.org
                  <br />
                  OMB APPROVAL PENDING
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              <button
                onClick={handleBack}
                className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Back to Session Selection
              </button>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Download className="size-4" />
                  Download PDF
                </button>
                <button className="px-6 py-2.5 bg-[#4169E1] hover:bg-[#3557c7] text-white rounded-xl font-medium transition-colors">
                  Submit Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
