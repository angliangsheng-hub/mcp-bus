import React, { useState } from 'react';
import { BUS_ROUTES, BusRoute } from '../data/transitData';
import { Bus, Clock, MapPin, ArrowRight, Check } from 'lucide-react';

interface ServiceInformationViewProps {
  onCheckArrivals: (serviceNo: string, stopCode: string) => void;
}

export const ServiceInformationView: React.FC<ServiceInformationViewProps> = ({
  onCheckArrivals
}) => {
  const [selectedService, setSelectedService] = useState<BusRoute>(BUS_ROUTES[0]);
  const [activeDirection, setActiveDirection] = useState<1 | 2>(1);

  const stops = activeDirection === 1 ? selectedService.direction1Stops : selectedService.direction2Stops;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
        <span>HOME</span>
        <span className="text-slate-400">&gt;</span>
        <span>BUS</span>
        <span className="text-slate-400">&gt;</span>
        <span className="text-[#ff5722] font-bold">SERVICE INFORMATION</span>
      </nav>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4a154b] tracking-tight">
          Bus Service Information & Schedules
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Detailed route paths, operating frequencies, and stop directories across SBS Transit routes.
        </p>
      </div>

      {/* Service Selector Chips */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Select Bus Service:
        </label>
        <div className="flex flex-wrap gap-2">
          {BUS_ROUTES.map((route) => (
            <button
              key={route.serviceNo}
              onClick={() => {
                setSelectedService(route);
                setActiveDirection(1);
              }}
              className={`px-3 py-2 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedService.serviceNo === route.serviceNo
                  ? 'bg-[#4a154b] text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Bus className="w-3.5 h-3.5" />
              <span>Service {route.serviceNo}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Route Overview Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#ff5722] text-white font-extrabold px-3 py-1 rounded text-base">
                {selectedService.serviceNo}
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                {selectedService.origin} ⇄ {selectedService.destination}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {selectedService.description}
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg text-xs text-purple-900 shrink-0">
            <div className="font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-purple-700" />
              <span>Operating Hours:</span>
            </div>
            <div className="font-mono font-bold mt-0.5">{selectedService.operatingHours} Daily</div>
          </div>
        </div>

        {/* Direction Switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveDirection(1)}
            className={`flex-1 p-3 rounded text-left text-xs font-medium border transition-colors ${
              activeDirection === 1
                ? 'bg-amber-50 border-[#ff5722] text-slate-900 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="text-[#ff5722] text-[11px] font-bold">Direction 1</div>
            <div>{selectedService.direction1Name}</div>
          </button>
          <button
            onClick={() => setActiveDirection(2)}
            className={`flex-1 p-3 rounded text-left text-xs font-medium border transition-colors ${
              activeDirection === 2
                ? 'bg-amber-50 border-[#ff5722] text-slate-900 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="text-[#ff5722] text-[11px] font-bold">Direction 2</div>
            <div>{selectedService.direction2Name}</div>
          </button>
        </div>

        {/* Headway & Frequency Chart */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Estimated Service Headway / Frequency
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-white p-2.5 rounded border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">Morning Peak (06:30 - 09:00)</div>
              <div className="text-sm font-extrabold text-[#4a154b] mt-1">4 - 7 mins</div>
            </div>
            <div className="bg-white p-2.5 rounded border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">Midday Off-Peak (09:00 - 17:00)</div>
              <div className="text-sm font-extrabold text-[#4a154b] mt-1">7 - 10 mins</div>
            </div>
            <div className="bg-white p-2.5 rounded border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">Evening Peak (17:00 - 20:00)</div>
              <div className="text-sm font-extrabold text-[#4a154b] mt-1">5 - 8 mins</div>
            </div>
            <div className="bg-white p-2.5 rounded border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">Night (After 20:00)</div>
              <div className="text-sm font-extrabold text-[#4a154b] mt-1">10 - 15 mins</div>
            </div>
          </div>
        </div>

        {/* Stop by Stop Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Stops Served ({stops.length} Total)
            </h3>
            <span className="text-xs text-slate-500">
              Click any stop to view live arrival times
            </span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
            {stops.map((st, idx) => (
              <div
                key={st.code}
                className="p-3 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-slate-900">{st.name}</div>
                    <div className="text-slate-500 text-[11px]">
                      {st.road} · Code: <span className="font-mono font-semibold text-slate-700">{st.code}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onCheckArrivals(selectedService.serviceNo, st.code)}
                  className="bg-amber-50 text-[#e65100] border border-orange-200 hover:bg-[#e65100] hover:text-white px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1"
                >
                  <span>Check Arrival</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
