import React, { useState } from 'react';
import { OccupancyLevel } from '../types/transit';

interface ReportCrowdingModalProps {
  isOpen: boolean;
  onClose: () => void;
  busNumber: string;
  stopName: string;
}

export const ReportCrowdingModal: React.FC<ReportCrowdingModalProps> = ({
  isOpen,
  onClose,
  busNumber,
  stopName,
}) => {
  const [selectedLoad, setSelectedLoad] = useState<OccupancyLevel>('seats_avail');
  const [rampStatus, setRampStatus] = useState<'yes' | 'no' | 'not_needed'>('not_needed');
  const [temperature, setTemperature] = useState<'normal' | 'cold' | 'warm'>('normal');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
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
          <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 text-[#D97706] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">report_problem</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">Report Bus Conditions</h2>
            <p className="text-xs text-[#475569]">
              Help other commuters with live crowd telemetry on Bus {busNumber}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">Thank you!</h3>
            <p className="text-xs text-[#475569] mt-1">
              Your feedback has updated the LTA DataMall crowd telemetry engine.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#475569] mb-2 uppercase tracking-wider">
                Current Passenger Load
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLoad('seats_avail')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedLoad === 'seats_avail'
                      ? 'border-[#10B981] bg-[#10B981]/10 text-[#10B981] font-bold'
                      : 'border-[#e0e3e5] bg-[#f7f9fb] text-[#475569]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] block mb-1">
                    airline_seat_recline_normal
                  </span>
                  <span className="text-xs">Seats Avail</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedLoad('standing_only')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedLoad === 'standing_only'
                      ? 'border-[#F59E0B] bg-[#F59E0B]/15 text-[#D97706] font-bold'
                      : 'border-[#e0e3e5] bg-[#f7f9fb] text-[#475569]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] block mb-1">
                    person
                  </span>
                  <span className="text-xs">Standing</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedLoad('crowded')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedLoad === 'crowded'
                      ? 'border-[#EF4444] bg-[#EF4444]/10 text-[#EF4444] font-bold'
                      : 'border-[#e0e3e5] bg-[#f7f9fb] text-[#475569]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] block mb-1">
                    groups
                  </span>
                  <span className="text-xs">Packed / Full</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase tracking-wider">
                Air Conditioning Comfort
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['cold', 'normal', 'warm'] as const).map((temp) => (
                  <button
                    key={temp}
                    type="button"
                    onClick={() => setTemperature(temp)}
                    className={`py-2 px-3 rounded-lg border capitalize cursor-pointer ${
                      temperature === temp
                        ? 'border-[#5c2d91] bg-[#5c2d91]/10 text-[#5c2d91] font-bold'
                        : 'border-[#e0e3e5] bg-[#f7f9fb] text-[#475569]'
                    }`}
                  >
                    {temp}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 h-11 bg-[#5c2d91] hover:bg-[#3B1C54] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Submit Live Report
              </button>
              <button
                type="button"
                onClick={onClose}
                className="h-11 px-4 bg-[#eceef0] hover:bg-[#e0e3e5] text-[#0F172A] text-xs font-bold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
