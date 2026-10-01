import React, { useState } from 'react';
import { FullBusRoute, BusStopSummary, StopTimelineItem, BusArrivalInfo, OccupancyLevel } from '../types/transit';

interface BusArrivalScreenProps {
  busRoute: FullBusRoute;
  currentStop: BusStopSummary;
  selectedDirection: 1 | 2;
  onSelectDirection: (dir: 1 | 2) => void;
  timeline: StopTimelineItem[];
  onSelectBus: (bus: string) => void;
  onOpenShareModal: () => void;
  onOpenCrowdingModal: () => void;
  isStopBookmarked: boolean;
  onToggleStopBookmark: () => void;
  hasArrivalAlarm: boolean;
  onToggleArrivalAlarm: () => void;
  liveArrivals?: {
    next1: BusArrivalInfo | null;
    next2: BusArrivalInfo | null;
    next3: BusArrivalInfo | null;
  } | null;
  isLiveLta?: boolean;
  onOpenApiHealth?: () => void;
}

const COMMON_STOP_SERVICES: Record<string, { serviceNo: string; dest: string; via: string; eta: string; occ: string; occLevel: OccupancyLevel }> = {
  '14': { serviceNo: '14', dest: 'Clementi Int', via: 'via Orchard • Mountbatten', eta: 'Arr', occ: 'Seats Avail', occLevel: 'seats_avail' },
  '16': { serviceNo: '16', dest: 'Bedok Int', via: 'via Marine Parade', eta: '4m', occ: 'Seats Avail', occLevel: 'seats_avail' },
  '36': { serviceNo: '36', dest: 'Changi Airport PTB', via: 'Loop Service', eta: '1m', occ: 'Seats Avail', occLevel: 'seats_avail' },
  '65': { serviceNo: '65', dest: 'HarbourFront Int', via: 'via Lower Delta', eta: '6m', occ: 'Standing', occLevel: 'standing_only' },
  '124': { serviceNo: '124', dest: 'HarbourFront Int', via: 'via Newton Circus', eta: '7m', occ: 'Standing', occLevel: 'standing_only' },
  '162': { serviceNo: '162', dest: 'Shenton Way Ter', via: 'via Thomson Rd', eta: '12m', occ: 'Seats Avail', occLevel: 'seats_avail' },
  '166': { serviceNo: '166', dest: 'Clementi Int', via: 'via Alexandra', eta: '9m', occ: 'Seats Avail', occLevel: 'seats_avail' },
  '174': { serviceNo: '174', dest: 'Boon Lay Int', via: 'via Bukit Timah • Jurong', eta: 'Arr', occ: 'Seats Avail', occLevel: 'seats_avail' },
  '190': { serviceNo: '190', dest: 'Kampong Bahru Ter', via: 'via Chinatown', eta: '2m', occ: 'Full', occLevel: 'crowded' },
};

