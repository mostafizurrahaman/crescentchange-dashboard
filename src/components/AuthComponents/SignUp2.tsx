/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { ConfigProvider, Form, Input, Select } from "antd";
import { FiGlobe, FiMapPin, FiPhone } from "react-icons/fi";
import img from "../../assets/images/login.png";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

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

const SignUp2: React.FC = () => {
  const [active, setActive] = useState("Charity");
  const [stateOptions, setStateOptions] = useState<{label: string, value: string}[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const location = useLocation();
  const nevigate = useNavigate();

  // Google Maps API key - replace with your actual API key
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ;
  // console.log("Google Maps API Key:", GOOGLE_MAPS_API_KEY); 

  // Load Google Maps script and fetch states
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) {
        fetchStates();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        fetchStates();
      };
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  const fetchStates = async () => {
    setLoadingStates(true);
    try {
      // Get US states using Google Places Autocomplete
      const service = new window.google.maps.places.AutocompleteService();
      
      // Common US states for autocomplete
      const states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
        "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
        "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
        "New Hampshire", "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
        "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
        "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
        "West Virginia", "Wisconsin", "Wyoming"
      ];

      const options = states.map(state => ({
        label: state,
        value: state
      }));

      setStateOptions(options);
    } catch (error) {
      console.error('Error fetching states:', error);
      // Fallback to basic state list
      const fallbackStates = [
        { label: "New York", value: "New York" },
        { label: "California", value: "California" },
        { label: "Texas", value: "Texas" },
        { label: "Florida", value: "Florida" },
        { label: "Illinois", value: "Illinois" }
      ];
      setStateOptions(fallbackStates);
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
      
      service.getPlacePredictions({
        input: value,
        types: ['(regions)'],
        componentRestrictions: { country: 'us' }
      }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          const options = predictions
            .filter(prediction => prediction.types.includes('administrative_area_level_1'))
            .map(prediction => ({
              label: prediction.description.split(',')[0],
              value: prediction.description.split(',')[0]
            }));
          setStateOptions(options);
        }
        setLoadingStates(false);
      });
    } catch (error) {
      console.error('Error searching states:', error);
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
                  label={<p className="text-base font-medium text-black/80">Service Type</p>}
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
                  label={<p className="text-base font-medium text-black/80">Organisation Address</p>}
                >
                  <Input
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
                    label={<p className="text-base font-medium text-black/80">State</p>}
                  >
                    <Select
                      placeholder="Search or select a state..."
                      className="w-full"
                      showSearch
                      loading={loadingStates}
                      filterOption={false}
                      onSearch={handleStateSearch}
                      notFoundContent={loadingStates ? "Loading..." : "No states found"}
                      options={stateOptions}
                    />
                  </Form.Item>

                  <Form.Item
                    name="postalCode"
                    label={<p className="text-base font-medium text-black/80">Postal Code</p>}
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
                  label={<p className="text-base font-medium text-black/80">Contact Phone Number</p>}
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
