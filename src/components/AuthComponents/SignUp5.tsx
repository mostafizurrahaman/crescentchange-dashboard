import React from "react";
import { ConfigProvider, Form, Input } from "antd";
import img from "../../assets/images/login.png";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const STEPS = [
  { path: "/auth/signUp1", label: "Account" },
  { path: "/auth/signUp2", label: "Organization" },
  { path: "/auth/signUp3", label: "Compliance" },
  { path: "/auth/signUp4", label: "Board Member" },
  { path: "/auth/signUp5", label: "Payment" }, // <-- this page
  // { path: "/auth/signUp6", label: "Done" }, // if you add a 6th step
];

const SignUp5: React.FC = () => {
  const location = useLocation();
  const onFinish = () => {};

  // Determine current step from the route
  const total = STEPS.length;
  let currentIdx = STEPS.findIndex((s) => location.pathname.startsWith(s.path));
  if (currentIdx === -1) currentIdx = total - 1; // default to last if not matched
  const current = currentIdx + 1; // 1-based
  const isLast = current >= total;

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
                className="mt-20"
              >
                <div className="mb-4 text-center">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
                    Add Payment Method
                  </h2>
                  <p className="text-neutral-600 lg:text-lg">
                    Securely store your card details for payouts.
                  </p>

                  {/* Segmented step progress */}
                  <Stepper total={total} current={current} />

                  <p className="mt-4">Step {current}/{total}</p>
                </div>

                <Form.Item
                  name="card-name"
                  label={<p className="text-md">Account Holder Name</p>}
                  rules={[{ required: true, message: "Please enter the name on the account" }]}
                >
                  <Input
                    autoComplete="cc-name"
                    placeholder="Name"
                    className="text-md"
                   style={{
                    padding: "8px",
                    borderRadius: "8px",
                    width: "100%",
                    height: "52px",
                  }}
                  />
                </Form.Item>

                <Form.Item
                  name="card-number"
                  label={<p className="text-md">Card Number</p>}
                  rules={[{ required: true, message: "Please enter a valid card number" }]}
                >
                  <Input
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="text-md"
                   style={{
                    padding: "8px",
                    borderRadius: "8px",
                    width: "100%",
                    height: "52px",
                  }}
                  />
                </Form.Item>

                <div className="flex justify-between items-center gap-2">
                  <Form.Item
                    name="expiry-date"
                    label={<p className="text-md">Expiry Date</p>}
                    style={{ width: "50%" }}
                    rules={[{ required: true, message: "Please enter expiry date" }]}
                  >
                    <Input
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      maxLength={5}
                      className="text-md"
                   style={{
                    padding: "8px",
                    borderRadius: "8px",
                    width: "100%",
                    height: "52px",
                  }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="cvv"
                    label={<p className="text-md">CVV</p>}
                    style={{ width: "50%" }}
                    rules={[{ required: true, message: "Please enter CVV" }]}
                  >
                    <Input
                      type="password"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="***"
                      maxLength={4}
                      className="text-md"
                   style={{
                    padding: "8px",
                    borderRadius: "8px",
                    width: "100%",
                    height: "52px",
                  }}
                    />
                  </Form.Item>
                </div>

                <Form.Item>
                  {/* Last step: go to login as you had */}
                  <Link to="/auth/login">
                    <button
                      className="text-center p-2 text-lg bg-btnPrimary  w-full py-4 rounded-md shadow-lg hover:text-black"
                      type="button"
                    >
                      Continue
                    </button>
                  </Link>
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

/** Reusable thin segmented progress bar (same as earlier steps) */
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

export default SignUp5;
