import { Button } from "@/components/ui/button";
import { Plane, Zap, Shield, Clock } from "lucide-react";
import heroImage from "@/assets/hero-flight.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/80" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm mb-8 animate-slide-up hover:bg-white/20 transition-all duration-300 hover:scale-105">
          <Plane className="w-4 h-4" />
          <span className="font-medium">Launching in Bengaluru</span>
        </div>

        {/* Main heading */}
        <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 animate-slide-up tracking-tight" style={{ animationDelay: "0.1s" }}>
          FlyCab
        </h1>

        {/* Subheading */}
        <p className="text-2xl md:text-4xl text-white/95 mb-4 animate-slide-up font-semibold" style={{ animationDelay: "0.2s" }}>
          The Future of Urban Mobility
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.3s" }}>
          Experience autonomous flying taxis across Bengaluru. Skip traffic, save time, and travel in style with our cutting-edge VTOL technology.
        </p>

        {/* CTA Button */}
        <Button
          onClick={onGetStarted}
          size="lg"
          className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-7 h-auto shadow-2xl animate-slide-up font-semibold hover:scale-105 transition-transform duration-300"
          style={{ animationDelay: "0.4s" }}
        >
          <Plane className="w-5 h-5 mr-2" />
          Book Your Flight
        </Button>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <div className="group cursor-pointer">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-glow">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-white/30 transition-colors">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">150</div>
              <div className="text-sm text-white/80">km/h Max Speed</div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-glow">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-white/30 transition-colors">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-white/80">Autonomous</div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-glow">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-white/30 transition-colors">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-white/80">Available</div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-glow">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-white/30 transition-colors">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">4</div>
              <div className="text-sm text-white/80">Taxi Tiers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
