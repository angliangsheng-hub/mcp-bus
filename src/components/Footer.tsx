import React from 'react';

interface FooterProps {
  onOpenLegal: (topic: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="w-full bg-[#2a0730] text-slate-300 py-6 px-4 sm:px-8 border-t border-[#461150]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        {/* Left Info matching screenshot */}
        <div className="text-center md:text-left space-y-1">
          <p className="font-bold text-white font-sans tracking-wide">
            © 2026 SBS Transit Ltd. Co. Reg. No.: 199206653M. All Rights Reserved.
          </p>
          <p className="text-purple-300/80 text-[11px]">
            ComfortDelGro Group Company. Committed to reliable and seamless journeys across Singapore.
          </p>
        </div>

        {/* Right Links matching screenshot */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-slate-300 text-xs">
          <button
            onClick={() => onOpenLegal('Privacy Policy')}
            className="hover:text-amber-300 hover:underline transition-colors"
          >
            Privacy Policy
          </button>
          <span className="text-purple-500/50">|</span>
          <button
            onClick={() => onOpenLegal('Terms of Use')}
            className="hover:text-amber-300 hover:underline transition-colors"
          >
            Terms of Use
          </button>
          <span className="text-purple-500/50">|</span>
          <button
            onClick={() => onOpenLegal('Sitemap')}
            className="hover:text-amber-300 hover:underline transition-colors"
          >
            Sitemap
          </button>
          <span className="text-purple-500/50">|</span>
          <button
            onClick={() => onOpenLegal('Contact Us')}
            className="hover:text-amber-300 hover:underline transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>
    </footer>
  );
};
