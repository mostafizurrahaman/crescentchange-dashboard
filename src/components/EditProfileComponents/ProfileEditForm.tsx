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
import dayjs from "dayjs";
import { useEffect, useState } from "react";

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
  const [countryOptions, setCountryOptions] = useState<{ label: string, value: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


  // Country name to ISO code mapping
  const countryNameToCode: { [key: string]: string } = {
    "Australia": "AU",
    "United States": "US",
    "United Kingdom": "GB",
    "Canada": "CA",
    "Germany": "DE",
    "France": "FR",
    "Italy": "IT",
    "Spain": "ES",
    "Japan": "JP",
    "China": "CN",
    "India": "IN",
    "Brazil": "BR",
    "Mexico": "MX",
    "Argentina": "AR",
    "New Zealand": "NZ",
    "South Africa": "ZA",
    "Andorra": "AD",
    "Afghanistan": "AF",
    "Albania": "AL",
    "Algeria": "DZ",
    "American Samoa": "AS",
    "Angola": "AO",
    "Anguilla": "AI",
    "Antarctica": "AQ",
    "Antigua and Barbuda": "AG",
    "Armenia": "AM",
    "Aruba": "AW",
    "Austria": "AT",
    "Azerbaijan": "AZ",
    "Bahamas": "BS",
    "Bahrain": "BH",
    "Bangladesh": "BD",
    "Barbados": "BB",
    "Belarus": "BY",
    "Belgium": "BE",
    "Belize": "BZ",
    "Benin": "BJ",
    "Bermuda": "BM",
    "Bhutan": "BT",
    "Bolivia": "BO",
    "Bosnia and Herzegovina": "BA",
    "Botswana": "BW",
    "British Virgin Islands": "VG",
    "Brunei": "BN",
    "Bulgaria": "BG",
    "Burkina Faso": "BF",
    "Burundi": "BI",
    "Cambodia": "KH",
    "Cameroon": "CM",
    "Cape Verde": "CV",
    "Cayman Islands": "KY",
    "Central African Republic": "CF",
    "Chad": "TD",
    "Chile": "CL",
    "Colombia": "CO",
    "Comoros": "KM",
    "Cook Islands": "CK",
    "Costa Rica": "CR",
    "Croatia": "HR",
    "Cuba": "CU",
    "Cyprus": "CY",
    "Czech Republic": "CZ",
    "Denmark": "DK",
    "Djibouti": "DJ",
    "Dominica": "DM",
    "Dominican Republic": "DO",
    "Ecuador": "EC",
    "Egypt": "EG",
    "El Salvador": "SV",
    "Equatorial Guinea": "GQ",
    "Eritrea": "ER",
    "Estonia": "EE",
    "Ethiopia": "ET",
    "Falkland Islands": "FK",
    "Faroe Islands": "FO",
    "Fiji": "FJ",
    "Finland": "FI",
    "Gabon": "GA",
    "Gambia": "GM",
    "Georgia": "GE",
    "Ghana": "GH",
    "Gibraltar": "GI",
    "Greece": "GR",
    "Greenland": "GL",
    "Grenada": "GD",
    "Guadeloupe": "GP",
    "Guam": "GU",
    "Guatemala": "GT",
    "Guinea": "GN",
    "Guinea-Bissau": "GW",
    "Guyana": "GY",
    "Haiti": "HT",
    "Honduras": "HN",
    "Hong Kong": "HK",
    "Hungary": "HU",
    "Iceland": "IS",
    "Indonesia": "ID",
    "Iran": "IR",
    "Iraq": "IQ",
    "Ireland": "IE",
    "Israel": "IL",
    "Ivory Coast": "CI",
    "Jamaica": "JM",
    "Jordan": "JO",
    "Kazakhstan": "KZ",
    "Kenya": "KE",
    "Kiribati": "KI",
    "Kuwait": "KW",
    "Kyrgyzstan": "KG",
    "Laos": "LA",
    "Latvia": "LV",
    "Lebanon": "LB",
    "Lesotho": "LS",
    "Liberia": "LR",
    "Libya": "LY",
    "Liechtenstein": "LI",
    "Lithuania": "LT",
    "Luxembourg": "LU",
    "Macedonia": "MK",
    "Madagascar": "MG",
    "Malawi": "MW",
    "Malaysia": "MY",
    "Maldives": "MV",
    "Mali": "ML",
    "Malta": "MT",
    "Marshall Islands": "MH",
    "Martinique": "MQ",
    "Mauritania": "MR",
    "Mauritius": "MU",
    "Mayotte": "YT",
    "Micronesia": "FM",
    "Moldova": "MD",
    "Monaco": "MC",
    "Mongolia": "MN",
    "Montenegro": "ME",
    "Montserrat": "MS",
    "Morocco": "MA",
    "Mozambique": "MZ",
    "Myanmar": "MM",
    "Namibia": "NA",
    "Nauru": "NR",
    "Nepal": "NP",
    "Netherlands": "NL",
    "Netherlands Antilles": "AN",
    "New Caledonia": "NC",
    "Nicaragua": "NI",
    "Niger": "NE",
    "Nigeria": "NG",
    "Niue": "NU",
    "Norfolk Island": "NF",
    "Northern Mariana Islands": "MP",
    "Norway": "NO",
    "Oman": "OM",
    "Pakistan": "PK",
    "Palau": "PW",
    "Palestine": "PS",
    "Panama": "PA",
    "Papua New Guinea": "PG",
    "Paraguay": "PY",
    "Peru": "PE",
    "Philippines": "PH",
    "Pitcairn": "PN",
    "Poland": "PL",
    "Portugal": "PT",
    "Puerto Rico": "PR",
    "Qatar": "QA",
    "Reunion": "RE",
    "Romania": "RO",
    "Russia": "RU",
    "Rwanda": "RW",
    "Saint Kitts and Nevis": "KN",
    "Saint Lucia": "LC",
    "Saint Vincent and the Grenadines": "VC",
    "Samoa": "WS",
    "San Marino": "SM",
    "Saudi Arabia": "SA",
    "Senegal": "SN",
    "Serbia": "RS",
    "Seychelles": "SC",
    "Sierra Leone": "SL",
    "Singapore": "SG",
    "Slovakia": "SK",
    "Slovenia": "SI",
    "Solomon Islands": "SB",
    "Somalia": "SO",
    "South Korea": "KR",
    "Sri Lanka": "LK",
    "Sudan": "SD",
    "Suriname": "SR",
    "Swaziland": "SZ",
    "Sweden": "SE",
    "Switzerland": "CH",
    "Syria": "SY",
    "Taiwan": "TW",
    "Tajikistan": "TJ",
    "Tanzania": "TZ",
    "Thailand": "TH",
    "Togo": "TG",
    "Tokelau": "TK",
    "Tonga": "TO",
    "Trinidad and Tobago": "TT",
    "Tunisia": "TN",
    "Turkey": "TR",
    "Turkmenistan": "TM",
    "Turks and Caicos Islands": "TC",
    "Tuvalu": "TV",
    "Uganda": "UG",
    "Ukraine": "UA",
    "United Arab Emirates": "AE",
    "Uruguay": "UY",
    "Uzbekistan": "UZ",
    "Vanuatu": "VU",
    "Vatican": "VA",
    "Venezuela": "VE",
    "Vietnam": "VN",
    "Wallis and Futuna": "WF",
    "Western Sahara": "EH",
    "Yemen": "YE",
    "Zambia": "ZM",
    "Zimbabwe": "ZW"
  };

  // Get ISO country code from country name
  const getCountryCode = (countryName: string): string | undefined => {
    return countryNameToCode[countryName];
  };
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    
    // Clear state and postal code when country changes
    form.setFieldsValue({
      state: "",
      postalCode: ""
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

  // Load Google Maps script and fetch states
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      // console.log("Loading Google Maps script...");
      // console.log("Google Maps already available:", !!window.google);
      
      if (window.google) {
        // console.log("Google Maps already loaded, calling fetchStates");
        fetchStates();
        return;
      }

      // console.log("Creating Google Maps script element");
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        // console.log("Google Maps script loaded successfully");
        fetchStates();
      };
      script.onerror = (error) => {
        console.error("Failed to load Google Maps script:", error);
      };
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  const fetchStates = async () => {
    setLoadingStates(true);
    try {
      // Don't load hardcoded states - rely on Google Maps API for suggestions
      setStateOptions([]);
      setCountryOptions([]);
    } catch (error) {
      console.error('Error initializing states:', error);
      setStateOptions([]);
      setCountryOptions([]);
    } finally {
      setLoadingStates(false);
    }
  };

  // Handle country search with Google Places
  const handleCountrySearch = async (value: string) => {
    // console.log("Country search triggered for:", value);
    // console.log("Google Maps available:", !!window.google);
    
    if (!value || !window.google) {
      // console.log("Early return - no value or Google Maps not loaded");
      return;
    }

    setLoadingStates(true);
    try {
      const service = new window.google.maps.places.AutocompleteService();
      // console.log("AutocompleteService created:", !!service);
      
      service.getPlacePredictions({
        input: value,
        types: ['country'],
      }, (predictions: any[], status: any) => {
        // console.log("Country search status:", status);
        // console.log("Country search predictions:", predictions);
        
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          const options = predictions.map((prediction: { description: string; }) => ({
            label: prediction.description,
            value: prediction.description
          }));
          setCountryOptions(options);
          // console.log("Country options set:", options.length);
        } else {
          // console.log("Country search failed with status:", status);
          setCountryOptions([]);
        }
        setLoadingStates(false);
      });
    } catch (error) {
      console.error('Error searching countries:', error);
      setLoadingStates(false);
    }
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
      const countryValue = data.country || "";
      setSelectedCountry(countryValue);
      
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
  }, [data, form]);

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
              placeholder="57 Donut Road, Crescent Lane, Sydney, Australia"
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
                loading={loadingStates}
                filterOption={false}
                onSearch={handleCountrySearch}
                onChange={handleCountryChange}
                notFoundContent={loadingStates ? "Loading..." : "No countries found"}
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
