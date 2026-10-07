export interface BusStop {
  code: string;
  name: string;
  road: string;
}

export interface BusRoute {
  serviceNo: string;
  origin: string;
  destination: string;
  direction1Name: string;
  direction2Name: string;
  description: string;
  operatingHours: string;
  loop: boolean;
  direction1Stops: BusStop[];
  direction2Stops: BusStop[];
}

export interface BusArrivalTiming {
  arrivalMinutes: number; // 0 for Arr, 1, 2, ...
  load: 'Seats Available' | 'Standing Available' | 'Limited Standing';
  type: 'Single Deck' | 'Double Deck';
  wab: boolean; // Wheelchair accessible bus
  estimatedTimestamp: string;
  latitude?: string;
  longitude?: string;
}

export interface BusArrivalResult {
  serviceNo: string;
  stopCode: string;
  stopName: string;
  roadName: string;
  destination: string;
  via: string;
  arrivals: [BusArrivalTiming, BusArrivalTiming, BusArrivalTiming];
  lastUpdated: string;
  isLiveLta?: boolean;
  operator?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

export const BUS_ROUTES: BusRoute[] = [
  {
    serviceNo: '147',
    origin: 'Hougang Central Int',
    destination: 'Clementi Int',
    direction1Name: 'Towards Clementi Int via Chinatown & Commonwealth',
    direction2Name: 'Towards Hougang Central Int via Serangoon',
    description: 'Trunk service connecting North-East corridor to South-West residential and commercial hubs.',
    operatingHours: '05:30 - 23:45',
    loop: false,
    direction1Stops: [
      { code: '64009', name: 'Hougang Central Bus Int', road: 'Hougang Central' },
      { code: '64201', name: 'Opp Blk 241', road: 'Hougang Ave 2' },
      { code: '64211', name: 'Blk 248', road: 'Hougang Ave 2' },
      { code: '64221', name: 'Blk 327', road: 'Hougang Ave 8' },
      { code: '64109', name: 'Kovan Stn Exit C', road: 'Upper Serangoon Rd' },
      { code: '63019', name: 'Opp Highland Ctr', road: 'Upper Serangoon Rd' },
      { code: '66011', name: 'Serangoon Stn Exit C', road: 'Upper Serangoon Rd' },
      { code: '60111', name: 'Woodleigh Stn Exit A', road: 'Upper Serangoon Rd' },
      { code: '60081', name: 'Potong Pasir Stn Exit B', road: 'Upper Serangoon Rd' },
      { code: '60011', name: 'Boon Keng Stn / Blk 102', road: 'Serangoon Rd' },
      { code: '50031', name: 'Lavender Stn Exit B', road: 'Kallang Rd' },
      { code: '01119', name: 'Bugis Stn Exit D', road: 'Victoria St' },
      { code: '04111', name: 'City Hall Stn Exit B', road: 'North Bridge Rd' },
      { code: '05019', name: 'Clarke Quay Stn Exit E', road: 'Eu Tong Sen St' },
      { code: '05049', name: 'Chinatown Stn Exit E', road: 'Eu Tong Sen St' },
      { code: '05139', name: "People's Park Complex", road: 'Eu Tong Sen St' },
      { code: '06179', name: 'Opp Outram Park Stn', road: 'Outram Rd' },
      { code: '10011', name: 'Bukit Merah Town Ctr', road: 'Jln Bukit Merah' },
      { code: '11041', name: 'Queensway Sec Sch', road: 'Queensway' },
      { code: '11169', name: 'Commonwealth Stn Exit B', road: 'Commonwealth Ave' },
      { code: '11219', name: 'Buona Vista Stn Exit C', road: 'Commonwealth Ave' },
      { code: '17179', name: 'Opp SP Inno Village', road: 'Commonwealth Ave West' },
      { code: '17009', name: 'Clementi Bus Int', road: 'Clementi Ave 3' },
    ],
    direction2Stops: [
      { code: '17009', name: 'Clementi Bus Int', road: 'Clementi Ave 3' },
      { code: '17171', name: 'SP Inno Village', road: 'Commonwealth Ave West' },
      { code: '11211', name: 'Buona Vista Stn Exit D', road: 'Commonwealth Ave' },
      { code: '11161', name: 'Commonwealth Stn Exit A', road: 'Commonwealth Ave' },
      { code: '10019', name: 'Opp Bukit Merah Town Ctr', road: 'Jln Bukit Merah' },
      { code: '06171', name: 'Outram Park Stn Exit G', road: 'Outram Rd' },
      { code: '05041', name: 'Chinatown Stn Exit C', road: 'New Bridge Rd' },
      { code: '05013', name: 'Opp Clarke Quay Stn', road: 'New Bridge Rd' },
      { code: '04112', name: 'Capitol Piazza / City Hall', road: 'North Bridge Rd' },
      { code: '01112', name: 'Bugis Stn Exit A', road: 'Victoria St' },
      { code: '60019', name: 'Boon Keng Stn / Blk 22', road: 'Serangoon Rd' },
      { code: '60089', name: 'Potong Pasir Stn Exit C', road: 'Upper Serangoon Rd' },
      { code: '66019', name: 'Serangoon Stn Exit H', road: 'Upper Serangoon Rd' },
      { code: '64101', name: 'Kovan Stn Exit B', road: 'Upper Serangoon Rd' },
      { code: '64009', name: 'Hougang Central Bus Int', road: 'Hougang Central' },
    ]
  },
  {
    serviceNo: '65',
    origin: 'Tampines Int',
    destination: 'HarbourFront Int',
    direction1Name: 'Towards HarbourFront Int via Orchard & River Valley',
    direction2Name: 'Towards Tampines Int via MacPherson',
    description: 'High capacity trunk route through prime shopping belts and central business districts.',
    operatingHours: '05:30 - 23:30',
    loop: false,
    direction1Stops: [
      { code: '75009', name: 'Tampines Bus Int', road: 'Tampines Ave 4' },
      { code: '75139', name: 'Tampines West Stn Exit B', road: 'Tampines Ave 4' },
      { code: '72059', name: 'Bedok Reservoir Stn', road: 'Bedok Reservoir Rd' },
      { code: '71079', name: 'Kaki Bukit Stn Exit A', road: 'Kaki Bukit Ave 1' },
      { code: '70251', name: 'Ubi Stn Exit A', road: 'Ubi Ave 2' },
      { code: '70109', name: 'MacPherson Stn Exit A', road: 'Circuit Rd' },
      { code: '60011', name: 'Boon Keng Stn', road: 'Serangoon Rd' },
      { code: '07011', name: 'Little India Stn Exit A', road: 'Bukit Timah Rd' },
      { code: '08057', name: 'Dhoby Ghaut Stn Exit B', road: 'Orchard Rd' },
      { code: '09048', name: 'Somerset Stn', road: 'Orchard Rd' },
      { code: '09022', name: 'Orchard Stn / Lucky Plaza', road: 'Orchard Rd' },
      { code: '13099', name: 'Great World Stn Exit 2', road: 'Kim Seng Rd' },
      { code: '14141', name: 'HarbourFront Int', road: 'Seah Im Rd' }
    ],
    direction2Stops: [
      { code: '14141', name: 'HarbourFront Int', road: 'Seah Im Rd' },
      { code: '13091', name: 'Great World Stn Exit 1', road: 'Kim Seng Rd' },
      { code: '09023', name: 'Opp Orchard Stn', road: 'Orchard Blvd' },
      { code: '08058', name: 'Plaza Singapura', road: 'Orchard Rd' },
      { code: '07012', name: 'Little India Stn Exit B', road: 'Bukit Timah Rd' },
      { code: '70101', name: 'MacPherson Stn Exit B', road: 'Circuit Rd' },
      { code: '75009', name: 'Tampines Bus Int', road: 'Tampines Ave 4' }
    ]
  },
  {
    serviceNo: '7',
    origin: 'Bedok Int',
    destination: 'Clementi Int',
    direction1Name: 'Towards Clementi Int via Orchard & Holland Village',
    direction2Name: 'Towards Bedok Int via Bugis',
    description: 'Direct cross-island route connecting East to West through Orchard Road corridor.',
    operatingHours: '05:45 - 23:45',
    loop: false,
    direction1Stops: [
      { code: '84009', name: 'Bedok Bus Int', road: 'Bedok North Ave 1' },
      { code: '84031', name: 'Blk 220 CP', road: 'Bedok North Ave 3' },
      { code: '82049', name: 'Kembangan Stn', road: 'Sims Ave East' },
      { code: '81089', name: 'Eunos Stn', road: 'Sims Ave' },
      { code: '80069', name: 'Paya Lebar Stn Exit B', road: 'Sims Ave' },
      { code: '80019', name: 'Aljunied Stn', road: 'Sims Ave' },
      { code: '01119', name: 'Bugis Stn Exit D', road: 'Victoria St' },
      { code: '08057', name: 'Dhoby Ghaut Stn Exit B', road: 'Orchard Rd' },
      { code: '11261', name: 'Holland Village Stn Exit A', road: 'Holland Ave' },
      { code: '17009', name: 'Clementi Bus Int', road: 'Clementi Ave 3' }
    ],
    direction2Stops: [
      { code: '17009', name: 'Clementi Bus Int', road: 'Clementi Ave 3' },
      { code: '11269', name: 'Holland Village Stn Exit B', road: 'Holland Ave' },
      { code: '08058', name: 'Dhoby Ghaut Stn Exit C', road: 'Bras Basah Rd' },
      { code: '01112', name: 'Bugis Stn Exit A', road: 'Victoria St' },
      { code: '84009', name: 'Bedok Bus Int', road: 'Bedok North Ave 1' }
    ]
  },
  {
    serviceNo: '80',
    origin: 'Sengkang Int',
    destination: 'HarbourFront Int',
    direction1Name: 'Towards HarbourFront Int via Geylang & Chinatown',
    direction2Name: 'Towards Sengkang Int via Hougang',
    description: 'Long trunk service connecting North-East residential heartlands to Southern commercial ports.',
    operatingHours: '05:30 - 23:30',
    loop: false,
    direction1Stops: [
      { code: '67009', name: 'Sengkang Bus Int', road: 'Compassvale Rd' },
      { code: '67409', name: 'Buangkok Stn Exit A', road: 'Sengkang Central' },
      { code: '64009', name: 'Hougang Central Bus Int', road: 'Hougang Central' },
      { code: '64109', name: 'Kovan Stn Exit C', road: 'Upper Serangoon Rd' },
      { code: '05049', name: 'Chinatown Stn Exit E', road: 'Eu Tong Sen St' },
      { code: '14141', name: 'HarbourFront Int', road: 'Seah Im Rd' }
    ],
    direction2Stops: [
      { code: '14141', name: 'HarbourFront Int', road: 'Seah Im Rd' },
      { code: '05041', name: 'Chinatown Stn Exit C', road: 'New Bridge Rd' },
      { code: '64009', name: 'Hougang Central Bus Int', road: 'Hougang Central' },
      { code: '67009', name: 'Sengkang Bus Int', road: 'Compassvale Rd' }
    ]
  },
  {
    serviceNo: '166',
    origin: 'Ang Mo Kio Int',
    destination: 'Clementi Int',
    direction1Name: 'Towards Clementi Int via Thomson & Alexandra',
    direction2Name: 'Towards Ang Mo Kio Int via Novena',
    description: 'Scenic trunk connector travelling through Central Singapore, Thomson, Novena and West Coast.',
    operatingHours: '05:30 - 23:45',
    loop: false,
    direction1Stops: [
      { code: '54009', name: 'Ang Mo Kio Bus Int', road: 'Ang Mo Kio Ave 8' },
      { code: '54261', name: 'Mayflower Stn Exit 6', road: 'Ang Mo Kio Ave 3' },
      { code: '53021', name: 'Upper Thomson Stn', road: 'Upper Thomson Rd' },
      { code: '50011', name: 'Novena Stn Exit B', road: 'Thomson Rd' },
      { code: '11019', name: 'Alexandra Hosp', road: 'Alexandra Rd' },
      { code: '17009', name: 'Clementi Bus Int', road: 'Clementi Ave 3' }
    ],
    direction2Stops: [
      { code: '17009', name: 'Clementi Bus Int', road: 'Clementi Ave 3' },
      { code: '50019', name: 'Novena Stn Exit A', road: 'Thomson Rd' },
      { code: '54009', name: 'Ang Mo Kio Bus Int', road: 'Ang Mo Kio Ave 8' }
    ]
  }
];

export const NEWS_ANNOUNCEMENTS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Changes To Bus Services And Boarding Berths At Sengkang Bus Interchange',
    date: '07 Oct 2026',
    category: 'Bus Operations',
    excerpt: 'Commencing Monday, 13 October 2026, boarding berths for Services 80, 83, 85, 86, and 87 will be reconfigured to facilitate upgrading works.',
    content: `SBS Transit will be reconfiguring the passenger boarding berths at Sengkang Bus Interchange with effect from Monday, 13 October 2026.

The temporary reconfiguration allows for barrier-free queue line enhancements and installation of next-generation digital passenger information display systems (PIDS).

Summary of Changes:
• Service 80: Relocated to Berth B2
• Service 83: Relocated to Berth B3
• Services 85 & 86: Relocated to Berth B4
• Service 87: Relocated to Berth B5

Customer Service Officers will be deployed on site to assist commuters. Commuters can also refer to directional signages installed throughout the interchange.`
  },
  {
    id: 'news-2',
    title: 'Service 16/16M Affected by Road Closure for the Joo Chiat Car-Free Day',
    date: '01 Oct 2026',
    category: 'Route Diversion',
    excerpt: 'Due to road closure along Joo Chiat Road for the community Car-Free Weekend, Services 16 and 16M will skip three bus stops.',
    content: `SBS Transit Bus Services 16 and 16M will be temporarily diverted from their normal routes on Saturday, 18 October 2026, from 2:00 PM to 11:59 PM.

Affected Bus Stops:
• 82141 - Opp Maranatha Hall (Joo Chiat Rd)
• 82151 - Aft Duku Rd (Joo Chiat Rd)
• 82161 - Bef Koon Seng Rd (Joo Chiat Rd)

Commuters travelling towards Bedok or Bukit Merah are advised to board the services at alternative stops along Dunman Road or Still Road. We apologize for any inconvenience caused.`
  },
  {
    id: 'news-3',
    title: 'SBS Transit Trials AI for More Reliable Bus Arrivals',
    date: '24 Sep 2026',
    category: 'Innovation',
    excerpt: 'Collaborative initiative with LTA tests predictive machine learning models to adjust dispatch intervals and smooth headway variations.',
    content: `In our ongoing commitment to enhance commuter journey reliability, SBS Transit is piloting an AI-powered Headway Regularity Management System across 12 high-density bus routes, including Services 147, 65, and 166.

The system analyses real-time traffic congestion, passenger boarding counts at interchanges, and weather radar data to provide proactive pacing advisory to Bus Captains.

Early pilot results demonstrate:
• 18% reduction in bus bunching incidents
• 12% improvement in on-time arrival consistency
• More accurate NextBus arrival estimates displayed in commuter apps and interchange boards.`
  }
];

