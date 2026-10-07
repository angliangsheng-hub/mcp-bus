import React from 'react';
import { Accessibility, CheckCircle2, ShieldCheck, HeartHandshake, AlertCircle } from 'lucide-react';

export const WheelchairAccessibleView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
        <span>HOME</span>
        <span className="text-slate-400">&gt;</span>
        <span>BUS</span>
        <span className="text-slate-400">&gt;</span>
        <span className="text-[#ff5722] font-bold">WHEELCHAIR-ACCESSIBLE BUS SERVICES</span>
      </nav>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4a154b] tracking-tight">
          Wheelchair-Accessible Bus (WAB) Services
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Committed to inclusive public transport with 100% barrier-free fleet deployment across Singapore.
        </p>
      </div>

      {/* Hero Banner Card */}
      <div className="bg-gradient-to-r from-[#4a154b] to-[#6a1d6c] text-white p-6 rounded-lg shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <Accessibility className="w-8 h-8 text-amber-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              100% of SBS Transit Public Bus Fleet is WAB Certified
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-2xl">
              All SBS Transit scheduled bus services are operated by Wheelchair-Accessible Buses (WAB), featuring low-floor chassis, boarding ramps, and dedicated space for Passengers-in-Wheelchair (PIWs).
            </p>
          </div>
        </div>
      </div>

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Step 1 & 2 */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#ff5722] font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs">
              1
            </span>
            <span>At the Bus Stop & Boarding</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Please wait at the designated barrier-free boarding zone. When the bus approaches, signal to the Bus Captain. The Bus Captain will deploy the manual ramp and assist with boarding through the front or rear entrance.
          </p>
          <div className="bg-slate-50 p-3 rounded text-[11px] text-slate-600 border border-slate-200">
            <strong>Permitted Mobility Aids:</strong> Manual wheelchairs, motorized wheelchairs, and motorized mobility scooters within 120cm length and 70cm width, with total laden weight up to 300kg.
          </div>
        </div>

        {/* Priority Area */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#4a154b] font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs">
              2
            </span>
            <span>On Board the Bus</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Position your wheelchair facing backwards against the designated padded backrest. Apply brakes immediately or switch off motor power. Secure the safety seatbelt where equipped.
          </p>
          <div className="bg-purple-50 p-3 rounded text-[11px] text-purple-900 border border-purple-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
            <span>Fellow commuters are kindly reminded to yield priority spaces to PIWs and strollers.</span>
          </div>
        </div>
      </div>

      {/* Care & Assistance Commitment */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-[#ff5722]" />
          <span>Our Inclusive Journey Commitments</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded border border-slate-100">
            <div className="font-bold text-slate-900 mb-1">Trained Captains</div>
            <p className="text-slate-600 text-[11px]">
              Over 6,000 Bus Captains certified in passenger empathy, ramp deployment, and first-aid response.
            </p>
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-100">
            <div className="font-bold text-slate-900 mb-1">Audio & Visual Displays</div>
            <p className="text-slate-600 text-[11px]">
              Next-stop electronic display boards and bilingual chime announcements for visually or hearing impaired riders.
            </p>
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-100">
            <div className="font-bold text-slate-900 mb-1">Barrier-Free Hubs</div>
            <p className="text-slate-600 text-[11px]">
              All integrated transport hubs offer step-free access, tactile paving, and dedicated WAB priority boarding lanes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
