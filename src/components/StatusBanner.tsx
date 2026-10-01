import React from 'react';

interface StatusBannerProps {
  countdownSeconds: number;
  onManualRefresh: () => void;
  isRefreshing: boolean;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({
  countdownSeconds,
  onManualRefresh,
  isRefreshing,
}) => {
  return (
    <div className="w-full bg-[#f2f4f6] border-b border-[#E2E8F0] px-4 sm:px-6 lg:px-8 py-2 text-[#191c1e]">
      <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 text-xs text-[#475569]">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
          </span>
          <span className="text-[#10B981] font-bold tracking-wider uppercase">
            Operational Normal
          </span>
          <span className="text-[#94A3B8]">•</span>
          <span className="truncate">
            Green Status: Regular service headway and frequency across all SBS Transit network corridors.
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#475569]">
          <div className="flex items-center gap-1">
            <span
              className={`material-symbols-outlined text-[16px] text-[#94A3B8] ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            >
              sync
            </span>
            <span className="font-medium">
              Auto-refresh in{' '}
              <strong className="text-[#5c2d91] font-mono tabular-nums">
                {countdownSeconds}s
              </strong>
            </span>
          </div>

          <button
            onClick={onManualRefresh}
            type="button"
            className="text-xs text-[#5c2d91] font-bold hover:text-[#3B1C54] transition-colors cursor-pointer active:scale-95"
          >
            {isRefreshing ? 'Refreshing...' : 'Tap to Refresh'}
          </button>
        </div>
      </div>
    </div>
  );
};
