/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Select } from "antd";
import { FiGlobe, FiMapPin, FiPhone, FiArrowLeft } from "react-icons/fi";
import { useGetAllCountriesQuery } from "../../../redux/features/auth/authApi";
import Stepper from "../Stepper";
import { ISignUpFormValues } from "./types";

// Google Maps TypeScript declarations
declare global {
  interface Window {
    google: any;
  }
}

interface ICountry {
  name: string;
  countryCode: string;
  currency: string;
  stripeCurrency: string;
}

interface Step2OrganizationProps {
  totalSteps: number;
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2Organization: React.FC<Step2OrganizationProps> = ({
  totalSteps,
  currentStep,
  onNext,
  onPrev,
}) => {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ISignUpFormValues>();

  const selectedCountry = watch("country");
  const [selectedCountryCurrency, setSelectedCountryCurrency] = useState<string | null>(null);
  const [stateOptions, setStateOptions] = useState<{ label: string; value: string }[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);

  const { isLoading, data, isFetching } = useGetAllCountriesQuery({});
  const isCountryLoading = isLoading || isFetching;

  const countries = (data?.data as ICountry[]) ?? [];
  const countryOptions =
    countries.map((item) => ({
      label: `${item.name} (${item.currency})`,
      value: item.countryCode,
    })) ?? [];

  // Update selected currency display when country changes or is already selected
  useEffect(() => {
    if (selectedCountry && countries.length > 0) {
      const selected = countries.find((item) => item.countryCode === selectedCountry);
      if (selected) {
        setSelectedCountryCurrency(`${selected.currency} (${selected.stripeCurrency})`);
      }
    }
  }, [selectedCountry, countries]);

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Handle state change to get postal code from Google Maps
  const handleStateChange = async (state: string) => {
    if (!window.google) return;

    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        {
          address: state,
          componentRestrictions: {},
        },
        (results: any, status: any) => {
          if (
            status === window.google.maps.GeocoderStatus.OK &&
            results &&
            results.length > 0
          ) {
            const addressComponents = results[0].address_components;
            const postalCodeComponent = addressComponents.find((component: any) =>
              component.types.includes("postal_code")
            );

            if (postalCodeComponent) {
              setValue("postalCode", postalCodeComponent.long_name, {
                shouldValidate: true,
              });
            }
          }
        }
      );
    } catch (error) {
      console.error("Error getting postal code:", error);
    }
  };

  // Initialize Google Autocomplete on the address field
  const initAutocomplete = () => {
    const inputElement = document.getElementById("organization_address_input") as HTMLInputElement;
    if (!inputElement || !window.google) return;

    try {
      const autocomplete = new window.google.maps.places.Autocomplete(inputElement, {
        types: ["address"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place || !place.address_components) return;

        let streetNumber = "";
        let route = "";
        let state = "";
        let postalCode = "";

        for (const component of place.address_components) {
          const types = component.types;
          if (types.includes("street_number")) {
            streetNumber = component.long_name;
          }
          if (types.includes("route")) {
            route = component.long_name;
          }
          if (types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
          if (types.includes("postal_code")) {
            postalCode = component.long_name;
          }
        }

        const formattedAddress =
          place.formatted_address || `${streetNumber} ${route}`.trim();

        setValue("address", formattedAddress, { shouldValidate: true });
        if (state) {
          setValue("state", state, { shouldValidate: true });
          setStateOptions([{ label: state, value: state }]);
        }
        if (postalCode) {
          setValue("postalCode", postalCode, { shouldValidate: true });
        }
      });
    } catch (error) {
      console.error("Error initializing Google Autocomplete:", error);
    }
  };

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) {
        initAutocomplete();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        initAutocomplete();
      };
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (window.google) {
      initAutocomplete();
    }
  }, []);

  // Handle state search with Google Places
  const handleStateSearch = async (value: string) => {
    if (!value || !window.google) return;

    setLoadingStates(true);
    try {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {
          input: value,
          types: ["(regions)"],
        },
        (predictions: any[], status: any) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            const options = predictions.map((prediction: { description: string }) => ({
              label: prediction.description,
              value: prediction.description,
            }));
            setStateOptions(options);
          }
          setLoadingStates(false);
        }
      );
    } catch (error) {
      console.error("Error searching states:", error);
      setLoadingStates(false);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-familjen font-bold mb-3 text-black">
          Organization Details
        </h2>
        <p className="text-neutral-500 text-base mb-2">
          Tell us a little more about your organization.
        </p>
        <Stepper total={totalSteps} current={currentStep} />
      </div>

      <div className="space-y-4">
        {/* Service Type */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Service Type
          </label>
          <Controller
            name="serviceType"
            control={control}
            rules={{ required: "Please select service type" }}
            defaultValue="charity"
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select Service Type"
                className="w-full h-14"
                style={{ height: "56px" }}
                options={[
                  { label: "Charity", value: "charity" },
                  { label: "Mosque", value: "mosque" },
                  { label: "Non profit Organization", value: "non-profit" },
                ]}
              />
            )}
          />
          {errors.serviceType && (
            <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Organization Address
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 z-10 text-neutral-500">
              <FiMapPin className="h-5 w-5" />
            </span>
            <input
              id="organization_address_input"
              type="text"
              {...register("address", {
                required: "Address is required",
              })}
              placeholder="Enter Organization Address"
              className={`w-full h-14 pl-12 pr-4 bg-white border ${
                errors.address ? "border-red-500" : "border-neutral-200"
              } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
            />
          </div>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            State
          </label>
          <Controller
            name="state"
            control={control}
            rules={{ required: "State is required" }}
            render={({ field }) => (
              <Select
                showSearch
                placeholder="Search state..."
                className="w-full h-14"
                style={{ height: "56px" }}
                loading={loadingStates}
                filterOption={false}
                onSearch={handleStateSearch}
                value={field.value || undefined}
                onChange={(val) => {
                  field.onChange(val);
                  handleStateChange(val);
                }}
                notFoundContent={loadingStates ? "Loading..." : "No states found"}
                options={stateOptions}
              />
            )}
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Postal Code
          </label>
          <input
            type="text"
            {...register("postalCode", {
              required: "Postal code is required",
            })}
            placeholder="23907"
            className={`w-full h-14 px-4 bg-white border ${
              errors.postalCode ? "border-red-500" : "border-neutral-200"
            } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Country
          </label>
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <Select
                showSearch
                placeholder="Search or select country..."
                className="w-full h-14"
                style={{ height: "56px" }}
                loading={isCountryLoading}
                filterOption={(input, option) =>
                  String(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                value={field.value || undefined}
                onChange={(val) => {
                  field.onChange(val);
                  const selected = countries.find((item) => item.countryCode === val);
                  setSelectedCountryCurrency(
                    selected ? `${selected.currency} (${selected.stripeCurrency})` : null
                  );
                }}
                notFoundContent={isCountryLoading ? "Loading..." : "No countries found"}
                options={countryOptions}
              />
            )}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
          )}
          {selectedCountryCurrency && (
            <p className="mt-1 text-sm text-neutral-500">
              Donations will be processed in{" "}
              <span className="font-medium text-black">{selectedCountryCurrency}</span>
            </p>
          )}
        </div>

        {/* Website */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Organization Website
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 z-10 text-neutral-500">
              <FiGlobe className="h-5 w-5" />
            </span>
            <input
              type="text"
              {...register("website", {
                required: "Website is required",
              })}
              placeholder="www.organisationwebsite.com"
              className={`w-full h-14 pl-12 pr-4 bg-white border ${
                errors.website ? "border-red-500" : "border-neutral-200"
              } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
            />
          </div>
          {errors.website && (
            <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
          )}
        </div>

        {/* Contact Phone Number */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Contact Phone Number
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 z-10 text-neutral-500">
              <FiPhone className="h-5 w-5" />
            </span>
            <input
              type="tel"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[0-9\s\-()]+$/,
                  message: "Phone number cannot contain letters or special characters",
                },
                validate: (val) => {
                  const digits = (val || "").replace(/\D/g, "");
                  if (!digits || digits.length < 7) {
                    return "Please enter a valid phone number (at least 7 digits)";
                  }
                  if (digits.length > 15) {
                    return "Phone number is too long (maximum 15 digits)";
                  }
                  return true;
                },
              })}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/[^0-9+\s\-()]/g, "");
              }}
              placeholder="+61 0 1234 5678"
              className={`w-full h-14 pl-12 pr-4 bg-white border ${
                errors.phoneNumber ? "border-red-500" : "border-neutral-200"
              } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex gap-3">
          <button
            type="button"
            onClick={onPrev}
            className="w-1/3 py-4 border border-neutral-300 rounded-xl text-lg font-semibold text-neutral-700 hover:bg-neutral-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <FiArrowLeft className="h-5 w-5" /> Back
          </button>
          <button
            type="button"
            onClick={onNext}
            className="w-2/3 bg-btnPrimary py-4 rounded-xl text-lg font-semibold text-black hover:opacity-95 active:scale-[0.99] transition-all"
          >
            Save &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2Organization;
