import React, { useState } from 'react';
import { BusStopSummary } from '../types/transit';

interface ShareEtaModalProps {
  isOpen: boolean;
  onClose: () => void;
  busNumber: string;
  currentStop: BusStopSummary;
}

export const ShareEtaModal: React.FC<ShareEtaModalProps> = ({
  isOpen,
  onClose,
  busNumber,
  currentStop,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `I'm tracking SBS Transit Bus ${busNumber} at ${currentStop.name} (Stop #${currentStop.code}). Next bus arriving in < 1 min (Double Deck). Track live: https://sbstransit.live/bus/${busNumber}?stop=${currentStop.code}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E2E8F0] relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#94A3B8] hover:text-[#0F172A] p-1 rounded-lg hover:bg-[#f2f4f6] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#5c2d91]/10 text-[#5c2d91] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">share</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">Share Live Bus ETA</h2>
            <p className="text-xs text-[#475569]">Send live tracking link to friends or family</p>
          </div>
        </div>

        {/* Live Trip Summary Box */}
        <div className="bg-[#f2f4f6] p-4 rounded-xl border border-[#e0e3e5] mb-4 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#475569] font-medium">Service Number:</span>
            <span className="font-bold text-[#3B1C54] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
              Bus {busNumber}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#475569] font-medium">Boarding Stop:</span>
            <span className="font-bold text-[#0F172A]">{currentStop.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#475569] font-medium">Next Arrival:</span>
            <span className="font-bold text-[#10B981]">Arr (&lt; 1 min) • Seats Available</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#475569] font-medium">Trip Ref:</span>
            <span className="font-mono text-[#475569]">SBS-{busNumber}-{currentStop.code}</span>
          </div>
        </div>

        {/* Shareable Text Area */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase tracking-wider">
            Commuter Message Preview
          </label>
          <textarea
            readOnly
            value={shareText}
            rows={3}
            className="w-full text-xs p-3 rounded-lg bg-[#f7f9fb] border border-[#e0e3e5] font-mono text-[#0F172A] focus:outline-none resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 h-11 bg-[#5c2d91] hover:bg-[#3B1C54] text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Tracking Link'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-11 px-4 bg-[#eceef0] hover:bg-[#e0e3e5] text-[#0F172A] text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
