import { Button, ConfigProvider, Form, Input, Upload } from "antd";
import { FaPhoneAlt, FaVoicemail } from "react-icons/fa"; // Importing icons from react-icons
import img from "../../assets/images/login.png"; // Adjust path as necessary
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // Adjust path as necessary
import { UploadOutlined } from "@ant-design/icons";

const SignUp4 = () => {
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
                    Add a Board Member
                  </h2>
                  <p className="text-neutral-600 lg:text-lg font-semibold">
                    Each organization must have at least one verified member.
                  </p>
                </div>
                <div className="my-10">
                  <div className="h-2 w-full bg-btnPrimary"></div>
                  <p>Step 2/5</p>
                </div>

                <Form.Item
                  name="name"
                  label={<p className="text-lg text-neutral-500">Full Name</p>}
                >
                  <Input
                    required
                    className="text-neutral-500"
                    placeholder="Full Name"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="emailaddress"
                  label={
                    <p className="text-lg text-neutral-500">Email Address</p>
                  }
                >
                  <Input
                    required
                    className="text-neutral-500"
                    prefix={<FaVoicemail className="mr-2" />}
                    placeholder="Enter Email Address"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                  />
                </Form.Item>
             
                <Form.Item
                  name="contact-phone"
                  label={
                    <p className="text-lg text-neutral-500">Contact Phone</p>
                  }
                >
                  <Input
                    required
                    className="text-neutral-500"
                    prefix={<FaPhoneAlt className="mr-2" />}
                    placeholder="+61 0 1234 5678"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="gov-id"
                  label={
                    <p className="text-lg text-neutral-500">
                      Upload Government Issued Document (Driver’s License / ID)
                    </p>
                  }
                >
                  <Upload>
                    <Button
                      icon={<UploadOutlined />}
                      className="text-neutral-500"
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        width: "100%",
                      }}
                    >
                      Click to Upload
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <Link to="/auth/signUp5">
                    <button
                      className="text-center p-2 font-bold bg-btnPrimary  w-full py-2 rounded-md shadow-lg"
                      type="submit"
                    >
                      Save & Continue
                    </button>
                  </Link>
                </Form.Item>
              </Form>

              {/* <div className="font-semibold gap-2 text-md">
                <Link to="/auth/signUp1" className="text-md flex items-center justify-start gap-2">
                  <FaArrowLeft />
                  Back
                </Link>
              </div> */}
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

export default SignUp4;
