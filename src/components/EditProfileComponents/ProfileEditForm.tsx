/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Button,
  message,
  Switch,
  Select,
} from "antd";
import {
  FiCalendar,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { useEditOrgDetailsMutation } from "../../redux/features/profileApi/profileApi";
import { useGetAllCountriesQuery } from "../../redux/features/auth/authApi";
import { resolveCurrencyDisplay } from "../../utils/currency";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

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

const normalizeCountryCode = (
  country?: string | null,
  countries: ICountry[] = [],
): string => {
  if (!country) return "";
  const trimmed = country.trim();
  const upper = trimmed.toUpperCase();
  const byCode = countries.find((item) => item.countryCode.toUpperCase() === upper);
  if (byCode) return byCode.countryCode;
  const byName = countries.find((item) => item.name.toUpperCase() === upper);
  if (byName) return byName.countryCode;
  return upper.length === 2 ? upper : trimmed;
};

type FieldType = {
  "organisation-name"?: string;
  "organisation-address"?: string;
  suburb?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  website?: string;
  telephone?: string;
  "email-address"?: string;
  username?: string;
  password?: string;
  remember?: string;
  name?: string;
  "abn/tfn"?: string;
  "name-on-card"?: string;
  "card-number"?: string;
  "expiry-date"?: string;
  cvv?: string;
  "mission-statement"?: string;
  "date-of-established"?: any;
  lines?: number;
  about?: string;
};

const ProfileEditForm = ({ data }: { data: any }) => {
  const [editOrgDetails, { isLoading }] = useEditOrgDetailsMutation();
  const [form] = Form.useForm<FieldType>();
  const [loadingStates, setLoadingStates] = useState(false);
  const [stateOptions, setStateOptions] = useState<{ label: string, value: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const addressAutocompleteRef = useRef<any>(null);
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { data: countriesData, isLoading: isCountryLoading } =
    useGetAllCountriesQuery({});
  const countries = (countriesData?.data as ICountry[]) ?? [];
  const countryOptions = countries.map((item) => ({
    label: `${item.name} (${item.currency})`,
    value: item.countryCode,
  }));
  const settlementCurrency = resolveCurrencyDisplay(
    countries.find(
      (item) =>
        item.countryCode === data?.country ||
        item.name?.toUpperCase() === String(data?.country ?? "").toUpperCase(),
    )?.currency,
    data,
  );

  const getCountryCode = (country?: string): string | undefined => {
    const code = normalizeCountryCode(country, countries);
    return code || undefined;
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);

    form.setFieldsValue({
      state: "",
      postalCode: "",
    });
  };

  // Handle state change to get postal code from Google Maps
  const handleStateChange = async (state: string) => {
    if (!window.google) {
      console.error("Google Maps not loaded");
      return;
    }
    
    try {
      // Use Google Geocoding API to get postal code for the selected state/province
      const geocoder = new window.google.maps.Geocoder();
      
      // console.log("Geocoding state/province:", state);
      
      // Get ISO country code for componentRestrictions
      const countryCode = getCountryCode(selectedCountry);
      // console.log("Country code for geocoding:", countryCode);
      
      geocoder.geocode(
        { 
          address: state,
          componentRestrictions: countryCode ? { country: countryCode } : {}
        },
        (results: any, status: any) => {
          // console.log("Geocoding status:", status);
          // console.log("Geocoding results:", results);
          
          if (status === window.google.maps.GeocoderStatus.OK && results && results.length > 0) {
            // Extract postal code from the result
            const addressComponents = results[0].address_components;
            const postalCodeComponent = addressComponents.find((component: any) => 
              component.types.includes('postal_code')
            );
            
            if (postalCodeComponent) {
              // Set the postal code in the form
              form.setFieldsValue({
                postalCode: postalCodeComponent.long_name
              });
              // console.log("Postal code from Google:", postalCodeComponent.long_name);
            } else {
              // console.log("No postal code found for this state/province");
            }
          } else {
            // console.log("Geocoding failed, no postal code available");
          }
        }
      );
    } catch (error) {
      console.error('Error getting postal code:', error);
    }
  };

  const initAutocomplete = () => {
    const inputElement = document.getElementById("organization_address_input");
    if (!inputElement || !window.google?.maps?.places) return;
    if (addressAutocompleteRef.current) return;

    try {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputElement,
        { types: ["address"] },
      );
      addressAutocompleteRef.current = autocomplete;

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place || !place.address_components) return;

        let streetNumber = "";
        let route = "";
        let state = "";
        let postalCode = "";
        let country = "";

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
          if (types.includes("country")) {
            country = component.short_name;
          }
        }

        const formattedAddress =
          place.formatted_address || `${streetNumber} ${route}`.trim();
        const countryCode = normalizeCountryCode(country, countries);

        form.setFieldsValue({
          "organisation-address": formattedAddress,
          state: state || undefined,
          postalCode: postalCode || undefined,
          country: countryCode || undefined,
        });

        if (countryCode) {
          setSelectedCountry(countryCode);
        }
        if (state) {
          setStateOptions([{ label: state, value: state }]);
        }
      });
    } catch (error) {
      console.error("Error initializing Google Autocomplete:", error);
    }
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) {
        initAutocomplete();
        fetchStates();
        return;
      }

      const existingScript = document.querySelector(
        'script[src*="maps.googleapis.com/maps/api/js"]',
      );
      if (existingScript) {
        existingScript.addEventListener("load", () => {
          initAutocomplete();
          fetchStates();
        });
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        initAutocomplete();
        fetchStates();
      };
      script.onerror = (error) => {
        console.error("Failed to load Google Maps script:", error);
      };
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (window.google) {
      initAutocomplete();
    }
  }, [form]);

  const fetchStates = async () => {
    // States are suggested from Google Places as the user types.
  };

  // Handle state search with Google Places
  const handleStateSearch = async (value: string) => {
    // console.log("State search triggered for:", value);
    // console.log("Selected country:", selectedCountry);
    // console.log("Google Maps available:", !!window.google);
    
    if (!value || !window.google) {
      // console.log("Early return - no value or Google Maps not loaded");
      return;
    }

    setLoadingStates(true);
    try {
      const service = new window.google.maps.places.AutocompleteService();
      // console.log("AutocompleteService created:", !!service);
      
      // Get ISO country code for componentRestrictions
      const countryCode = getCountryCode(selectedCountry);
      // console.log("Country code for restrictions:", countryCode);
      
      service.getPlacePredictions({
        input: value,
        types: ['administrative_area_level_1'],
        componentRestrictions: countryCode ? { country: countryCode } : undefined
      }, (predictions: any[], status: any) => {
        // console.log("State search status:", status);
        // console.log("State search predictions:", predictions);
        
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          const options = predictions
            .filter((prediction: { types: string[]; }) => 
              prediction.types.includes('administrative_area_level_1') || // States/Provinces
              prediction.types.includes('administrative_area_level_2') || // Some regions
              prediction.types.includes('locality') // Cities/towns
            )
            .map((prediction: { description: string; }) => ({
              label: prediction.description,
              value: prediction.description
            }));
          setStateOptions(options);
          // console.log("State options set:", options.length);
        } else {
          // console.log("State search failed with status:", status);
          setStateOptions([]);
        }
        setLoadingStates(false);
      });
    } catch (error) {
      console.error('Error searching states:', error);
      setLoadingStates(false);
    }
  };


  // Prefill form with organization data
  useEffect(() => {
    if (data) {
      const countryValue = normalizeCountryCode(data.country, countries);
      setSelectedCountry(countryValue);
      
      if (data.state) {
        setStateOptions([{ label: data.state, value: data.state }]);
      }

      form.setFieldsValue({
        name: data.name || "",
        "organisation-address": data.address || "",
        country: countryValue,
        state: data.state || "",
        postalCode: data.postalCode || "",
        website: data.website || "",
        telephone: data.phoneNumber || "",
        "email-address": data.auth?.email || "",
        about: data.aboutUs || "",
        "date-of-established": data.dateOfEstablishment ? dayjs(data.dateOfEstablishment) : null,
      });
    }
  }, [data, form, countriesData]);

  const handleProfileVisibilityChange = (checked: boolean) => {
    // Handle profile visibility change
    console.log("Profile visibility changed to:", checked);
  };
  const onFinish = async (values: FieldType) => {
    try {
      const payload = {
        name: values.name,
        aboutUs: values.about,
        country: values.country,
        website: values.website,
        phoneNumber: values.telephone,
        state: values.state,
        postalCode: values.postalCode,
        isProfileVisible: true,
        dateOfEstablishment: values["date-of-established"]
          ? dayjs(values["date-of-established"]).format("YYYY-MM-DD")
          : null,
        address: values["organisation-address"],
      };
      // console.log("Payload:", payload);
      await editOrgDetails(payload).unwrap();
      message.success("Profile updated successfully!");
      // console.log("Updated data:", response);
      form.resetFields();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update profile");
      console.error(error);
    }
  };

  const handleDiscard = () => {
    form.resetFields();
    message.info("Changes discarded");
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Form: { borderRadius: 0 },
            Input: { borderRadius: 12 },
            Switch: {
              colorPrimary: "rgb(0,0,0)",
              colorPrimaryBorder: "rgb(0,0,0)",
              colorPrimaryHover: "rgb(0,0,0)",
            },
            Button: {
              colorPrimary: "rgb(0,0,0)",
              colorPrimaryBorder: "rgb(0,0,0)",
              colorInfoActive: "rgb(0,0,0)",
              colorPrimaryHover: "rgb(0,0,0)",

            }
          },
        }}
      >
        <div className="flex justify-end pr-10">
          <h1 className="text-end">
            Profile visiblity:{" "}
            <span className="pl-2">
              {" "}
              <Switch
                checked={data?.isProfileVisible || false}
                onChange={handleProfileVisibilityChange}
              />
            </span>
          </h1>
        </div>

        <Form
          form={form}
          name="contact"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          layout="vertical"
          className="px-6 space-y-4"
        >
          {/* Organisation Name and Date */}
          <div className="flex flex-col md:flex-row gap-4">
            <Form.Item<FieldType>
              name="name"
              label="Organisation Name"
              rules={[
                { required: true, message: "Please enter organisation name" },
              ]}
              style={{ flex: 1 }}
            >
              <Input
                placeholder="HFL Foundation"
                prefix={<FiUser className="mr-2 text-black/60" />}
                className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="date-of-established"
              label="Date Established"
              rules={[
                {
                  required: true,
                  message: "Please select date of establishment",
                },
              ]}
              style={{ flex: 1 }}
            >
              <DatePicker
                style={{
                  width: "100%",
                  height: 56,
                  borderRadius: 14,
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                }}
                placeholder="01 July 2018"
                suffixIcon={<FiCalendar className="text-black/60" />}
              />
            </Form.Item>
          </div>

          {/* Organisation Address */}
          <Form.Item<FieldType>
            name="organisation-address"
            label="Organisation Address"
            rules={[
              { required: true, message: "Please enter organisation address" },
            ]}
          >
            <Input
              id="organization_address_input"
              placeholder="Search organisation address"
              prefix={<FiMapPin className="mr-2 text-black/60" />}
              className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]"
            />
          </Form.Item>

          {/* Country, State, Post Code */}
          <div className="flex flex-col md:flex-row gap-5">
            <Form.Item<FieldType>
              name="country"
              label="Country"
              rules={[{ required: true, message: "Please enter country" }]}
              style={{ flex: 1 }}
            >
              <Select
                placeholder="Search or select a country..."
                showSearch
                loading={isCountryLoading}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  String(option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onChange={handleCountryChange}
                notFoundContent={
                  isCountryLoading ? "Loading..." : "No countries found"
                }
                options={countryOptions}
                className="h-14"
                style={{ height: 56 }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="state"
              label="State"
              rules={[{ required: true, message: "Please enter state" }]}
              style={{ flex: 1 }}
            >
              <Select
                placeholder="Search or select a state..."
                showSearch
                loading={loadingStates}
                filterOption={false}
                onSearch={handleStateSearch}
                onChange={handleStateChange}
                notFoundContent={loadingStates ? "Loading..." : "No states found"}
                options={stateOptions}
                className="h-14"
                style={{ height: 56 }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="postalCode"
              label="Post code"
              rules={[{ required: true, message: "Please enter post code" }]}
            >
              <Input
                className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]"
                placeholder="5000"
              />
            </Form.Item>
          </div>
          {data ? (
            <p className="-mt-2 mb-2 text-sm text-neutral-500">
              Donations are processed in{" "}
              <span className="font-medium text-black">
                {settlementCurrency.organizationCurrency}
              </span>
            </p>
          ) : null}

          {/* Contact info */}
          <div className="flex flex-col md:flex-row gap-5">
            <Form.Item<FieldType>
              name="telephone"
              label="Mobile"
              rules={[
                { required: true, message: "Please enter mobile number" },
              ]}
              style={{ flex: 1 }}
            >
              <Input
                placeholder="+61 470 292 023"
                prefix={<FiPhone className="mr-2 text-black/60" />}
                className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="email-address"
              label="Email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
              style={{ flex: 1 }}
            >
              <Input
                placeholder="contact@hfl-foundation.org"
                prefix={<FiMail className="mr-2 text-black/60" />}
                className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="website"
              label="Website"
              rules={[{ required: true, message: "Please enter website" }]}
              style={{ flex: 1 }}
            >
              <Input
                placeholder="www.hfl-foundation.org"
                prefix={<FiGlobe className="mr-2 text-black/60" />}
                className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]"
              />
            </Form.Item>
          </div>

          {/* About */}
          <Form.Item<FieldType>
            name="about"
            label="About"
            rules={[
              { required: true, message: "Please enter about information" },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Hope for Learning Foundation exists to unlock the power of education for underserved communities..."
              className="rounded-2xl bg-white border border-gray-200 text-[15px]"
            />
          </Form.Item>

          {/* Buttons */}
          <div className="flex justify-start items-center gap-3 mt-4">
            <Button
              onClick={handleDiscard}
              type="default"
              className="py-6 px-5 rounded-full bg-white border border-gray-300 text-[15px] font-medium "
            >
              Discard Changes
            </Button>

            <Button
              htmlType="submit"
              type="default"
              loading={isLoading}
              className="py-6 px-5 rounded-full bg-neutral-900  text-white border border-gray-300 text-[15px] font-semibold "
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ProfileEditForm;
