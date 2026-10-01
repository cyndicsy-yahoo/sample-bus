import { FullBusRoute, BusStopSummary, TransitAlertItem, StopTimelineItem } from '../types/transit';

export const CURRENT_DEFAULT_STOP: BusStopSummary = {
  code: '08057',
  name: 'Dhoby Ghaut Stn Exit B',
  road: 'Penang Rd',
  distanceMeters: 50,
  walkMinutes: 1,
  sheltered: true,
  barrierFree: true,
  mrtLines: ['NS', 'NE', 'CC'],
  cctv: true,
  services: ['14', '16', '36', '65', '124', '162', '166', '174', '190', '851']
};

export const NEARBY_STOPS_LIST: BusStopSummary[] = [
  {
    code: '08057',
    name: 'Dhoby Ghaut Stn Exit B',
    road: 'Penang Rd',
    distanceMeters: 50,
    walkMinutes: 1,
    sheltered: true,
    barrierFree: true,
    mrtLines: ['NS', 'NE', 'CC'],
    cctv: true,
    services: ['14', '16', '36', '65', '124', '162', '166', '174', '190', '851']
  },
  {
    code: '08058',
    name: 'Opp Dhoby Ghaut Stn',
    road: 'Orchard Rd',
    distanceMeters: 110,
    walkMinutes: 2,
    sheltered: true,
    barrierFree: true,
    mrtLines: ['NS', 'NE', 'CC'],
    cctv: true,
    services: ['7', '14e', '16M', '36', '77', '106', '111', '167', '175']
  },
  {
    code: '08069',
    name: 'Hotel Rendezvous',
    road: 'Bras Basah Rd',
    distanceMeters: 400,
    walkMinutes: 5,
    sheltered: true,
    barrierFree: true,
    mrtLines: ['CC - Bencoolen (DT21)'],
    cctv: true,
    services: ['14', '16', '36', '77', '106', '111', '167', '174', '175', '857']
  },
  {
    code: '08079',
    name: 'Sch of the Arts (SOTA)',
    road: 'Prinsep St',
    distanceMeters: 750,
    walkMinutes: 9,
    sheltered: true,
    barrierFree: true,
    mrtLines: ['NE - Dhoby Ghaut'],
    cctv: true,
    services: ['64', '65', '131', '147', '166', '857']
  },
  {
    code: '08019',
    name: 'Plaza Singapura',
    road: 'Orchard Rd',
    distanceMeters: 180,
    walkMinutes: 2,
    sheltered: true,
    barrierFree: true,
    mrtLines: ['NS', 'NE', 'CC'],
    cctv: true,
    services: ['64', '65', '139', '140', '190']
  },
  {
    code: '08041',
    name: 'YMCA',
    road: 'Orchard Rd',
    distanceMeters: 280,
    walkMinutes: 4,
    sheltered: true,
    barrierFree: false,
    mrtLines: ['NS / CC'],
    cctv: true,
    services: ['14', '16', '36', '77', '106', '124', '167', '174']
  }
];

export const BUS_14_TIMELINE: StopTimelineItem[] = [
  {
    stopCode: '08041',
    stopName: 'YMCA',
    roadName: 'Orchard Rd',
    status: 'past',
    departedAgo: 'Departed 2 mins ago'
  },
  {
    stopCode: '08057',
    stopName: 'Dhoby Ghaut Stn Exit B',
    roadName: 'Penang Rd',
    status: 'current',
    isUserLocation: true,
    expectedTime: '< 1 min',
    hasApproachingVehicle: true,
    approachingVehicle: {
      plateNumber: 'SBS3288L',
      description: 'SBS3288L approaching Penang Rd junction',
      deckType: 'Double Deck',
      speedKmH: 28,
      occupancyPercent: 34,
      distanceMeters: 120
    }
  },
  {
    stopCode: '08069',
    stopName: 'Hotel Rendezvous',
    roadName: 'Bras Basah Rd',
    status: 'upcoming',
    expectedTime: '10:48 AM',
    distanceMeters: 400,
    etaOffsetMinutes: 3
  },
  {
    stopCode: '08079',
    stopName: 'Sch of the Arts (SOTA)',
    roadName: 'Bras Basah Rd',
    status: 'upcoming',
    expectedTime: '10:51 AM',
    distanceMeters: 750,
    etaOffsetMinutes: 6
  },
  {
    stopCode: '09059',
    stopName: 'Cathay Cineleisure',
    roadName: 'Orchard Link',
    status: 'upcoming',
    expectedTime: '10:55 AM',
    distanceMeters: 1200,
    etaOffsetMinutes: 10
  }
];

