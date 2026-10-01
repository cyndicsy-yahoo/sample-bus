import React, { useState } from 'react';
import { FullBusRoute, BusStopSummary } from '../types/transit';

interface RouteExplorerScreenProps {
  busRoute: FullBusRoute;
  selectedDirection: 1 | 2;
  onSelectDirection: (dir: 1 | 2) => void;
  onTargetStop: (stop: BusStopSummary) => void;
  onSelectBus: (bus: string) => void;
}

export const RouteExplorerScreen: React.FC<RouteExplorerScreenProps> = ({
  busRoute,
  selectedDirection,
  onSelectDirection,
  onTargetStop,
  onSelectBus,
}) => {
  const [stopFilter, setStopFilter] = useState('');

  const currentDir =
    busRoute.directions.find((d) => d.id === selectedDirection) ||
    busRoute.directions[0];

  const filteredStops = currentDir.stops.filter(
    (s) =>
      s.stopName.toLowerCase().includes(stopFilter.toLowerCase()) ||
      s.stopCode.includes(stopFilter) ||
      s.roadName.toLowerCase().includes(stopFilter.toLowerCase())
  );

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
      {/* Route Header Banner */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-[#E2E8F0] mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#f2f4f6]">
          <div className="flex items-center gap-4">
            <div className="bg-[#3B1C54] text-white px-4 py-2.5 rounded-xl text-3xl font-black shadow-sm">
              {busRoute.serviceNumber}
            </div>
            <div>
              <div className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                <span>{busRoute.origin}</span>
                <span className="material-symbols-outlined text-[#94A3B8]">east</span>
                <span>{busRoute.destination}</span>
              </div>
              <p className="text-xs text-[#475569] mt-0.5">{busRoute.viaDescription}</p>
            </div>
          </div>

          {/* Direction toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-[#f2f4f6] rounded-lg self-start md:self-center border border-[#e0e3e5]">
            {busRoute.directions.map((dir) => (
              <button
                key={dir.id}
                onClick={() => onSelectDirection(dir.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  selectedDirection === dir.id
                    ? 'bg-[#5c2d91] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {dir.directionName}
              </button>
            ))}
          </div>
        </div>

        {/* Operating Schedule Info Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="bg-[#f2f4f6] p-2.5 rounded-lg border border-[#e0e3e5]">
            <span className="text-[#94A3B8] font-medium">First Bus:</span>
            <div className="font-bold text-[#0F172A] font-mono mt-0.5">
              {busRoute.operatingHours.firstBus}
            </div>
          </div>
          <div className="bg-[#f2f4f6] p-2.5 rounded-lg border border-[#e0e3e5]">
            <span className="text-[#94A3B8] font-medium">Last Bus:</span>
            <div className="font-bold text-[#0F172A] font-mono mt-0.5">
              {busRoute.operatingHours.lastBus}
            </div>
          </div>
          <div className="bg-[#f2f4f6] p-2.5 rounded-lg border border-[#e0e3e5]">
            <span className="text-[#94A3B8] font-medium">Peak Headway:</span>
            <div className="font-bold text-[#10B981] font-mono mt-0.5">
              {busRoute.operatingHours.headwayPeak}
            </div>
          </div>
          <div className="bg-[#f2f4f6] p-2.5 rounded-lg border border-[#e0e3e5]">
            <span className="text-[#94A3B8] font-medium">Off-Peak:</span>
            <div className="font-bold text-[#0F172A] font-mono mt-0.5">
              {busRoute.operatingHours.headwayOffPeak}
            </div>
          </div>
        </div>
      </div>

      {/* Stops Itinerary Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-[#E2E8F0]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#3B1C54]">
              Stop-by-Stop Route Itinerary
            </h2>
            <p className="text-xs text-[#475569]">
              {currentDir.stops.length} major transit stops in this direction. Tap any stop to track arrivals.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[18px]">
              filter_alt
            </span>
            <input
              type="text"
              placeholder="Filter stop by name / code..."
              value={stopFilter}
              onChange={(e) => setStopFilter(e.target.value)}
              className="w-full h-9 pl-9 pr-3 text-xs bg-[#f2f4f6] rounded-lg border border-[#e0e3e5] focus:outline-none focus:ring-1 focus:ring-[#5c2d91] font-medium"
            />
          </div>
        </div>

        {/* Stops Timeline List */}
        <div className="space-y-2 relative before:content-[''] before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-[#e0e3e5]">
          {filteredStops.map((stop, idx) => (
            <div
              key={stop.stopCode}
              className="relative flex items-center justify-between p-3 pl-11 rounded-lg hover:bg-[#f7f9fb] transition-colors border border-transparent hover:border-[#E2E8F0] group"
            >
              {/* Dot */}
              <div
                className={`absolute left-3 w-4 h-4 rounded-full border-2 transition-transform group-hover:scale-125 ${
                  stop.hasBusCurrently
                    ? 'bg-[#10B981] border-[#10B981] ring-4 ring-[#10B981]/25'
                    : 'bg-white border-[#5c2d91]'
                }`}
              ></div>

              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-[#0F172A] group-hover:text-[#5c2d91] transition-colors">
                    {stop.stopName}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-[#475569] bg-[#f2f4f6] px-1.5 py-0.5 rounded border border-[#e0e3e5]">
                    #{stop.stopCode}
                  </span>
                  {stop.mrtConnections && stop.mrtConnections.length > 0 && (
                    <span className="text-[10px] font-bold text-[#5c2d91] bg-[#5c2d91]/10 px-2 py-0.5 rounded-full">
                      MRT: {stop.mrtConnections.join(', ')}
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#475569] mt-0.5">
                  {stop.roadName} • Stage {stop.fareStage.toFixed(1)} km
                </div>

                {stop.hasBusCurrently && (
                  <div className="inline-flex items-center gap-1.5 mt-1.5 text-xs text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded font-bold animate-pulse">
                    <span className="material-symbols-outlined text-[14px]">directions_bus</span>
                    <span>
                      Bus {stop.busPlate} arriving now ({stop.busOccupancy === 'seats_avail' ? 'Seats Available' : 'Standing'})
                    </span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  onTargetStop({
                    code: stop.stopCode,
                    name: stop.stopName,
                    road: stop.roadName,
                    distanceMeters: 50,
                    walkMinutes: 1,
                    sheltered: true,
                    barrierFree: true,
                    mrtLines: stop.mrtConnections || [],
                    cctv: true,
                    services: [busRoute.serviceNumber],
                  })
                }
                className="px-3 py-1.5 rounded-md bg-[#eceef0] group-hover:bg-[#5c2d91] text-[#475569] group-hover:text-white text-xs font-bold transition-all cursor-pointer shrink-0"
              >
                Track Stop
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
