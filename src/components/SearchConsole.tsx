import React, { useState } from 'react';
import { BusStopSummary } from '../types/transit';

interface SearchConsoleProps {
  currentBusNumber: string;
  onSelectBus: (bus: string) => void;
  currentStop: BusStopSummary;
  onRedetectGps: () => void;
  isDetectingGps: boolean;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

const FREQUENT_BUSES = [
  { label: '14', value: '14' },
  { label: '65', value: '65' },
  { label: '123', value: '123' },
  { label: '147', value: '147' },
  { label: '166', value: '166' },
  { label: '174', value: '174' },
  { label: '190', value: '190' },
  { label: '502 Express', value: '502' },
  { label: '851', value: '851' },
];

export const SearchConsole: React.FC<SearchConsoleProps> = ({
  currentBusNumber,
  onSelectBus,
  currentStop,
  onRedetectGps,
  isDetectingGps,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [searchInput, setSearchInput] = useState(currentBusNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSelectBus(searchInput.trim());
    }
  };

  const handleClear = () => {
    setSearchInput('');
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-4 max-w-7xl mx-auto">
      {/* Top row: Title and GPS Card */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eceef0] text-[#5c2d91] mb-2 border border-[#e0e3e5]">
            <span className="material-symbols-outlined text-[15px]">sensors</span>
            <span className="text-[11px] tracking-wider uppercase font-bold">
              LTA DATAMALL V3 VERIFIED
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3B1C54] tracking-tight">
            Real-Time Bus Arrivals
          </h1>
          <p className="text-sm text-[#475569] mt-1.5 leading-relaxed">
            Enter your bus service number to discover live arrival headways, seat capacities, and wheelchair availability at your nearest stop.
          </p>
        </div>

        {/* GPS Detection Badge Card */}
        <div className="bg-white p-4 rounded-xl shadow-[0_1px_3px_0_rgba(15,23,42,0.06)] border border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 lg:self-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-[#5c2d91]/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#5c2d91] text-[22px]">
                my_location
              </span>
              <span className="absolute inset-0 rounded-full border-2 border-[#5c2d91]/30 animate-ping"></span>
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
                Auto GPS Lock
              </div>
              <div className="text-base font-bold text-[#0F172A]">
                {currentStop.name}
              </div>
              <div className="text-xs text-[#475569]">
                Code: <span className="font-bold text-[#3B1C54]">{currentStop.code}</span> •{' '}
                {currentStop.distanceMeters}m away ({currentStop.walkMinutes} min walk)
              </div>
            </div>
          </div>

          <button
            onClick={onRedetectGps}
            type="button"
            className="self-stretch sm:self-auto px-3.5 py-1.5 rounded-lg bg-[#eceef0] hover:bg-[#e0e3e5] text-[#5c2d91] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 border border-[#cdc3d3]"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${
                isDetectingGps ? 'animate-spin' : ''
              }`}
            >
              {isDetectingGps ? 'refresh' : 'near_me'}
            </span>
            <span>{isDetectingGps ? 'Scanning...' : 'Re-detect'}</span>
          </button>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-xl shadow-md p-4 border border-[#E2E8F0]">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[22px]">
              directions_bus
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search service number (e.g. 14, 65, 123, 190)..."
              className="w-full h-12 pl-11 pr-10 bg-[#f2f4f6] rounded-lg text-base font-bold text-[#0F172A] placeholder:text-[#94A3B8] placeholder:font-normal focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#5c2d91]/40 border border-transparent focus:border-[#5c2d91] transition-all"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] transition-colors cursor-pointer"
                title="Clear input"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 md:flex-initial h-12 px-7 bg-[#5c2d91] text-white text-sm font-bold rounded-lg shadow-sm hover:bg-[#3B1C54] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
              <span>Find Bus</span>
            </button>

            <button
              type="button"
              onClick={onToggleBookmark}
              className={`h-12 w-12 rounded-lg flex items-center justify-center transition-all cursor-pointer border ${
                isBookmarked
                  ? 'bg-[#5c2d91]/10 text-[#5c2d91] border-[#5c2d91]'
                  : 'bg-[#f2f4f6] text-[#4b4451] hover:bg-[#e0e3e5] border-[#E2E8F0]'
              }`}
              title={isBookmarked ? 'Service Saved in Favorites' : 'Save to Favorites'}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isBookmarked ? 'bookmark_added' : 'bookmark'}
              </span>
            </button>
          </div>
        </form>

        {/* Quick Selector Pills */}
        <div className="mt-3.5 pt-3 border-t border-[#f2f4f6] flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-[#94A3B8] uppercase font-bold tracking-wider mr-1">
            Frequent:
          </span>
          {FREQUENT_BUSES.map((item) => {
            const isActive =
              currentBusNumber.toLowerCase() === item.value.toLowerCase() ||
              currentBusNumber === item.label;
            return (
              <button
                key={item.value}
                onClick={() => {
                  setSearchInput(item.value);
                  onSelectBus(item.value);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer border ${
                  isActive
                    ? 'bg-[#5c2d91] text-white border-[#5c2d91] shadow-sm'
                    : 'bg-[#f2f4f6] text-[#191c1e] hover:bg-[#e0e3e5] border-[#e0e3e5]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
