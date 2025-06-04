"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface Event {
  id: string;
  name: string;
  city: string;
  country: string;
  location: { latitude: string | null; longitude: string | null };
  image: string;
}

export default function EventMap({
  events,
  onEventSelect,
}: {
  events: Event[];
  onEventSelect: (event: Event) => void;
}) {
  const defaultCenter: [number, number] = [52.2297, 21.0122]; // Warsaw, Poland

  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer
      center={defaultCenter}
      zoom={6}
      scrollWheelZoom={true}
      style={{ height: "600px", width: "100%", borderRadius: "1rem" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      {events.map(
        (event) =>
          event.location.latitude &&
          event.location.longitude && (
            <Marker
              key={event.id}
              icon={markerIcon}
              position={[+event.location.latitude, +event.location.longitude]}
              eventHandlers={{ click: () => onEventSelect(event) }}
            >
              <Popup>{event.name}</Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
}
