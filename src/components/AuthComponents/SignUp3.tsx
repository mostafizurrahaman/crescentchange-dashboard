/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ConfigProvider, Form, Input } from "antd";
import img from "../../assets/images/login.png";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const STEPS = [
  { path: "/auth/signUp1", label: "Account" },
  { path: "/auth/signUp2", label: "Organization" },
  { path: "/auth/signUp3", label: "Compliance" }, // <-- this page
  { path: "/auth/signUp4", label: "Bank" },
  // { path: "/auth/signUp5", label: "Review" },
  // { path: "/auth/signUp6", label: "Done" }, // uncomment if you have a 6th step
];

const SignUp3: React.FC = () => {
  const location = useLocation();
  const nevigate = useNavigate();

  // Determine current step from the route
  const total = STEPS.length;
  let currentIdx = STEPS.findIndex((s) => location.pathname.startsWith(s.path));
  if (currentIdx === -1) currentIdx = 0;
  const current = currentIdx + 1; // 1-based
  const isLast = current >= total;
  const nextPath = !isLast
    ? STEPS[currentIdx + 1].path
    : STEPS[currentIdx].path;
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
    localStorage.setItem("compliance", JSON.stringify(values));
    nevigate(nextPath, { state: values });
  };
  return (
    <div className="h-screen flex">
      <div className="bg-white p-10 flex flex-col justify-center items-center w-full md:w-1/2 relative">
        <img src={logo} alt="Logo" className="absolute top-5 left-10" />
        <div className="w-full max-w-sm ">
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
                className="mt-20"
              >
                <div className="mb-4 text-center">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
                    Verify Your Registration
                  </h2>
                  <p className="text-neutral-600 lg:text-lg">
                    Verify your registration details for compliance.
                  </p>

                  {/* Segmented step progress */}
                  <Stepper total={total} current={current} />

                  <p className="mt-4 mb-6">
                    Step {current}/{total}
                  </p>
                </div>

                <Form.Item
                  name="tfnOrAbnNumber"
                  label={<p className="text-md">TFN/ABN</p>}
                >
                  <Input
                    required
                    className="text-md"
                    placeholder="62 123 456 789"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      height: "52px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="acncNumber "
                  label={<p className="text-md">ACNC Registration Number</p>}
                >
                  <Input
                    required
                    className="text-md"
                    placeholder="ACNC-987654"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      height: "52px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="zakatLicenseHolderNumber"
                  label={
                    <p className="text-md">
                      Zakat License Holder Number (Optional)
                    </p>
                  }
                >
                  <Input
                    className="text-md"
                    placeholder="ZL-45678"
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
                    <button className="text-center p-2 font-bold bg-btnPrimary w-full py-4 rounded-md shadow-lg hover:text-black">
                      Continue
                    </button>
                  ) : (
                    <button className="text-center p-2 font-bold bg-btnPrimary w-full py-2 rounded-md shadow-lg hover:text-black">
                      Finish
                    </button>
                  )}
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

/** Reusable thin segmented progress bar (same look as steps 1 & 2) */
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

export default SignUp3;
