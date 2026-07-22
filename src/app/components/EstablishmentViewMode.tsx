import { ChevronLeft, Pencil, MapPin, Clock, DollarSign, Users, Globe, Tags, Video, Headphones } from "lucide-react";
import type { Establishment } from "../types/partnerDashboard";

interface EstablishmentViewModeProps {
  establishment: Establishment;
  onClose: () => void;
  onEdit: () => void;
  getEstablishmentIcon: (type: string) => any;
  getEstablishmentLabel: (type: string) => string;
}

export function EstablishmentViewMode({
  establishment,
  onClose,
  onEdit,
  getEstablishmentIcon,
  getEstablishmentLabel
}: EstablishmentViewModeProps) {
  const Icon = getEstablishmentIcon(establishment.type);
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Establishments</span>
        </button>

        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-[#00c0ff] hover:bg-[#00a8e6] text-white rounded-lg font-medium transition-all text-sm"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>
      </div>

      {/* Establishment Header Card */}
      <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-[#00c0ff]/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-8 h-8 text-[#00c0ff]" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                {establishment.name}
              </h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                establishment.status === "live"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : establishment.status === "under-review"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-gray-100 text-gray-600 border-gray-200"
              }`}>
                {establishment.status === "live" ? "Live" : establishment.status === "under-review" ? "Under Review" : "Draft"}
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              {getEstablishmentLabel(establishment.type)} • {establishment.specialties.join(", ")}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {establishment.streetAddress}, {establishment.city}, {establishment.state} {establishment.pinCode}
            </p>
          </div>
        </div>
      </div>

      {/* About/Description Card */}
      {establishment.about && (
        <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            {establishment.about}
          </p>
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Basic Information
          </h3>
          
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Type</span>
              <p className="text-base text-gray-900 dark:text-white font-medium">
                {getEstablishmentLabel(establishment.type)}
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Specialties</span>
              <p className="text-base text-gray-900 dark:text-white font-medium">
                {establishment.specialties.join(", ") || "—"}
              </p>
            </div>

            {establishment.yearsInOperation && (
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Years in Operation</span>
                <p className="text-base text-gray-900 dark:text-white font-medium">
                  {establishment.yearsInOperation} years
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Visiting Hours */}
        <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#00c0ff]" />
            Visiting Hours
          </h3>
          
          <div className="space-y-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {day}
                </span>
                {establishment.visitingHours[day]?.isOpen ? (
                  <span className="text-gray-600 dark:text-gray-400">
                    {establishment.visitingHours[day]?.from} - {establishment.visitingHours[day]?.to}
                  </span>
                ) : (
                  <span className="text-gray-400 dark:text-gray-500">Closed</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        {Object.keys(establishment.specialtyServices).length > 0 && (
          <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Services Offered
            </h3>
            
            <div className="space-y-3">
              {Object.entries(establishment.specialtyServices).map(([specialty, services]) => (
                services.length > 0 && (
                  <div key={specialty}>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {specialty}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {services.map((service) => (
                        <span
                          key={service}
                          className="px-3 py-1.5 bg-[#00c0ff]/10 text-[#00c0ff] rounded-full text-sm font-medium"
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

        {/* Session Fees */}
        {establishment.fees && establishment.fees.length > 0 && (
          <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#00c0ff]" />
              Session Fees
            </h3>
            <div className="space-y-2">
              {establishment.fees.map((fee, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">{fee.sessionType}</span>
                  <span className="text-gray-900 dark:text-white font-medium">₹{fee.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sliding Scale & Free Consultation */}
        {(establishment.slidingScaleAvailable || establishment.freeConsultation?.offered) && (
          <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Pricing & Accessibility
            </h3>
            <div className="space-y-2 text-sm">
              {establishment.slidingScaleAvailable && (
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400 font-medium">✓ Sliding scale available</span>
                </div>
              )}
              {establishment.freeConsultation?.offered && (
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    ✓ Free consultation{establishment.freeConsultation.durationMinutes ? ` (${establishment.freeConsultation.durationMinutes} min)` : ""}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment Methods */}
        {establishment.paymentMethodsAccepted && establishment.paymentMethodsAccepted.length > 0 && (
          <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#00c0ff]" />
              Payment Methods
            </h3>
            <div className="flex flex-wrap gap-2">
              {establishment.paymentMethodsAccepted.map((method) => (
                <span key={method} className="px-3 py-1.5 bg-[#00c0ff]/10 text-[#00c0ff] rounded-full text-sm font-medium">
                  {method}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Client Focus */}
        {establishment.clientFocus && (establishment.clientFocus.ageGroups.length > 0 || establishment.clientFocus.participants.length > 0) && (
          <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#00c0ff]" />
              Client Focus
            </h3>
            <div className="space-y-2 text-sm">
              {establishment.clientFocus.ageGroups.length > 0 && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Age Groups:</span>
                  <p className="text-gray-900 dark:text-white font-medium">{establishment.clientFocus.ageGroups.join(", ")}</p>
                </div>
              )}
              {establishment.clientFocus.participants.length > 0 && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Participants:</span>
                  <p className="text-gray-900 dark:text-white font-medium">{establishment.clientFocus.participants.join(", ")}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Therapy Modalities */}
        {establishment.therapyModalities && establishment.therapyModalities.length > 0 && (
          <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Tags className="w-5 h-5 text-[#00c0ff]" />
              Therapy Modalities
            </h3>
            <div className="flex flex-wrap gap-2">
              {establishment.therapyModalities.map((m) => (
                <span key={m} className="px-3 py-1.5 bg-[#00c0ff]/10 text-[#00c0ff] rounded-full text-sm font-medium">
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Session Format */}
        {establishment.sessionFormat && (
          <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-[#00c0ff]" />
              Session Format
            </h3>
            <p className="text-base text-gray-900 dark:text-white font-medium capitalize">
              {establishment.sessionFormat === "both" ? "In-Person & Online" : establishment.sessionFormat}
            </p>
          </div>
        )}

        {/* Insurance */}
        {establishment.insurance.length > 0 && (
          <div className="bg-white dark:bg-gray-800 md:rounded-xl md:border border-gray-200 dark:border-gray-700 p-6 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Insurance Accepted
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {establishment.insurance.map((insurance) => (
                <span
                  key={insurance}
                  className="px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium border border-green-200 dark:border-green-800"
                >
                  {insurance}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
