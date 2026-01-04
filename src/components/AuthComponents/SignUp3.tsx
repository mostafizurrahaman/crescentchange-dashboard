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
  { path: "/auth/signUp4", label: "Board Member" },
  { path: "/auth/signUp5", label: "Payment" },
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
    localStorage.setItem("compliance", JSON.stringify(values));
    nevigate(nextPath, { state: values });
  };
  return (
    <div className="h-screen flex p-2">
      <img src={logo} alt="Logo" className="absolute top-5 left-10" />
      <div className="bg-white flex flex-col mt-32 items-center w-full md:w-1/2 relative">
        <div className="w-full max-w-md">
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
                    Verify Your Registration
                  </h2>
                  <p className="text-neutral-500 text-base">
                    Verify your registration details for compliance.
                  </p>

                  {/* Segmented step progress */}
                  <Stepper total={total} current={current} />
                </div>

                <Form.Item
                  name="tfnOrAbnNumber"
                  label={<p className="text-base font-medium text-black/80">TFN / ABN Number</p>}
                >
                  <Input
                    required
                    className="text-md"
                    placeholder="62 123 456 789"
                    style={{
                      padding: "8px",
                      borderRadius: "12px",
                      width: "100%",
                      height: "56px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="acncNumber "
                  label={<p className="text-base font-medium text-black/80">ACNC Registration Number</p>}
                >
                  <Input
                    required
                    className="text-md"
                    placeholder="ACNC-987654"
                    style={{
                      padding: "8px",
                      borderRadius: "12px",
                      width: "100%",
                      height: "56px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="zakatLicenseHolderNumber"
                  label={
                    <p className="text-base font-medium text-black/80">
                      Zakat License Holder Number{" "}
                      <span className="text-neutral-400">(Optional)</span>
                    </p>
                  }
                >
                  <Input
                    className="text-md"
                    placeholder="ZL-45678"
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
                    <button className="bg-btnPrimary w-full py-4 rounded-xl text-lg font-semibold text-black">
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
        <img src={img} alt="sign-up" className="w-full h-full object-cover rounded-r-2xl" />
      </div>
    </div>
  );
};

/** Reusable thin segmented progress bar (same look as steps 1 & 2) */
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

export default SignUp3;
