import React from 'react';
import { INTERCHANGES_DATA } from '../data/transitData';
import { Building2, Train, Bus, CheckCircle2, MapPin } from 'lucide-react';

interface InterchangesViewProps {
  onSelectService: (serviceNo: string) => void;
}

export const InterchangesView: React.FC<InterchangesViewProps> = ({
  onSelectService
}) => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
        <span>HOME</span>
        <span className="text-slate-400">&gt;</span>
        <span>BUS</span>
        <span className="text-slate-400">&gt;</span>
        <span className="text-[#ff5722] font-bold">INTERCHANGES, TERMINALS & STATIONS</span>
      </nav>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4a154b] tracking-tight">
          Interchanges, Terminals & Stations
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Explore Singapore integrated transport hubs, boarding berths, and multimodal connectivity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {INTERCHANGES_DATA.map((hub) => (
          <div
            key={hub.name}
            className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {hub.name}
                  </h2>
                  <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ff5722] shrink-0" />
                    <span>{hub.location}</span>
                  </div>
                </div>

                <div className="bg-purple-50 text-purple-800 text-[11px] font-bold px-2.5 py-1 rounded border border-purple-200 shrink-0">
                  {hub.berths} Berths
                </div>
              </div>

              {/* MRT Connection */}
              <div className="mt-3 flex items-center gap-2 bg-slate-50 p-2.5 rounded border border-slate-200 text-xs">
                <Train className="w-4 h-4 text-purple-700 shrink-0" />
                <span className="text-slate-600">Connecting Rail:</span>
                <span className="font-bold text-slate-900">{hub.connectedMRT}</span>
              </div>

              {/* Services List */}
              <div className="mt-3">
                <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Departing Bus Services:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {hub.services.map((svc) => (
                    <button
                      key={svc}
                      onClick={() => onSelectService(svc)}
                      className="px-2 py-0.5 bg-slate-100 hover:bg-[#ff5722] hover:text-white text-slate-800 rounded text-xs font-bold font-mono transition-colors border border-slate-200"
                      title={`View arrival times for Service ${svc}`}
                    >
                      {svc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Hub Amenities:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-600">
                  {hub.facilities.map((fac, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{fac}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
