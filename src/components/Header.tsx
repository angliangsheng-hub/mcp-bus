import React, { useState } from 'react';
import {
  Search,
  Home,
  Bus,
  Train,
  Info,
  Phone,
  Users,
  UserPlus,
  Building2,
  TrendingUp,
  Leaf,
  Megaphone,
  Menu,
  X,
  SlidersHorizontal
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  fontScale: 'sm' | 'md' | 'lg';
  setFontScale: (scale: 'sm' | 'md' | 'lg') => void;
  onSearch: (query: string) => void;
  viewMode: 'portal' | 'dual' | 'outline';
  setViewMode: (mode: 'portal' | 'dual' | 'outline') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  fontScale,
  setFontScale,
  onSearch,
  viewMode,
  setViewMode
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'bus', label: 'Bus', icon: Bus },
    { id: 'rail', label: 'Rail', icon: Train },
    { id: 'helpful-info', label: 'Helpful Information', icon: Info },
    { id: 'talk-to-us', label: 'Talk To Us', icon: Phone },
    { id: 'reaching-out', label: 'Reaching Out', icon: Users },
    { id: 'join-us', label: 'Join Us', icon: UserPlus },
    { id: 'corporate', label: 'Corporate', icon: Building2 },
    { id: 'investor-relations', label: 'Investor Relations', icon: TrendingUp },
    { id: 'sustainability', label: 'Sustainability', icon: Leaf },
    { id: 'whats-new', label: "What's New", icon: Megaphone },
  ];

  return (
    <header className="w-full bg-[#3c0e44] text-white select-none border-b border-[#5a1768] shadow-md">
      {/* Top Utility Row: Logo, Search, Accessibility Font Sizing & View Mode Switcher */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo Lockup */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveTab('bus');
              setViewMode('portal');
            }}
            className="flex items-baseline text-left group focus:outline-none"
            title="SBS Transit Homepage"
          >
            <span className="font-extrabold italic text-2xl sm:text-3xl tracking-tight text-[#ff5722] group-hover:brightness-110 transition-all font-sans">
              SBS
            </span>
            <span className="font-bold italic text-2xl sm:text-3xl tracking-tight text-[#d5a5e3] ml-1 group-hover:text-white transition-all font-sans">
              Transit
            </span>
          </button>
          <span className="hidden md:inline-block text-[11px] text-[#b98ac9] font-normal pl-2 border-l border-[#5d186b]">
            A ComfortDelGro Company
          </span>
        </div>

        {/* Search, Accessibility, and Screen Mode Toggles */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Mode Switcher (Portal vs Site Structure Wireframe as in screenshot) */}
          <button
            onClick={() => setViewMode(viewMode === 'portal' ? 'outline' : 'portal')}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors border ${
              viewMode === 'outline'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-semibold'
                : 'bg-[#51165e] text-purple-200 border-[#6f2180] hover:bg-[#611d70]'
            }`}
            title="Switch between Live Portal and Site Document Outline (as in user screenshot)"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{viewMode === 'portal' ? 'View Outline' : 'Live Portal'}</span>
          </button>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search"
              className="bg-[#591767] text-white text-xs placeholder-purple-300 rounded px-2.5 py-1.5 pr-7 w-32 sm:w-48 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-[#671b77] border border-[#6b1e7c]"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="absolute right-1.5 text-purple-300 hover:text-white"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Accessibility Font Size Buttons A+ A A- */}
          <div className="flex items-center bg-[#51165e] rounded border border-[#6f2180] overflow-hidden text-xs">
            <button
              onClick={() => setFontScale('lg')}
              className={`px-2 py-1 font-bold transition-colors ${
                fontScale === 'lg' ? 'bg-[#ff5722] text-white' : 'text-purple-200 hover:bg-[#641b74]'
              }`}
              title="Large text font"
            >
              A+
            </button>
            <button
              onClick={() => setFontScale('md')}
              className={`px-2 py-1 font-semibold transition-colors border-x border-[#6f2180] ${
                fontScale === 'md' ? 'bg-[#ff5722] text-white' : 'text-purple-200 hover:bg-[#641b74]'
              }`}
              title="Normal text font"
            >
              A
            </button>
            <button
              onClick={() => setFontScale('sm')}
              className={`px-2 py-1 font-medium transition-colors ${
                fontScale === 'sm' ? 'bg-[#ff5722] text-white' : 'text-purple-200 hover:bg-[#641b74]'
              }`}
              title="Small text font"
            >
              A-
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded text-purple-200 hover:text-white hover:bg-[#51165e]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Row matching screenshot (White icons / buttons on dark purple) */}
      <nav className="bg-[#481253] border-t border-[#5e196c] hidden lg:block">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <ul className="flex items-center gap-1 overflow-x-auto py-1 text-xs font-semibold whitespace-nowrap scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setViewMode('portal');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                      isActive
                        ? 'bg-[#6c1e7d] text-white shadow-inner font-bold border-b-2 border-[#ff5722]'
                        : 'text-purple-200 hover:text-white hover:bg-[#571664]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-purple-300'}`} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#320a3a] border-t border-[#5a1768] px-4 py-3 space-y-1">
          <div className="flex items-center justify-between pb-2 border-b border-[#4f145c] mb-2">
            <span className="text-xs uppercase tracking-wider text-purple-300 font-semibold">Navigation</span>
            <button
              onClick={() => setViewMode(viewMode === 'portal' ? 'outline' : 'portal')}
              className="text-xs text-amber-300 hover:underline flex items-center gap-1"
            >
              <SlidersHorizontal className="w-3 h-3" />
              {viewMode === 'portal' ? 'View Outline' : 'Live Portal'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                    setViewMode('portal');
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-left text-xs transition-colors ${
                    isActive ? 'bg-[#ff5722] text-white font-bold' : 'text-purple-200 hover:bg-[#481253]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
