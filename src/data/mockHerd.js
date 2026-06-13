// Mock database for SmartHerd Zambia platform

export const CHISAMBA_CENTER = { lat: -14.9720, lng: 28.2550 };
export const GEOFENCE_RADIUS_METERS = 800;

export const mockAnimals = [
  {
    id: "SH-001",
    name: "Mutinta",
    breed: "Angoni",
    age: "3.5 Years",
    weight: "410 kg",
    healthScore: 95,
    status: "Healthy",
    owner: "Chisamba Valley Dairy",
    location: { lat: -14.9712, lng: 28.2538 },
    collarId: "COLLAR-ZA-101",
    battery: 89,
    signal: "Strong",
    lastSync: "3 mins ago",
    isActive: true,
    history: [
      { date: "09:00 AM", event: "Grazing in North Pasture" },
      { date: "07:30 AM", event: "Milked & Inspected" },
      { date: "Yesterday", event: "Deworming vaccination complete" }
    ],
    image: "/src/assets/cow1.png"
  },
  {
    id: "SH-002",
    name: "Tembo",
    breed: "Barotse",
    age: "4.2 Years",
    weight: "520 kg",
    healthScore: 38,
    status: "Attention",
    owner: "Chisamba Valley Dairy",
    location: { lat: -14.9680, lng: 28.2590 },
    collarId: "COLLAR-ZA-102",
    battery: 12, // low battery alert
    signal: "Medium",
    lastSync: "1 min ago",
    isActive: true,
    history: [
      { date: "10:15 AM", event: "Abnormal temperature spike detected" },
      { date: "08:00 AM", event: "Lethargic movement in shade" },
      { date: "3 days ago", event: "Hoof trimming session" }
    ],
    image: "/src/assets/cow2.png"
  },
  {
    id: "SH-003",
    name: "Mubita",
    breed: "Boran",
    age: "2.8 Years",
    weight: "390 kg",
    healthScore: 92,
    status: "Healthy",
    owner: "Kafue Plains Cattle",
    location: { lat: -14.9735, lng: 28.2562 },
    collarId: "COLLAR-ZA-103",
    battery: 95,
    signal: "Strong",
    lastSync: "Just now",
    isActive: true,
    history: [
      { date: "09:45 AM", event: "Water trough visit" },
      { date: "Yesterday", event: "Weighed at crush pen" }
    ],
    image: "/src/assets/cow3.png"
  },
  {
    id: "SH-004",
    name: "Chansa",
    breed: "Brahman Cross",
    age: "5.1 Years",
    weight: "580 kg",
    healthScore: 89,
    status: "Healthy",
    owner: "Kafue Plains Cattle",
    location: { lat: -14.9740, lng: 28.2515 },
    collarId: "COLLAR-ZA-104",
    battery: 76,
    signal: "Strong",
    lastSync: "5 mins ago",
    isActive: true,
    history: [
      { date: "06:00 AM", event: "Released from night boma" }
    ],
    image: "/src/assets/cow4.png"
  },
  {
    id: "SH-005",
    name: "Kunda",
    breed: "Holstein",
    age: "3.0 Years",
    weight: "430 kg",
    healthScore: 45,
    status: "Attention", // geofence alert / theft suspect
    owner: "Chisamba Valley Dairy",
    location: { lat: -14.9620, lng: 28.2680 }, // Out of safe geofence limit!
    collarId: "COLLAR-ZA-105",
    battery: 82,
    signal: "Weak",
    lastSync: "30s ago",
    isActive: true,
    history: [
      { date: "10:30 AM", event: "Geofence boundary breach detected (Critical)" },
      { date: "10:25 AM", event: "High velocity motion detected (Theft Alert)" }
    ],
    image: "/src/assets/cow5.png"
  }
];

export const mockAlerts = [
  {
    id: "alt-1",
    type: "Theft Alert",
    severity: "Critical",
    animal: "Kunda (SH-005)",
    message: "High velocity movement detected outside the safe Chisamba geofence boundary.",
    time: "10:30 AM",
    resolved: false
  },
  {
    id: "alt-2",
    type: "Geofence Breach",
    severity: "Critical",
    animal: "Kunda (SH-005)",
    message: "Crossed north perimeter fence line into unmonitored dense bush.",
    time: "10:28 AM",
    resolved: false
  },
  {
    id: "alt-3",
    type: "Fever Warning",
    severity: "Warning",
    animal: "Tembo (SH-002)",
    message: "Smart collar recorded a body temperature of 40.8°C (Normal: 38.5-39.5°C).",
    time: "10:15 AM",
    resolved: false
  },
  {
    id: "alt-4",
    type: "Battery Critical",
    severity: "Warning",
    animal: "Tembo (SH-002)",
    message: "GPS Collar ZA-102 battery charge dropped below 15%. Sync intervals restricted.",
    time: "08:00 AM",
    resolved: false
  }
];

export const mockDevices = [
  { id: "COLLAR-ZA-101", model: "SmartHerd G3", battery: 89, signal: "Strong", lastSync: "3 mins ago", status: "Active", animal: "Mutinta" },
  { id: "COLLAR-ZA-102", model: "SmartHerd G3", battery: 12, signal: "Medium", lastSync: "1 min ago", status: "Active", animal: "Tembo" },
  { id: "COLLAR-ZA-103", model: "SmartHerd Pro", battery: 95, signal: "Strong", lastSync: "Just now", status: "Active", animal: "Mubita" },
  { id: "COLLAR-ZA-104", model: "SmartHerd G3", battery: 76, signal: "Strong", lastSync: "5 mins ago", status: "Active", animal: "Chansa" },
  { id: "COLLAR-ZA-105", model: "SmartHerd Pro", battery: 82, signal: "Weak", lastSync: "30s ago", status: "Active", animal: "Kunda" },
  { id: "COLLAR-ZA-106", model: "SmartHerd G3", battery: 100, signal: "Excellent", lastSync: "Never", status: "Inactive (Ready)", animal: "Unlinked" }
];

export const mockVaccines = [
  { id: "vac-1", animal: "Mutinta (SH-001)", vaccine: "Foot & Mouth Disease", date: "June 25, 2026", status: "Upcoming" },
  { id: "vac-2", animal: "Chansa (SH-004)", vaccine: "Anthrax booster", date: "June 29, 2026", status: "Upcoming" },
  { id: "vac-3", animal: "Tembo (SH-002)", vaccine: "East Coast Fever", date: "June 10, 2026", status: "Completed" },
  { id: "vac-4", animal: "Mubita (SH-003)", vaccine: "Brucellosis (S19)", date: "July 05, 2026", status: "Upcoming" }
];
