import React from 'react';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
          <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">sos</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#ba1a1a]">Transit Emergency &amp; Helplines</h2>
            <p className="text-xs text-[#475569]">SBS Transit 24/7 Operations Command</p>
          </div>
        </div>

        <div className="space-y-3 mb-5 text-xs">
          <div className="p-3.5 rounded-xl bg-[#f2f4f6] border border-[#e0e3e5]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0F172A]">SBS Transit Hotline</span>
              <a
                href="tel:18002872727"
                className="font-mono font-extrabold text-[#ba1a1a] text-sm bg-white px-2 py-0.5 rounded border border-[#ffdad6]"
              >
                1800-287-2727
              </a>
            </div>
            <div className="text-[#475569] mt-1">For bus/train emergencies, lost items, and passenger welfare.</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f2f4f6] border border-[#e0e3e5]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0F172A]">Emergency SMS Service</span>
              <span className="font-mono font-bold text-[#3B1C54] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                70999
              </span>
            </div>
            <div className="text-[#475569] mt-1">Discreet SMS assistance if unable to speak or in danger.</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f2f4f6] border border-[#e0e3e5]">
            <div className="font-bold text-[#0F172A] mb-1">Nearest Station Customer Office</div>
            <div className="text-[#475569]">
              Dhoby Ghaut MRT (NS24/NE6/CC1) Passenger Service Centre located at Concourse Level B1 (50m walk from Exit B).
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full h-10 bg-[#eceef0] hover:bg-[#e0e3e5] text-[#0F172A] text-xs font-bold rounded-lg transition-colors cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
