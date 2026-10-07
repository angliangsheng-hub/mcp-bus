import React from 'react';
import { NEWS_ANNOUNCEMENTS, NewsItem } from '../data/transitData';
import { ChevronRight } from 'lucide-react';

interface SidebarProps {
  currentSubPage: string;
  onSelectSubPage: (page: string) => void;
  onOpenNews: (news: NewsItem) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSubPage,
  onSelectSubPage,
  onOpenNews
}) => {
  const busNavItems = [
    { id: 'service-info', label: 'Service Information' },
    { id: 'wheelchair-accessible', label: 'Wheelchair-Accessible Bus Services' },
    { id: 'nextbus-arrival-timings', label: 'NextBus Arrival Timings' },
    { id: 'interchanges-terminals', label: 'Interchanges, Terminals and Stations' },
    { id: 'conditions-of-carriage', label: 'Conditions of Carriage' },
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-5">
      {/* BUS Navigation Card */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {/* Purple Card Header */}
        <div className="bg-[#4a154b] px-4 py-3 border-b border-[#5e196c]">
          <h2 className="text-white text-base font-bold uppercase tracking-wider font-sans">
            BUS
          </h2>
        </div>

        {/* Menu Items */}
        <nav className="divide-y divide-slate-100">
          {busNavItems.map((item) => {
            const isActive = currentSubPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSubPage(item.id)}
                className={`w-full text-left px-4 py-3 text-xs sm:text-sm transition-colors flex items-center justify-between group ${
                  isActive
                    ? 'bg-amber-50/70 text-[#ff5722] font-bold border-l-4 border-[#ff5722]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-purple-900 font-medium'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isActive
                      ? 'text-[#ff5722] translate-x-0.5'
                      : 'text-slate-400 group-hover:text-purple-800 group-hover:translate-x-0.5'
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>

      {/* What's New Card */}
      <div className="bg-[#481254] text-white rounded-lg shadow-sm border border-[#5f196d] overflow-hidden">
        {/* Card Header */}
        <div className="px-4 pt-3.5 pb-2 border-b border-[#5e176b]">
          <h2 className="text-white text-base font-bold tracking-tight">
            What's New
          </h2>
        </div>

        {/* News Items List */}
        <div className="divide-y divide-[#5d176b]/70 p-2 sm:p-3 space-y-2 sm:space-y-3">
          {NEWS_ANNOUNCEMENTS.map((item) => (
            <div key={item.id} className="pt-2 first:pt-0">
              <h3 className="text-xs font-semibold leading-snug text-white hover:text-amber-200 cursor-pointer line-clamp-2 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center justify-between mt-1.5 text-[11px] text-purple-200">
                <span className="font-mono text-slate-300">{item.date}</span>
                <button
                  onClick={() => onOpenNews(item)}
                  className="text-amber-300 hover:text-white hover:underline text-[11px] font-medium transition-colors"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
