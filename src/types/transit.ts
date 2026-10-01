export type OccupancyLevel = 'seats_avail' | 'standing_only' | 'crowded';
export type BusDeckType = 'Double Deck' | 'Single Deck' | 'Bendy';

export interface BusArrivalInfo {
  etaMinutes: number | 'Arr';
  occupancy: OccupancyLevel;
  deckType: BusDeckType;
  wheelchairAccessible: boolean;
  vehicleNumber?: string;
  speedKmH?: number;
  occupancyPercent?: number;
  distanceMeters?: number;
  locationDescription?: string;
}

export interface StopTimelineItem {
  stopCode: string;
  stopName: string;
  roadName: string;
  status: 'past' | 'current' | 'upcoming';
  departedAgo?: string;
  expectedTime?: string;
  distanceMeters?: number;
  etaOffsetMinutes?: number;
  isUserLocation?: boolean;
  hasApproachingVehicle?: boolean;
  approachingVehicle?: {
    plateNumber: string;
    description: string;
    deckType: BusDeckType;
    speedKmH: number;
    occupancyPercent: number;
    distanceMeters: number;
  };
}

export interface BusStopSummary {
  code: string;
  name: string;
  road: string;
  distanceMeters: number;
  walkMinutes: number;
  sheltered: boolean;
  barrierFree: boolean;
  mrtLines: string[];
  cctv: boolean;
  services: string[];
}

export interface BusServiceSummary {
  serviceNumber: string;
  destination: string;
  via: string;
  eta: string;
  occupancy: OccupancyLevel;
  nextEtas?: string[];
  isLoop?: boolean;
}

export interface FullBusRoute {
  serviceNumber: string;
  origin: string;
  destination: string;
  viaDescription: string;
  operatingHours: {
    firstBus: string;
    lastBus: string;
    headwayPeak: string;
    headwayOffPeak: string;
  };
  directions: {
    id: 1 | 2;
    directionName: string;
    destinationName: string;
    stops: {
      stopSequence: number;
      stopCode: string;
      stopName: string;
      roadName: string;
      mrtConnections?: string[];
      fareStage: number;
      hasBusCurrently?: boolean;
      busPlate?: string;
      busOccupancy?: OccupancyLevel;
    }[];
  }[];
}

export interface TransitAlertItem {
  id: string;
  category: 'Bus' | 'Rail' | 'Diversion' | 'Advisory';
  severity: 'normal' | 'moderate' | 'high';
  title: string;
  serviceAffected: string[];
  timestamp: string;
  description: string;
  actionRequired?: string;
}
