import React from 'react';
import { FileText, ChevronRight, CornerDownRight, ExternalLink, ArrowRight } from 'lucide-react';

interface OutlineViewProps {
  onNavigate: (section: string) => void;
}

export const OutlineView: React.FC<OutlineViewProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header bar mirroring "Generating Document..." from user screenshot */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-700" />
          <h2 className="text-lg font-bold text-slate-900">
            SBS Transit Document & Site Architecture Tree
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          Structure Blueprint (Screen 1)
        </span>
      </div>

      <p className="text-xs text-slate-600">
        This interactive site map represents the document hierarchical tree depicted in the initial UI generator diagram. Click any node to open the corresponding live screen.
      </p>

      {/* Hierarchical Document Outline Tree exactly matching the user's screenshot */}
      <div className="font-sans text-xs sm:text-sm space-y-3 bg-slate-50 p-5 rounded-lg border border-slate-200">
        {/* Top level items */}
        <div className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">
          Menu
        </div>
        <div className="text-slate-500 font-medium text-xs">
          A+ A A-
        </div>
        <div className="text-slate-500 font-medium text-xs">
          Search
        </div>

        {/* Tree List */}
        <ul className="space-y-3 pl-2 border-l-2 border-purple-300">
          <li>
            <button
              onClick={() => onNavigate('home')}
              className="text-purple-700 hover:text-[#ff5722] hover:underline font-bold flex items-center gap-1.5"
            >
              <span>• Home</span>
            </button>
          </li>

          {/* Bus Branch */}
          <li className="space-y-1.5">
            <div className="text-slate-900 font-bold flex items-center gap-1">
              <span>• Bus</span>
            </div>
            <ul className="pl-6 space-y-1.5 border-l border-slate-300 text-xs text-slate-700">
              <li>
                <button
                  onClick={() => onNavigate('service-info')}
                  className="text-purple-700 hover:text-[#ff5722] hover:underline flex items-center gap-1"
                >
                  <CornerDownRight className="w-3 h-3 text-slate-400" />
                  <span>Service Information</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('wheelchair-accessible')}
                  className="text-purple-700 hover:text-[#ff5722] hover:underline flex items-center gap-1"
                >
                  <CornerDownRight className="w-3 h-3 text-slate-400" />
                  <span>Wheelchair-Accessible Bus Services</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('nextbus-arrival-timings')}
                  className="text-[#ff5722] font-bold hover:underline flex items-center gap-1"
                >
                  <CornerDownRight className="w-3 h-3 text-[#ff5722]" />
                  <span>NextBus Arrival Timings (Active Screen)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('interchanges-terminals')}
                  className="text-purple-700 hover:text-[#ff5722] hover:underline flex items-center gap-1"
                >
                  <CornerDownRight className="w-3 h-3 text-slate-400" />
                  <span>Interchanges, Terminals and Stations</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('conditions-of-carriage')}
                  className="text-purple-700 hover:text-[#ff5722] hover:underline flex items-center gap-1"
                >
                  <CornerDownRight className="w-3 h-3 text-slate-400" />
                  <span>Conditions of Carriage</span>
                </button>
              </li>
            </ul>
          </li>

          {/* Rail Branch */}
          <li className="space-y-1.5 pt-2">
            <div className="text-slate-900 font-bold flex items-center gap-1">
              <span>• Rail</span>
            </div>
            <ul className="pl-6 space-y-1.5 border-l border-slate-300 text-xs text-slate-700">
              <li>
                <button
                  onClick={() => onNavigate('rail')}
                  className="text-purple-700 hover:text-[#ff5722] hover:underline flex items-center gap-1"
                >
                  <CornerDownRight className="w-3 h-3 text-slate-400" />
                  <span>System Map</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rail')}
                  className="text-purple-700 hover:text-[#ff5722] hover:underline flex items-center gap-1"
                >
                  <CornerDownRight className="w-3 h-3 text-slate-400" />
                  <span>Station Information</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rail')}
                  className="text-purple-700 hover:text-[#ff5722] hover:underline flex items-center gap-1"
                >
                  <CornerDownRight className="w-3 h-3 text-slate-400" />
                  <span>First Train / Last Train</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rail')}
                  className="text-purple-700 hover:text-[#ff5722] hover:underline flex items-center gap-1"
                >
                  <CornerDownRight className="w-3 h-3 text-slate-400" />
                  <span>Travel Time</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rail')}
                  className="text-purple-700 hover:text-[#ff5722] hover:underline flex items-center gap-1"
                >
                  <CornerDownRight className="w-3 h-3 text-slate-400" />
                  <span>Art In Transit</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onNavigate('nextbus-arrival-timings')}
          className="bg-[#4a154b] text-white hover:bg-[#5e196c] px-4 py-2 rounded text-xs font-bold flex items-center gap-1.5 transition-colors"
        >
          <span>Return to NextBus Arrival Timings</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
