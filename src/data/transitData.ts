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
  }
};

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
