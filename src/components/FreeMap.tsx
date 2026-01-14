"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { MapLocation } from "./MapContent";

export type { MapLocation };

type Props = {
  locations: MapLocation[];
  className?: string;
  zoom?: number;
};

// Dynamically import the map to avoid SSR issues with Leaflet
const MapContent = dynamic(
  () => import("./MapContent").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-surface/50">
        <div className="text-sm text-text-secondary">Loading map...</div>
      </div>
    ),
  }
);

export function FreeMap({ locations, className, zoom = 15 }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame to avoid synchronous setState warning
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isMounted) {
    return (
      <div className={className}>
        <div className="flex h-full w-full items-center justify-center bg-surface/50">
          <div className="text-sm text-text-secondary">Loading map...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <MapContent locations={locations} zoom={zoom} />
    </div>
  );
}
