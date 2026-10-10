"use client"
import { useEffect, useRef, useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";

export interface AddressValue {
  address: string;
  city: string;
  province: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

interface AddressAutocompleteProps {
  value?: string;
  onChange?: (value: AddressValue | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const AddressAutocomplete = ({
  value = "",
  onChange,
  placeholder = "Location",
  className = "",
  disabled = false,
}: AddressAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [isFocused, setIsFocused] = useState(false);

  const serviceRef = useRef<google.maps.places.AutocompleteService | null>(
    null,
  );

  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null,
  );

  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.google?.maps?.places) {
      return console.log("Google Api not initialized");
    }

    serviceRef.current = new google.maps.places.AutocompleteService();

    if (mapRef.current) {
      placesServiceRef.current = new google.maps.places.PlacesService(
        mapRef.current,
      );
    }
  }, []);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (text: string) => {
    console.log(text)
    setInputValue(text);

    if (!text.trim()) {
      setSuggestions([]);
      onChange?.(null);
      return;
    }

    if (!serviceRef.current) return;

    serviceRef.current.getPlacePredictions(
      {
        input: text,
        types: ["address"],
      },
      (predictions, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
      },
    );
  };

  const handleSelect = (
    prediction: google.maps.places.AutocompletePrediction,
  ) => {
    if (!placesServiceRef.current) return;

    placesServiceRef.current.getDetails(
      {
        placeId: prediction.place_id,
        fields: ["formatted_address", "address_components", "geometry"],
      },
      (place, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !place) {
          return;
        }

        const components = place.address_components ?? [];

        const getComponent = (type: string) =>
          components.find((component) => component.types.includes(type))
            ?.long_name ?? "";

        const addressValue: AddressValue = {
          address: place.formatted_address ?? prediction.description,
          city:
            getComponent("locality") ||
            getComponent("administrative_area_level_2"),
          province: getComponent("administrative_area_level_1"),
          country: getComponent("country"),
          latitude: place.geometry?.location?.lat(),
          longitude: place.geometry?.location?.lng(),
        };

        setInputValue(addressValue.address);
        setSuggestions([]);
        onChange?.(addressValue);
      },
    );
  };

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="hidden" />

      <MdOutlineLocationOn className="absolute left-0 top-1/2 z-10 -translate-y-1/2 text-ink-soft" />

      <input
        value={inputValue}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          // Give the suggestion click time to fire.
          setTimeout(() => setIsFocused(false), 150);
        }}
        onChange={(event) => handleInputChange(event.target.value)}
        className="w-full border-none bg-transparent pl-6 outline-none"
      />

      {isFocused && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.place_id}
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
                handleSelect(suggestion);
              }}
              className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-black/3"
            >
              <MdOutlineLocationOn className="mt-0.5 shrink-0 text-ink-soft" />

              <span className="text-sm text-ink">{suggestion.description}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;
