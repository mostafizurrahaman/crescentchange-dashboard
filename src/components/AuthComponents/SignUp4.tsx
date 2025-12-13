/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, ConfigProvider, Form, Input, message, Upload } from "antd";
import { FaPhoneAlt, FaVoicemail } from "react-icons/fa";
import img from "../../assets/images/login.png";
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { UploadOutlined } from "@ant-design/icons";
import { useSignUpMutation } from "../../redux/features/auth/authApi";

const STEPS = [
  { path: "/auth/signUp1", label: "Account" },
  { path: "/auth/signUp2", label: "Organization" },
  { path: "/auth/signUp3", label: "Compliance" },
  { path: "/auth/signUp4", label: "Board Member" },
];

const SignUp4: React.FC = () => {
  const location = useLocation();
  const total = STEPS.length;
  let currentIdx = STEPS.findIndex((s) => location.pathname.startsWith(s.path));
  if (currentIdx === -1) currentIdx = total - 1;
  const current = currentIdx + 1;
  const organization = JSON.parse(localStorage.getItem("organization") ?? "{}");
  const organization2 = JSON.parse(
    localStorage.getItem("organization2") ?? "{}"
  );
  const compliance = JSON.parse(localStorage.getItem("compliance") ?? "{}");
  const [SignUp] = useSignUpMutation();

  const onFinish = (values: any) => {
    const fileList = values.drivingLicense;

    if (!fileList || fileList.length === 0) {
      console.error("No document uploaded");
      return;
    }

    const file: File = fileList[0].originFileObj;
    const data = {
      name: organization.name ?? "",
      email: organization.email ?? "",
      password: organization.password ?? "",

      serviceType: organization2.serviceType ?? "",
      address: organization2.address ?? "",
      state: organization2.state ?? "",
      postalCode: organization2.postalCode ?? "",
      phoneNumber: organization2.phoneNumber ?? "",
      website: organization2.website ?? "",

      tfnOrAbnNumber: compliance.tfnOrAbnNumber ?? "",
      acncNumber: compliance.acncNumber ?? compliance["acncNumber "] ?? "",
      zakatLicenseHolderNumber: compliance.zakatLicenseHolderNumber ?? "",

      boardMemberName: values.boardMemberName ?? "",
      boardMemberEmail: values.boardMemberEmail ?? "",
      boardMemberPhoneNumber: values.boardMemberPhoneNumber ?? "",
    };

    console.log("FINAL PAYLOAD:", data);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("drivingLicense", file);
      const res = SignUp(formData).unwrap();
      message.success(res?.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex">
      {/* Left section - Form */}
      <div className="bg-white p-10 flex flex-col justify-center items-center w-full md:w-1/2 relative">
        <img src={logo} alt="Logo" className="absolute top-5 left-10" />
        <div className="w-full max-w-sm mt-20">
          <div>
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
                    Add a Board Member
                  </h2>
                  <p className="text-neutral-600 lg:text-lg">
                    Each organization must have at least one verified member.
                  </p>

                  {/* Segmented step progress */}
                  <Stepper total={total} current={current} />

                  <p className="mt-4">
                    Step {current}/{total}
                  </p>
                </div>

                <Form.Item
                  name="boardMemberName"
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
                      height: "52px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="boardMemberEmail"
                  label={
                    <p className="text-lg text-neutral-500">Email Address</p>
                  }
                >
                  <Input
                    required
                    type="email"
                    className="text-neutral-500"
                    prefix={<FaVoicemail className="mr-2" />}
                    placeholder="Enter Email Address"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      height: "52px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="boardMemberPhoneNumber"
                  label={
                    <p className="text-lg text-neutral-500">Contact Phone</p>
                  }
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

                <Form.Item
                  name="drivingLicense"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e?.fileList;
                  }}
                  rules={[
                    { required: true, message: "Please upload your document" },
                  ]}
                  label={
                    <p className="text-lg text-neutral-500">
                      Upload Government Issued Document (Driver’s License / ID)
                    </p>
                  }
                >
                  <Upload
                    multiple={false}
                    maxCount={1}
                    accept=".jpg,.jpeg,.png,.pdf"
                    beforeUpload={() => false} // prevent auto upload
                  >
                    <Button
                      icon={<UploadOutlined />}
                      className="text-neutral-500"
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        width: "100%",
                        height: "52px",
                      }}
                    >
                      Click to Upload
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <button
                    className="text-center p-2 font-bold bg-btnPrimary w-full py-4 rounded-md shadow-lg hover:text-black"
                    type="submit"
                  >
                    Finish
                  </button>
                  {/* </Link> */}
                </Form.Item>
              </Form>
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

/** Reusable thin segmented progress bar (same look as earlier steps) */
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

export default SignUp4;
