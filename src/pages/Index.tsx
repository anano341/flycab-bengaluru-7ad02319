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
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-success rounded-full mb-4 animate-scale-in shadow-glow">
            <CheckCircle2 className="w-16 h-16 text-success-foreground animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white animate-slide-up">
            Booking Confirmed!
          </h1>
          <p className="text-xl md:text-2xl text-white/90 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Your flying taxi will arrive shortly at your pickup location.
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-4 text-white animate-slide-up hover:bg-white/15 transition-colors" style={{ animationDelay: "0.2s" }}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-white/70 mb-2">Flight Distance</div>
                <div className="text-3xl font-bold">{booking.distance?.toFixed(2)} km</div>
              </div>
              <div>
                <div className="text-sm text-white/70 mb-2">Total Fare</div>
                <div className="text-3xl font-bold">₹{booking.price}</div>
              </div>
            </div>
          </div>
          <Button
            onClick={handleNewBooking}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg hover:scale-105 transition-transform animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            Book Another Flight
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-10 shadow-sm animate-slide-down">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStage("hero")}
              className="hover:scale-105 transition-transform"
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
              <h2 className="text-2xl font-bold mb-4 animate-fade-in">Select Route</h2>
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