export const BUS_SERVICES_DATABASE: Record<string, FullBusRoute> = {
  '14': {
    serviceNumber: '14',
    origin: 'Bedok Int',
    destination: 'Clementi Int',
    viaDescription: 'Via Orchard Rd, Dhoby Ghaut, Bras Basah, Mountbatten',
    operatingHours: {
      firstBus: '05:30 AM',
      lastBus: '11:45 PM',
      headwayPeak: '6 - 9 mins',
      headwayOffPeak: '10 - 14 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'To Clementi',
        destinationName: 'Clementi Int',
        stops: [
          { stopSequence: 1, stopCode: '84009', stopName: 'Bedok Int', roadName: 'Bedok North Ave 1', fareStage: 1.0, mrtConnections: ['EW5 - Bedok'] },
          { stopSequence: 2, stopCode: '84039', stopName: 'Opp Bedok Stn', roadName: 'New Upper Changi Rd', fareStage: 1.5 },
          { stopSequence: 5, stopCode: '92049', stopName: 'Opp Parkway Parade', roadName: 'Marine Parade Rd', fareStage: 3.2, mrtConnections: ['TE26 - Marine Parade'] },
          { stopSequence: 12, stopCode: '80059', stopName: 'Mountbatten Stn Exit B', roadName: 'Mountbatten Rd', fareStage: 7.0, mrtConnections: ['CC7 - Mountbatten'] },
          { stopSequence: 17, stopCode: '08041', stopName: 'YMCA', roadName: 'Orchard Rd', fareStage: 9.5 },
          { stopSequence: 18, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Penang Rd', fareStage: 10.0, mrtConnections: ['NS24', 'NE6', 'CC1'], hasBusCurrently: true, busPlate: 'SBS3288L', busOccupancy: 'seats_avail' },
          { stopSequence: 19, stopCode: '08069', stopName: 'Hotel Rendezvous', roadName: 'Bras Basah Rd', fareStage: 10.5, mrtConnections: ['DT21 - Bencoolen'] },
          { stopSequence: 20, stopCode: '08079', stopName: 'Sch of the Arts (SOTA)', roadName: 'Bras Basah Rd', fareStage: 11.0 },
          { stopSequence: 24, stopCode: '09059', stopName: 'Cathay Cineleisure', roadName: 'Orchard Link', fareStage: 12.8, mrtConnections: ['NS23 - Somerset'] },
          { stopSequence: 32, stopCode: '11019', stopName: 'Commonwealth Stn', roadName: 'Commonwealth Ave', fareStage: 17.5, mrtConnections: ['EW20 - Commonwealth'], hasBusCurrently: true, busPlate: 'SBS3341G', busOccupancy: 'standing_only' },
          { stopSequence: 38, stopCode: '17059', stopName: 'Dover Stn', roadName: 'Commonwealth Ave West', fareStage: 21.0, mrtConnections: ['EW22 - Dover'] },
          { stopSequence: 42, stopCode: '17009', stopName: 'Clementi Int', roadName: 'Clementi Ave 3', fareStage: 24.2, mrtConnections: ['EW23 - Clementi'] }
        ]
      },
      {
        id: 2,
        directionName: 'To Bedok',
        destinationName: 'Bedok Int',
        stops: [
          { stopSequence: 1, stopCode: '17009', stopName: 'Clementi Int', roadName: 'Clementi Ave 3', fareStage: 1.0, mrtConnections: ['EW23 - Clementi'] },
          { stopSequence: 6, stopCode: '11019', stopName: 'Commonwealth Stn', roadName: 'Commonwealth Ave', fareStage: 4.5, mrtConnections: ['EW20 - Commonwealth'] },
          { stopSequence: 15, stopCode: '08058', stopName: 'Opp Dhoby Ghaut Stn', roadName: 'Orchard Rd', fareStage: 11.2, mrtConnections: ['NS24', 'NE6', 'CC1'], hasBusCurrently: true, busPlate: 'SBS3402P', busOccupancy: 'seats_avail' },
          { stopSequence: 22, stopCode: '80051', stopName: 'Mountbatten Stn Exit A', roadName: 'Mountbatten Rd', fareStage: 15.0, mrtConnections: ['CC7 - Mountbatten'] },
          { stopSequence: 30, stopCode: '92041', stopName: 'Parkway Parade', roadName: 'Marine Parade Rd', fareStage: 19.8, mrtConnections: ['TE26 - Marine Parade'] },
          { stopSequence: 42, stopCode: '84009', stopName: 'Bedok Int', roadName: 'Bedok North Ave 1', fareStage: 24.2, mrtConnections: ['EW5 - Bedok'] }
        ]
      }
    ]
  },
  '65': {
    serviceNumber: '65',
    origin: 'Tampines Int',
    destination: 'HarbourFront Int',
    viaDescription: 'Via Bedok Reservoir, MacPherson, Dhoby Ghaut, Lower Delta',
    operatingHours: {
      firstBus: '05:40 AM',
      lastBus: '11:35 PM',
      headwayPeak: '7 - 10 mins',
      headwayOffPeak: '12 - 15 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'To HarbourFront',
        destinationName: 'HarbourFront Int',
        stops: [
          { stopSequence: 1, stopCode: '75009', stopName: 'Tampines Int', roadName: 'Tampines Central 1', fareStage: 1.0, mrtConnections: ['EW2', 'DT32'] },
          { stopSequence: 14, stopCode: '70019', stopName: 'MacPherson Stn', roadName: 'Paya Lebar Rd', fareStage: 7.8, mrtConnections: ['CC10', 'DT26'] },
          { stopSequence: 23, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Penang Rd', fareStage: 13.5, mrtConnections: ['NS24', 'NE6', 'CC1'], hasBusCurrently: true, busPlate: 'SBS3190C', busOccupancy: 'standing_only' },
          { stopSequence: 36, stopCode: '14009', stopName: 'HarbourFront Int', roadName: 'Seah Im Rd', fareStage: 21.4, mrtConnections: ['NE1', 'CC29'] }
        ]
      },
      {
        id: 2,
        directionName: 'To Tampines',
        destinationName: 'Tampines Int',
        stops: [
          { stopSequence: 1, stopCode: '14009', stopName: 'HarbourFront Int', roadName: 'Seah Im Rd', fareStage: 1.0, mrtConnections: ['NE1', 'CC29'] },
          { stopSequence: 18, stopCode: '08058', stopName: 'Opp Dhoby Ghaut Stn', roadName: 'Orchard Rd', fareStage: 10.2, mrtConnections: ['NS24', 'NE6', 'CC1'] },
          { stopSequence: 36, stopCode: '75009', stopName: 'Tampines Int', roadName: 'Tampines Central 1', fareStage: 21.4, mrtConnections: ['EW2', 'DT32'] }
        ]
      }
    ]
  },
  '123': {
    serviceNumber: '123',
    origin: 'Bukit Merah Int',
    destination: 'Beach Station Bus Ter',
    viaDescription: 'Via Tiong Bahru, Orchard, Dhoby Ghaut, Queensway, Sentosa',
    operatingHours: {
      firstBus: '05:45 AM',
      lastBus: '11:45 PM',
      headwayPeak: '8 - 12 mins',
      headwayOffPeak: '12 - 16 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'To Beach Station (Sentosa)',
        destinationName: 'Beach Station Bus Ter',
        stops: [
          { stopSequence: 1, stopCode: '10009', stopName: 'Bukit Merah Int', roadName: 'Bt Merah Central', fareStage: 1.0 },
          { stopSequence: 11, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Penang Rd', fareStage: 7.2, mrtConnections: ['NS24', 'NE6', 'CC1'], hasBusCurrently: true, busPlate: 'SBS6201B', busOccupancy: 'seats_avail' },
          { stopSequence: 26, stopCode: '14539', stopName: 'Beach Station Bus Ter', roadName: 'Sentosa Gateway', fareStage: 18.0 }
        ]
      },
      {
        id: 2,
        directionName: 'To Bukit Merah',
        destinationName: 'Bukit Merah Int',
        stops: [
          { stopSequence: 1, stopCode: '14539', stopName: 'Beach Station Bus Ter', roadName: 'Sentosa Gateway', fareStage: 1.0 },
          { stopSequence: 15, stopCode: '08058', stopName: 'Opp Dhoby Ghaut Stn', roadName: 'Orchard Rd', fareStage: 10.8, mrtConnections: ['NS24', 'NE6', 'CC1'] },
          { stopSequence: 26, stopCode: '10009', stopName: 'Bukit Merah Int', roadName: 'Bt Merah Central', fareStage: 18.0 }
        ]
      }
    ]
  },
  '147': {
    serviceNumber: '147',
    origin: 'Hougang Central Int',
    destination: 'Jurong East Int',
    viaDescription: 'Via Serangoon, Little India, Clarke Quay, Chinatown, Commonwealth',
    operatingHours: {
      firstBus: '05:30 AM',
      lastBus: '11:45 PM',
      headwayPeak: '5 - 8 mins',
      headwayOffPeak: '9 - 13 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'To Jurong East',
        destinationName: 'Jurong East Int',
        stops: [
          { stopSequence: 1, stopCode: '64009', stopName: 'Hougang Central Int', roadName: 'Hougang Central', fareStage: 1.0, mrtConnections: ['NE14 - Hougang'] },
          { stopSequence: 16, stopCode: '08079', stopName: 'Sch of the Arts (SOTA)', roadName: 'Bras Basah Rd', fareStage: 11.2, mrtConnections: ['NE6 / CC1'] },
          { stopSequence: 38, stopCode: '28009', stopName: 'Jurong East Int', roadName: 'Jurong Gateway Rd', fareStage: 24.6, mrtConnections: ['NS1', 'EW24'] }
        ]
      },
      {
        id: 2,
        directionName: 'To Hougang Central',
        destinationName: 'Hougang Central Int',
        stops: [
          { stopSequence: 1, stopCode: '28009', stopName: 'Jurong East Int', roadName: 'Jurong Gateway Rd', fareStage: 1.0, mrtConnections: ['NS1', 'EW24'] },
          { stopSequence: 21, stopCode: '08079', stopName: 'Sch of the Arts (SOTA)', roadName: 'Bras Basah Rd', fareStage: 12.0 },
          { stopSequence: 38, stopCode: '64009', stopName: 'Hougang Central Int', roadName: 'Hougang Central', fareStage: 24.6, mrtConnections: ['NE14 - Hougang'] }
        ]
      }
    ]
  },
  '166': {
    serviceNumber: '166',
    origin: 'Ang Mo Kio Int',
    destination: 'Clementi Int',
    viaDescription: 'Via Thomson, Novena, Dhoby Ghaut, Alexandra, Dover',
    operatingHours: {
      firstBus: '05:35 AM',
      lastBus: '11:45 PM',
      headwayPeak: '7 - 11 mins',
      headwayOffPeak: '11 - 15 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'To Clementi',
        destinationName: 'Clementi Int',
        stops: [
          { stopSequence: 1, stopCode: '54009', stopName: 'Ang Mo Kio Int', roadName: 'Ang Mo Kio Ave 8', fareStage: 1.0, mrtConnections: ['NS16'] },
          { stopSequence: 15, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Penang Rd', fareStage: 9.8, mrtConnections: ['NS24', 'NE6', 'CC1'] },
          { stopSequence: 35, stopCode: '17009', stopName: 'Clementi Int', roadName: 'Clementi Ave 3', fareStage: 22.0, mrtConnections: ['EW23'] }
        ]
      },
      {
        id: 2,
        directionName: 'To Ang Mo Kio',
        destinationName: 'Ang Mo Kio Int',
        stops: [
          { stopSequence: 1, stopCode: '17009', stopName: 'Clementi Int', roadName: 'Clementi Ave 3', fareStage: 1.0 },
          { stopSequence: 19, stopCode: '08058', stopName: 'Opp Dhoby Ghaut Stn', roadName: 'Orchard Rd', fareStage: 11.5 },
          { stopSequence: 35, stopCode: '54009', stopName: 'Ang Mo Kio Int', roadName: 'Ang Mo Kio Ave 8', fareStage: 22.0 }
        ]
      }
    ]
  },
  '174': {
    serviceNumber: '174',
    origin: 'Boon Lay Int',
    destination: 'New Bridge Rd Ter',
    viaDescription: 'Via Bukit Timah, Farrer Rd, Orchard, Dhoby Ghaut, Chinatown',
    operatingHours: {
      firstBus: '05:30 AM',
      lastBus: '11:30 PM',
      headwayPeak: '6 - 9 mins',
      headwayOffPeak: '10 - 14 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'To New Bridge Rd',
        destinationName: 'New Bridge Rd Ter',
        stops: [
          { stopSequence: 1, stopCode: '22009', stopName: 'Boon Lay Int', roadName: 'Jurong West Central 3', fareStage: 1.0, mrtConnections: ['EW27'] },
          { stopSequence: 22, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Penang Rd', fareStage: 15.2, mrtConnections: ['NS24', 'NE6', 'CC1'], hasBusCurrently: true, busPlate: 'SBS3801J', busOccupancy: 'seats_avail' },
          { stopSequence: 31, stopCode: '05019', stopName: 'New Bridge Rd Ter', roadName: 'Eu Tong Sen St', fareStage: 21.0, mrtConnections: ['NE4', 'DT19'] }
        ]
      },
      {
        id: 2,
        directionName: 'To Boon Lay',
        destinationName: 'Boon Lay Int',
        stops: [
          { stopSequence: 1, stopCode: '05019', stopName: 'New Bridge Rd Ter', roadName: 'Eu Tong Sen St', fareStage: 1.0 },
          { stopSequence: 10, stopCode: '08058', stopName: 'Opp Dhoby Ghaut Stn', roadName: 'Orchard Rd', fareStage: 6.8 },
          { stopSequence: 31, stopCode: '22009', stopName: 'Boon Lay Int', roadName: 'Jurong West Central 3', fareStage: 21.0 }
        ]
      }
    ]
  },
  '190': {
    serviceNumber: '190',
    origin: 'Choa Chu Kang Int',
    destination: 'Kampong Bahru Ter',
    viaDescription: 'Via Bukit Panjang, BKE/PIE, Orchard, Dhoby Ghaut, Chinatown',
    operatingHours: {
      firstBus: '05:30 AM',
      lastBus: '11:45 PM',
      headwayPeak: '4 - 7 mins',
      headwayOffPeak: '7 - 11 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'To Kampong Bahru',
        destinationName: 'Kampong Bahru Ter',
        stops: [
          { stopSequence: 1, stopCode: '44009', stopName: 'Choa Chu Kang Int', roadName: 'Choa Chu Kang Loop', fareStage: 1.0, mrtConnections: ['NS4', 'BP1'] },
          { stopSequence: 16, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Penang Rd', fareStage: 12.8, mrtConnections: ['NS24', 'NE6', 'CC1'], hasBusCurrently: true, busPlate: 'SG5802D', busOccupancy: 'crowded' },
          { stopSequence: 25, stopCode: '10049', stopName: 'Kampong Bahru Ter', roadName: 'Spooner Rd', fareStage: 19.4 }
        ]
      },
      {
        id: 2,
        directionName: 'To Choa Chu Kang',
        destinationName: 'Choa Chu Kang Int',
        stops: [
          { stopSequence: 1, stopCode: '10049', stopName: 'Kampong Bahru Ter', roadName: 'Spooner Rd', fareStage: 1.0 },
          { stopSequence: 9, stopCode: '08058', stopName: 'Opp Dhoby Ghaut Stn', roadName: 'Orchard Rd', fareStage: 6.4 },
          { stopSequence: 25, stopCode: '44009', stopName: 'Choa Chu Kang Int', roadName: 'Choa Chu Kang Loop', fareStage: 19.4 }
        ]
      }
    ]
  },
  '502': {
    serviceNumber: '502',
    origin: 'Pioneer Rd North',
    destination: 'Marina Bay Sands / Suntec City',
    viaDescription: 'Express: Via Jurong West, AYE, Orchard Rd, Dhoby Ghaut, Marina Bay',
    operatingHours: {
      firstBus: '06:00 AM',
      lastBus: '11:15 PM',
      headwayPeak: '10 - 14 mins',
      headwayOffPeak: '15 - 20 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'To Suntec / Marina Bay (Express)',
        destinationName: 'Suntec City / Marina Bay',
        stops: [
          { stopSequence: 1, stopCode: '22489', stopName: 'Pioneer Rd North', roadName: 'Pioneer Rd North', fareStage: 1.0 },
          { stopSequence: 12, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Penang Rd', fareStage: 15.0, mrtConnections: ['NS24', 'NE6', 'CC1'] },
          { stopSequence: 18, stopCode: '02111', stopName: 'Marina Bay Sands Hotel', roadName: 'Bayfront Ave', fareStage: 19.5, mrtConnections: ['CE1', 'DT16'] }
        ]
      },
      {
        id: 2,
        directionName: 'To Pioneer Rd North (Express)',
        destinationName: 'Pioneer Rd North',
        stops: [
          { stopSequence: 1, stopCode: '02111', stopName: 'Marina Bay Sands Hotel', roadName: 'Bayfront Ave', fareStage: 1.0 },
          { stopSequence: 7, stopCode: '08058', stopName: 'Opp Dhoby Ghaut Stn', roadName: 'Orchard Rd', fareStage: 5.4 },
          { stopSequence: 18, stopCode: '22489', stopName: 'Pioneer Rd North', roadName: 'Pioneer Rd North', fareStage: 19.5 }
        ]
      }
    ]
  },
  '851': {
    serviceNumber: '851',
    origin: 'Yishun Int',
    destination: 'Bukit Merah Int',
    viaDescription: 'Via Ang Mo Kio, Thomson, Little India, Dhoby Ghaut, Tiong Bahru',
    operatingHours: {
      firstBus: '05:30 AM',
      lastBus: '11:40 PM',
      headwayPeak: '6 - 9 mins',
      headwayOffPeak: '10 - 13 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'To Bukit Merah',
        destinationName: 'Bukit Merah Int',
        stops: [
          { stopSequence: 1, stopCode: '59009', stopName: 'Yishun Int', roadName: 'Yishun Ave 2', fareStage: 1.0, mrtConnections: ['NS13'] },
          { stopSequence: 19, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Penang Rd', fareStage: 13.0, mrtConnections: ['NS24', 'NE6', 'CC1'] },
          { stopSequence: 33, stopCode: '10009', stopName: 'Bukit Merah Int', roadName: 'Bt Merah Central', fareStage: 22.8 }
        ]
      },
      {
        id: 2,
        directionName: 'To Yishun',
        destinationName: 'Yishun Int',
        stops: [
          { stopSequence: 1, stopCode: '10009', stopName: 'Bukit Merah Int', roadName: 'Bt Merah Central', fareStage: 1.0 },
          { stopSequence: 14, stopCode: '08058', stopName: 'Opp Dhoby Ghaut Stn', roadName: 'Orchard Rd', fareStage: 9.6 },
          { stopSequence: 33, stopCode: '59009', stopName: 'Yishun Int', roadName: 'Yishun Ave 2', fareStage: 22.8 }
        ]
      }
    ]
  },
  '16': {
    serviceNumber: '16',
    origin: 'Bukit Merah Int',
    destination: 'Bedok Int',
    viaDescription: 'Via Tiong Bahru, Orchard Rd, Bras Basah, Nicoll Hwy, Marine Parade',
    operatingHours: {
      firstBus: '05:45 AM',
      lastBus: '11:45 PM',
      headwayPeak: '5 - 9 mins',
      headwayOffPeak: '9 - 13 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'To Bedok',
        destinationName: 'Bedok Int',
        stops: [
          { stopSequence: 1, stopCode: '10009', stopName: 'Bukit Merah Int', roadName: 'Bt Merah Central', fareStage: 1.0 },
          { stopSequence: 6, stopCode: '10169', stopName: 'Tiong Bahru Plaza', roadName: 'Tiong Bahru Rd', fareStage: 3.4, mrtConnections: ['EW17 - Tiong Bahru'] },
          { stopSequence: 12, stopCode: '08041', stopName: 'YMCA', roadName: 'Orchard Rd', fareStage: 7.8 },
          { stopSequence: 13, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Penang Rd', fareStage: 8.5, mrtConnections: ['NS24', 'NE6', 'CC1'], hasBusCurrently: true, busPlate: 'SBS6819R', busOccupancy: 'seats_avail' },
          { stopSequence: 14, stopCode: '08069', stopName: 'Hotel Rendezvous', roadName: 'Bras Basah Rd', fareStage: 9.2, mrtConnections: ['DT21 - Bencoolen'] },
          { stopSequence: 18, stopCode: '80149', stopName: 'National Stadium', roadName: 'Stadium Blvd', fareStage: 12.0, mrtConnections: ['CC6 - Stadium'] },
          { stopSequence: 25, stopCode: '92049', stopName: 'Opp Parkway Parade', roadName: 'Marine Parade Rd', fareStage: 16.5, mrtConnections: ['TE26 - Marine Parade'] },
          { stopSequence: 34, stopCode: '84009', stopName: 'Bedok Int', roadName: 'Bedok North Ave 1', fareStage: 22.0, mrtConnections: ['EW5 - Bedok'] }
        ]
      },
      {
        id: 2,
        directionName: 'To Bukit Merah',
        destinationName: 'Bukit Merah Int',
        stops: [
          { stopSequence: 1, stopCode: '84009', stopName: 'Bedok Int', roadName: 'Bedok North Ave 1', fareStage: 1.0, mrtConnections: ['EW5 - Bedok'] },
          { stopSequence: 10, stopCode: '92041', stopName: 'Parkway Parade', roadName: 'Marine Parade Rd', fareStage: 6.2, mrtConnections: ['TE26 - Marine Parade'] },
          { stopSequence: 20, stopCode: '08058', stopName: 'Opp Dhoby Ghaut Stn', roadName: 'Orchard Rd', fareStage: 13.5, mrtConnections: ['NS24', 'NE6', 'CC1'] },
          { stopSequence: 34, stopCode: '10009', stopName: 'Bukit Merah Int', roadName: 'Bt Merah Central', fareStage: 22.0 }
        ]
      }
    ]
  },
  '36': {
    serviceNumber: '36',
    origin: 'Changi Airport PTB',
    destination: 'Tomlinson Rd (Loop)',
    viaDescription: 'Loop Service: Via ECP, Marine Parade, Suntec City, Orchard Rd, Dhoby Ghaut',
    operatingHours: {
      firstBus: '05:30 AM',
      lastBus: '11:58 PM',
      headwayPeak: '7 - 10 mins',
      headwayOffPeak: '10 - 15 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'Loop via Orchard / Dhoby Ghaut',
        destinationName: 'Changi Airport PTB (Loop)',
        stops: [
          { stopSequence: 1, stopCode: '95009', stopName: 'Changi Airport PTB2', roadName: 'Airport Blvd', fareStage: 1.0, mrtConnections: ['CG2 - Changi Airport'] },
          { stopSequence: 12, stopCode: '92049', stopName: 'Opp Parkway Parade', roadName: 'Marine Parade Rd', fareStage: 8.5 },
          { stopSequence: 18, stopCode: '02089', stopName: 'Suntec Convention Ctr', roadName: 'Raffles Blvd', fareStage: 13.4, mrtConnections: ['CC3 - Esplanade'] },
          { stopSequence: 22, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Penang Rd', fareStage: 16.2, mrtConnections: ['NS24', 'NE6', 'CC1'], hasBusCurrently: true, busPlate: 'SBS6702H', busOccupancy: 'seats_avail' },
          { stopSequence: 23, stopCode: '08069', stopName: 'Hotel Rendezvous', roadName: 'Bras Basah Rd', fareStage: 16.8 },
          { stopSequence: 40, stopCode: '95009', stopName: 'Changi Airport PTB2', roadName: 'Airport Blvd', fareStage: 29.5, mrtConnections: ['CG2'] }
        ]
      }
    ]
  },
  '124': {
    serviceNumber: '124',
    origin: 'St. Michael\'s Ter',
    destination: 'HarbourFront Int',
    viaDescription: 'Via Whampoa, Newton Circus, Orchard Rd, Dhoby Ghaut, Chinatown, Telok Blangah',
    operatingHours: {
      firstBus: '05:45 AM',
      lastBus: '11:45 PM',
      headwayPeak: '7 - 11 mins',
      headwayOffPeak: '12 - 16 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'To HarbourFront',
        destinationName: 'HarbourFront Int',
        stops: [
          { stopSequence: 1, stopCode: '52009', stopName: 'St. Michael\'s Ter', roadName: 'Whampoa Rd', fareStage: 1.0 },
          { stopSequence: 8, stopCode: '40189', stopName: 'Newton Stn Exit B', roadName: 'Scotts Rd', fareStage: 5.2, mrtConnections: ['NS21', 'DT11'] },
          { stopSequence: 14, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Penang Rd', fareStage: 9.0, mrtConnections: ['NS24', 'NE6', 'CC1'], hasBusCurrently: true, busPlate: 'SBS3982A', busOccupancy: 'standing_only' },
          { stopSequence: 25, stopCode: '14009', stopName: 'HarbourFront Int', roadName: 'Seah Im Rd', fareStage: 17.5, mrtConnections: ['NE1', 'CC29'] }
        ]
      },
      {
        id: 2,
        directionName: 'To St. Michael\'s',
        destinationName: 'St. Michael\'s Ter',
        stops: [
          { stopSequence: 1, stopCode: '14009', stopName: 'HarbourFront Int', roadName: 'Seah Im Rd', fareStage: 1.0 },
          { stopSequence: 12, stopCode: '08058', stopName: 'Opp Dhoby Ghaut Stn', roadName: 'Orchard Rd', fareStage: 8.8, mrtConnections: ['NS24', 'NE6', 'CC1'] },
          { stopSequence: 25, stopCode: '52009', stopName: 'St. Michael\'s Ter', roadName: 'Whampoa Rd', fareStage: 17.5 }
        ]
      }
    ]
  },
  '162': {
    serviceNumber: '162',
    origin: 'Yio Chu Kang Ter',
    destination: 'Shenton Way Ter',
    viaDescription: 'Via Ang Mo Kio Ave 6, Thomson Rd, Novena, Dhoby Ghaut, Raffles Place',
    operatingHours: {
      firstBus: '05:50 AM',
      lastBus: '11:45 PM',
      headwayPeak: '8 - 12 mins',
      headwayOffPeak: '13 - 17 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'To Shenton Way',
        destinationName: 'Shenton Way Ter',
        stops: [
          { stopSequence: 1, stopCode: '55009', stopName: 'Yio Chu Kang Ter', roadName: 'Ang Mo Kio Ave 8', fareStage: 1.0, mrtConnections: ['NS15'] },
          { stopSequence: 12, stopCode: '50038', stopName: 'Novena Stn', roadName: 'Thomson Rd', fareStage: 8.2, mrtConnections: ['NS20'] },
          { stopSequence: 17, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Penang Rd', fareStage: 11.5, mrtConnections: ['NS24', 'NE6', 'CC1'], hasBusCurrently: true, busPlate: 'SBS3501L', busOccupancy: 'seats_avail' },
          { stopSequence: 24, stopCode: '03019', stopName: 'Shenton Way Ter', roadName: 'Shenton Way', fareStage: 16.0, mrtConnections: ['TE19'] }
        ]
      },
      {
        id: 2,
        directionName: 'To Yio Chu Kang',
        destinationName: 'Yio Chu Kang Ter',
        stops: [
          { stopSequence: 1, stopCode: '03019', stopName: 'Shenton Way Ter', roadName: 'Shenton Way', fareStage: 1.0 },
          { stopSequence: 8, stopCode: '08058', stopName: 'Opp Dhoby Ghaut Stn', roadName: 'Orchard Rd', fareStage: 5.5 },
          { stopSequence: 24, stopCode: '55009', stopName: 'Yio Chu Kang Ter', roadName: 'Ang Mo Kio Ave 8', fareStage: 16.0 }
        ]
      }
    ]
  },
  '15': {
    serviceNumber: '15',
    origin: 'Pasir Ris Int',
    destination: 'Marine Parade (Loop)',
    viaDescription: 'Loop Service: Via Tampines Ave 7, Kaki Bukit, Eunos, Telok Kurau, Marine Parade',
    operatingHours: {
      firstBus: '05:30 AM',
      lastBus: '11:45 PM',
      headwayPeak: '6 - 9 mins',
      headwayOffPeak: '10 - 14 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'Loop via Marine Parade',
        destinationName: 'Marine Parade / Telok Kurau (Loop)',
        stops: [
          { stopSequence: 1, stopCode: '77009', stopName: 'Pasir Ris Int', roadName: 'Pasir Ris Central', fareStage: 1.0, mrtConnections: ['EW1'] },
          { stopSequence: 10, stopCode: '72019', stopName: 'Kaki Bukit Stn', roadName: 'Kaki Bukit Ave 1', fareStage: 7.2, mrtConnections: ['DT28'] },
          { stopSequence: 16, stopCode: '82069', stopName: 'Eunos Stn', roadName: 'Sims Ave', fareStage: 11.0, mrtConnections: ['EW7'] },
          { stopSequence: 22, stopCode: '83139', stopName: 'Aft Telok Kurau Rd', roadName: 'Joo Chiat Place', fareStage: 14.5, hasBusCurrently: true, busPlate: 'SBS6821X', busOccupancy: 'seats_avail' },
          { stopSequence: 26, stopCode: '92049', stopName: 'Opp Parkway Parade', roadName: 'Marine Parade Rd', fareStage: 17.0, mrtConnections: ['TE26'] },
          { stopSequence: 42, stopCode: '77009', stopName: 'Pasir Ris Int', roadName: 'Pasir Ris Central', fareStage: 28.5 }
        ]
      }
    ]
  },
  '7': {
    serviceNumber: '7',
    origin: 'Bedok Int',
    destination: 'Clementi Int',
    viaDescription: 'Via Geylang, Bugis, Orchard Rd, Holland Village, Clementi Ave 3',
    operatingHours: {
      firstBus: '05:30 AM',
      lastBus: '11:45 PM',
      headwayPeak: '5 - 8 mins',
      headwayOffPeak: '9 - 13 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'To Clementi',
        destinationName: 'Clementi Int',
        stops: [
          { stopSequence: 1, stopCode: '84009', stopName: 'Bedok Int', roadName: 'Bedok North Ave 1', fareStage: 1.0, mrtConnections: ['EW5'] },
          { stopSequence: 18, stopCode: '08058', stopName: 'Opp Dhoby Ghaut Stn', roadName: 'Orchard Rd', fareStage: 11.5, mrtConnections: ['NS24', 'NE6', 'CC1'] },
          { stopSequence: 35, stopCode: '17009', stopName: 'Clementi Int', roadName: 'Clementi Ave 3', fareStage: 23.0, mrtConnections: ['EW23'] }
        ]
      },
      {
        id: 2,
        directionName: 'To Bedok',
        destinationName: 'Bedok Int',
        stops: [
          { stopSequence: 1, stopCode: '17009', stopName: 'Clementi Int', roadName: 'Clementi Ave 3', fareStage: 1.0 },
          { stopSequence: 17, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Penang Rd', fareStage: 11.8, mrtConnections: ['NS24', 'NE6', 'CC1'] },
          { stopSequence: 35, stopCode: '84009', stopName: 'Bedok Int', roadName: 'Bedok North Ave 1', fareStage: 23.0 }
        ]
      }
    ]
  },
  '176': {
    serviceNumber: '176',
    origin: 'Bukit Panjang Int',
    destination: 'Bukit Merah Int',
    viaDescription: 'Via Bukit Batok, Jurong East, West Coast, Pasir Panjang, Henderson',
    operatingHours: {
      firstBus: '05:30 AM',
      lastBus: '11:45 PM',
      headwayPeak: '6 - 9 mins',
      headwayOffPeak: '10 - 14 mins'
    },
    directions: [
      {
        id: 1,
        directionName: 'To Bukit Merah',
        destinationName: 'Bukit Merah Int',
        stops: [
          { stopSequence: 1, stopCode: '45009', stopName: 'Bukit Panjang Int', roadName: 'Woodlands Rd', fareStage: 1.0, mrtConnections: ['DT1', 'BP6'] },
          { stopSequence: 14, stopCode: '20251', stopName: 'Opp IMM Bldg', roadName: 'Toh Guan Rd', fareStage: 8.8, mrtConnections: ['NS1', 'EW24'], hasBusCurrently: true, busPlate: 'SMB3502T', busOccupancy: 'seats_avail' },
          { stopSequence: 32, stopCode: '10009', stopName: 'Bukit Merah Int', roadName: 'Bt Merah Central', fareStage: 21.0 }
        ]
      },
      {
        id: 2,
        directionName: 'To Bukit Panjang',
        destinationName: 'Bukit Panjang Int',
        stops: [
          { stopSequence: 1, stopCode: '10009', stopName: 'Bukit Merah Int', roadName: 'Bt Merah Central', fareStage: 1.0 },
          { stopSequence: 18, stopCode: '20259', stopName: 'IMM Bldg', roadName: 'Toh Guan Rd', fareStage: 12.2 },
          { stopSequence: 32, stopCode: '45009', stopName: 'Bukit Panjang Int', roadName: 'Woodlands Rd', fareStage: 21.0 }
        ]
      }
    ]
  }
};

