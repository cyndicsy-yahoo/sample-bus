import React from 'react';

interface HeaderProps {
  activeTab: 'bus-arrival-tracker' | 'route-explorer' | 'nearby-stops' | 'transit-alerts';
  setActiveTab: (tab: 'bus-arrival-tracker' | 'route-explorer' | 'nearby-stops' | 'transit-alerts') => void;
  onOpenSos: () => void;
  onOpenAccessibility: () => void;
  onOpenFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSos,
  onOpenAccessibility,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#FFFFFF]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#E2E8F0]">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand & GPS Lock */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setActiveTab('bus-arrival-tracker')}
            className="flex items-center gap-2.5 focus:outline-none group text-left cursor-pointer"
          >
            <img
              alt="SBS Live Transit Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1Ws5rWGvkfwh3mmdvLcuuu5wXieI2ZfJXKPR-6DBYX2ifnpaCKDe_k56WzNAkZi2t-MVqkgw5j3A0z57c5AaCHxcvYdC-f9ayiZdIscaCnKm6XlTGYYcawgA7OXC7OvirzCRYs0Oz7iZIzy4YDUAJdKCzilyve1FIx3Lj-5FIB-h5xG5ZmMqL0NuqF6YFsCEEvltwvh83koupVemDhUVzWH8fx4wXy4ykuEec-14ksc8qS4FkvoIp4sIg"
            />
            <span className="font-bold text-lg text-[#3B1C54] tracking-tight hidden sm:inline-block">
              SBS Transit <span className="text-[#5c2d91] font-bold">Live</span>
            </span>
          </button>

          <div className="hidden xl:flex items-center gap-1.5 bg-[#f2f4f6] px-3 py-1 rounded-full shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] border border-[#e0e3e5]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-xs text-[#4b4451] font-semibold">
              Near Orchard / Dhoby Ghaut • GPS Active
            </span>
          </div>
        </div>

        {/* Center: Navigation Bar */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-1 p-1 bg-[#f2f4f6] rounded-xl border border-[#e0e3e5]"
        >
          <button
            onClick={() => setActiveTab('bus-arrival-tracker')}
            className={`px-3.5 py-1.5 transition-all text-xs font-semibold rounded-lg cursor-pointer ${
              activeTab === 'bus-arrival-tracker'
                ? 'bg-[#5c2d91] text-white shadow-sm font-bold'
                : 'text-[#4b4451] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
            }`}
          >
            Bus Arrival Tracker
          </button>
          <button
            onClick={() => setActiveTab('route-explorer')}
            className={`px-3.5 py-1.5 transition-all text-xs font-semibold rounded-lg cursor-pointer ${
              activeTab === 'route-explorer'
                ? 'bg-[#5c2d91] text-white shadow-sm font-bold'
                : 'text-[#4b4451] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
            }`}
          >
            Route Explorer
          </button>
          <button
            onClick={() => setActiveTab('nearby-stops')}
            className={`px-3.5 py-1.5 transition-all text-xs font-semibold rounded-lg cursor-pointer ${
              activeTab === 'nearby-stops'
                ? 'bg-[#5c2d91] text-white shadow-sm font-bold'
                : 'text-[#4b4451] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
            }`}
          >
            Nearby Stops
          </button>
          <button
            onClick={() => setActiveTab('transit-alerts')}
            className={`px-3.5 py-1.5 transition-all text-xs font-semibold rounded-lg cursor-pointer ${
              activeTab === 'transit-alerts'
                ? 'bg-[#5c2d91] text-white shadow-sm font-bold'
                : 'text-[#4b4451] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
            }`}
          >
            Transit Alerts
          </button>
        </nav>

        {/* Right: Quick SOS, Accessibility, Profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSos}
            className="hidden md:flex items-center gap-1.5 bg-[#ffdad6]/50 hover:bg-[#ffdad6] text-[#ba1a1a] px-3 py-1.5 rounded-lg border border-[#ba1a1a]/20 transition-colors cursor-pointer"
            title="SBS Transit Commuter Hotline"
          >
            <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">sos</span>
            <span className="text-xs font-bold text-[#191c1e]">1800-287-2727</span>
          </button>

          <button
            onClick={onOpenAccessibility}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#f2f4f6] text-[#4b4451] hover:bg-[#e6e8ea] hover:text-[#191c1e] transition-colors cursor-pointer border border-[#e0e3e5]"
            title="Accessibility Options (WCAG 2.1 AA)"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">accessibility_new</span>
          </button>

          <div
            className="w-9 h-9 rounded-full bg-[#440f79] text-white flex items-center justify-center shadow-sm select-none"
            title="Commuter Session: cyndichua@gmail.com"
          >
            <span className="material-symbols-outlined text-[19px]">person</span>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex lg:hidden overflow-x-auto px-4 py-2 border-t border-[#E2E8F0] bg-[#f7f9fb] gap-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('bus-arrival-tracker')}
          className={`px-3 py-1 text-xs whitespace-nowrap rounded-md font-semibold cursor-pointer ${
            activeTab === 'bus-arrival-tracker'
              ? 'bg-[#5c2d91] text-white'
              : 'text-[#4b4451] bg-[#eceef0]'
          }`}
        >
          Arrival Tracker
        </button>
        <button
          onClick={() => setActiveTab('route-explorer')}
          className={`px-3 py-1 text-xs whitespace-nowrap rounded-md font-semibold cursor-pointer ${
            activeTab === 'route-explorer'
              ? 'bg-[#5c2d91] text-white'
              : 'text-[#4b4451] bg-[#eceef0]'
          }`}
        >
          Route Explorer
        </button>
        <button
          onClick={() => setActiveTab('nearby-stops')}
          className={`px-3 py-1 text-xs whitespace-nowrap rounded-md font-semibold cursor-pointer ${
            activeTab === 'nearby-stops'
              ? 'bg-[#5c2d91] text-white'
              : 'text-[#4b4451] bg-[#eceef0]'
          }`}
        >
          Nearby Stops
        </button>
        <button
          onClick={() => setActiveTab('transit-alerts')}
          className={`px-3 py-1 text-xs whitespace-nowrap rounded-md font-semibold cursor-pointer ${
            activeTab === 'transit-alerts'
              ? 'bg-[#5c2d91] text-white'
              : 'text-[#4b4451] bg-[#eceef0]'
          }`}
        >
          Alerts
        </button>
      </div>
    </header>
  );
};
