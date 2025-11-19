import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm mb-8 animate-fade-in">
          <Plane className="w-4 h-4" />
          <span>Launching in Bengaluru</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in-up">
          FlyCab
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-4 animate-fade-in-up delay-200">
          The Future of Urban Mobility
        </p>

        <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto animate-fade-in-up delay-300">
          Experience autonomous flying taxis across Bengaluru. Skip traffic, save time, and travel in style.
        </p>

        <Button
          onClick={onGetStarted}
          size="lg"
          className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto shadow-glow animate-fade-in-up delay-500"
        >
          Book Your Flight
        </Button>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-white animate-fade-in-up delay-700">
          <div>
            <div className="text-3xl font-bold">4</div>
            <div className="text-sm text-white/80">Taxi Tiers</div>
          </div>
          <div>
            <div className="text-3xl font-bold">150</div>
            <div className="text-sm text-white/80">km/h Max Speed</div>
          </div>
          <div>
            <div className="text-3xl font-bold">100%</div>
            <div className="text-sm text-white/80">Autonomous</div>
          </div>
          <div>
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-sm text-white/80">Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};
