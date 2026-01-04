 
import React, { useState } from "react";
import { ConfigProvider, Form, Input } from "antd";
import img from "../../assets/images/login.png";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
  const [agree, setAgree] = useState(true);
  const onFinish = () => {};

  // Determine current step from the route
  const total = STEPS.length;
  let currentIdx = STEPS.findIndex((s) => location.pathname.startsWith(s.path));
  if (currentIdx === -1) currentIdx = total - 1; // default to last if not matched
  const current = currentIdx + 1; // 1-based
  // const isLast = current >= total;

  return (
    <div className="h-screen flex p-2">
      <img src={logo} alt="Logo" className="absolute top-5 left-10" />
      {/* Left section - Form */}
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
                    Add Payment Method
                  </h2>
                  <p className="text-neutral-500 text-base">
                    Securely store your card details for payouts.
                  </p>

                  {/* Segmented step progress */}
                  <Stepper total={total} current={current} />
                </div>

                <Form.Item
                  name="card-name"
                  label={<p className="text-base font-medium text-black/80">Full Name</p>}
                  rules={[{ required: true, message: "Please enter the name on the account" }]}
                >
                  <Input
                    autoComplete="cc-name"
                    placeholder="Enter Name"
                    className="text-neutral-500"
                    style={{
                      padding: "8px",
                      borderRadius: "12px",
                      width: "100%",
                      height: "56px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="card-number"
                  label={<p className="text-base font-medium text-black/80">Card Number</p>}
                  rules={[{ required: true, message: "Please enter a valid card number" }]}
                >
                  <Input
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="9252 5836 2947 5988"
                    maxLength={19}
                    className="text-neutral-500"
                    style={{
                      padding: "8px",
                      borderRadius: "12px",
                      width: "100%",
                      height: "56px",
                    }}
                  />
                </Form.Item>

                <div className="flex justify-between items-center gap-2">
                  <Form.Item
                    name="expiry-date"
                    label={<p className="text-base font-medium text-black/80">Expiry Date</p>}
                    style={{ width: "50%" }}
                    rules={[{ required: true, message: "Please enter expiry date" }]}
                  >
                    <Input
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="09/27"
                      maxLength={5}
                      className="text-neutral-500"
                      style={{
                        padding: "8px",
                        borderRadius: "12px",
                        width: "100%",
                        height: "56px",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="cvv"
                    label={<p className="text-base font-medium text-black/80">CVC</p>}
                    style={{ width: "50%" }}
                    rules={[{ required: true, message: "Please enter CVV" }]}
                  >
                    <Input.Password
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="***"
                      maxLength={4}
                      className="text-neutral-500"
                      iconRender={(visible) =>
                        visible ? (
                          <FiEye className="text-black/50" />
                        ) : (
                          <FiEyeOff className="text-black/50" />
                        )
                      }
                      style={{
                        padding: "8px",
                        borderRadius: "12px",
                        width: "100%",
                        height: "56px",
                      }}
                    />
                  </Form.Item>
                </div>

                <div className="mt-2 mb-8">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="h-5 w-5 accent-[#C7F64A] rounded-xl focus:outline-none focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-base text-black">
                      I agree with the <span className="font-semibold">Terms &amp; Conditions.</span>
                    </span>
                  </label>
                  <p className="mt-3 text-sm text-neutral-500 max-w-md">
                    By clicking here, I state that I have read and understood the terms and
                    conditions.
                  </p>
                </div>

                <Form.Item>
                  {/* Last step: go to login as you had */}
                  <Link to="/auth/login">
                    <button
                      className="bg-btnPrimary w-full py-4 rounded-xl text-lg font-semibold text-black"
                      type="button"
                    >
                      Complete Setup
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
        <img src={img} alt="sign-up" className="w-full h-full object-cover rounded-r-2xl" />
      </div>
    </div>
  );
};

/** Reusable thin segmented progress bar (same as earlier steps) */
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

export default SignUp5;