export const RAIL_LINES = [
  {
    name: 'North East Line (NEL)',
    code: 'NEL',
    color: '#8b008b', // Deep Purple
    badgeBg: 'bg-purple-800 text-white',
    stationsCount: '17 Stations',
    terminals: 'HarbourFront (NE1) ⇄ Punggol Coast (NE18)',
    operatingHours: '05:30 - 00:30',
    stations: [
      { code: 'NE1', name: 'HarbourFront', interchange: 'Circle Line (CC29)' },
      { code: 'NE3', name: 'Outram Park', interchange: 'East West Line (EW16) / TEL (TE17)' },
      { code: 'NE4', name: 'Chinatown', interchange: 'Downtown Line (DT19)' },
      { code: 'NE5', name: 'Clarke Quay', interchange: '' },
      { code: 'NE6', name: 'Dhoby Ghaut', interchange: 'North South Line (NS24) / Circle Line (CC1)' },
      { code: 'NE7', name: 'Little India', interchange: 'Downtown Line (DT12)' },
      { code: 'NE8', name: 'Farrer Park', interchange: '' },
      { code: 'NE9', name: 'Boon Keng', interchange: '' },
      { code: 'NE10', name: 'Potong Pasir', interchange: '' },
      { code: 'NE11', name: 'Woodleigh', interchange: '' },
      { code: 'NE12', name: 'Serangoon', interchange: 'Circle Line (CC13)' },
      { code: 'NE13', name: 'Kovan', interchange: '' },
      { code: 'NE14', name: 'Hougang', interchange: 'Future CRL (CR8)' },
      { code: 'NE15', name: 'Buangkok', interchange: '' },
      { code: 'NE16', name: 'Sengkang', interchange: 'Sengkang LRT (STC)' },
      { code: 'NE17', name: 'Punggol', interchange: 'Punggol LRT (PTC) / CRL' },
      { code: 'NE18', name: 'Punggol Coast', interchange: '' },
    ]
  },
  {
    name: 'Downtown Line (DTL)',
    code: 'DTL',
    color: '#0055b8', // Blue
    badgeBg: 'bg-blue-700 text-white',
    stationsCount: '34 Stations',
    terminals: 'Bukit Panjang (DT1) ⇄ Expo (DT35)',
    operatingHours: '05:30 - 00:20',
    stations: [
      { code: 'DT1', name: 'Bukit Panjang', interchange: 'Bukit Panjang LRT' },
      { code: 'DT9', name: 'Botanic Gardens', interchange: 'Circle Line (CC19)' },
      { code: 'DT10', name: 'Stevens', interchange: 'Thomson-East Coast Line (TE11)' },
      { code: 'DT11', name: 'Newton', interchange: 'North South Line (NS21)' },
      { code: 'DT12', name: 'Little India', interchange: 'North East Line (NE7)' },
      { code: 'DT14', name: 'Bugis', interchange: 'East West Line (EW12)' },
      { code: 'DT16', name: 'Bayfront', interchange: 'Circle Line (CE1)' },
      { code: 'DT19', name: 'Chinatown', interchange: 'North East Line (NE4)' },
      { code: 'DT26', name: 'MacPherson', interchange: 'Circle Line (CC10)' },
      { code: 'DT32', name: 'Tampines', interchange: 'East West Line (EW2)' },
      { code: 'DT35', name: 'Expo', interchange: 'East West Line (CG1)' }
    ]
  },
  {
    name: 'Sengkang & Punggol LRT',
    code: 'SPLRT',
    color: '#708090', // Slate Grey
    badgeBg: 'bg-slate-700 text-white',
    stationsCount: '28 Stations (East & West Loops)',
    terminals: 'Sengkang Town Centre / Punggol Town Centre',
    operatingHours: '05:15 - 00:45',
    stations: [
      { code: 'STC', name: 'Sengkang', interchange: 'North East Line (NE16)' },
      { code: 'SE1-5', name: 'Compassvale / Rumbia / Bakau / Kangkar / Ranggung', interchange: 'East Loop' },
      { code: 'SW1-8', name: 'Cheng Lim / Farmway / Kupang / Thanggam / Fernvale / Layar / Tongkang / Renjong', interchange: 'West Loop' },
      { code: 'PTC', name: 'Punggol', interchange: 'North East Line (NE17)' }
    ]
  }
];

