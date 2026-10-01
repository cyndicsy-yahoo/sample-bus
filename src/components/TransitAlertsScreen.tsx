import React, { useState } from 'react';
import { TRANSIT_ALERTS } from '../data/transitData';

export const TransitAlertsScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Bus' | 'Rail' | 'Diversion'>('All');

  const filtered = TRANSIT_ALERTS.filter((item) => {
    if (selectedFilter === 'All') return true;
    return item.category === selectedFilter;
  });

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-[#E2E8F0] mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] mb-2 border border-[#10B981]/20">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              <span className="text-xs uppercase font-bold tracking-wider">
                Real-Time Operations Center Feed
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3B1C54] tracking-tight">
              Transit Alerts &amp; Advisories
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Live updates on bus route diversions, train connections, and scheduled road closures across Singapore.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#f2f4f6] p-1 rounded-xl border border-[#e0e3e5] self-start sm:self-center">
            {(['All', 'Bus', 'Rail', 'Diversion'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-[#5c2d91] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filtered.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white rounded-xl p-5 border shadow-sm transition-all ${
              alert.severity === 'high'
                ? 'border-[#EF4444] bg-[#ffdad6]/10'
                : alert.severity === 'moderate'
                ? 'border-[#F59E0B] bg-[#FFFBEB]/40'
                : 'border-[#E2E8F0]'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase ${
                    alert.category === 'Bus'
                      ? 'bg-[#5c2d91] text-white'
                      : alert.category === 'Rail'
                      ? 'bg-[#3B1C54] text-white'
                      : 'bg-[#D97706] text-white'
                  }`}
                >
                  {alert.category}
                </span>

                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    alert.severity === 'normal'
                      ? 'bg-[#10B981]/15 text-[#10B981]'
                      : alert.severity === 'moderate'
                      ? 'bg-[#F59E0B]/20 text-[#D97706]'
                      : 'bg-[#EF4444]/20 text-[#EF4444]'
                  }`}
                >
                  {alert.severity === 'normal' ? 'Normal Status' : 'Advisory / Diversion'}
                </span>

                <span className="text-xs text-[#94A3B8]">•</span>
                <span className="text-xs text-[#94A3B8] font-medium">{alert.timestamp}</span>
              </div>
            </div>

            <h2 className="text-base font-bold text-[#0F172A] mb-2">{alert.title}</h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-3">
              {alert.description}
            </p>

            {alert.actionRequired && (
              <div className="bg-[#f2f4f6] p-3 rounded-lg border border-[#e0e3e5] text-xs flex items-start gap-2 text-[#0F172A]">
                <span className="material-symbols-outlined text-[#5c2d91] text-[18px] shrink-0">
                  tips_and_updates
                </span>
                <div>
                  <span className="font-bold">Commuter Advice: </span>
                  {alert.actionRequired}
                </div>
              </div>
            )}

            <div className="mt-3 pt-3 border-t border-[#f2f4f6] flex items-center justify-between text-xs text-[#94A3B8]">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-[#475569]">Affected:</span>
                {alert.serviceAffected.map((svc) => (
                  <span
                    key={svc}
                    className="font-bold text-[#3B1C54] bg-[#eceef0] px-2 py-0.5 rounded text-[11px]"
                  >
                    {svc}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[11px]">ID: {alert.id}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
