/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { ConfigProvider, Form, Input, Select } from "antd";
import { FiGlobe, FiMapPin, FiPhone } from "react-icons/fi";
import img from "../../assets/images/login.png";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useGetAllCountriesQuery } from "../../redux/features/auth/authApi";

// Google Maps TypeScript declarations
declare global {
  interface Window {
    google: any;
  }
}

const STEPS = [
  { path: "/auth/signUp1", label: "Account" },
  { path: "/auth/signUp2", label: "Organization" },
  { path: "/auth/signUp3", label: "Compliance" },
  { path: "/auth/signUp4", label: "Board Member" },
  { path: "/auth/signUp5", label: "Payment" },
];

interface ICountry {
  name: string;
  countryCode: string;
  currency: string;
  stripeCurrency: string;
}

const SignUp2: React.FC = () => {
  const [active, setActive] = useState("Charity");
  const [selectedCountryCurrency, setSelectedCountryCurrency] = useState<
    string | null
  >(null);
  const [stateOptions, setStateOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const location = useLocation();
  const nevigate = useNavigate();
  const [form] = Form.useForm();
  const { isLoading, data, isFetching } = useGetAllCountriesQuery({});

  // ?? Is country loading or fetching:
  const isCountryLoading = isLoading || isFetching;

  const countries = (data?.data as ICountry[]) ?? [];
  const countryOptions =
    countries.map((item) => ({
      label: `${item.name} (${item.currency})`,
      value: item.countryCode,
    })) ?? [];

  // Google Maps API key - replace with your actual API key
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Handle state change to get postal code from Google Maps
  const handleStateChange = async (state: string) => {
    // console.log("State selected:", state);
    // console.log("Google Maps available:", !!window.google);

    if (!window.google) {
      console.error("Google Maps not loaded");
      return;
    }

    try {
      // Use Google Geocoding API to get postal code for the selected state/province
      const geocoder = new window.google.maps.Geocoder();

      // console.log("Geocoding state/province:", state);

      geocoder.geocode(
        {
          address: state,
          componentRestrictions: {}, // Remove country restriction to allow all countries
        },
        (results: any, status: any) => {
          // console.log("Geocoding status:", status);
          // console.log("Geocoding results:", results);

          if (
            status === window.google.maps.GeocoderStatus.OK &&
            results &&
            results.length > 0
          ) {
            // Extract postal code from the result
            const addressComponents = results[0].address_components;
            const postalCodeComponent = addressComponents.find(
              (component: any) => component.types.includes("postal_code"),
            );

            if (postalCodeComponent) {
              // Set the postal code in the form
              form.setFieldsValue({
                postalCode: postalCodeComponent.long_name,
              });
              // console.log("Postal code from Google:", postalCodeComponent.long_name);
            } else {
              // console.log("No postal code found for this state/province");
              // Don't set any postal code if not found
            }
          } else {
            // console.log("Geocoding failed, no postal code available");
          }
        },
      );
    } catch (error) {
      console.error("Error getting postal code:", error);
    }
  };

  // Initialize Google Autocomplete on the address field
  const initAutocomplete = () => {
    const inputElement = document.getElementById("organization_address_input");
    if (!inputElement || !window.google) return;

    try {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputElement,
        {
          types: ["address"],
        },
      );

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

        form.setFieldsValue({
          address: formattedAddress,
          state: state || undefined,
          postalCode: postalCode || undefined,
        });

        if (state) {
          setStateOptions([{ label: state, value: state }]);
        }
      });
    } catch (error) {
      console.error("Error initializing Google Autocomplete:", error);
    }
  };

  // Load Google Maps script and fetch states
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) {
        initAutocomplete();
        fetchStates();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        initAutocomplete();
        fetchStates();
      };
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  // Also try to initialize when DOM is ready in case window.google loaded early
  useEffect(() => {
    if (window.google) {
      initAutocomplete();
    }
  }, [form]);

  const fetchStates = async () => {
    setLoadingStates(true);
    try {
      // Don't load hardcoded states - rely on Google Maps API for suggestions
      setStateOptions([]);
    } catch (error) {
      console.error("Error initializing states:", error);
      setStateOptions([]);
    } finally {
      setLoadingStates(false);
    }
  };

  // Handle state search with Google Places
  const handleStateSearch = async (value: string) => {
    if (!value || !window.google) {
      return;
    }

    setLoadingStates(true);
    try {
      const service = new window.google.maps.places.AutocompleteService();

      service.getPlacePredictions(
        {
          input: value,
          types: ["(regions)"], // Remove country restriction to get all regions
          // Remove componentRestrictions to allow all countries
        },
        (predictions: any[], status: any) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            const options = predictions.map(
              (prediction: { description: string }) => ({
                label: prediction.description,
                value: prediction.description,
              }),
            );
            setStateOptions(options);
          }
          setLoadingStates(false);
        },
      );
    } catch (error) {
      console.error("Error searching states:", error);
      setLoadingStates(false);
    }
  };

  const total = STEPS.length;
  let currentIdx = STEPS.findIndex((s) => location.pathname.startsWith(s.path));
  if (currentIdx === -1) currentIdx = 0;
  const current = currentIdx + 1;
  const isLast = current >= total;
  const nextPath = !isLast
    ? STEPS[currentIdx + 1].path
    : STEPS[currentIdx].path;
  const onFinish = (values: any) => {
    // console.log("values:", values);
    localStorage.setItem("organization2", JSON.stringify(values));
    nevigate(nextPath, { state: values });
  };
  return (
    <div className="h-screen flex p-2">
      <img src={logo} alt="Logo" className="absolute top-5 left-10" />
      <div className="bg-white flex flex-col mt-24 items-center w-full md:w-1/2 relative">
        <div className="w-full max-w-md">
          <ConfigProvider
            theme={{
              components: {
                Form: { borderRadius: 0 },
                Input: { borderRadius: 5 },
              },
            }}
          >
            <Form
              name="contact"
              initialValues={{ remember: false }}
              onFinish={onFinish}
              layout="vertical"
              className=""
              form={form}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-familjen font-bold mb-3 text-black">
                  Organization Details
                </h2>
                <p className="text-neutral-500 text-base">
                  Tell us a little more about your organization.
                </p>

                {/* Segmented step progress (thin rounded segments) */}
                <Stepper total={total} current={current} />
              </div>

              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      controlHeight: 56,
                      borderRadius: 12,
                    },
                  },
                }}
              >
                <Form.Item
                  name="serviceType"
                  label={
                    <p className="text-base font-medium text-black/80">
                      Service Type
                    </p>
                  }
                >
                  <Select
                    placeholder="Service Type"
                    className="w-full"
                    value={active}
                    onChange={(value) => setActive(value)}
                    options={[
                      { label: "Charity", value: "charity" },
                      { label: "Mosque", value: "mosque" },
                      {
                        label: "Non profit Organization",
                        value: "non-profit",
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  name="address"
                  label={
                    <p className="text-base font-medium text-black/80">
                      Organization Address
                    </p>
                  }
                >
                  <Input
                    id="organization_address_input"
                    required
                    className="text-neutral-500"
                    prefix={<FiMapPin className="mr-3 h-5 w-5 text-black/80" />}
                    placeholder="Enter Organization Address"
                    style={{
                      padding: "8px",
                      borderRadius: "12px",
                      width: "100%",
                      height: "56px",
                    }}
                  />
                </Form.Item>

                <div className="grid grid-cols-2 gap-6">
                  <Form.Item
                    name="state"
                    label={
                      <p className="text-base font-medium text-black/80">
                        State
                      </p>
                    }
                  >
                    <Select
                      placeholder="Search or select a state..."
                      className="w-full"
                      showSearch
                      loading={loadingStates}
                      filterOption={false}
                      onSearch={handleStateSearch}
                      onChange={handleStateChange}
                      notFoundContent={
                        loadingStates ? "Loading..." : "No states found"
                      }
                      options={stateOptions}
                    />
                  </Form.Item>

                  <Form.Item
                    name="postalCode"
                    label={
                      <p className="text-base font-medium text-black/80">
                        Postal Code
                      </p>
                    }
                  >
                    <Input
                      placeholder="23907"
                      className="w-full"
                      style={{
                        padding: "8px",
                        borderRadius: "12px",
                        width: "100%",
                        height: "56px",
                      }}
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    name="country"
                    label={
                      <p className="text-base font-medium text-black/80">
                        Country
                      </p>
                    }
                  >
                    <Select
                      placeholder="Search or select a country..."
                      className="w-full"
                      showSearch
                      loading={isCountryLoading}
                      filterOption={(input, option) =>
                        String(option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      onChange={(countryCode: string) => {
                        const selected = countries.find(
                          (item) => item.countryCode === countryCode,
                        );
                        setSelectedCountryCurrency(
                          selected
                            ? `${selected.currency} (${selected.stripeCurrency})`
                            : null,
                        );
                      }}
                      notFoundContent={
                        isCountryLoading ? "Loading..." : "No countries found"
                      }
                      options={countryOptions}
                    />
                  </Form.Item>
                  {selectedCountryCurrency ? (
                    <p className="-mt-4 mb-4 text-sm text-neutral-500">
                      Donations will be processed in{" "}
                      <span className="font-medium text-black">
                        {selectedCountryCurrency}
                      </span>
                    </p>
                  ) : null}
                </div>

                <Form.Item
                  name="website"
                  label={
                    <p className="text-base font-medium text-black/80">
                      Organization Website
                    </p>
                  }
                >
                  <Input
                    required
                    className="text-neutral-500"
                    prefix={<FiGlobe className="mr-3 h-5 w-5 text-black/80" />}
                    placeholder="www.organisationwebsite.com"
                    style={{
                      padding: "8px",
                      borderRadius: "12px",
                      width: "100%",
                      height: "56px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="phoneNumber"
                  label={
                    <p className="text-base font-medium text-black/80">
                      Contact Phone Number
                    </p>
                  }
                >
                  <Input
                    required
                    type="tel"
                    className="text-neutral-500"
                    prefix={<FiPhone className="mr-3 h-5 w-5 text-black/80" />}
                    placeholder="+61 0 1234 5678"
                    style={{
                      padding: "8px",
                      borderRadius: "12px",
                      width: "100%",
                      height: "56px",
                    }}
                  />
                </Form.Item>

                <Form.Item>
                  {!isLast ? (
                    <button className="bg-btnPrimary w-full py-4 rounded-xl text-lg font-semibold text-black">
                      Save &amp; Continue
                    </button>
                  ) : (
                    <button
                      className="bg-btnPrimary w-full py-4 rounded-xl text-lg font-semibold text-black"
                      type="submit"
                    >
                      Finish
                    </button>
                  )}
                </Form.Item>
              </ConfigProvider>
            </Form>
          </ConfigProvider>
        </div>
      </div>

      {/* Right section - Image */}
      <div className="w-full md:w-1/2">
        <img
          src={img}
          alt="sign-up"
          className="w-full h-full object-cover rounded-r-2xl"
        />
      </div>
    </div>
  );
};

/** Reusable thin segmented progress bar (same look as step 1) */
function Stepper({ total, current }: { total: number; current: number }) {
  const segments = Array.from({ length: total });

  return (
    <div
      className="flex items-center gap-2 w-2/5 mx-auto mt-4"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Onboarding progress: Step ${current} of ${total}`}
    >
      {segments.map((_, i) => {
        const isActive = i < current; // fill all segments up to current
        return (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-200 ${
              isActive ? "bg-[#a55eea]" : "bg-neutral-200"
            }`}
          />
        );
      })}
    </div>
  );
}

export default SignUp2;
