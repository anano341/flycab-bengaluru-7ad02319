import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BANGALORE_BOUNDS } from "@/types/taxi";
import { Location } from "@/types/taxi";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface TaxiMapProps {
  onStartSelect: (location: Location) => void;
  onDestinationSelect: (location: Location) => void;
  start: Location | null;
  destination: Location | null;
}

export const TaxiMap = ({
  onStartSelect,
  onDestinationSelect,
  start,
  destination,
}: TaxiMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const startMarkerRef = useRef<L.Marker | null>(null);
  const destMarkerRef = useRef<L.Marker | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);

  const [selectingStart, setSelectingStart] = useState(false);
  const [selectingDestination, setSelectingDestination] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(BANGALORE_BOUNDS.center, 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Set max bounds to Bengaluru
    map.setMaxBounds(BANGALORE_BOUNDS.bounds);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle map clicks
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const location = { lat: e.latlng.lat, lng: e.latlng.lng };

      if (selectingStart) {
        onStartSelect(location);
        setSelectingStart(false);
        toast.success("Pickup location selected");
      } else if (selectingDestination) {
        onDestinationSelect(location);
        setSelectingDestination(false);
        toast.success("Destination selected");
      }
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [selectingStart, selectingDestination, onStartSelect, onDestinationSelect]);

  // Update markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Update start marker
    if (start) {
      if (startMarkerRef.current) {
        startMarkerRef.current.setLatLng([start.lat, start.lng]);
      } else {
        const icon = L.divIcon({
          html: '<div style="background-color: #3b82f6; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">📍</div>',
          className: "",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });
        startMarkerRef.current = L.marker([start.lat, start.lng], { icon })
          .addTo(map)
          .bindPopup("Pickup Location");
      }
    } else if (startMarkerRef.current) {
      map.removeLayer(startMarkerRef.current);
      startMarkerRef.current = null;
    }

    // Update destination marker
    if (destination) {
      if (destMarkerRef.current) {
        destMarkerRef.current.setLatLng([destination.lat, destination.lng]);
      } else {
        const icon = L.divIcon({
          html: '<div style="background-color: #06b6d4; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">🎯</div>',
          className: "",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });
        destMarkerRef.current = L.marker([destination.lat, destination.lng], { icon })
          .addTo(map)
          .bindPopup("Destination");
      }
    } else if (destMarkerRef.current) {
      map.removeLayer(destMarkerRef.current);
      destMarkerRef.current = null;
    }

    // Draw route line
    if (start && destination) {
      if (routeLineRef.current) {
        map.removeLayer(routeLineRef.current);
      }
      routeLineRef.current = L.polyline(
        [
          [start.lat, start.lng],
          [destination.lat, destination.lng],
        ],
        {
          color: "#3b82f6",
          weight: 4,
          opacity: 0.7,
          dashArray: "10, 10",
        }
      ).addTo(map);

      // Fit bounds to show both markers
      map.fitBounds([
        [start.lat, start.lng],
        [destination.lat, destination.lng],
      ], { padding: [50, 50] });
    } else if (routeLineRef.current) {
      map.removeLayer(routeLineRef.current);
      routeLineRef.current = null;
    }
  }, [start, destination]);

  // Update cursor style
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const container = map.getContainer();
    if (selectingStart || selectingDestination) {
      container.style.cursor = "crosshair";
    } else {
      container.style.cursor = "";
    }
  }, [selectingStart, selectingDestination]);

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <Button
          onClick={() => {
            setSelectingStart(true);
            setSelectingDestination(false);
            toast.info("Click on the map to select pickup location");
          }}
          variant={selectingStart ? "default" : "outline"}
          className="flex-1"
        >
          <MapPin className="w-4 h-4 mr-2" />
          {start ? "Change Pickup" : "Select Pickup"}
        </Button>
        <Button
          onClick={() => {
            setSelectingDestination(true);
            setSelectingStart(false);
            toast.info("Click on the map to select destination");
          }}
          variant={selectingDestination ? "default" : "outline"}
          className="flex-1"
          disabled={!start}
        >
          <Navigation className="w-4 h-4 mr-2" />
          {destination ? "Change Destination" : "Select Destination"}
        </Button>
      </div>

      <div
        ref={mapRef}
        className="w-full h-[500px] rounded-lg border-2 border-border shadow-card overflow-hidden"
      />

      {(selectingStart || selectingDestination) && (
        <p className="text-sm text-muted-foreground text-center">
          Click anywhere on the map to set your{" "}
          {selectingStart ? "pickup location" : "destination"}
        </p>
      )}
    </div>
  );
};