export const BusArrivalScreen: React.FC<BusArrivalScreenProps> = ({
  busRoute,
  currentStop,
  selectedDirection,
  onSelectDirection,
  timeline,
  onSelectBus,
  onOpenShareModal,
  onOpenCrowdingModal,
  isStopBookmarked,
  onToggleStopBookmark,
  hasArrivalAlarm,
  onToggleArrivalAlarm,
  liveArrivals,
  onOpenApiHealth,
}) => {
  // Map zoom and interactive state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeMarkerTooltip, setActiveMarkerTooltip] = useState<string | null>(null);

  // Next arrivals from LTA endpoint or fallback
  const next1 = liveArrivals?.next1;
  const next2 = liveArrivals?.next2;
  const next3 = liveArrivals?.next3;

  const next1EtaStr = next1
    ? next1.etaMinutes === 'Arr'
      ? 'Arr'
      : `${next1.etaMinutes}m`
    : 'Arr';

  const next2EtaStr = next2
    ? next2.etaMinutes === 'Arr'
      ? 'Arr'
      : `${next2.etaMinutes}m`
    : '8m';

  const renderLoadBadge = (occupancy?: OccupancyLevel) => {
    if (!occupancy || occupancy === 'seats_avail') {
      return (
        <span className="flex items-center gap-1 text-[#10B981] text-[11px] font-bold bg-[#10B981]/10 px-2 py-0.5 rounded-full">
          <span className="material-symbols-outlined text-[13px]">
            airline_seat_recline_normal
          </span>
          Seats Avail
        </span>
      );
    }
    if (occupancy === 'standing_only') {
      return (
        <span className="flex items-center gap-1 text-[#D97706] text-[11px] font-bold bg-[#F59E0B]/15 px-2 py-0.5 rounded-full">
          <span className="material-symbols-outlined text-[13px]">person</span>
          Standing Only
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-[#EF4444] text-[11px] font-bold bg-[#EF4444]/15 px-2 py-0.5 rounded-full">
        <span className="material-symbols-outlined text-[13px]">groups</span>
        Full / Crowded
      </span>
    );
  };

  // Determine other services at this stop, excluding currently selected bus
  const currentSvc = busRoute.serviceNumber.toUpperCase();
  const availableOtherKeys = (currentStop.services && currentStop.services.length > 0
    ? currentStop.services
    : ['14', '16', '36', '65', '124', '162', '174']
  ).filter((s) => s.toUpperCase() !== currentSvc);

  const otherServices = availableOtherKeys.slice(0, 5).map((key) => {
    return (
      COMMON_STOP_SERVICES[key] || {
        serviceNo: key,
        dest: 'Central Int',
        via: 'Corridor Transit',
        eta: '5m',
        occ: 'Seats Avail',
        occLevel: 'seats_avail' as OccupancyLevel,
      }
    );
  });

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ============================================================== */}
        {/* LEFT COLUMN (7 COLS): Bus Info, ETAs, Timeline, Other Services */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Primary Bus Service Card */}
          <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 relative border border-[#E2E8F0]">
            {/* Top Header: Service Badge, Route Name, and Direction Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f2f4f6]">
              <div className="flex items-center gap-4">
                <div className="bg-[#3B1C54] text-white px-4 py-2 rounded-xl flex items-center justify-center text-2xl font-black tracking-tight shadow-sm min-w-[56px] text-center">
                  {busRoute.serviceNumber}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-lg font-bold text-[#0F172A]">
                      {busRoute.origin}
                    </span>
                    <span className="material-symbols-outlined text-[#94A3B8] text-[18px]">
                      sync_alt
                    </span>
                    <span className="text-lg font-bold text-[#0F172A]">
                      {busRoute.destination}
                    </span>
                  </div>
                  <div className="text-xs text-[#475569] mt-0.5">
                    {busRoute.viaDescription}
                  </div>
                </div>
              </div>

              {/* Direction Selector Tabs */}
              <div className="inline-flex p-1 bg-[#f2f4f6] rounded-lg self-start sm:self-center border border-[#e0e3e5]">
                <button
                  type="button"
                  onClick={() => onSelectDirection(1)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    selectedDirection === 1
                      ? 'bg-[#5c2d91] text-white shadow-sm'
                      : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {busRoute.directions[0]?.directionName || 'Direction 1'}
                </button>
                {busRoute.directions[1] && (
                  <button
                    type="button"
                    onClick={() => onSelectDirection(2)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      selectedDirection === 2
                        ? 'bg-[#5c2d91] text-white shadow-sm font-bold'
                        : 'text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    {busRoute.directions[1].directionName}
                  </button>
                )}
              </div>
            </div>

            {/* Current Targeted Stop Banner */}
            <div className="bg-[#f2f4f6] rounded-xl p-3.5 my-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#e0e3e5]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#5c2d91] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">bus_alert</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#3B1C54] flex items-center gap-1.5 flex-wrap">
                    <span>{currentStop.name}</span>
                    <span className="bg-white px-2 py-0.5 rounded text-[11px] font-semibold text-[#475569] border border-[#E2E8F0]">
                      #{currentStop.code}
                    </span>
                  </div>
                  <div className="text-xs text-[#475569] mt-0.5">
                    Stop served by Bus {busRoute.serviceNumber} • {currentStop.walkMinutes} min walk ({currentStop.distanceMeters}m)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={onToggleStopBookmark}
                  className={`p-2 rounded-lg transition-colors cursor-pointer border ${
                    isStopBookmarked
                      ? 'bg-[#5c2d91]/10 text-[#5c2d91] border-[#5c2d91]'
                      : 'bg-white hover:bg-[#eceef0] text-[#475569] border-[#E2E8F0]'
                  }`}
                  title={isStopBookmarked ? 'Remove saved stop' : 'Bookmark this stop'}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isStopBookmarked ? 'star' : 'star_border'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onToggleArrivalAlarm}
                  className={`p-2 rounded-lg transition-colors cursor-pointer border ${
                    hasArrivalAlarm
                      ? 'bg-[#5c2d91] text-white border-[#5c2d91]'
                      : 'bg-white hover:bg-[#eceef0] text-[#475569] border-[#E2E8F0]'
                  }`}
                  title={hasArrivalAlarm ? 'Cancel arrival alert' : 'Set 2-min arrival notification alert'}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {hasArrivalAlarm ? 'notifications_active' : 'notifications'}
                  </span>
                </button>
              </div>
            </div>

            {/* Live Arrival Triple Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
              {/* Next Arrival */}
              <div className="bg-white rounded-xl p-3.5 border border-[#10B981]/30 shadow-sm flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-[#10B981]/10 to-transparent">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] uppercase font-bold text-[#475569] tracking-wider">
                    Next Arrival
                  </span>
                  {renderLoadBadge(next1?.occupancy)}
                </div>
                <div className="flex items-baseline gap-1.5 my-1.5">
                  <span className="font-extrabold text-[#10B981] text-3xl font-mono tabular-nums leading-tight">
                    {next1 ? (next1.etaMinutes === 'Arr' ? 'Arr' : `${next1.etaMinutes}m`) : 'Arr'}
                  </span>
                  <span className="text-xs text-[#94A3B8]">
                    {next1 && typeof next1.etaMinutes === 'number' && next1.etaMinutes > 0
                      ? `(${next1.etaMinutes} min)`
                      : '(< 1 min)'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#475569] pt-2 border-t border-[#10B981]/15">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#3B1C54]">
                    <span className="material-symbols-outlined text-[15px] text-[#3B1C54]">
                      {next1?.deckType === 'Single Deck' ? 'airport_shuttle' : 'directions_bus'}
                    </span>
                    {next1?.deckType || 'Double Deck'}
                  </span>
                  {(next1 ? next1.wheelchairAccessible : true) && (
                    <span
                      className="material-symbols-outlined text-[#94A3B8] text-[17px]"
                      title="Wheelchair Accessible Bus"
                    >
                      accessible
                    </span>
                  )}
                </div>
              </div>

              {/* 2nd Bus */}
              <div className="bg-white rounded-xl p-3.5 border border-[#F59E0B]/30 shadow-sm flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-[#F59E0B]/10 to-transparent">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] uppercase font-bold text-[#475569] tracking-wider">
                    2nd Bus
                  </span>
                  {renderLoadBadge(next2?.occupancy || 'standing_only')}
                </div>
                <div className="flex items-baseline gap-1 my-1.5">
                  <span className="font-extrabold text-[#D97706] text-3xl font-mono tabular-nums leading-tight">
                    {next2 ? (next2.etaMinutes === 'Arr' ? 'Arr' : next2.etaMinutes) : '8'}
                  </span>
                  <span className="text-base font-bold text-[#D97706]">
                    {next2?.etaMinutes === 'Arr' ? '' : 'mins'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#475569] pt-2 border-t border-[#F59E0B]/15">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#3B1C54]">
                    <span className="material-symbols-outlined text-[15px] text-[#3B1C54]">
                      {next2?.deckType === 'Double Deck' ? 'directions_bus' : 'airport_shuttle'}
                    </span>
                    {next2?.deckType || 'Single Deck'}
                  </span>
                  {(next2 ? next2.wheelchairAccessible : true) && (
                    <span
                      className="material-symbols-outlined text-[#94A3B8] text-[17px]"
                      title="Wheelchair Accessible Bus"
                    >
                      accessible
                    </span>
                  )}
                </div>
              </div>

              {/* 3rd Bus */}
              <div className="bg-white rounded-xl p-3.5 border border-[#10B981]/30 shadow-sm flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-[#10B981]/10 to-transparent">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] uppercase font-bold text-[#475569] tracking-wider">
                    3rd Bus
                  </span>
                  {renderLoadBadge(next3?.occupancy || 'seats_avail')}
                </div>
                <div className="flex items-baseline gap-1 my-1.5">
                  <span className="font-extrabold text-[#10B981] text-3xl font-mono tabular-nums leading-tight">
                    {next3 ? (next3.etaMinutes === 'Arr' ? 'Arr' : next3.etaMinutes) : '19'}
                  </span>
                  <span className="text-base font-bold text-[#10B981]">
                    {next3?.etaMinutes === 'Arr' ? '' : 'mins'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#475569] pt-2 border-t border-[#10B981]/15">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#3B1C54]">
                    <span className="material-symbols-outlined text-[15px] text-[#3B1C54]">
                      {next3?.deckType === 'Single Deck' ? 'airport_shuttle' : 'directions_bus'}
                    </span>
                    {next3?.deckType || 'Double Deck'}
                  </span>
                  {(next3 ? next3.wheelchairAccessible : true) && (
                    <span
                      className="material-symbols-outlined text-[#94A3B8] text-[17px]"
                      title="Wheelchair Accessible Bus"
                    >
                      accessible
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Route Stop Visual Timeline (Dynamic for Active Bus) */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-bold text-[#3B1C54]">
                  Live Route Progress Preview: Bus {busRoute.serviceNumber}
                </div>
                <div className="text-xs text-[#475569] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block animate-pulse"></span>
                  GPS Synced • Updated 4s ago
                </div>
              </div>

              {/* Vertical timeline track */}
              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-3 before:w-[3px] before:bg-[#e0e3e5]">
                {timeline.map((item, idx) => {
                  if (item.status === 'past') {
                    return (
                      <div key={item.stopCode + idx} className="relative flex items-center justify-between group">
                        <div className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-[#94A3B8] border-2 border-white"></div>
                        <div>
                          <div className="text-xs sm:text-sm text-[#94A3B8] line-through font-medium">
                            {item.stopName} (Stop {item.stopCode})
                          </div>
                          <div className="text-[11px] text-[#94A3B8]">{item.departedAgo || 'Departed 2 mins ago'}</div>
                        </div>
                        <span className="text-xs text-[#94A3B8] font-semibold">Past</span>
                      </div>
                    );
                  }

                  if (item.status === 'current') {
                    return (
                      <React.Fragment key={item.stopCode + idx}>
                        {/* Live Vehicle In-Transit Marker */}
                        <div className="relative flex items-center justify-between py-2 px-3 bg-[#5c2d91]/10 -ml-3 rounded-lg border border-[#5c2d91]/25 animate-pulse">
                          <div className="flex items-center gap-2.5">
                            <div className="w-5 h-5 rounded-full bg-[#5c2d91] flex items-center justify-center text-white shrink-0">
                              <span className="material-symbols-outlined text-[13px]">
                                directions_bus
                              </span>
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#5c2d91]">
                                Bus {busRoute.serviceNumber} ({item.approachingVehicle?.plateNumber || `SBS${busRoute.serviceNumber}88L`}) approaching {item.roadName} junction
                              </div>
                              <div className="text-[11px] text-[#475569]">
                                {next1?.deckType || 'Double Deck'} • Speed 28 km/h • Occupancy 34%
                              </div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-[#10B981] text-white text-[11px] font-bold shrink-0">
                            120m away
                          </span>
                        </div>

                        {/* Current Target Stop */}
                        <div className="relative flex items-center justify-between bg-white p-3 -ml-3 rounded-lg shadow-sm border border-[#10B981]/30">
                          <div className="flex items-center gap-2.5">
                            <div className="w-4 h-4 rounded-full bg-[#10B981] ring-4 ring-[#10B981]/20 shrink-0"></div>
                            <div>
                              <div className="text-sm font-bold text-[#3B1C54] flex items-center gap-1.5 flex-wrap">
                                <span>{item.stopName}</span>
                                <span className="bg-[#440f79] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                                  Your Location
                                </span>
                              </div>
                              <div className="text-xs text-[#10B981] font-bold">
                                Arriving in {item.expectedTime || '< 1 min'}
                              </div>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-[#5c2d91] text-[20px]">
                            pin_drop
                          </span>
                        </div>
                      </React.Fragment>
                    );
                  }

                  // Upcoming stops
                  return (
                    <div key={item.stopCode + idx} className="relative flex items-center justify-between">
                      <div className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-[#e0e3e5]"></div>
                      <div>
                        <div className="text-xs sm:text-sm text-[#0F172A] font-semibold">
                          {item.stopName} (Stop {item.stopCode})
                        </div>
                        <div className="text-[11px] text-[#475569]">
                          {item.distanceMeters ? `Expected • ${item.distanceMeters}m away` : 'Along route corridor'}
                        </div>
                      </div>
                      <span className="text-xs text-[#475569] font-medium">{item.expectedTime || '+5 mins'}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="mt-6 pt-4 border-t border-[#f2f4f6] flex flex-wrap items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenShareModal}
                  className="px-3.5 py-1.5 rounded-lg bg-[#eceef0] hover:bg-[#e0e3e5] text-[#5c2d91] transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-[#cdc3d3]"
                >
                  <span className="material-symbols-outlined text-[16px]">share</span>
                  Share ETA
                </button>
                <button
                  type="button"
                  onClick={onOpenCrowdingModal}
                  className="px-3.5 py-1.5 rounded-lg bg-[#eceef0] hover:bg-[#e0e3e5] text-[#475569] transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-[#cdc3d3]"
                >
                  <span className="material-symbols-outlined text-[16px]">report_problem</span>
                  Report Crowding
                </button>
              </div>

              <div className="text-xs text-[#94A3B8]">
                Trip Ref:{' '}
                <span className="font-mono text-[#475569] font-semibold">
                  SBS-{busRoute.serviceNumber}-{currentStop.code}-D{selectedDirection}
                </span>
              </div>
            </div>
          </div>

          {/* Other Bus Services at This Stop Section (Dynamic) */}
          <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#3B1C54]">
                  Other Services at This Stop
                </h2>
                <p className="text-xs text-[#475569]">
                  {currentStop.name} • {otherServices.length} other active routes calling here
                </p>
              </div>
              <span className="text-xs text-[#94A3B8] bg-[#eceef0] px-3 py-1 rounded-full font-semibold border border-[#e0e3e5]">
                {otherServices.length} Buses
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otherServices.map((svc) => (
                <div
                  key={svc.serviceNo}
                  onClick={() => onSelectBus(svc.serviceNo)}
                  className="p-3 rounded-lg bg-[#f2f4f6] hover:bg-[#eceef0] transition-all flex items-center justify-between cursor-pointer border border-[#e0e3e5] hover:border-[#5c2d91]/30 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-8 rounded-lg bg-[#3B1C54] text-white flex items-center justify-center font-extrabold text-sm shadow-sm group-hover:bg-[#5c2d91] transition-colors">
                      {svc.serviceNo}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">{svc.dest}</div>
                      <div className="text-[11px] text-[#475569]">{svc.via}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-sm font-mono tabular-nums ${
                        svc.eta === 'Arr'
                          ? 'bg-[#10B981] text-white animate-pulse'
                          : svc.occLevel === 'standing_only'
                          ? 'bg-[#F59E0B]/20 text-[#D97706]'
                          : 'bg-[#10B981]/15 text-[#10B981]'
                      }`}
                    >
                      {svc.eta}
                    </span>
                    <div className="text-[10px] text-[#94A3B8] font-medium">{svc.occ}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN (5 COLS): Corridor Live Radar, Map & Fleet Status */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Live Interactive Map Canvas Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-[#E2E8F0]">
            <div className="p-4 flex items-center justify-between bg-white border-b border-[#f2f4f6]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#5c2d91] text-[20px]">
                  map
                </span>
                <span className="text-base font-bold text-[#3B1C54]">
                  Corridor Live Radar: Bus {busRoute.serviceNumber}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
                <span className="text-xs text-[#475569] font-bold">Dhoby Ghaut Hub</span>
              </div>
            </div>

            {/* Stylized Static Vector Simulation Map */}
            <div className="relative w-full h-[380px] bg-slate-900 overflow-hidden select-none">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-300"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCHUa66mJ_F6zcBTCMXK6H9RG_2xupSmERh_yLG-LjPww1kuL10oInKvumAT3xFieugnLStX1-_6uHQNxIO9nb8L3Dl4EjN2ZmPXYSta042t7GAFPW9W825CG1zJjqEvuKAhpK2FvmtKUAzCI_GcRRtCrHo74c-zNvcC0pK22SzFP6F7xRqVs69aUQ-m6g91ZAysYGx6J6U65I8-F5gtnqnuXdScSn-LEMqOmcsShsSq0mm45bFrMK-')`,
                  transform: `scale(${zoomLevel})`,
                }}
              ></div>

              {/* Subtle dark tint overlay */}
              <div className="absolute inset-0 bg-[#3B1C54]/30 backdrop-blur-[0.5px]"></div>

              {/* Map Overlay: Bus Route Vector Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 40,280 Q 140,240 210,180 T 360,110"
                  fill="none"
                  opacity="0.85"
                  stroke="#5C2D91"
                  strokeLinecap="round"
                  strokeWidth="6"
                />
                <path
                  d="M 40,280 Q 140,240 210,180 T 360,110"
                  fill="none"
                  stroke="#dab9ff"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
                <circle
                  cx="210"
                  cy="180"
                  fill="#5C2D91"
                  fillOpacity="0.12"
                  r="44"
                  stroke="#5C2D91"
                  strokeDasharray="3 3"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Map Marker: Bus Approaching (Dynamic Pill) */}
              <div
                onClick={() =>
                  setActiveMarkerTooltip(
                    activeMarkerTooltip === 'busApproaching'
                      ? null
                      : `Bus ${busRoute.serviceNumber} (${next1?.deckType || 'Double Deck'}) is approaching ${currentStop.name}. ETA: ${next1EtaStr}.`
                  )
                }
                className="absolute top-[165px] left-[150px] -translate-x-1/2 -translate-y-1/2 bg-white text-[#191c1e] shadow-xl rounded-full px-2.5 py-1 flex items-center gap-1.5 animate-bounce cursor-pointer border border-[#E2E8F0] hover:scale-105 transition-transform"
                title="Click for live bus telemetry"
              >
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                <span className="text-xs font-extrabold text-[#3B1C54]">
                  {busRoute.serviceNumber} • {next1EtaStr}
                </span>
                <span className="material-symbols-outlined text-[14px] text-[#10B981]">
                  navigation
                </span>
              </div>

              {/* Map Marker: User & Stop Pin */}
              <div
                onClick={() =>
                  setActiveMarkerTooltip(
                    activeMarkerTooltip === 'userStop'
                      ? null
                      : `Stop ${currentStop.code} (${currentStop.name}). Your GPS lock position is within 50m.`
                  )
                }
                className="absolute top-[180px] left-[210px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="w-7 h-7 rounded-full bg-[#5c2d91] text-white flex items-center justify-center shadow-lg ring-4 ring-white">
                  <span className="material-symbols-outlined text-[15px]">
                    person_pin_circle
                  </span>
                </div>
                <div className="mt-1 bg-[#3B1C54]/95 text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-tight shadow">
                  Stop {currentStop.code}
                </div>
              </div>

              {/* Map Marker: 2nd Bus in Queue */}
              <div
                onClick={() =>
                  setActiveMarkerTooltip(
                    activeMarkerTooltip === 'busQueue'
                      ? null
                      : `2nd Bus ${busRoute.serviceNumber} (${next2?.deckType || 'Single Deck'}) in transit, approx ${next2EtaStr} away.`
                  )
                }
                className="absolute top-[260px] left-[70px] -translate-x-1/2 -translate-y-1/2 bg-white/95 text-[#191c1e] shadow-lg rounded-full px-2 py-0.5 flex items-center gap-1 cursor-pointer border border-[#E2E8F0] hover:scale-105 transition-transform"
              >
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
                <span className="text-[11px] font-bold text-[#0F172A]">
                  {busRoute.serviceNumber} • {next2EtaStr}
                </span>
              </div>

              {/* Tooltip Popup on Map Marker */}
              {activeMarkerTooltip && (
                <div className="absolute top-4 left-4 right-16 bg-white/95 backdrop-blur-md p-2.5 rounded-lg shadow-xl border border-[#5c2d91]/30 text-xs text-[#0F172A] z-10 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#5c2d91] text-[18px]">
                      info
                    </span>
                    <span>{activeMarkerTooltip}</span>
                  </div>
                  <button
                    onClick={() => setActiveMarkerTooltip(null)}
                    className="text-[#94A3B8] hover:text-[#0F172A] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              )}

              {/* Map Floating Controls */}
              <div className="absolute right-4 top-4 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.6))}
                  className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur text-[#3B1C54] shadow-md flex items-center justify-center hover:bg-white transition-colors cursor-pointer border border-[#E2E8F0]"
                  title="Zoom In"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
                  className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur text-[#3B1C54] shadow-md flex items-center justify-center hover:bg-white transition-colors cursor-pointer border border-[#E2E8F0]"
                  title="Zoom Out"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur text-[#5c2d91] shadow-md flex items-center justify-center hover:bg-white transition-colors cursor-pointer border border-[#E2E8F0]"
                  title="Reset Radar View"
                >
                  <span className="material-symbols-outlined text-[18px]">explore</span>
                </button>
              </div>

              {/* Legend Bottom Float */}
              <div className="absolute left-3 bottom-3 right-3 bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg flex items-center justify-between border border-[#E2E8F0]">
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                    <span className="text-[11px] text-[#475569] font-medium">Seats Avail</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                    <span className="text-[11px] text-[#475569] font-medium">Standing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
                    <span className="text-[11px] text-[#475569] font-medium">Full / Crowded</span>
                  </div>
                </div>
                <span className="text-[11px] text-[#94A3B8] hidden sm:inline font-mono">
                  GPS ±3m
                </span>
              </div>
            </div>

            {/* Stop Amenities & Connectivity Grid */}
            <div className="p-4 bg-white">
              <div className="text-xs font-bold text-[#3B1C54] mb-2.5 uppercase tracking-wider">
                Stop Infrastructure &amp; Accessibility
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="bg-[#f2f4f6] p-2 rounded-lg border border-[#e0e3e5]">
                  <span className="material-symbols-outlined text-[18px] text-[#5c2d91]">
                    shelves
                  </span>
                  <div className="text-xs text-[#0F172A] font-semibold mt-0.5">
                    Sheltered Stop
                  </div>
                </div>
                <div className="bg-[#f2f4f6] p-2 rounded-lg border border-[#e0e3e5]">
                  <span className="material-symbols-outlined text-[18px] text-[#10B981]">
                    accessible_forward
                  </span>
                  <div className="text-xs text-[#0F172A] font-semibold mt-0.5">
                    Barrier-Free
                  </div>
                </div>
                <div className="bg-[#f2f4f6] p-2 rounded-lg border border-[#e0e3e5]">
                  <span className="material-symbols-outlined text-[18px] text-[#5c2d91]">
                    train
                  </span>
                  <div className="text-xs text-[#0F172A] font-semibold mt-0.5">
                    MRT: NS/NE/CC
                  </div>
                </div>
                <div className="bg-[#f2f4f6] p-2 rounded-lg border border-[#e0e3e5]">
                  <span className="material-symbols-outlined text-[18px] text-[#10B981]">
                    videocam
                  </span>
                  <div className="text-xs text-[#0F172A] font-semibold mt-0.5">
                    CCTV Monitored
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Rich Visual Transit Anchor Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden relative group border border-[#E2E8F0]">
            <div className="relative h-44 w-full overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="A modern red and purple double decker SBS Transit commuter bus cruising down Singapore Orchard Road"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA44E4OrGRZUFYwicQ90ZhIw0w4xNX6x4mlY4D99PnXkRYA3rgQUr8TTS76eh0YZe1lR4b48gsYlCe86FBvPaeI1LgEwemsDTCP_GXfXYeIbkJcSioQOlRZIqS5H7CQI3phaLB-vlj3HfBboOi2-upRTgIizA5Ext08DcoguAeuc6SVz9re0-DV3z6isuZ2QNJ0uKSFxJM3P0UhR3wNQ8LL1u2ycktVUGHYNAe2BlHoCDS02jGbgzAK"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B1C54] via-[#3B1C54]/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-[#10B981] text-white text-[11px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mb-1.5 inline-block shadow-sm">
                  Fleet Status
                </span>
                <div className="text-base sm:text-lg font-bold">
                  100% Low-Floor Euro VI / Electric Fleet
                </div>
                <p className="text-xs text-white/85 line-clamp-1 mt-0.5">
                  Equipped with digital onboard telematics and wheelchair ramps.
                </p>
              </div>
            </div>

            {/* Commuter Insights Micro-Bento */}
            <div className="p-4 bg-white">
              <div className="flex items-center justify-between text-xs text-[#475569]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#5c2d91] text-[18px]">
                    av_timer
                  </span>
                  <span>Average headway along corridor:</span>
                </div>
                <span className="font-bold text-[#3B1C54] font-mono">
                  {busRoute.operatingHours.headwayPeak}
                </span>
              </div>
              <div className="w-full bg-[#e6e8ea] rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-[#10B981] h-full rounded-full transition-all duration-500"
                  style={{ width: '82%' }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-1.5 text-[11px] text-[#94A3B8]">
                <span>Peak Congestion: Low</span>
                <span>Punctuality Rate: 98.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
