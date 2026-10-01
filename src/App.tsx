/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StatusBanner } from './components/StatusBanner';
import { SearchConsole } from './components/SearchConsole';
import { BusArrivalScreen } from './components/BusArrivalScreen';
import { RouteExplorerScreen } from './components/RouteExplorerScreen';
import { NearbyStopsScreen } from './components/NearbyStopsScreen';
import { TransitAlertsScreen } from './components/TransitAlertsScreen';
import { Footer } from './components/Footer';
import { ShareEtaModal } from './components/ShareEtaModal';
import { ReportCrowdingModal } from './components/ReportCrowdingModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { SosModal } from './components/SosModal';
import {
  CURRENT_DEFAULT_STOP,
  BUS_SERVICES_DATABASE,
  BUS_14_TIMELINE,
  NEARBY_STOPS_LIST,
} from './data/transitData';
import { BusStopSummary } from './types/transit';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<
    'bus-arrival-tracker' | 'route-explorer' | 'nearby-stops' | 'transit-alerts'
  >('bus-arrival-tracker');

  // Active Bus Service & Stop
  const [currentBusNumber, setCurrentBusNumber] = useState<string>('14');
  const [currentStop, setCurrentStop] = useState<BusStopSummary>(CURRENT_DEFAULT_STOP);
  const [selectedDirection, setSelectedDirection] = useState<1 | 2>(1);

  // Countdown & Refresh
  const [countdownSeconds, setCountdownSeconds] = useState<number>(18);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isDetectingGps, setIsDetectingGps] = useState<boolean>(false);

  // Bookmarks & Alarms
  const [bookmarkedBuses, setBookmarkedBuses] = useState<string[]>(['14', '190']);
  const [bookmarkedStops, setBookmarkedStops] = useState<string[]>(['08057']);
  const [activeAlarms, setActiveAlarms] = useState<string[]>([]);

  // Modals
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCrowdingModalOpen, setIsCrowdingModalOpen] = useState(false);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);

  // Accessibility States
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'standard' | 'large' | 'xlarge'>('standard');
  const [wheelchairOnly, setWheelchairOnly] = useState(false);
  const [audioVoiceAnnounce, setAudioVoiceAnnounce] = useState(false);

  // Auto-refresh countdown loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          return 20;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setCountdownSeconds(20);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleRedetectGps = () => {
    setIsDetectingGps(true);
    setTimeout(() => {
      setIsDetectingGps(false);
      setCurrentStop(CURRENT_DEFAULT_STOP);
    }, 900);
  };

  const handleSelectBus = (busNo: string) => {
    const normalized = busNo.trim().toUpperCase();
    if (BUS_SERVICES_DATABASE[normalized] || BUS_SERVICES_DATABASE[busNo]) {
      setCurrentBusNumber(normalized);
    } else {
      // Fallback or dynamically accept
      setCurrentBusNumber(normalized);
    }
  };

  const isCurrentBusBookmarked = bookmarkedBuses.includes(currentBusNumber);
  const handleToggleBookmarkBus = () => {
    if (isCurrentBusBookmarked) {
      setBookmarkedBuses((prev) => prev.filter((b) => b !== currentBusNumber));
    } else {
      setBookmarkedBuses((prev) => [...prev, currentBusNumber]);
    }
  };

  const isCurrentStopBookmarked = bookmarkedStops.includes(currentStop.code);
  const handleToggleBookmarkStop = () => {
    if (isCurrentStopBookmarked) {
      setBookmarkedStops((prev) => prev.filter((s) => s !== currentStop.code));
    } else {
      setBookmarkedStops((prev) => [...prev, currentStop.code]);
    }
  };

  const alarmKey = `${currentBusNumber}-${currentStop.code}`;
  const hasAlarm = activeAlarms.includes(alarmKey);
  const handleToggleAlarm = () => {
    if (hasAlarm) {
      setActiveAlarms((prev) => prev.filter((a) => a !== alarmKey));
    } else {
      setActiveAlarms((prev) => [...prev, alarmKey]);
    }
  };

  // Get bus route or fallback to Bus 14
  const busRoute =
    BUS_SERVICES_DATABASE[currentBusNumber] ||
    BUS_SERVICES_DATABASE['14'];

  const fontClass =
    fontSize === 'xlarge'
      ? 'text-lg'
      : fontSize === 'large'
      ? 'text-base'
      : 'text-sm';

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] ${fontClass} ${
        highContrast ? 'contrast-125 saturate-125' : ''
      }`}
    >
      {/* Top Fixed Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSos={() => setIsSosModalOpen(true)}
        onOpenAccessibility={() => setIsAccessibilityModalOpen(true)}
        onOpenFavorites={() => {}}
      />

      {/* Main Viewport Container */}
      <main className="w-full pt-20 flex-1 flex flex-col">
        {/* Subtle Ambient Glow */}
        <div className="relative w-full overflow-hidden flex-1 flex flex-col">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-[#5c2d91]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Status Alert Ticker */}
          <StatusBanner
            countdownSeconds={countdownSeconds}
            onManualRefresh={handleManualRefresh}
            isRefreshing={isRefreshing}
          />

          {/* Search Console & Quick Buses (Shown on Arrival Tracker & Route Explorer) */}
          {(activeTab === 'bus-arrival-tracker' || activeTab === 'route-explorer') && (
            <SearchConsole
              currentBusNumber={currentBusNumber}
              onSelectBus={handleSelectBus}
              currentStop={currentStop}
              onRedetectGps={handleRedetectGps}
              isDetectingGps={isDetectingGps}
              isBookmarked={isCurrentBusBookmarked}
              onToggleBookmark={handleToggleBookmarkBus}
            />
          )}

          {/* Active Screen Rendering */}
          <div className="flex-1 mt-2">
            {activeTab === 'bus-arrival-tracker' && (
              <BusArrivalScreen
                busRoute={busRoute}
                currentStop={currentStop}
                selectedDirection={selectedDirection}
                onSelectDirection={setSelectedDirection}
                timeline={BUS_14_TIMELINE}
                onSelectBus={(bus) => {
                  handleSelectBus(bus);
                }}
                onOpenShareModal={() => setIsShareModalOpen(true)}
                onOpenCrowdingModal={() => setIsCrowdingModalOpen(true)}
                isStopBookmarked={isCurrentStopBookmarked}
                onToggleStopBookmark={handleToggleBookmarkStop}
                hasArrivalAlarm={hasAlarm}
                onToggleArrivalAlarm={handleToggleAlarm}
              />
            )}

            {activeTab === 'route-explorer' && (
              <RouteExplorerScreen
                busRoute={busRoute}
                selectedDirection={selectedDirection}
                onSelectDirection={setSelectedDirection}
                onTargetStop={(stop) => {
                  setCurrentStop(stop);
                  setActiveTab('bus-arrival-tracker');
                }}
                onSelectBus={handleSelectBus}
              />
            )}

            {activeTab === 'nearby-stops' && (
              <NearbyStopsScreen
                currentStop={currentStop}
                onSelectStop={(stop) => {
                  setCurrentStop(stop);
                  setActiveTab('bus-arrival-tracker');
                }}
                onSelectBus={(bus) => {
                  handleSelectBus(bus);
                  setActiveTab('bus-arrival-tracker');
                }}
              />
            )}

            {activeTab === 'transit-alerts' && <TransitAlertsScreen />}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onGoToAlerts={() => setActiveTab('transit-alerts')} />

      {/* Interactive Modals */}
      <ShareEtaModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        busNumber={currentBusNumber}
        currentStop={currentStop}
      />

      <ReportCrowdingModal
        isOpen={isCrowdingModalOpen}
        onClose={() => setIsCrowdingModalOpen(false)}
        busNumber={currentBusNumber}
        stopName={currentStop.name}
      />

      <AccessibilityModal
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        wheelchairOnly={wheelchairOnly}
        onToggleWheelchairOnly={() => setWheelchairOnly(!wheelchairOnly)}
        audioVoiceAnnounce={audioVoiceAnnounce}
        onToggleAudioVoice={() => setAudioVoiceAnnounce(!audioVoiceAnnounce)}
      />

      <SosModal
        isOpen={isSosModalOpen}
        onClose={() => setIsSosModalOpen(false)}
      />
    </div>
  );
}
