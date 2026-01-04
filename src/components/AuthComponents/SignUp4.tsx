/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, ConfigProvider, Form, Input, message, Upload } from "antd";
import { FiMail, FiPhone, FiUpload } from "react-icons/fi";
import img from "../../assets/images/login.png";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useSignUpMutation } from "../../redux/features/auth/authApi";

const STEPS = [
  { path: "/auth/signUp1", label: "Account" },
  { path: "/auth/signUp2", label: "Organization" },
  { path: "/auth/signUp3", label: "Compliance" },
  { path: "/auth/signUp4", label: "Board Member" },
  { path: "/auth/signUp5", label: "Payment" },
];

const SignUp4: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedFileName, setSelectedFileName] = useState<string>("driverslicense.pdf");
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
      message.error("Please upload your document");
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

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("drivingLicense", file);
      SignUp(formData).unwrap();
      message.success("Account created successfully");
      navigate("/auth/verifyOtpforSignUp");
    } catch {
      message.error("Something went wrong");
    }
  };
  return (
    <div className="h-screen flex p-2">
      {/* Left section - Form */}
      <img src={logo} alt="Logo" className="absolute top-5 left-10" />
      <div className="bg-white mt-32 flex flex-col items-center w-full md:w-1/2 relative">
        <div className="w-full max-w-lg">
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
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-familjen font-bold mb-3 text-black">
                    Add a Board Member
                  </h2>
                  <p className="text-neutral-500 text-base">
                    Each organization must have at least one verified member.
                  </p>

                  {/* Segmented step progress */}
                  <Stepper total={total} current={current} />
                </div>

                <Form.Item
                  name="boardMemberName"
                  label={<p className="text-base font-medium text-black/80">Full Name</p>}
                >
                  <Input
                    required
                    className="text-neutral-500"
                    placeholder="John Doe"
                    style={{
                      padding: "8px",
                      borderRadius: "12px",
                      width: "100%",
                      height: "56px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="boardMemberEmail"
                  label={
                    <p className="text-base font-medium text-black/80">Email Address</p>
                  }
                >
                  <Input
                    required
                    type="email"
                    className="text-neutral-500"
                    prefix={<FiMail className="mr-3 h-5 w-5 text-black/80" />}
                    placeholder="Enter Email Address"
                    style={{
                      padding: "8px",
                      borderRadius: "12px",
                      width: "100%",
                      height: "56px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="boardMemberPhoneNumber"
                  label={
                    <p className="text-base font-medium text-black/80">Phone Number</p>
                  }
                >
                  <Input
                    required
                    type="tel"
                    className="text-neutral-500"
                    prefix={<FiPhone className="mr-3 h-5 w-5 text-black/80" />}
                    placeholder="+61 400 222 333"
                    style={{
                      padding: "8px",
                      borderRadius: "12px",
                      width: "100%",
                      height: "56px",
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
                    <p className="text-base font-medium text-black/80">
                      Upload Government Issued Document (Drivers License/ID)
                    </p>
                  }
                >
                  <Upload
                    multiple={false}
                    maxCount={1}
                    accept=".jpg,.jpeg,.png,.pdf"
                    beforeUpload={() => false} // prevent auto upload
                    showUploadList={false}
                    className="block w-full [&_.ant-upload]:block [&_.ant-upload]:w-full [&_.ant-upload-select]:block [&_.ant-upload-select]:w-full"
                    style={{ width: "100%" }}
                    onChange={(info) => {
                      const file = info.fileList?.[0]?.name;
                      if (file) setSelectedFileName(file);
                    }}
                  >
                    <Button
                      block
                      type="default"
                      className="w-full flex items-center justify-between !border-neutral-200 !bg-white !px-4 text-left"
                      style={{
                        borderRadius: "12px",
                        height: "56px",
                      }}
                    >
                      <span className="text-neutral-400">{selectedFileName}</span>
                      <FiUpload className="h-5 w-5 text-black/80" />
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <button
                    className="bg-btnPrimary w-full py-4 rounded-xl text-lg font-semibold text-black"
                    type="submit"
                  >
                    Save &amp; Continue
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
        <img src={img} alt="sign-up" className="w-full h-full object-cover rounded-r-2xl" />
      </div>
    </div>
  );
};

/** Reusable thin segmented progress bar (same look as earlier steps) */
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

export default SignUp4;
