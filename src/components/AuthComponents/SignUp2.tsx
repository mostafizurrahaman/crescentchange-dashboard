import React, { useState } from "react";
import { ConfigProvider, Form, Input, Select } from "antd";
import { FaPhoneAlt, FaGlobe } from "react-icons/fa";
import img from "../../assets/images/login.png";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { IoLocation } from "react-icons/io5";

const STEPS = [
  { path: "/auth/signUp1", label: "Account" },
  { path: "/auth/signUp2", label: "Organization" },
  { path: "/auth/signUp3", label: "Branding" },
  { path: "/auth/signUp4", label: "Bank" },
  { path: "/auth/signUp5", label: "Review" },
  // { path: "/auth/signUp6", label: "Done" }, // uncomment if you have 6th step
];

const SignUp2: React.FC = () => {
  const [active, setActive] = useState("Charity");
  const location = useLocation();

  const onFinish = () => {};

  // figure out which step we're on based on current route
  const total = STEPS.length;
  let currentIdx = STEPS.findIndex((s) => location.pathname.startsWith(s.path));
  if (currentIdx === -1) currentIdx = 0;
  const current = currentIdx + 1; // 1-based
  const isLast = current >= total;
  const nextPath = !isLast
    ? STEPS[currentIdx + 1].path
    : STEPS[currentIdx].path;

  return (
    <div className="h-screen flex p-2">
      <div className="bg-white flex flex-col justify-center items-center w-full md:w-1/2 relative">
        <img src={logo} alt="Logo" className="absolute top-5 left-10" />

        <div className="w-full max-w-sm mt-20">
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
              <div className="mb-4 text-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
                  Organization Details
                </h2>
                <p className="text-neutral-600 lg:text-lg">
                  Tell us a little more about your organization.
                </p>

                {/* Segmented step progress (thin rounded segments) */}
                <Stepper total={total} current={current} />

                <p className="mt-4 mb-6">
                  Step {current}/{total}
                </p>
              </div>

              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      controlHeight: 50,
                    },
                  },
                }}
              >
                <Form.Item
                  name="service-type"
                  label={<p className="text-lg ">Service Type</p>}
                >
                  <Select
                    placeholder="Select a service type"
                    className="w-full "
                    value={active}
                    onChange={(value) => setActive(value)}
                    options={[
                      { label: "Charity", value: "Charity" },
                      { label: "Mosque", value: "Mosque" },
                      {
                        label: "Non profit Organization",
                        value: "Non profit Organization",
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  name="organisation-address"
                  label={<p className="text-lg ">Organisation Address</p>}
                >
                  <Input
                    required
                    className="text-neutral-500"
                    prefix={<IoLocation className="mr-2 h-5 w-5" />}
                    placeholder="Enter Organization Address"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      height: "52px",
                    }}
                  />
                </Form.Item>

                <div className="grid grid-cols-2 gap-6">
                  <Form.Item
                    name="state"
                    label={<p className="text-lg ">State</p>}
                  >
                    <Select
                      placeholder="Select state"
                      className="w-full"
                      defaultValue="New York"
                      options={[
                        { label: "New York", value: "New York" },
                        { label: "California", value: "California" },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    name="zip-code"
                    label={<p className="text-lg ">Postal Code</p>}
                  >
                    <Input
                      placeholder="Enter Postal Code"
                      className="w-full"
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        width: "100%",
                        height: "52px",
                      }}
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="organization-website"
                  label={
                    <p className="text-lg text-neutral-500">
                      Organization Website
                    </p>
                  }
                >
                  <Input
                    required
                    className="text-neutral-500"
                    prefix={<FaGlobe className="mr-2 h-5 w-5" />}
                    placeholder="www.organizationwebsite.com"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      height: "52px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="contact-phone"
                  label={<p className="text-lg ">Contact Phone Number</p>}
                >
                  <Input
                    required
                    type="tel"
                    className="text-neutral-500"
                    prefix={<FaPhoneAlt className="mr-2" />}
                    placeholder="+61 0 1234 5678"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      height: "52px",
                    }}
                  />
                </Form.Item>

                <Form.Item>
                  {!isLast ? (
                    <Link to={nextPath}>
                      <button
                        className="text-center font-bold bg-btnPrimary w-full py-3 rounded-md shadow-lg hover:text-black"
                        type="button"
                      >
                        Save &amp; Continue
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="text-center font-bold bg-btnPrimary w-full py-3 rounded-md shadow-lg hover:text-black"
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
      <div className="w-full md:w-1/2 p-2">
        <img src={img} alt="sign-up" className="w-full h-full object-cover rounded-r-md" />
      </div>
    </div>
  );
};

/** Reusable thin segmented progress bar (same look as step 1) */
function Stepper({ total, current }: { total: number; current: number }) {
  const segments = Array.from({ length: total });

  return (
    <div
      className="flex items-center gap-3 w-1/2 mx-auto"
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
            className={`h-2 flex-1 rounded-full transition-colors duration-200 ${
              isActive ? "bg-[#a55eea]" : "bg-neutral-200"
            }`}
          />
        );
      })}
    </div>
  );
}

export default SignUp2;
