import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BookingDetails, TAXI_TIERS } from "@/types/taxi";
import { formatDistance } from "@/lib/distance";
import { formatPrice, calculateEstimatedTime, formatTime } from "@/lib/pricing";
import { MapPin, Navigation, Clock, Plane } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BookingSummaryProps {
  booking: BookingDetails;
  onConfirm: () => void;
  onReset: () => void;
}

export const BookingSummary = ({ booking, onConfirm, onReset }: BookingSummaryProps) => {
  const isComplete =
    booking.start && booking.destination && booking.selectedTier && booking.distance && booking.price;

  const tierInfo = booking.selectedTier
    ? TAXI_TIERS.find((t) => t.id === booking.selectedTier)
    : null;

  const estimatedTime =
    booking.distance && booking.selectedTier
      ? calculateEstimatedTime(booking.distance, booking.selectedTier)
      : null;

  const handleConfirm = async () => {
    if (!booking.start || !booking.destination) {
      return;
    }
    try {
      const { error } = await supabase
        .from('rides')
        .insert({
          start_location: `${booking.start.lat}, ${booking.start.lng}`,
          end_location: `${booking.destination.lat}, ${booking.destination.lng}`
        });

      if (error) {
        throw error;
      }
      onConfirm();
    } catch (error: any) {
      toast.error('Booking failed', { description: error.message });
    }
  };
  
  if (!isComplete) {
    return (
      <Card className="shadow-card backdrop-blur-sm bg-card/95 animate-fade-in">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 transition-all duration-300">
              {booking.start ? (
                <Badge variant="secondary" className="gap-1 animate-scale-in">
                  <MapPin className="w-3 h-3" /> Pickup set
                </Badge>
              ) : (
                <span className="text-muted-foreground">• Select pickup location</span>
              )}
            </div>
            <div className="flex items-center gap-2 transition-all duration-300">
              {booking.destination ? (
                <Badge variant="secondary" className="gap-1 animate-scale-in">
                  <Navigation className="w-3 h-3" /> Destination set
                </Badge>
              ) : (
                <span className="text-muted-foreground">• Select destination</span>
              )}
            </div>
            <div className="flex items-center gap-2 transition-all duration-300">
              {booking.selectedTier ? (
                <Badge variant="secondary" className="gap-1 animate-scale-in">
                  <Plane className="w-3 h-3" /> {tierInfo?.name} selected
                </Badge>
              ) : (
                <span className="text-muted-foreground">• Choose taxi tier</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-glow border-primary/20 backdrop-blur-sm bg-card/95 animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Booking Summary</span>
          <Badge variant="default" className="gap-1 animate-pulse">
            <Plane className="w-3 h-3" />
            Ready to Fly
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium">Pickup</div>
              <div className="text-sm text-muted-foreground">
                {booking.start?.lat.toFixed(4)}, {booking.start?.lng.toFixed(4)}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Navigation className="w-5 h-5 text-accent mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium">Destination</div>
              <div className="text-sm text-muted-foreground">
                {booking.destination?.lat.toFixed(4)}, {booking.destination?.lng.toFixed(4)}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Taxi Tier</span>
            <span className="font-semibold">
              {tierInfo?.icon} {tierInfo?.name}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm">Distance</span>
            <span className="font-semibold">{formatDistance(booking.distance!)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm">Rate</span>
            <span className="text-sm text-muted-foreground">
              ₹{tierInfo?.costPerKm}/km
            </span>
          </div>

          {estimatedTime && (
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center gap-1">
                <Clock className="w-3 h-3" /> Estimated Time
              </span>
              <span className="font-semibold">{formatTime(estimatedTime)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">{formatPrice(booking.price!)}</span>
        </div>

        <div className="flex gap-2">
          <Button onClick={onReset} variant="outline" className="flex-1 hover:scale-105 transition-transform">
            Reset
          </Button>
          <Button onClick={handleConfirm} className="flex-1 shadow-glow hover:scale-105 transition-transform">
            Confirm Booking
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
