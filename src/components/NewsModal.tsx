import React from 'react';
import { NewsItem } from '../data/transitData';
import { X, Calendar, Tag, Share2 } from 'lucide-react';

interface NewsModalProps {
  news: NewsItem | null;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ news, onClose }) => {
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-[#4a154b] text-white p-4 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-amber-300 font-semibold mb-1">
              <Tag className="w-3 h-3" />
              <span>{news.category}</span>
              <span>·</span>
              <Calendar className="w-3 h-3" />
              <span>{news.date}</span>
            </div>
            <h3 className="text-base font-bold leading-tight text-white">
              {news.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 max-h-[65vh] overflow-y-auto text-xs sm:text-sm text-slate-700 space-y-4">
          <p className="font-semibold text-slate-900 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
            {news.excerpt}
          </p>

          <div className="whitespace-pre-line text-slate-600 leading-relaxed text-xs">
            {news.content}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">SBS Transit Corporate Communications</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#4a154b] text-white rounded text-xs font-bold hover:bg-[#5e196c] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
