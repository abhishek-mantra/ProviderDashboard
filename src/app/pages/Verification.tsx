import { useState } from "react";
import { ArrowLeft, Plus, Upload, X, Calendar, Check } from "lucide-react";
import { useNavigate } from "react-router";

export function Verification() {
  const navigate = useNavigate();
  const [certFile, setCertFile] = useState<string>("");
  const [eduFile, setEduFile] = useState<string>("");
  const [currentlyWorking, setCurrentlyWorking] = useState<boolean>(false);
  const [showAcknowledgement, setShowAcknowledgement] = useState(false);

  // Show acknowledgement screen
  if (showAcknowledgement) {
    return (
      <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen flex items-center justify-center p-4 md:p-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-xl w-full p-10 md:p-16 text-center border border-gray-100 dark:border-gray-700">
          {/* Success Icon */}
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="relative">
              {/* Decorative dots with cyan color */}
              <div className="absolute -top-3 left-6 size-3 bg-[#5DADE2] rounded-full animate-pulse"></div>
              <div className="absolute -top-4 left-14 size-2.5 bg-[#85C1E2] rounded-full animate-pulse delay-100"></div>
              <div className="absolute top-4 -right-4 size-3 bg-[#5DADE2] rounded-full animate-pulse delay-200"></div>
              <div className="absolute -bottom-3 left-2 size-2 bg-[#85C1E2] rounded-full animate-pulse delay-300"></div>

              {/* Main checkmark circle */}
              <div className="size-28 md:size-32 bg-[#043570] rounded-full flex items-center justify-center shadow-2xl">
                <Check className="size-14 md:size-16 text-white" strokeWidth={3.5} />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Verification Details Submitted<br />Successfully!
          </h2>

          {/* Description */}
          <div className="space-y-4 mb-10 text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
            <p>
              Please wait while our team reviews your verification details and approves them.
            </p>
            <p>
              Approval usually takes <span className="font-bold text-gray-900 dark:text-white">24-48 hours</span>.
            </p>
            <p>
              Once your verification is approved, you will get a confirmation on your mail.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate("/profile")}
            className="px-12 py-4 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-bold transition-all text-base md:text-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen p-4 md:p-8">
      <div className="max-w-[960px] mx-auto">
            {/* Verification Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-8">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 md:mb-6 transition-colors"
                >
                  <ArrowLeft className="size-5" />
                  <span className="font-medium">Go Back</span>
                </button>

                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
                    Verification Details
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add your certifications and credentials
                  </p>
                </div>

                {/* Certification / License Section */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1 md:mb-2">
                    Certification / License
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3 md:mb-4">
                    Add your professional certifications and licenses
                  </p>

                  <div className="bg-[#eff3ff] dark:bg-blue-900/20 rounded-lg md:rounded-xl p-4 md:p-6 mb-3 md:mb-4">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">Add Certification</h4>
                      <button className="text-red-500 hover:text-red-600">
                        <X className="size-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Certifying Body
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., American Medical Association"
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Name / Details / Number
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Board Certification in Internal Medicine"
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Valid From
                          </label>
                          <input
                            type="date"
                            placeholder="dd-mm-yyyy"
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Valid To
                          </label>
                          <input
                            type="date"
                            placeholder="dd-mm-yyyy"
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Upload Document
                        </label>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                          <label className="w-full md:w-auto px-6 py-3 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 border-2 border-[#043570] text-[#043570] dark:text-blue-400 rounded-lg font-medium cursor-pointer transition-colors text-center">
                            Choose File
                            <input
                              type="file"
                              onChange={(e) => setCertFile(e.target.files?.[0]?.name || "")}
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                          </label>
                          {certFile && (
                            <span className="text-sm text-gray-600 dark:text-gray-400 break-all">
                              {certFile}
                            </span>
                          )}
                        </div>
                        {certFile && (
                          <div className="flex items-center gap-2 mt-2">
                            <Check className="size-4 text-green-600" />
                            <span className="text-sm text-green-600">File selected: {certFile}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={!certFile}
                    className={`w-full md:w-auto px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      certFile
                        ? "bg-[#4CAF50] hover:bg-[#45a049] text-white"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Check className="size-4" />
                    Save Certification
                  </button>
                </div>

                {/* Education / Degree Section */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1 md:mb-2">
                    Education / Degree
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3 md:mb-4">
                    Add your educational background and degrees earned
                  </p>

                  <div className="bg-[#eff3ff] dark:bg-blue-900/20 rounded-lg md:rounded-xl p-4 md:p-6 mb-3 md:mb-4">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">Add Education</h4>
                      <button className="text-red-500 hover:text-red-600">
                        <X className="size-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Institution Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. university, bootcamp, etc"
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Degree
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Bachelor's"
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            From
                          </label>
                          <input
                            type="date"
                            placeholder="dd-mm-yyyy"
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            To
                          </label>
                          <input
                            type="date"
                            placeholder="dd-mm-yyyy"
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Upload Document
                        </label>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                          <label className="w-full md:w-auto px-6 py-3 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 border-2 border-[#043570] text-[#043570] dark:text-blue-400 rounded-lg font-medium cursor-pointer transition-colors text-center">
                            Choose File
                            <input
                              type="file"
                              onChange={(e) => setEduFile(e.target.files?.[0]?.name || "")}
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                          </label>
                          {eduFile && (
                            <span className="text-sm text-gray-600 dark:text-gray-400 break-all">
                              {eduFile}
                            </span>
                          )}
                        </div>
                        {eduFile && (
                          <div className="flex items-center gap-2 mt-2">
                            <Check className="size-4 text-green-600" />
                            <span className="text-sm text-green-600">File selected: {eduFile}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={!eduFile}
                    className={`w-full md:w-auto px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      eduFile
                        ? "bg-[#4CAF50] hover:bg-[#45a049] text-white"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Check className="size-4" />
                    Save Education
                  </button>
                </div>

                {/* Work Experience Section */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1 md:mb-2">
                    Work Experience (optional)
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3 md:mb-4">
                    Add any work experience that will help you stand out
                  </p>

                  <div className="bg-[#eff3ff] dark:bg-blue-900/20 rounded-lg md:rounded-xl p-4 md:p-6 mb-3 md:mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">Add Work Experience</h4>
                      <button className="text-red-500 hover:text-red-600">
                        <X className="size-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Job Title
                          </label>
                          <input
                            type="text"
                            placeholder="Company"
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            placeholder="Employment Type"
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Employment Type
                          </label>
                          <input
                            type="text"
                            placeholder="From"
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            From
                          </label>
                          <input
                            type="text"
                            placeholder="dd-mm-yyyy"
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            To
                          </label>
                          <input
                            type="text"
                            placeholder="dd-mm-yyyy"
                            disabled={currentlyWorking}
                            className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c0ff]/20 focus:border-[#00c0ff] ${
                              currentlyWorking
                                ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                                : "bg-white dark:bg-gray-700"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="currentlyWorking"
                          checked={currentlyWorking}
                          onChange={(e) => setCurrentlyWorking(e.target.checked)}
                          className="w-4 h-4 text-[#00c0ff] rounded focus:ring-[#00c0ff]"
                        />
                        <label htmlFor="currentlyWorking" className="text-sm text-gray-700 dark:text-gray-300">
                          I am currently working here
                        </label>
                      </div>
                    </div>
                  </div>

                  <button className="w-full md:w-auto px-6 py-2.5 bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    <Check className="size-4" />
                    Add Experience
                  </button>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-end pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowAcknowledgement(true)}
                    className="w-full md:w-auto px-6 py-3 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-medium transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
      </div>
    </div>
  );
}
