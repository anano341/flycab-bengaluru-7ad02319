import { TAXI_TIERS, TaxiTier } from "@/types/taxi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import basicTaxi from "@/assets/taxi-basic.png";
import comfortTaxi from "@/assets/taxi-comfort.png";
import premiumTaxi from "@/assets/taxi-premium.png";
import emergencyTaxi from "@/assets/taxi-emergency.png";

interface TierSelectorProps {
  selectedTier: TaxiTier | null;
  onSelectTier: (tier: TaxiTier) => void;
}

const tierImages = {
  basic: basicTaxi,
  comfort: comfortTaxi,
  premium: premiumTaxi,
  emergency: emergencyTaxi,
};

export const TierSelector = ({ selectedTier, onSelectTier }: TierSelectorProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold mb-2">Choose Your Ride</h3>
        <p className="text-muted-foreground">
          Select from our range of autonomous flying taxis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TAXI_TIERS.map((tier, index) => {
          const isSelected = selectedTier === tier.id;
          return (
            <Card
              key={tier.id}
              className={cn(
                "cursor-pointer transition-all duration-300 hover:shadow-glow overflow-hidden group animate-slide-up",
                isSelected && "ring-2 ring-primary shadow-glow scale-105"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onSelectTier(tier.id)}
            >
              {/* Image section */}
              <div className="relative h-48 bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                <img
                  src={tierImages[tier.id]}
                  alt={tier.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
                {isSelected && (
                  <div className="absolute top-4 right-4 z-20 bg-primary text-primary-foreground rounded-full p-2 animate-scale-in">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <span className="text-2xl">{tier.icon}</span>
                      {tier.name}
                    </CardTitle>
                    <CardDescription className="mt-1">{tier.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/50 rounded-lg p-3 backdrop-blur-sm hover:bg-muted transition-colors">
                      <div className="text-xs text-muted-foreground mb-1">Cost per km</div>
                      <div className="text-lg font-bold text-primary">₹{tier.costPerKm}</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 backdrop-blur-sm hover:bg-muted transition-colors">
                      <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Max Speed
                      </div>
                      <div className="text-lg font-bold">{tier.maxSpeed} km/h</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <ul className="space-y-2">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
