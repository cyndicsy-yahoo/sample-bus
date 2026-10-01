import React, { useState } from 'react';
import { NEARBY_STOPS_LIST } from '../data/transitData';
import { BusStopSummary } from '../types/transit';

interface NearbyStopsScreenProps {
  currentStop: BusStopSummary;
  onSelectStop: (stop: BusStopSummary) => void;
  onSelectBus: (bus: string) => void;
}

export const NearbyStopsScreen: React.FC<NearbyStopsScreenProps> = ({
  currentStop,
  onSelectStop,
  onSelectBus,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filtered = NEARBY_STOPS_LIST.filter(
    (s) =>
      s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.code.includes(filterQuery) ||
      s.road.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.services.some((svc) => svc.includes(filterQuery))
  );

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-[#E2E8F0] mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] mb-2 border border-[#10B981]/20">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
              <span className="text-[11px] uppercase font-bold tracking-wider">
                GPS Geolocation Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3B1C54] tracking-tight">
              Nearby Bus Stops
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Discovered {NEARBY_STOPS_LIST.length} stops within walking distance along the Orchard / Dhoby Ghaut / Bras Basah corridor.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search stop name, code or bus..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-3 text-xs bg-[#f2f4f6] rounded-lg border border-[#e0e3e5] focus:outline-none focus:ring-1 focus:ring-[#5c2d91] font-medium"
            />
          </div>
        </div>
      </div>

      {/* Grid of Nearby Stops */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((stop) => {
          const isCurrent = stop.code === currentStop.code;
          return (
            <div
              key={stop.code}
              className={`bg-white rounded-xl shadow-sm p-5 border transition-all ${
                isCurrent
                  ? 'border-[#5c2d91] ring-2 ring-[#5c2d91]/20'
                  : 'border-[#E2E8F0] hover:border-[#cdc3d3]'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isCurrent
                        ? 'bg-[#5c2d91] text-white shadow-sm'
                        : 'bg-[#f2f4f6] text-[#3B1C54]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      directions_bus
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-bold text-[#0F172A]">
                        {stop.name}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#5c2d91] bg-[#5c2d91]/10 px-2 py-0.5 rounded">
                        #{stop.code}
                      </span>
                      {isCurrent && (
                        <span className="bg-[#10B981] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          Active Stop
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#475569] mt-0.5">{stop.road}</div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-extrabold text-[#3B1C54] text-sm font-mono">
                    {stop.distanceMeters}m
                  </span>
                  <div className="text-[11px] text-[#94A3B8]">
                    {stop.walkMinutes} min walk
                  </div>
                </div>
              </div>

              {/* Amenities tags */}
              <div className="flex flex-wrap items-center gap-2 my-3 text-[11px]">
                {stop.sheltered && (
                  <span className="inline-flex items-center gap-1 text-[#475569] bg-[#f2f4f6] px-2 py-0.5 rounded">
                    <span className="material-symbols-outlined text-[13px] text-[#5c2d91]">
                      shelves
                    </span>
                    Sheltered
                  </span>
                )}
                {stop.barrierFree && (
                  <span className="inline-flex items-center gap-1 text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded font-semibold">
                    <span className="material-symbols-outlined text-[13px]">
                      accessible
                    </span>
                    Barrier-Free
                  </span>
                )}
                {stop.mrtLines.length > 0 && (
                  <span className="inline-flex items-center gap-1 text-[#5c2d91] bg-[#5c2d91]/10 px-2 py-0.5 rounded font-semibold">
                    <span className="material-symbols-outlined text-[13px]">train</span>
                    MRT: {stop.mrtLines.join(' • ')}
                  </span>
                )}
              </div>

              {/* Services calling at this stop */}
              <div className="pt-3 border-t border-[#f2f4f6] flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="text-[11px] text-[#94A3B8] font-bold uppercase mb-1">
                    Calling Services:
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {stop.services.map((svc) => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => {
                          onSelectStop(stop);
                          onSelectBus(svc);
                        }}
                        className="px-2 py-0.5 bg-[#f2f4f6] hover:bg-[#5c2d91] hover:text-white text-[#0F172A] text-xs font-bold rounded transition-colors cursor-pointer border border-[#e0e3e5]"
                        title={`Track bus ${svc} at this stop`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {!isCurrent && (
                  <button
                    type="button"
                    onClick={() => onSelectStop(stop)}
                    className="px-3.5 py-1.5 bg-[#5c2d91] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#3B1C54] transition-all cursor-pointer shrink-0"
                  >
                    Select Stop
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