/**
 * Retrieves a bus route or dynamically constructs an authentic route for any Singapore bus number
 */
export function getBusRoute(serviceNumber: string, currentStop?: BusStopSummary): FullBusRoute {
  const normalized = serviceNumber.trim().toUpperCase();
  if (BUS_SERVICES_DATABASE[normalized]) {
    return BUS_SERVICES_DATABASE[normalized];
  }

  // Known Singapore terminal pairings based on service prefix / number heuristics
  const num = parseInt(normalized.replace(/\D/g, ''), 10) || 14;
  let origin = 'Bedok Int';
  let destination = 'Clementi Int';
  let via = 'Via Central Corridor, Orchard Rd, Dhoby Ghaut';

  if (num >= 2 && num <= 30) {
    origin = num % 2 === 0 ? 'Bukit Merah Int' : 'Pasir Ris Int';
    destination = num % 2 === 0 ? 'Changi Village Ter' : 'Marine Parade (Loop)';
    via = 'Via Eastern & Central Arterial Corridor';
  } else if (num >= 31 && num <= 70) {
    origin = 'Tampines Int';
    destination = 'HarbourFront Int';
    via = 'Via MacPherson, Dhoby Ghaut, Lower Delta';
  } else if (num >= 71 && num <= 100) {
    origin = 'Yio Chu Kang Ter';
    destination = 'Marina Centre Ter';
    via = 'Via Upper Thomson, Orchard, Bras Basah';
  } else if (num >= 101 && num <= 150) {
    origin = 'Hougang Central Int';
    destination = 'Kent Ridge Ter';
    via = 'Via Serangoon Rd, Dhoby Ghaut, Alexandra';
  } else if (num >= 151 && num <= 200) {
    origin = 'Ang Mo Kio Int';
    destination = 'Boon Lay Int';
    via = 'Via Bukit Timah, Dhoby Ghaut, Jurong East';
  } else if (num >= 500 && num <= 599) {
    origin = 'Pioneer Rd North';
    destination = 'Marina Bay Sands / Suntec City (Express)';
    via = 'Express: Via AYE, Orchard Rd, Shenton Way';
  } else if (num >= 800 && num <= 999) {
    origin = num < 900 ? 'Yishun Int' : 'Woodlands Int';
    destination = 'Bukit Merah Int';
    via = 'Via North-South Highway, Dhoby Ghaut, Chinatown';
  }

  const stopCode = currentStop?.code || '08057';
  const stopName = currentStop?.name || 'Dhoby Ghaut Stn Exit B';
  const roadName = currentStop?.road || 'Penang Rd';

  return {
    serviceNumber: normalized,
    origin,
    destination,
    viaDescription: via,
    operatingHours: {
      firstBus: '05:30 AM',
      lastBus: '11:45 PM',
      headwayPeak: '6 - 9 mins',
      headwayOffPeak: '10 - 14 mins'
    },
    directions: [
      {
        id: 1,
        directionName: `To ${destination.replace(' (Loop)', '')}`,
        destinationName: destination,
        stops: [
          { stopSequence: 1, stopCode: '10009', stopName: origin, roadName: 'Central Terminal Ave', fareStage: 1.0 },
          { stopSequence: 12, stopCode: '08041', stopName: 'YMCA', roadName: 'Orchard Rd', fareStage: 8.5 },
          { stopSequence: 13, stopCode: stopCode, stopName: stopName, roadName: roadName, fareStage: 9.2, mrtConnections: ['NS24', 'NE6', 'CC1'], hasBusCurrently: true, busPlate: `SBS${num}02L`, busOccupancy: 'seats_avail' },
          { stopSequence: 14, stopCode: '08069', stopName: 'Hotel Rendezvous', roadName: 'Bras Basah Rd', fareStage: 9.8 },
          { stopSequence: 28, stopCode: '84009', stopName: destination, roadName: 'Interchange Way', fareStage: 19.5 }
        ]
      },
      {
        id: 2,
        directionName: `To ${origin.replace(' (Loop)', '')}`,
        destinationName: origin,
        stops: [
          { stopSequence: 1, stopCode: '84009', stopName: destination, roadName: 'Interchange Way', fareStage: 1.0 },
          { stopSequence: 15, stopCode: '08058', stopName: 'Opp Dhoby Ghaut Stn', roadName: 'Orchard Rd', fareStage: 10.0 },
          { stopSequence: 28, stopCode: '10009', stopName: origin, roadName: 'Central Terminal Ave', fareStage: 19.5 }
        ]
      }
    ]
  };
}

