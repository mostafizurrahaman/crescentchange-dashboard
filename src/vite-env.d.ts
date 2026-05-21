/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (input: HTMLInputElement, options?: google.maps.places.AutocompleteOptions) => google.maps.places.Autocomplete;
          AutocompleteOptions: {
            types?: string[];
            fields?: string[];
            componentRestrictions?: {
              country?: string | string[];
            };
          };
          AutocompleteSessionToken: new () => google.maps.places.AutocompleteSessionToken;
        };
        Geocoder: new () => google.maps.Geocoder;
        GeocoderStatus: {
          OK: string;
          ZERO_RESULTS: string;
          OVER_QUERY_LIMIT: string;
          REQUEST_DENIED: string;
          INVALID_REQUEST: string;
          UNKNOWN_ERROR: string;
        };
        event: {
          addListener(
            instance: any,
            eventName: string,
            handler: (...args: any[]) => void
          ): google.maps.MapsEventListener;
          clearInstanceListeners(instance: any): void;
        };
      };
    };
  }
}

export {};
