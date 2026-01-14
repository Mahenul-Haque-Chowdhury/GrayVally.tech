"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type MapLocation = {
  title: string;
  address1?: string;
  address2?: string;
  coords: { lat: number; lng: number };
};

// Fix for default marker icon in Leaflet with Next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type Props = {
  locations: MapLocation[];
  zoom?: number;
};

export default function MapContent({ locations, zoom = 15 }: Props) {
  const center = locations[0]?.coords ?? { lat: 23.8103, lng: 90.4125 };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-full w-full rounded-lg"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.coords.lat, location.coords.lng]}
          icon={customIcon}
        >
          <Popup>
            <div className="text-sm">
              <strong className="block text-gray-900">{location.title}</strong>
              {location.address1 && (
                <span className="block text-gray-600">{location.address1}</span>
              )}
              {location.address2 && (
                <span className="block text-gray-600">{location.address2}</span>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