export const INTERCHANGES_DATA = [
  {
    name: 'Hougang Central Bus Interchange',
    location: '840 Hougang Central, Singapore 538757',
    connectedMRT: 'Hougang (NE14)',
    services: ['27', '74', '87', '89', '89e', '107', '107M', '112', '113', '116', '132', '147', '153', '161', '165'],
    berths: 7,
    facilities: ['Air-conditioned passenger concourse', 'Priority queue zones for seniors & WAB', 'Nursing room', 'Heartbeat AED Station', 'ComfortDelGro taxi stand']
  },
  {
    name: 'Sengkang Integrated Transport Hub',
    location: '11 Sengkang Square, Singapore 545071',
    connectedMRT: 'Sengkang (NE16) & Sengkang LRT (STC)',
    services: ['80', '83', '85', '86', '87', '102', '156', '159', '163', '371', '372'],
    berths: 8,
    facilities: ['Full underground connection to Compass One', 'Wheelchair barrier-free ramps', 'Commuter lounge', 'Bike parking racks', 'Retail amenities']
  },
  {
    name: 'Clementi Bus Interchange',
    location: '3155 Commonwealth Ave West, Singapore 129588',
    connectedMRT: 'Clementi (EW23)',
    services: ['7', '14', '96', '99', '147', '156', '165', '166', '175', '196', '282', '284', '285'],
    berths: 6,
    facilities: ['Direct bridge to The Clementi Mall', 'LTA e-payment kiosks', 'Commuter care point', 'Guide dog welcome area']
  },
  {
    name: 'Bedok Integrated Transport Hub',
    location: '20A Bedok North Drive, Singapore 465492',
    connectedMRT: 'Bedok (EW5)',
    services: ['7', '9', '14', '16', '17', '18', '26', '30', '32', '33', '35', '38', '40', '60', '66', '69', '87', '168', '196', '197', '222', '225', '228', '229'],
    berths: 10,
    facilities: ['Fully air-conditioned hub connected to Bedok Mall', 'Interactive journey planners', 'Family restrooms', 'Wheelchair charging points']
  }
];

