import { TaxiTier, TAXI_TIERS } from "@/types/taxi";

/**
 * Calculate price based on distance and selected tier
 */
export function calculatePrice(distance: number, tier: TaxiTier): number {
  const tierInfo = TAXI_TIERS.find((t) => t.id === tier);
  if (!tierInfo) return 0;

  const price = distance * tierInfo.costPerKm;
  return Math.round(price);
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Calculate estimated time based on distance and tier
 */
export function calculateEstimatedTime(distance: number, tier: TaxiTier): number {
  const tierInfo = TAXI_TIERS.find((t) => t.id === tier);
  if (!tierInfo) return 0;

  // Time in minutes
  const timeInHours = distance / tierInfo.maxSpeed;
  return Math.ceil(timeInHours * 60);
}

/**
 * Format time for display
 */
export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}
