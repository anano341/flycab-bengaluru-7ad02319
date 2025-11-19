import { useState } from "react";
import { Hero } from "@/components/Hero";
import { TaxiMap } from "@/components/TaxiMap";
import { TierSelector } from "@/components/TierSelector";
import { BookingSummary } from "@/components/BookingSummary";
import { Button } from "@/components/ui/button";
import { BookingDetails, Location, TaxiTier } from "@/types/taxi";
import { calculateDistance } from "@/lib/distance";
import { calculatePrice } from "@/lib/pricing";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

type Stage = "hero" | "booking" | "confirmed";

const Index = () => {
  const [stage, setStage] = useState<Stage>("hero");
  const [booking, setBooking] = useState<BookingDetails>({
    start: null,
    destination: null,
    distance: null,
    selectedTier: null,
    price: null,
  });

  const handleStartSelect = (location: Location) => {
    setBooking((prev) => {
      const updated = { ...prev, start: location };
      if (updated.destination) {
        const distance = calculateDistance(location, updated.destination);
        updated.distance = distance;
        if (updated.selectedTier) {
          updated.price = calculatePrice(distance, updated.selectedTier);
        }
      }
      return updated;
    });
  };

  const handleDestinationSelect = (location: Location) => {
    setBooking((prev) => {
      const updated = { ...prev, destination: location };
      if (updated.start) {
        const distance = calculateDistance(updated.start, location);
        updated.distance = distance;
        if (updated.selectedTier) {
          updated.price = calculatePrice(distance, updated.selectedTier);
        }
      }
      return updated;
    });
  };

  const handleTierSelect = (tier: TaxiTier) => {
    setBooking((prev) => {
      const updated = { ...prev, selectedTier: tier };
      if (updated.distance) {
        updated.price = calculatePrice(updated.distance, tier);
      }
      return updated;
    });
    toast.success("Taxi tier selected");
  };

  const handleConfirm = () => {
    setStage("confirmed");
    toast.success("Booking confirmed! Your flying taxi is on the way!");
  };

  const handleReset = () => {
    setBooking({
      start: null,
      destination: null,
      distance: null,
      selectedTier: null,
      price: null,
    });
    toast.info("Booking reset");
  };

  const handleNewBooking = () => {
    handleReset();
    setStage("booking");
  };

  if (stage === "hero") {
    return <Hero onGetStarted={() => setStage("booking")} />;
  }

  if (stage === "confirmed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
        <div className="max-w-2xl w-full text-center space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-success rounded-full mb-4">
            <CheckCircle2 className="w-12 h-12 text-success-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-white/90">
            Your flying taxi will arrive shortly at your pickup location.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 space-y-3 text-white">
            <div className="text-sm text-white/80">Flight Distance</div>
            <div className="text-2xl font-bold">{booking.distance?.toFixed(2)} km</div>
            <div className="text-sm text-white/80">Total Fare</div>
            <div className="text-3xl font-bold">₹{booking.price}</div>
          </div>
          <Button
            onClick={handleNewBooking}
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            Book Another Flight
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStage("hero")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              FlyCab
            </h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Bengaluru, Karnataka
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Select Route</h2>
              <TaxiMap
                onStartSelect={handleStartSelect}
                onDestinationSelect={handleDestinationSelect}
                start={booking.start}
                destination={booking.destination}
              />
            </section>

            {booking.start && booking.destination && (
              <section>
                <TierSelector
                  selectedTier={booking.selectedTier}
                  onSelectTier={handleTierSelect}
                />
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingSummary
                booking={booking}
                onConfirm={handleConfirm}
                onReset={handleReset}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