/**
 * Builds a dynamic stop progress timeline for any bus route at the targeted stop
 */
export function getStopTimeline(
  busRoute: FullBusRoute,
  currentStop: BusStopSummary,
  nextEtaMinutes: number | 'Arr' = '< 1 min' as any
): StopTimelineItem[] {
  const dir1 = busRoute.directions[0];
  const stopIndex = dir1.stops.findIndex((s) => s.stopCode === currentStop.code);

  const prevStop = stopIndex > 0 ? dir1.stops[stopIndex - 1] : { stopCode: '08041', stopName: 'YMCA', roadName: 'Orchard Rd' };
  const nextStop1 = stopIndex >= 0 && stopIndex + 1 < dir1.stops.length ? dir1.stops[stopIndex + 1] : { stopCode: '08069', stopName: 'Hotel Rendezvous', roadName: 'Bras Basah Rd' };
  const nextStop2 = stopIndex >= 0 && stopIndex + 2 < dir1.stops.length ? dir1.stops[stopIndex + 2] : { stopCode: '08079', stopName: 'Sch of the Arts (SOTA)', roadName: 'Bras Basah Rd' };
  const nextStop3 = stopIndex >= 0 && stopIndex + 3 < dir1.stops.length ? dir1.stops[stopIndex + 3] : { stopCode: '09059', stopName: 'Cathay Cineleisure', roadName: 'Orchard Link' };

  const etaStr = nextEtaMinutes === 'Arr' ? '< 1 min' : `${nextEtaMinutes} mins`;

  return [
    {
      stopCode: prevStop.stopCode,
      stopName: prevStop.stopName,
      roadName: prevStop.roadName,
      status: 'past',
      departedAgo: 'Departed 2 mins ago'
    },
    {
      stopCode: currentStop.code,
      stopName: currentStop.name,
      roadName: currentStop.road,
      status: 'current',
      isUserLocation: true,
      expectedTime: etaStr,
      hasApproachingVehicle: true,
      approachingVehicle: {
        plateNumber: `SBS${busRoute.serviceNumber}88L`,
        description: `Bus ${busRoute.serviceNumber} approaching ${currentStop.road} junction`,
        deckType: 'Double Deck',
        speedKmH: 28,
        occupancyPercent: 36,
        distanceMeters: 140
      }
    },
    {
      stopCode: nextStop1.stopCode,
      stopName: nextStop1.stopName,
      roadName: nextStop1.roadName,
      status: 'upcoming',
      expectedTime: '+3 mins',
      distanceMeters: 400,
      etaOffsetMinutes: 3
    },
    {
      stopCode: nextStop2.stopCode,
      stopName: nextStop2.stopName,
      roadName: nextStop2.roadName,
      status: 'upcoming',
      expectedTime: '+6 mins',
      distanceMeters: 750,
      etaOffsetMinutes: 6
    },
    {
      stopCode: nextStop3.stopCode,
      stopName: nextStop3.stopName,
      roadName: nextStop3.roadName,
      status: 'upcoming',
      expectedTime: '+10 mins',
      distanceMeters: 1200,
      etaOffsetMinutes: 10
    }
  ];
}


