import { TAXI_TIERS, TaxiTier } from "@/types/taxi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TierSelectorProps {
  selectedTier: TaxiTier | null;
  onSelectTier: (tier: TaxiTier) => void;
}

export const TierSelector = ({ selectedTier, onSelectTier }: TierSelectorProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold mb-2">Choose Your Ride</h3>
        <p className="text-muted-foreground text-sm">
          Select from our range of autonomous flying taxis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TAXI_TIERS.map((tier) => {
          const isSelected = selectedTier === tier.id;
          return (
            <Card
              key={tier.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-glow",
                isSelected && "ring-2 ring-primary shadow-glow"
              )}
              onClick={() => onSelectTier(tier.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{tier.icon}</span>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {tier.name}
                        {isSelected && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Cost per km</span>
                    <Badge variant="secondary" className="font-semibold">
                      ₹{tier.costPerKm}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Max Speed</span>
                    <Badge variant="outline">{tier.maxSpeed} km/h</Badge>
                  </div>
                  <div className="pt-2 border-t">
                    <ul className="space-y-1">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {feature}
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
