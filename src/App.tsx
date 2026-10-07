/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import backdropImg from './assets/images/singapore_transit_backdrop_1791347808808.jpg';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { NextBusTracker } from './components/NextBusTracker';
import { ServiceInformationView } from './components/ServiceInformationView';
import { WheelchairAccessibleView } from './components/WheelchairAccessibleView';
import { InterchangesView } from './components/InterchangesView';
import { RailView } from './components/RailView';
import { OutlineView } from './components/OutlineView';
import { Footer } from './components/Footer';
import { NewsModal } from './components/NewsModal';
import { LegalModal } from './components/LegalModal';
import { NewsItem, BUS_ROUTES } from './data/transitData';
import {
  FileText,
  Monitor,
  Columns,
  Bus,
  ShieldAlert,
  Search,
  Sparkles
} from 'lucide-react';

export default function App() {
  // Navigation & Sub-page state
  const [activeTab, setActiveTab] = useState<string>('bus');
  const [currentSubPage, setCurrentSubPage] = useState<string>('nextbus-arrival-timings');

  // Accessibility font scaling
  const [fontScale, setFontScale] = useState<'sm' | 'md' | 'lg'>('md');

  // View presentation mode: 'portal' (standard full width), 'dual' (as in screenshot), or 'outline'
  const [viewPresentation, setViewPresentation] = useState<'portal' | 'dual' | 'outline'>('portal');

  // Active modals
  const [activeNews, setActiveNews] = useState<NewsItem | null>(null);
  const [activeLegal, setActiveLegal] = useState<string | null>(null);

  // Search notification
  const [searchNotification, setSearchNotification] = useState<string | null>(null);

  // Font scale class
  const fontScaleClass =
    fontScale === 'sm'
      ? 'text-[13px]'
      : fontScale === 'lg'
      ? 'text-[16px]'
      : 'text-[14px]';

  const handleGlobalSearch = (query: string) => {
    // Check if query matches a service number
    const matchedService = BUS_ROUTES.find((b) => b.serviceNo === query.trim());
    if (matchedService) {
      setActiveTab('bus');
      setCurrentSubPage('nextbus-arrival-timings');
      setSearchNotification(`Found SBS Transit Service ${matchedService.serviceNo}`);
    } else {
      setSearchNotification(`Showing results for "${query}" across routes & stations`);
    }
    setTimeout(() => setSearchNotification(null), 3500);
  };

  const handleNavigateFromOutline = (section: string) => {
    if (section === 'rail') {
      setActiveTab('rail');
      setCurrentSubPage('rail');
    } else if (section === 'home') {
      setActiveTab('home');
      setCurrentSubPage('nextbus-arrival-timings');
    } else {
      setActiveTab('bus');
      setCurrentSubPage(section);
    }
    if (viewPresentation === 'outline') {
      setViewPresentation('portal');
    }
  };

  const handleCheckArrivalsFromService = (serviceNo: string, stopCode: string) => {
    setActiveTab('bus');
    setCurrentSubPage('nextbus-arrival-timings');
  };

  // Render main content area based on current navigation
  const renderMainContent = () => {
    if (activeTab === 'rail') {
      return <RailView />;
    }

    if (activeTab === 'whats-new') {
      return (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-[#4a154b]">What's New & Commuter Advisories</h1>
          <p className="text-slate-600 text-sm">Latest service adjustments, rail maintenance windows, and news.</p>
          <div className="grid gap-4">
            {/* news cards rendered */}
          </div>
        </div>
      );
    }

    // Bus tab sub-pages
    switch (currentSubPage) {
      case 'service-info':
        return <ServiceInformationView onCheckArrivals={handleCheckArrivalsFromService} />;
      case 'wheelchair-accessible':
        return <WheelchairAccessibleView />;
      case 'interchanges-terminals':
        return (
          <InterchangesView
            onSelectService={(svc) => {
              setActiveTab('bus');
              setCurrentSubPage('nextbus-arrival-timings');
            }}
          />
        );
      case 'conditions-of-carriage':
        return (
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <h1 className="text-2xl font-bold text-[#4a154b]">Conditions of Carriage</h1>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              SBS Transit operates under the Public Transport Council Act. Commuters are required to validate payment cards upon entry and exit, maintain public cleanliness, and observe safety instructions given by Bus Captains and Transit Security Personnel.
            </p>
            <div className="bg-slate-50 p-4 rounded border border-slate-200 text-xs text-slate-700 space-y-2">
              <div className="font-bold text-slate-900">Key Commuter By-laws:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>No eating, drinking, or smoking on buses and within interchange concourses.</li>
                <li>Foldable bicycles and personal mobility devices (PMDs) up to 120cm x 70cm x 40cm are permitted at all hours.</li>
                <li>Priority seats must be offered to seniors, expectant mothers, and passengers with disabilities.</li>
              </ul>
            </div>
          </div>
        );
      case 'nextbus-arrival-timings':
      default:
        return (
          <NextBusTracker
            onNavigateBreadcrumb={(crumb) => {
              if (crumb === 'home') setActiveTab('home');
              if (crumb === 'bus') {
                setActiveTab('bus');
                setCurrentSubPage('nextbus-arrival-timings');
              }
            }}
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen text-slate-800 ${fontScaleClass} flex flex-col relative selection:bg-purple-200 selection:text-purple-900`}
      style={{
        backgroundImage: `radial-gradient(#d1d5db 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        backgroundColor: '#eef2f6',
      }}
    >
      {/* Background Cityscape Backdrop Watermark */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 -z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backdropImg})` }}
      />

      {/* Presentation Bar (Allows switching to Dual Canvas Screen as in user's design screenshot) */}
      <div className="bg-[#24052a] text-purple-200 px-4 py-2 border-b border-[#43104e] text-xs flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2 font-medium">
          <span className="font-bold text-white flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            SBS Transit System
          </span>
          <span className="text-purple-400">|</span>
          <span className="text-purple-300 hidden sm:inline">Singapore Land Transport Portal</span>
        </div>

        {/* View Mode Switchers */}
        <div className="flex items-center gap-1 bg-[#370a40] p-1 rounded-md border border-[#50135d]">
          <button
            onClick={() => setViewPresentation('portal')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors ${
              viewPresentation === 'portal'
                ? 'bg-[#ff5722] text-white shadow-xs'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Web Portal</span>
          </button>

          <button
            onClick={() => setViewPresentation('dual')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors ${
              viewPresentation === 'dual'
                ? 'bg-[#ff5722] text-white shadow-xs'
                : 'text-purple-300 hover:text-white'
            }`}
            title="Shows Document Outline on left and Screen on right as depicted in reference screenshot"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Dual Screen (As in Screenshot)</span>
          </button>

          <button
            onClick={() => setViewPresentation('outline')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors ${
              viewPresentation === 'outline'
                ? 'bg-[#ff5722] text-white shadow-xs'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Document Tree</span>
          </button>
        </div>
      </div>

      {/* Global Search Notification Banner */}
      {searchNotification && (
        <div className="bg-amber-100 border-b border-amber-300 text-amber-900 px-4 py-2 text-xs font-semibold flex items-center justify-between z-30">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-700" />
            <span>{searchNotification}</span>
          </div>
          <button onClick={() => setSearchNotification(null)} className="text-amber-800 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* MAIN CONTAINER: Handles 'portal', 'dual', and 'outline' views */}
      <div className="flex-1 w-full flex flex-col">
        {viewPresentation === 'outline' ? (
          /* Pure Outline View */
          <div className="max-w-4xl mx-auto w-full p-4 sm:p-8 flex-1">
            <OutlineView onNavigate={handleNavigateFromOutline} />
          </div>
        ) : viewPresentation === 'dual' ? (
          /* Dual Screen Mode (Mirroring the screenshot showing Generating Document on left, Generating Screen on right) */
          <div className="w-full max-w-[1600px] mx-auto p-3 sm:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Screen: "Generating Document..." Tree */}
            <div className="lg:col-span-4 bg-white/95 rounded-xl border-2 border-slate-300 shadow-xl overflow-hidden backdrop-blur-xs">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Generating Document...
                  </span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="p-4">
                <OutlineView onNavigate={handleNavigateFromOutline} />
              </div>
            </div>

            {/* Right Screen: "Generating Screen..." SBS Transit Portal */}
            <div className="lg:col-span-8 bg-white rounded-xl border-2 border-[#5a1768]/30 shadow-2xl overflow-hidden">
              <div className="bg-[#3c0e44] px-4 py-2.5 flex items-center justify-between text-purple-200 border-b border-[#5a1768]">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Generating Screen... (NextBus Arrival Timings)
                  </span>
                </div>
                <button
                  onClick={() => setViewPresentation('portal')}
                  className="text-[11px] text-amber-300 hover:text-white underline"
                >
                  Expand Full Window
                </button>
              </div>

              {/* Portal Content inside window frame */}
              <Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                fontScale={fontScale}
                setFontScale={setFontScale}
                onSearch={handleGlobalSearch}
                viewMode={viewPresentation}
                setViewMode={setViewPresentation}
              />

              <main className="p-4 sm:p-6 bg-[#f8f9fa] min-h-[600px]">
                <div className="flex flex-col lg:flex-row gap-6">
                  <Sidebar
                    currentSubPage={currentSubPage}
                    onSelectSubPage={(p) => setCurrentSubPage(p)}
                    onOpenNews={(item) => setActiveNews(item)}
                  />
                  <div className="flex-1">
                    {renderMainContent()}
                  </div>
                </div>
              </main>

              <Footer onOpenLegal={(topic) => setActiveLegal(topic)} />
            </div>
          </div>
        ) : (
          /* Standard Full Web Portal View (Default) */
          <div className="flex-1 flex flex-col">
            {/* Top Header */}
            <Header
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              fontScale={fontScale}
              setFontScale={setFontScale}
              onSearch={handleGlobalSearch}
              viewMode={viewPresentation}
              setViewMode={setViewPresentation}
            />

            {/* Main Center Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8 z-10">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Left Sidebar matching screenshot */}
                <Sidebar
                  currentSubPage={currentSubPage}
                  onSelectSubPage={(page) => {
                    setActiveTab('bus');
                    setCurrentSubPage(page);
                  }}
                  onOpenNews={(item) => setActiveNews(item)}
                />

                {/* Main Dynamic Content Area (NextBus Arrival Timings by default) */}
                <div className="flex-1 w-full min-w-0">
                  {renderMainContent()}
                </div>
              </div>
            </main>

            {/* Bottom Footer */}
            <Footer onOpenLegal={(topic) => setActiveLegal(topic)} />
          </div>
        )}
      </div>

      {/* News Article Modal */}
      <NewsModal news={activeNews} onClose={() => setActiveNews(null)} />

      {/* Legal & Contact Modal */}
      <LegalModal topic={activeLegal} onClose={() => setActiveLegal(null)} />
    </div>
  );
}
