import { BusArrivalInfo, OccupancyLevel, BusDeckType, BusServiceSummary } from '../types/transit';

export interface LtaNextBusRaw {
  OriginCode: string;
  DestinationCode: string;
  EstimatedArrival: string;
  Latitude: string;
  Longitude: string;
  VisitNumber: string;
  Load: string; // 'SEA' | 'SDA' | 'LSD'
  Feature: string; // 'WAB' or ''
  Type: string; // 'SD' | 'DD' | 'BD'
}

export interface LtaServiceRaw {
  ServiceNo: string;
  Operator: string;
  NextBus: LtaNextBusRaw;
  NextBus2?: LtaNextBusRaw;
  NextBus3?: LtaNextBusRaw;
}

export interface LtaBusArrivalResponse {
  'odata.metadata'?: string;
  BusStopCode: string;
  Services: LtaServiceRaw[];
}

/**
 * Calculates arrival minutes from an ISO 8601 EstimatedArrival string
 */
export function parseArrivalMinutes(estimatedArrivalIso?: string): {
  display: string;
  minutes: number | 'Arr';
} {
  if (!estimatedArrivalIso) {
    return { display: 'No Service', minutes: 0 };
  }

  const arrivalTime = new Date(estimatedArrivalIso).getTime();
  if (isNaN(arrivalTime)) {
    return { display: 'Arr', minutes: 'Arr' };
  }

  const now = Date.now();
  const diffMinutes = Math.floor((arrivalTime - now) / 60000);

  if (diffMinutes <= 0) {
    return { display: 'Arr', minutes: 'Arr' };
  }
  return { display: `${diffMinutes} mins`, minutes: diffMinutes };
}

/**
 * Maps LTA Load code to app OccupancyLevel
 * SEA = Seats Available
 * SDA = Standing Available
 * LSD = Limited Standing (Crowded)
 */
export function mapLtaLoad(loadCode?: string): OccupancyLevel {
  switch (loadCode) {
    case 'SEA':
      return 'seats_avail';
    case 'SDA':
      return 'standing_only';
    case 'LSD':
      return 'crowded';
    default:
      return 'seats_avail';
  }
}

/**
 * Maps LTA Type code to BusDeckType
 * SD = Single Deck
 * DD = Double Deck
 * BD = Bendy
 */
export function mapLtaType(typeCode?: string): BusDeckType {
  switch (typeCode) {
    case 'DD':
      return 'Double Deck';
    case 'BD':
      return 'Bendy';
    case 'SD':
    default:
      return 'Single Deck';
  }
}

/**
 * Formats a raw LTA NextBus object into BusArrivalInfo
 */
export function formatLtaBus(nextBus?: LtaNextBusRaw): BusArrivalInfo | null {
  if (!nextBus || !nextBus.EstimatedArrival) return null;

  const { minutes } = parseArrivalMinutes(nextBus.EstimatedArrival);
  return {
    etaMinutes: minutes,
    occupancy: mapLtaLoad(nextBus.Load),
    deckType: mapLtaType(nextBus.Type),
    wheelchairAccessible: nextBus.Feature === 'WAB',
  };
}

/**
 * Fetches bus arrivals from the local /api/bus-arrival proxy (LTA DataMall v3)
 */
export async function fetchLtaBusArrival(
  busStopCode: string,
  serviceNo?: string
): Promise<LtaBusArrivalResponse | null> {
  try {
    const url = new URL('/api/bus-arrival', window.location.origin);
    url.searchParams.append('BusStopCode', busStopCode);
    if (serviceNo) {
      url.searchParams.append('ServiceNo', serviceNo);
    }

    const res = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      console.warn(`LTA API returned ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error('Failed to fetch bus arrival from LTA proxy:', err);
    return null;
  }
}

/**
 * Checks API health status from /api/health
 */
export async function checkApiHealth(): Promise<{
  status: string;
  ltaConfigured: boolean;
  timestamp: string;
} | null> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return null;
    const data = await res.json();
    return {
      status: data.status,
      ltaConfigured: Boolean(data.lta_account_key_configured),
      timestamp: data.timestamp,
    };
  } catch {
    return null;
  }
}
