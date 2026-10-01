import React from 'react';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  fontSize: 'standard' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'standard' | 'large' | 'xlarge') => void;
  wheelchairOnly: boolean;
  onToggleWheelchairOnly: () => void;
  audioVoiceAnnounce: boolean;
  onToggleAudioVoice: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  highContrast,
  onToggleHighContrast,
  fontSize,
  onChangeFontSize,
  wheelchairOnly,
  onToggleWheelchairOnly,
  audioVoiceAnnounce,
  onToggleAudioVoice,
}) => {
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

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#5c2d91]/10 text-[#5c2d91] flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">accessibility_new</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">Accessibility &amp; Display</h2>
            <p className="text-xs text-[#475569]">Compliant with WCAG 2.1 AA accessibility guidelines</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* High Contrast Mode */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f2f4f6] border border-[#e0e3e5]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#5c2d91] text-[20px]">
                contrast
              </span>
              <div>
                <div className="text-xs font-bold text-[#0F172A]">High Contrast Mode</div>
                <div className="text-[11px] text-[#475569]">Enhances text outlines and contrast ratio to 7:1</div>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleHighContrast}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                highContrast ? 'bg-[#5c2d91]' : 'bg-[#cdc3d3]'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white shadow-sm absolute top-1 transition-transform ${
                  highContrast ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Text Size Scale */}
          <div className="p-3.5 rounded-xl bg-[#f2f4f6] border border-[#e0e3e5]">
            <div className="text-xs font-bold text-[#0F172A] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#5c2d91] text-[18px]">
                format_size
              </span>
              Display Text Scaling
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['standard', 'large', 'xlarge'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => onChangeFontSize(sz)}
                  className={`py-1.5 px-2 text-xs font-bold rounded-lg border capitalize cursor-pointer ${
                    fontSize === sz
                      ? 'bg-[#5c2d91] text-white border-[#5c2d91]'
                      : 'bg-white text-[#475569] border-[#e0e3e5] hover:bg-[#eceef0]'
                  }`}
                >
                  {sz === 'standard' ? '100%' : sz === 'large' ? '115%' : '130%'}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Wheelchair Accessible Filter */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f2f4f6] border border-[#e0e3e5]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#10B981] text-[20px]">
                accessible
              </span>
              <div>
                <div className="text-xs font-bold text-[#0F172A]">Wheelchair Accessible Priority</div>
                <div className="text-[11px] text-[#475569]">Only highlight low-floor buses with ramp capability</div>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleWheelchairOnly}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                wheelchairOnly ? 'bg-[#10B981]' : 'bg-[#cdc3d3]'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white shadow-sm absolute top-1 transition-transform ${
                  wheelchairOnly ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Voice Announcer Chime */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f2f4f6] border border-[#e0e3e5]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#5c2d91] text-[20px]">
                volume_up
              </span>
              <div>
                <div className="text-xs font-bold text-[#0F172A]">Audio ETA Chime</div>
                <div className="text-[11px] text-[#475569]">Audible tone when bus is 1 minute away</div>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleAudioVoice}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                audioVoiceAnnounce ? 'bg-[#5c2d91]' : 'bg-[#cdc3d3]'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white shadow-sm absolute top-1 transition-transform ${
                  audioVoiceAnnounce ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-[#f2f4f6]">
          <button
            type="button"
            onClick={onClose}
            className="w-full h-10 bg-[#5c2d91] hover:bg-[#3B1C54] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Apply &amp; Done
          </button>
        </div>
      </div>
    </div>
  );
};