// Helper to calculate mock dynamic arrival times for a given service & stop
export function getEstimatedArrivals(serviceNo: string, stopCode: string): BusArrivalResult {
  const service = BUS_ROUTES.find((s) => s.serviceNo === serviceNo) || BUS_ROUTES[0];
  const allStops = [...service.direction1Stops, ...service.direction2Stops];
  const stop = allStops.find((st) => st.code === stopCode) || service.direction1Stops[0];

  // If this is Service 147 at stop 64009, match the screenshot closely
  if (serviceNo === '147' && stop.code === '64009') {
    return {
      serviceNo: '147',
      stopCode: '64009',
      stopName: 'Hougang Central Int',
      roadName: 'Hougang Central',
      destination: 'Clementi Int',
      via: 'Chinatown & Commonwealth',
      arrivals: [
        {
          arrivalMinutes: 3,
          load: 'Seats Available',
          type: 'Double Deck',
          wab: true,
          estimatedTimestamp: new Date(Date.now() + 3 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          arrivalMinutes: 11,
          load: 'Standing Available',
          type: 'Double Deck',
          wab: true,
          estimatedTimestamp: new Date(Date.now() + 11 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          arrivalMinutes: 22,
          load: 'Seats Available',
          type: 'Single Deck',
          wab: true,
          estimatedTimestamp: new Date(Date.now() + 22 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      lastUpdated: 'Just now'
    };
  }

  // Deterministic seed based on service and stop code digits
  const seed = (serviceNo.charCodeAt(0) * 17 + parseInt(stopCode.slice(-3) || '123', 10)) % 10;
  const m1 = Math.max(1, (seed % 6) + 1);
  const m2 = m1 + 6 + (seed % 5);
  const m3 = m2 + 8 + (seed % 6);

  const loads: Array<'Seats Available' | 'Standing Available' | 'Limited Standing'> = [
    'Seats Available',
    'Standing Available',
    'Seats Available',
    'Standing Available',
    'Limited Standing'
  ];

  return {
    serviceNo: service.serviceNo,
    stopCode: stop.code,
    stopName: stop.name,
    roadName: stop.road,
    destination: service.destination,
    via: 'Key Corridors & Transport Nodes',
    arrivals: [
      {
        arrivalMinutes: m1,
        load: loads[seed % loads.length],
        type: 'Double Deck',
        wab: true,
        estimatedTimestamp: new Date(Date.now() + m1 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        arrivalMinutes: m2,
        load: loads[(seed + 1) % loads.length],
        type: seed % 2 === 0 ? 'Double Deck' : 'Single Deck',
        wab: true,
        estimatedTimestamp: new Date(Date.now() + m2 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        arrivalMinutes: m3,
        load: loads[(seed + 2) % loads.length],
        type: seed % 3 === 0 ? 'Single Deck' : 'Double Deck',
        wab: true,
        estimatedTimestamp: new Date(Date.now() + m3 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ],
    lastUpdated: 'Just now'
  };
}

/**
 * Parses LTA DataMall v3 BusArrival raw object
 */
export function parseLtaBusTiming(busObj: any): BusArrivalTiming | null {
  if (!busObj || !busObj.EstimatedArrival) return null;

  const arrivalDate = new Date(busObj.EstimatedArrival);
  const diffMs = arrivalDate.getTime() - Date.now();
  const arrivalMinutes = Math.max(0, Math.round(diffMs / 60000));

  let load: 'Seats Available' | 'Standing Available' | 'Limited Standing' = 'Seats Available';
  if (busObj.Load === 'SDA') load = 'Standing Available';
  else if (busObj.Load === 'LSD') load = 'Limited Standing';

  const type: 'Single Deck' | 'Double Deck' = busObj.Type === 'DD' ? 'Double Deck' : 'Single Deck';
  const wab = busObj.Feature === 'WAB';

  return {
    arrivalMinutes,
    load,
    type,
    wab,
    estimatedTimestamp: arrivalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    latitude: busObj.Latitude !== '0.0' ? busObj.Latitude : undefined,
    longitude: busObj.Longitude !== '0.0' ? busObj.Longitude : undefined,
  };
}

/**
 * Fetches real-time bus arrivals from the /api/bus-arrival gateway
 */
export async function fetchLiveLtaArrivals(
  busStopCode: string,
  serviceNo?: string
): Promise<BusArrivalResult | null> {
  try {
    const cleanStop = busStopCode.trim().padStart(5, '0');
    let url = `/api/bus-arrival?BusStopCode=${encodeURIComponent(cleanStop)}`;
    if (serviceNo) {
      url += `&ServiceNo=${encodeURIComponent(serviceNo.trim())}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`LTA gateway returned ${response.status}, falling back to simulated data`);
      return null;
    }

    const data = await response.json();
    if (!data.Services || !data.Services.length) {
      return null;
    }

    // Find requested service or first available service
    const targetService = serviceNo
      ? data.Services.find((s: any) => s.ServiceNo === serviceNo.trim()) || data.Services[0]
      : data.Services[0];

    if (!targetService) return null;

    const t1 = parseLtaBusTiming(targetService.NextBus);
    const t2 = parseLtaBusTiming(targetService.NextBus2);
    const t3 = parseLtaBusTiming(targetService.NextBus3);

    // Fallbacks if only 1 or 2 buses are currently on route
    const now = Date.now();
    const fallbackT1: BusArrivalTiming = t1 || {
      arrivalMinutes: 2,
      load: 'Seats Available',
      type: 'Double Deck',
      wab: true,
      estimatedTimestamp: new Date(now + 2 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const fallbackT2: BusArrivalTiming = t2 || {
      arrivalMinutes: fallbackT1.arrivalMinutes + 9,
      load: 'Standing Available',
      type: 'Double Deck',
      wab: true,
      estimatedTimestamp: new Date(now + (fallbackT1.arrivalMinutes + 9) * 60000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const fallbackT3: BusArrivalTiming = t3 || {
      arrivalMinutes: fallbackT2.arrivalMinutes + 12,
      load: 'Seats Available',
      type: 'Single Deck',
      wab: true,
      estimatedTimestamp: new Date(now + (fallbackT2.arrivalMinutes + 12) * 60000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const route = BUS_ROUTES.find((r) => r.serviceNo === targetService.ServiceNo);
    const allStops = route ? [...route.direction1Stops, ...route.direction2Stops] : [];
    const stopMatch = allStops.find((s) => s.code === cleanStop);

    return {
      serviceNo: targetService.ServiceNo,
      stopCode: cleanStop,
      stopName: stopMatch ? stopMatch.name : `Bus Stop ${cleanStop}`,
      roadName: stopMatch ? stopMatch.road : 'Singapore Road Network',
      destination: route ? route.destination : 'Transport Destination',
      via: route ? 'Key Commercial & Heartland Corridors' : 'Direct Route',
      arrivals: [fallbackT1, fallbackT2, fallbackT3],
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      isLiveLta: true,
      operator: targetService.Operator || 'SBST',
    };
  } catch (err) {
    console.error('Failed to fetch from LTA gateway:', err);
    return null;
  }
}

