import React, { useState } from 'react';
import { RAIL_LINES } from '../data/transitData';
import { Train, Clock, ArrowRight, ShieldCheck, Map, Search } from 'lucide-react';

export const RailView: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState(RAIL_LINES[0]);
  const [stationSearch, setStationSearch] = useState('');

  const filteredStations = selectedLine.stations.filter(
    (s) =>
      s.name.toLowerCase().includes(stationSearch.toLowerCase()) ||
      s.code.toLowerCase().includes(stationSearch.toLowerCase()) ||
      s.interchange.toLowerCase().includes(stationSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
        <span>HOME</span>
        <span className="text-slate-400">&gt;</span>
        <span className="text-[#ff5722] font-bold">RAIL NETWORK</span>
      </nav>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4a154b] tracking-tight">
          SBS Transit Rail Network (MRT & LRT)
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Operating Singapore's North East Line (NEL), Downtown Line (DTL), and Sengkang-Punggol LRT lines.
        </p>
      </div>

      {/* Rail Line Selection Tabs */}
      <div className="flex flex-wrap gap-2">
        {RAIL_LINES.map((line) => (
          <button
            key={line.code}
            onClick={() => {
              setSelectedLine(line);
              setStationSearch('');
            }}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border ${
              selectedLine.code === line.code
                ? 'bg-[#4a154b] text-white border-[#4a154b] shadow'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Train className="w-4 h-4" />
            <span>{line.name}</span>
          </button>
        ))}
      </div>

      {/* Line Details Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded text-xs font-black uppercase ${selectedLine.badgeBg}`}>
                {selectedLine.code}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{selectedLine.name}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {selectedLine.terminals} · {selectedLine.stationsCount}
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700">
            <span className="font-semibold block text-slate-500">Service Hours:</span>
            <span className="font-mono font-bold">{selectedLine.operatingHours} Daily</span>
          </div>
        </div>

        {/* Search Stations */}
        <div className="relative">
          <input
            type="text"
            value={stationSearch}
            onChange={(e) => setStationSearch(e.target.value)}
            placeholder="Search station name, code (e.g. NE14, DT14, Bugis, Chinatown)..."
            className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#ff5722]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
        </div>

        {/* Station Directory Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Stations Along Line
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[420px] overflow-y-auto p-1">
            {filteredStations.map((st) => (
              <div
                key={st.code}
                className="p-3 rounded-lg border border-slate-200 bg-white hover:border-[#ff5722] hover:bg-orange-50/30 transition-colors flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-10 h-7 rounded bg-slate-100 text-slate-800 font-mono font-extrabold text-xs flex items-center justify-center border border-slate-200">
                    {st.code}
                  </span>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900">
                      {st.name}
                    </div>
                    {st.interchange && (
                      <div className="text-[11px] text-purple-700 font-medium">
                        ⇄ {st.interchange}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-500">
                  <div className="font-medium text-emerald-700">First: 05:40</div>
                  <div className="text-slate-400">Last: 23:55</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
