import React from 'react';

interface FooterProps {
  onGoToAlerts: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onGoToAlerts }) => {
  return (
    <footer className="w-full bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-t border-[#E2E8F0] mt-auto">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <img
            alt="SBS Live Transit Logo"
            className="h-6 w-auto object-contain opacity-85"
            src="https://lh3.googleusercontent.com/aida/AEtjO1Ws5rWGvkfwh3mmdvLcuuu5wXieI2ZfJXKPR-6DBYX2ifnpaCKDe_k56WzNAkZi2t-MVqkgw5j3A0z57c5AaCHxcvYdC-f9ayiZdIscaCnKm6XlTGYYcawgA7OXC7OvirzCRYs0Oz7iZIzy4YDUAJdKCzilyve1FIx3Lj-5FIB-h5xG5ZmMqL0NuqF6YFsCEEvltwvh83koupVemDhUVzWH8fx4wXy4ykuEec-14ksc8qS4FkvoIp4sIg"
          />
          <p className="text-xs text-[#475569]">
            © 2024 SBS Transit Operations Ltd. Official Real-Time LTA Data Stream.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-xs">
          <span className="text-[#94A3B8] flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            GTFS-RT Live Feed Online
          </span>

          <button
            onClick={onGoToAlerts}
            className="text-[#5c2d91] font-semibold hover:text-[#3B1C54] transition-colors cursor-pointer"
          >
            Service Status • Normal
          </button>

          <span className="text-[#475569]">Accessibility Standard WCAG 2.1 AA</span>
        </div>
      </div>
    </footer>
  );
};
