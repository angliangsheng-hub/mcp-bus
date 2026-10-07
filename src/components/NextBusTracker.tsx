import React, { useState, useEffect } from 'react';
import {
  BUS_ROUTES,
  BusRoute,
  BusStop,
  BusArrivalResult,
  getEstimatedArrivals,
  fetchLiveLtaArrivals
} from '../data/transitData';
import {
  Bus,
  MapPin,
  RefreshCw,
  Clock,
  Accessibility,
  Layers,
  ChevronDown,
  Bookmark,
  BookmarkCheck,
  Navigation,
  ArrowRight,
  Info,
  CheckCircle2,
  Activity,
  Radio,
  Server,
  X
} from 'lucide-react';

interface NextBusTrackerProps {
  onNavigateBreadcrumb?: (crumb: string) => void;
}

export const NextBusTracker: React.FC<NextBusTrackerProps> = ({
  onNavigateBreadcrumb
}) => {
  // Search Mode: 'service' or 'busstop'
  const [searchMode, setSearchMode] = useState<'service' | 'busstop'>('service');

  // Service mode state
  const [selectedServiceNo, setSelectedServiceNo] = useState<string>('147');
  const [selectedDirection, setSelectedDirection] = useState<1 | 2>(1);
  const [selectedStopCode, setSelectedStopCode] = useState<string>('64009');

  // Bus Stop mode state
  const [stopInputCode, setStopInputCode] = useState<string>('64009');

  // Calculated arrival result
  const [arrivalResult, setArrivalResult] = useState<BusArrivalResult>(() =>
    getEstimatedArrivals('147', '64009')
  );

  // Loading / refreshing state
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState<number>(30);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState<boolean>(true);
  const [showRouteProgression, setShowRouteProgression] = useState<boolean>(false);
  const [savedFavorites, setSavedFavorites] = useState<string[]>(['147:64009']);
  const [showBookmarkToast, setShowBookmarkToast] = useState<boolean>(false);

  // Selected route object
  const currentRoute: BusRoute =
    BUS_ROUTES.find((r) => r.serviceNo === selectedServiceNo) || BUS_ROUTES[0];

  const currentStops: BusStop[] =
    selectedDirection === 1
      ? currentRoute.direction1Stops
      : currentRoute.direction2Stops;

  // Handle service change
  const handleServiceChange = (serviceNo: string) => {
    setSelectedServiceNo(serviceNo);
    const route = BUS_ROUTES.find((r) => r.serviceNo === serviceNo) || BUS_ROUTES[0];
    const defaultStop = route.direction1Stops[0]?.code || '64009';
    setSelectedStopCode(defaultStop);
    setSelectedDirection(1);
    setArrivalResult(getEstimatedArrivals(serviceNo, defaultStop));
    setSecondsUntilRefresh(30);
  };

  // Handle direction toggle
  const handleDirectionToggle = (dir: 1 | 2) => {
    setSelectedDirection(dir);
    const stops = dir === 1 ? currentRoute.direction1Stops : currentRoute.direction2Stops;
    const defaultStop = stops[0]?.code || '64009';
    setSelectedStopCode(defaultStop);
    setArrivalResult(getEstimatedArrivals(selectedServiceNo, defaultStop));
    setSecondsUntilRefresh(30);
  };

  // Handle stop change
  const handleStopChange = (stopCode: string) => {
    setSelectedStopCode(stopCode);
    setArrivalResult(getEstimatedArrivals(selectedServiceNo, stopCode));
    setSecondsUntilRefresh(30);
  };

  // API Health monitor state
  const [showApiHealthModal, setShowApiHealthModal] = useState<boolean>(false);
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState<boolean>(false);

  // Estimate button action
  const handleEstimateArrival = async () => {
    setIsRefreshing(true);
    const targetService = searchMode === 'service' ? selectedServiceNo : undefined;
    const targetStop = searchMode === 'service' ? selectedStopCode : stopInputCode;

    try {
      const liveResult = await fetchLiveLtaArrivals(targetStop, targetService);
      if (liveResult) {
        setArrivalResult(liveResult);
      } else {
        if (searchMode === 'service') {
          setArrivalResult(getEstimatedArrivals(selectedServiceNo, selectedStopCode));
        } else {
          const matchingRoute =
            BUS_ROUTES.find((r) =>
              [...r.direction1Stops, ...r.direction2Stops].some((s) => s.code === stopInputCode)
            ) || BUS_ROUTES[0];
          setArrivalResult(getEstimatedArrivals(matchingRoute.serviceNo, stopInputCode));
        }
      }
    } catch {
      setArrivalResult(getEstimatedArrivals(selectedServiceNo, selectedStopCode));
    } finally {
      setIsRefreshing(false);
      setSecondsUntilRefresh(30);
    }
  };

  const checkApiHealth = async () => {
    setIsCheckingHealth(true);
    setShowApiHealthModal(true);
    try {
      const res = await fetch('/api/health?testLta=true');
      const data = await res.json();
      setHealthStatus(data);
    } catch (err: any) {
      setHealthStatus({ status: 'error', message: err.message });
    } finally {
      setIsCheckingHealth(false);
    }
  };

  // Manual refresh
  const handleManualRefresh = () => {
    handleEstimateArrival();
  };

  // Favorite toggle
  const favoriteKey = `${arrivalResult.serviceNo}:${arrivalResult.stopCode}`;
  const isFavorited = savedFavorites.includes(favoriteKey);

  const toggleFavorite = () => {
    if (isFavorited) {
      setSavedFavorites(savedFavorites.filter((k) => k !== favoriteKey));
    } else {
      setSavedFavorites([...savedFavorites, favoriteKey]);
      setShowBookmarkToast(true);
      setTimeout(() => setShowBookmarkToast(false), 2500);
    }
  };

  // Auto refresh timer
  useEffect(() => {
    if (!autoRefreshEnabled) return;

    const interval = setInterval(() => {
      setSecondsUntilRefresh((prev) => {
        if (prev <= 1) {
          handleEstimateArrival();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefreshEnabled, searchMode, selectedServiceNo, selectedStopCode, stopInputCode]);

  // Load color helpers
  const getLoadBadgeStyle = (load: string) => {
    switch (load) {
      case 'Seats Available':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Standing Available':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Limited Standing':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {showBookmarkToast && (
        <div className="fixed top-20 right-5 z-50 bg-[#3c0e44] text-white px-4 py-2.5 rounded-lg shadow-xl border border-amber-400 flex items-center gap-2 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Stop saved to your Favorites!</span>
        </div>
      )}

      {/* Breadcrumb matching screenshot */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
        <button
          onClick={() => onNavigateBreadcrumb && onNavigateBreadcrumb('home')}
          className="hover:text-purple-900 transition-colors"
        >
          HOME
        </button>
        <span className="text-slate-400">&gt;</span>
        <button
          onClick={() => onNavigateBreadcrumb && onNavigateBreadcrumb('bus')}
          className="hover:text-purple-900 transition-colors"
        >
          BUS
        </button>
        <span className="text-slate-400">&gt;</span>
        <span className="text-[#ff5722] font-bold">NEXTBUS ARRIVAL TIMINGS</span>
      </nav>

      {/* Header Title & Subtitle matching screenshot */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4a154b] tracking-tight font-sans">
          NextBus Arrival Timings
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Find out the estimated arrival time of your next bus!
        </p>
      </div>

      {/* Search Mode Switcher Tabs matching screenshot */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSearchMode('service')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-md font-semibold text-xs sm:text-sm transition-all ${
            searchMode === 'service'
              ? 'bg-[#4a154b] text-white shadow-sm'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          <Bus className="w-4 h-4" />
          <span>Search by Service No.</span>
        </button>

        <button
          type="button"
          onClick={() => setSearchMode('busstop')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-md font-semibold text-xs sm:text-sm transition-all ${
            searchMode === 'busstop'
              ? 'bg-[#4a154b] text-white shadow-sm'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Search by Bus Stop No.</span>
        </button>
      </div>

      {/* Search Form Card matching screenshot */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 sm:p-6 -mt-2">
        {searchMode === 'service' ? (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              Search by Service No.
            </h2>

            {/* Service No. Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Service No. <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedServiceNo}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm text-slate-900 appearance-none focus:outline-none focus:ring-1 focus:ring-[#ff5722] focus:border-[#ff5722] pr-10 font-medium"
                >
                  {BUS_ROUTES.map((route) => (
                    <option key={route.serviceNo} value={route.serviceNo}>
                      {route.serviceNo} - {route.origin} ⇄ {route.destination}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Direction Selection Chips */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600">
                Direction / Destination:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDirectionToggle(1)}
                  className={`text-left p-2.5 rounded text-xs border transition-colors ${
                    selectedDirection === 1
                      ? 'border-[#ff5722] bg-amber-50/70 text-slate-900 font-semibold'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-[#ff5722] font-bold">
                    <span>DIR 1</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="truncate mt-0.5">{currentRoute.direction1Name}</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleDirectionToggle(2)}
                  className={`text-left p-2.5 rounded text-xs border transition-colors ${
                    selectedDirection === 2
                      ? 'border-[#ff5722] bg-amber-50/70 text-slate-900 font-semibold'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-[#ff5722] font-bold">
                    <span>DIR 2</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="truncate mt-0.5">{currentRoute.direction2Name}</div>
                </button>
              </div>
            </div>

            {/* Bus Stop No. Dropdown */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Bus Stop No. <span className="text-slate-400 font-normal">(*optional)</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  {currentStops.length} stops on this route
                </span>
              </div>
              <div className="relative">
                <select
                  value={selectedStopCode}
                  onChange={(e) => handleStopChange(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm text-slate-900 appearance-none focus:outline-none focus:ring-1 focus:ring-[#ff5722] focus:border-[#ff5722] pr-10 font-medium"
                >
                  {currentStops.map((stop) => (
                    <option key={stop.code} value={stop.code}>
                      {stop.code} - {stop.name} ({stop.road})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Vivid Orange Action Button matching screenshot */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleEstimateArrival}
                disabled={isRefreshing}
                className="w-full bg-[#e65100] hover:bg-[#d84315] active:bg-[#bf360c] text-white py-3 px-4 rounded font-bold uppercase tracking-wider text-xs sm:text-sm shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Bus className={`w-4 h-4 ${isRefreshing ? 'animate-bounce' : ''}`} />
                <span>ESTIMATE ARRIVAL TIME</span>
              </button>
            </div>

            {/* Attribution note matching screenshot */}
            <p className="text-[11px] text-slate-500 italic text-center sm:text-left pt-1">
              Bus Arrival Information provided by <span className="font-semibold text-slate-700">Land Transport Authority (LTA)</span>
            </p>
          </div>
        ) : (
          /* Search by Bus Stop No. Form */
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              Search by Bus Stop No.
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Enter 5-Digit Bus Stop Code or Landmark <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={stopInputCode}
                  onChange={(e) => setStopInputCode(e.target.value)}
                  placeholder="e.g. 64009, 08057, 17009"
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#ff5722] font-medium"
                />
              </div>
            </div>

            {/* Quick shortcuts for popular stops */}
            <div>
              <span className="text-xs font-semibold text-slate-500">Popular Stop Codes:</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {[
                  { code: '04121', label: 'High St Ctr / City Hall' },
                  { code: '64009', label: 'Hougang Int' },
                  { code: '17009', label: 'Clementi Int' },
                  { code: '75009', label: 'Tampines Int' },
                  { code: '08057', label: 'Dhoby Ghaut' },
                  { code: '01119', label: 'Bugis Stn' },
                  { code: '14141', label: 'HarbourFront' },
                ].map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setStopInputCode(item.code);
                    }}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                      stopInputCode === item.code
                        ? 'bg-[#4a154b] text-white border-[#4a154b]'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {item.code} ({item.label})
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleEstimateArrival}
                disabled={isRefreshing}
                className="w-full bg-[#e65100] hover:bg-[#d84315] text-white py-3 px-4 rounded font-bold uppercase tracking-wider text-xs sm:text-sm shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Bus className={`w-4 h-4 ${isRefreshing ? 'animate-bounce' : ''}`} />
                <span>ESTIMATE ARRIVAL TIME</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              Bus Arrival Information provided by <span className="font-semibold text-slate-700">Land Transport Authority (LTA)</span>
            </p>
          </div>
        )}
      </div>

      {/* Arrival Timings Result Card matching screenshot */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 sm:p-6 space-y-5">
        {/* Result Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#4a154b] text-white font-extrabold text-xs sm:text-sm px-2.5 py-1 rounded">
                Service {arrivalResult.serviceNo}
              </span>
              <span className="font-bold text-slate-900 text-sm sm:text-base">
                Stop {arrivalResult.stopCode} ({arrivalResult.stopName})
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              To: {arrivalResult.destination} via {arrivalResult.via}
            </p>
          </div>

          {/* Right Live indicator & Refresh button */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start sm:self-auto">
            {/* LTA Live Feed status */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
              arrivalResult.isLiveLta
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                arrivalResult.isLiveLta ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'
              }`} />
              <span>
                {arrivalResult.isLiveLta ? `LTA Live DataMall v3 ${arrivalResult.operator ? `(${arrivalResult.operator})` : ''}` : 'LTA Live Feed'}
              </span>
            </div>

            {/* Test API Endpoint Button */}
            <button
              type="button"
              onClick={checkApiHealth}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 transition-colors"
              title="Test /api/health and LTA endpoint connection"
            >
              <Activity className="w-3.5 h-3.5 text-purple-700" />
              <span>API Health</span>
            </button>

            {/* Refresh control */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="hidden sm:inline">Last refreshed: {arrivalResult.lastUpdated}</span>
              <button
                type="button"
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                className="p-1.5 text-slate-600 hover:text-[#e65100] hover:bg-slate-100 rounded transition-colors"
                title="Refresh arrivals now"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#e65100]' : ''}`} />
              </button>
            </div>

            {/* Favorite Bookmark */}
            <button
              type="button"
              onClick={toggleFavorite}
              className={`p-1.5 rounded transition-colors border ${
                isFavorited
                  ? 'bg-amber-50 text-amber-600 border-amber-300'
                  : 'text-slate-400 border-slate-200 hover:text-slate-700 hover:bg-slate-50'
              }`}
              title={isFavorited ? 'Remove from favorites' : 'Bookmark this stop'}
            >
              {isFavorited ? (
                <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* 3 Bus Arrival Timing Cards matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {arrivalResult.arrivals.map((bus, index) => {
            const labels = ['NEXT BUS', '2ND BUS', '3RD BUS'];
            const label = labels[index];

            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                {/* Top: Card Label & Crowd Level Pill */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    {label}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${getLoadBadgeStyle(bus.load)}`}>
                    {bus.load}
                  </span>
                </div>

                {/* Middle: Arrival Time (Large Numbers) */}
                <div className="py-4 text-center">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans tabular-nums">
                      {bus.arrivalMinutes === 0 ? 'Arr' : bus.arrivalMinutes}
                    </span>
                    {bus.arrivalMinutes > 0 && (
                      <span className="text-sm font-semibold text-slate-600">
                        mins
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Est: {bus.estimatedTimestamp}</span>
                  </div>

                  {bus.latitude && bus.longitude && (
                    <div className="text-[10px] text-emerald-700 bg-emerald-50/80 rounded px-1.5 py-0.5 mt-2 inline-flex items-center gap-1 font-mono border border-emerald-200/60">
                      <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                      <span>GPS: {parseFloat(bus.latitude).toFixed(3)}, {parseFloat(bus.longitude).toFixed(3)}</span>
                    </div>
                  )}
                </div>

                {/* Bottom: Bus Specifications (Double Deck / WAB) */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-medium">{bus.type}</span>
                  </div>

                  {bus.wab && (
                    <div className="flex items-center gap-1 text-purple-700 font-semibold" title="Wheelchair Accessible Bus">
                      <Accessibility className="w-3.5 h-3.5" />
                      <span className="text-[11px]">WAB</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Crowd Level Legend matching screenshot */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold text-slate-800">Crowd Level:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>Seats Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span>Standing Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span>Limited Standing</span>
            </div>
          </div>

          {/* Route Progression toggle */}
          <button
            type="button"
            onClick={() => setShowRouteProgression(!showRouteProgression)}
            className="text-xs text-[#ff5722] hover:text-[#d84315] font-semibold flex items-center gap-1 ml-auto"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{showRouteProgression ? 'Hide Route Progression' : 'View Bus Live Position Map'}</span>
          </button>
        </div>

        {/* Live Route Progression Diagram (Interactive bonus for commuters) */}
        {showRouteProgression && (
          <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5 text-[#ff5722]" />
                <span>Live Route Headway & Bus Locations (Towards Clementi)</span>
              </h4>
              <span className="text-[11px] text-slate-500">
                Next refresh in: {secondsUntilRefresh}s
              </span>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="flex items-center min-w-[650px] relative pt-6 pb-2">
                {currentStops.slice(0, 10).map((stop, sIdx) => {
                  const isCurrentStop = stop.code === arrivalResult.stopCode;
                  const hasBus1 = sIdx === 0; // Approaching
                  const hasBus2 = sIdx === 3;
                  const hasBus3 = sIdx === 6;

                  return (
                    <div key={stop.code} className="flex-1 flex flex-col items-center relative group">
                      {/* Connecting Line */}
                      {sIdx > 0 && (
                        <div className="absolute top-2.5 left-[-50%] right-[50%] h-0.5 bg-slate-300 -z-0" />
                      )}

                      {/* Bus Icons on route */}
                      {hasBus1 && (
                        <div className="absolute -top-5 flex flex-col items-center">
                          <span className="text-[9px] bg-emerald-600 text-white font-bold px-1 rounded shadow">
                            Next
                          </span>
                          <Bus className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                        </div>
                      )}
                      {hasBus2 && (
                        <div className="absolute -top-5 flex flex-col items-center">
                          <span className="text-[9px] bg-amber-600 text-white font-bold px-1 rounded shadow">
                            2nd
                          </span>
                          <Bus className="w-3.5 h-3.5 text-amber-600 fill-amber-100" />
                        </div>
                      )}
                      {hasBus3 && (
                        <div className="absolute -top-5 flex flex-col items-center">
                          <span className="text-[9px] bg-emerald-600 text-white font-bold px-1 rounded shadow">
                            3rd
                          </span>
                          <Bus className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                        </div>
                      )}

                      {/* Stop Node */}
                      <button
                        type="button"
                        onClick={() => handleStopChange(stop.code)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center z-10 transition-transform ${
                          isCurrentStop
                            ? 'bg-[#ff5722] text-white ring-4 ring-orange-100 scale-125'
                            : 'bg-white border-2 border-slate-400 text-slate-700 hover:border-[#ff5722]'
                        }`}
                        title={`${stop.name} (${stop.code})`}
                      >
                        <span className="text-[9px] font-bold">{sIdx + 1}</span>
                      </button>

                      {/* Stop Name */}
                      <div className="text-center mt-2 max-w-[80px]">
                        <div className="text-[10px] font-mono font-semibold text-slate-500">
                          {stop.code}
                        </div>
                        <div className="text-[10px] text-slate-700 line-clamp-2 leading-tight">
                          {stop.name}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* API Health & Gateway Diagnostics Modal */}
      {showApiHealthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="bg-[#4a154b] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-amber-300" />
                <h3 className="text-base font-bold text-white">API Health & LTA Gateway Status</h3>
              </div>
              <button
                onClick={() => setShowApiHealthModal(false)}
                className="p-1 rounded-full text-purple-200 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-700">Health Endpoint:</span>
                <code className="bg-purple-100 text-purple-900 px-2 py-0.5 rounded font-mono">/api/health</code>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-700">LTA Bus Arrival Endpoint:</span>
                <code className="bg-purple-100 text-purple-900 px-2 py-0.5 rounded font-mono">/api/bus-arrival</code>
              </div>

              <div className="p-3 bg-slate-900 text-emerald-400 rounded-lg font-mono text-[11px] overflow-x-auto max-h-56">
                {isCheckingHealth ? (
                  <div className="flex items-center gap-2 text-amber-300">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Pinging LTA DataMall v3 Gateway...</span>
                  </div>
                ) : (
                  <pre>{JSON.stringify(healthStatus, null, 2)}</pre>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 text-[11px]">
                  Configured for Vercel Serverless & Node.js
                </span>
                <button
                  type="button"
                  onClick={checkApiHealth}
                  disabled={isCheckingHealth}
                  className="bg-[#e65100] text-white hover:bg-[#d84315] px-3 py-1.5 rounded font-bold text-xs flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCheckingHealth ? 'animate-spin' : ''}`} />
                  <span>Re-test Connectivity</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
