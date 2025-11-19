export type TaxiTier = "basic" | "comfort" | "premium" | "emergency";

export interface TierInfo {
  id: TaxiTier;
  name: string;
  description: string;
  costPerKm: number;
  maxSpeed: number;
  icon: string;
  features: string[];
}

export interface Location {
  lat: number;
  lng: number;
}

export interface BookingDetails {
  start: Location | null;
  destination: Location | null;
  distance: number | null;
  selectedTier: TaxiTier | null;
  price: number | null;
}

export const TAXI_TIERS: TierInfo[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Solo pod for quick trips",
    costPerKm: 120,
    maxSpeed: 80,
    icon: "🛸",
    features: ["Single seat", "Standard comfort", "City speed"],
  },
  {
    id: "comfort",
    name: "Comfort",
    description: "2-seater with climate control",
    costPerKm: 180,
    maxSpeed: 100,
    icon: "✈️",
    features: ["2 seats", "AC comfort", "Smooth ride"],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Luxury VTOL experience",
    costPerKm: 300,
    maxSpeed: 130,
    icon: "🚁",
    features: ["Luxury seating", "Premium comfort", "High speed"],
  },
  {
    id: "emergency",
    name: "Emergency",
    description: "Priority access & fastest route",
    costPerKm: 500,
    maxSpeed: 150,
    icon: "🚀",
    features: ["Priority launch", "Fastest route", "VIP service"],
  },
];

// Bengaluru city boundaries (approximate)
export const BANGALORE_BOUNDS = {
  center: { lat: 12.9716, lng: 77.5946 },
  bounds: [
    [12.7342, 77.3791], // Southwest
    [13.1737, 77.8824], // Northeast
  ] as [[number, number], [number, number]],
};