export const TRANSIT_ALERTS: TransitAlertItem[] = [
  {
    id: 'alt-01',
    category: 'Bus',
    severity: 'normal',
    title: 'Operational Normal across SBS Transit Network',
    serviceAffected: ['All Routes', 'NEL', 'DTL'],
    timestamp: 'Today, 10:40 AM',
    description: 'Regular service headway and frequency across all SBS Transit network corridors. No train or bus trunk service disruptions detected.',
    actionRequired: 'None. Commuters can expect standard peak and off-peak headway.'
  },
  {
    id: 'alt-02',
    category: 'Diversion',
    severity: 'moderate',
    title: 'Weekend Civic District Diversion (Bras Basah / Dhoby Ghaut)',
    serviceAffected: ['14', '16', '36', '124', '174'],
    timestamp: 'Scheduled: Sat 05 Oct, 05:00 AM - 12:00 PM',
    description: 'Due to Singapore Heritage Marathon 2026, services will skip stops 08069 (Hotel Rendezvous) and 08079 (SOTA). Commuters advised to board at Dhoby Ghaut Stn Exit B or Stamford Rd.',
    actionRequired: 'Plan extra travel time of 8 - 12 minutes.'
  },
  {
    id: 'alt-03',
    category: 'Bus',
    severity: 'normal',
    title: 'Fleet Electrification Update: 100% Low-Floor Euro VI / Electric',
    serviceAffected: ['14', '65', '147', '190'],
    timestamp: 'Yesterday, 02:00 PM',
    description: 'All scheduled double deck trips along the Orchard/Dhoby Ghaut corridor are operating with zero-emission battery electric or low-emission Euro VI engines with wheelchair boarding telematics.',
    actionRequired: 'Commuters with mobility devices enjoy priority front-door boarding ramps.'
  },
  {
    id: 'alt-04',
    category: 'Rail',
    severity: 'normal',
    title: 'North East Line & Downtown Line: High Frequency Flow',
    serviceAffected: ['NEL (HarbourFront - Punggol Coast)', 'DTL (Bukit Panjang - Expo)'],
    timestamp: 'Today, 10:30 AM',
    description: 'Connecting train services at Dhoby Ghaut interchange running at 2.5-minute intervals. Seamless underground transfer from Bus Stop 08057 via Exit B escalators.',
    actionRequired: 'Interchange gates 1 & 2 fully open.'
  }
];
