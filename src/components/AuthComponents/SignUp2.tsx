import { ConfigProvider, Form, Input, Select } from "antd";
import { FaLocationArrow, FaPhoneAlt, FaGlobe } from "react-icons/fa"; // Importing icons from react-icons
import img from "../../assets/images/login.png"; // Adjust path as necessary
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // Adjust path as necessary
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoLocateOutline, IoLocation } from "react-icons/io5";

const SignUp2 = () => {
  const [active, setActive] = useState("Charity");

  const onFinish = () => {};
  
  return (
    <div className="h-screen flex">
      {/* Left section - Form */}
      <div className="bg-white p-10 flex flex-col justify-center items-center w-full md:w-1/2">
        <img src={logo} alt="Logo" className="absolute top-5 left-10" />
        <div className="w-full max-w-sm mt-20">
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Form: {
                    borderRadius: 0,
                  },
                  Input: {
                    borderRadius: 5,
                  },
                },
              }}
            >
              <Form
                name="contact"
                initialValues={{ remember: false }}
                onFinish={onFinish}
                layout="vertical"
                className="mt-20"
              >
                <div className="mb-4">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
                    Organization Details
                  </h2>
                  <p className="text-neutral-600 lg:text-lg font-semibold">
                    Tell us a little more about your organization.
                  </p>
                </div>
                <div className="my-10">
                  <div className="h-2 w-full bg-btnPrimary"></div>
                  <p>Step 2/5</p>
                </div>

                <Form.Item
                  name="service-type"
                  label={<p className="text-lg text-neutral-500">Service Type</p>}
                >
                  <Select
                    placeholder="Select a service type"
                    className="w-full"
                    value={active}
                    onChange={(value) => setActive(value)}
                    options={[
                      { label: "Charity", value: "Charity" },
                      { label: "Mosque", value: "Mosque" },
                      { label: "Non profit Organization", value: "Non profit Organization" },
                    ]}
                  />
                </Form.Item>
{/* 
                <Form.Item
                  name="organisation-name"
                  label={<p className="text-lg text-neutral-500">Organisation Name</p>}
                >
                  <Input
                    required
                    className="text-neutral-500"
                    placeholder="Your Organisation Name"
                    style={{ padding: "8px", borderRadius: "8px", width: "100%" }}
                  />
                </Form.Item> */}

                <Form.Item
                  name="organisation-address"
                  label={<p className="text-lg text-neutral-500">Organisation Address</p>}
                >
                  <Input
                    required
                    className="text-neutral-500"
                    prefix={<IoLocation className="mr-2" />}
                    placeholder="Enter Organization Address"
                    style={{ padding: "8px", borderRadius: "8px", width: "100%" }}
                  />
                </Form.Item>

                <div className="grid grid-cols-2 gap-6">
                  <Form.Item
                    name="state"
                    label={<p className="text-lg text-neutral-500">State</p>}
                  >
                    <Select
                      placeholder="Select state"
                      className="w-full"
                      defaultValue="New York"
                      options={[{ label: "New York", value: "New York" }, { label: "California", value: "California" }]}
                    />
                  </Form.Item>

                  <Form.Item
                    name="zip-code"
                    label={<p className="text-lg text-neutral-500">Postal Code</p>}
                  >
                    <Input
                      placeholder="Enter Postal Code"
                      className="w-full"
                      style={{ padding: "8px", borderRadius: "8px" }}
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="organization-website"
                  label={<p className="text-lg text-neutral-500">Organization Website</p>}
                >
                  <Input
                    required
                    className="text-neutral-500"
                    prefix={<FaGlobe className="mr-2" />}
                    placeholder="www.organizationwebsite.com"
                    style={{ padding: "8px", borderRadius: "8px", width: "100%" }}
                  />
                </Form.Item>

                <Form.Item
                  name="contact-phone"
                  label={<p className="text-lg text-neutral-500">Contact Phone Number</p>}
                >
                  <Input
                    required
                    className="text-neutral-500"
                    prefix={<FaPhoneAlt className="mr-2" />}
                    placeholder="+61 0 1234 5678"
                    style={{ padding: "8px", borderRadius: "8px", width: "100%" }}
                  />
                </Form.Item>

                <Form.Item>
                  <Link to="/auth/signUp3">
                    <button
                      className="text-center p-2 font-bold bg-btnPrimary  w-full py-2 rounded-md shadow-lg"
                      type="submit"
                    >
                   Save & Continue
                    </button>
                  </Link>
                </Form.Item>
              </Form>

              <div className="font-semibold gap-2 text-md">
                <Link to="/auth/signUp1" className="text-md flex items-center justify-start gap-2">
                  <FaArrowLeft />
                  Back
                </Link>
              </div>
            </ConfigProvider>
          </div>
        </div>
      </div>

      {/* Right section - Image */}
      <div className="w-full md:w-1/2">
        <img src={img} alt="sign-up" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SignUp2;
