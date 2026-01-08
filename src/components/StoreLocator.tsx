"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef } from "react";

export type StoreLocatorLocation = {
  title: string;
  address1?: string;
  address2?: string;
  coords: { lat: number; lng: number };
  placeId?: string;
};

export type StoreLocatorConfig = {
  locations: StoreLocatorLocation[];
  mapId?: string;
  mapsApiKey: string;
};

type Props = {
  mapsApiKey?: string;
  mapId?: string;
  locations: StoreLocatorLocation[];
  className?: string;
  solutionChannel?: string;
};

const EXTENDED_COMPONENT_LIB_SRC =
  "https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js";

export function StoreLocator({
  mapsApiKey,
  mapId,
  locations,
  className,
  solutionChannel = "GMP_QB_locatorplus_v11_cABD",
}: Props) {
  const loaderRef = useRef<HTMLElement | null>(null);
  const locatorRef = useRef<HTMLElement | null>(null);

  const configuration = useMemo(() => {
    const fallbackCenter = { lat: 38.0, lng: -100.0 };
    const center = locations[0]?.coords ?? fallbackCenter;
    const zoom = locations.length === 1 ? 15 : 4;

    return {
      locations,
      mapOptions: {
        center,
        fullscreenControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        zoom,
        zoomControl: true,
        maxZoom: 17,
        mapId: mapId ?? "",
      },
      mapsApiKey: mapsApiKey ?? "",
      capabilities: {
        input: true,
        autocomplete: true,
        directions: false,
        distanceMatrix: true,
        details: false,
        actions: false,
      },
    };
  }, [locations, mapId, mapsApiKey]);

  useEffect(() => {
    if (!mapsApiKey) return;
    if (!loaderRef.current || !locatorRef.current) return;
    if (typeof window === "undefined") return;

    loaderRef.current.setAttribute("key", mapsApiKey);

    const locator = locatorRef.current as any;
    let cancelled = false;

    const run = async () => {
      try {
        await customElements.whenDefined("gmpx-store-locator");
        if (cancelled) return;
        locator.configureFromQuickBuilder(configuration);
      } catch {
        // If the script hasn't loaded yet, the effect will re-run on the next render.
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [configuration, mapsApiKey]);

  if (!mapsApiKey) {
    return (
      <div className={className}>
        <p className="text-xs text-text-secondary">
          Map is unavailable: set <span className="font-medium text-text-primary">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</span>.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <Script type="module" src={EXTENDED_COMPONENT_LIB_SRC} strategy="afterInteractive" />

      {/* @ts-expect-error - gmpx-api-loader is a custom web component */}
      <gmpx-api-loader ref={loaderRef} solution-channel={solutionChannel} />

      {/* @ts-expect-error - gmpx-store-locator is a custom web component */}
      <gmpx-store-locator
        ref={locatorRef}
        map-id={mapId ?? ""}
        style={{
          width: "100%",
          height: "100%",
          // Theme mapping (no hard-coded new colors)
          ["--gmpx-color-surface" as any]: "var(--card-bg)",
          ["--gmpx-color-on-surface" as any]: "var(--text)",
          ["--gmpx-color-on-surface-variant" as any]: "var(--text-secondary)",
          ["--gmpx-color-outline" as any]: "var(--border)",
          ["--gmpx-color-primary" as any]: "hsl(var(--accent))",
          ["--gmpx-font-family-base" as any]: "var(--font-inter)",
          ["--gmpx-font-family-headings" as any]: "var(--font-space)",
        }}
      />
    </div>
  );
}
