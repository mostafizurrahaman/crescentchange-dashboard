/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ConfigProvider, Form, Input } from "antd";
import img from "../../assets/images/login.png";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import building from "../../assets/images/Building.png";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";

// Define your step routes here, in order. 
// Add a 6th step if you have one.
const STEPS = [
  { path: "/auth/signUp1", label: "Account" },
  { path: "/auth/signUp2", label: "Organization" },
  { path: "/auth/signUp3", label: "Compliance" },
  { path: "/auth/signUp4", label: "Board Member" },
  { path: "/auth/signUp5", label: "Payment" },
  // { path: "/auth/signUp6", label: "Done" },
];

const SignUp1: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // figure out which step we're on based on current route
  const total = STEPS.length;
  let currentIdx = STEPS.findIndex((s) => location.pathname.startsWith(s.path));
  if (currentIdx === -1) currentIdx = 0;
  const current = currentIdx + 1; // 1-based
  const isLast = current >= total;
  const nextPath = !isLast
    ? STEPS[currentIdx + 1].path
    : STEPS[currentIdx].path;
  const onFinish = (values: any) => {
    // console.log("Received values of form:", values);
    navigate(nextPath, { state: values });
    localStorage.setItem("organization", JSON.stringify(values));
  };

  return (
    <div className="h-screen flex p-2">
      <img src={logo} alt="Logo" className="absolute top-5 left-10" />
      <div className="bg-white flex flex-col mt-32 items-center w-full md:w-1/2 relative">

        <div className="w-full max-w-lg">
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
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-familjen font-bold mb-3 text-black">
                  Let's Setup Your Account
                </h2>
                <p className="text-neutral-500 text-base mb-6">
                  Start your journey. Empower your cause. Accept donations
                  easily.
                </p>

                {/* Segmented step progress */}
                <Stepper total={total} current={current} />
              </div>

              <Form.Item
                name="name"
                label={<p className="text-base font-medium text-black/80">Organization Name</p>}
              >
                <Input
                  required
                  prefix={
                    <img src={building} alt="" className="mr-3 h-5 w-5 opacity-70" />
                  }
                  placeholder="Enter Name"
                  style={{
                    padding: "8px",
                    borderRadius: "12px",
                    width: "100%",
                    height: "56px",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label={<p className="text-base font-medium text-black/80">Email</p>}
              >
                <Input
                  required
                  type="email"
                  prefix={<AiOutlineMail className="mr-3 h-5 w-5 text-neutral-400" />}
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
                name="password"
                label={<p className="text-base font-medium text-black/80">Password</p>}
              >
                <Input.Password
                  required
                  prefix={<MdLockOutline className="mr-3 h-5 w-5 text-neutral-400" />}
                  placeholder="************"
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
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-btnPrimary w-full py-4 rounded-xl text-lg font-semibold text-black"
                  >
                    Finish
                  </button>
                )}
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>

      {/* Right section - Image */}
      <div className="w-full md:w-1/2">
        <img src={img} alt="sign-up" className="w-full h-full object-cover rounded-r-2xl" />
      </div>
    </div>
  );
};

/** Thin segmented progress bar like your screenshot */
function Stepper({ total, current }: { total: number; current: number }) {
  const segments = Array.from({ length: total });

  return (
    <div
      className="flex items-center gap-2 w-2/5 mx-auto"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Onboarding progress: Step ${current} of ${total}`}
    >
      {segments.map((_, i) => {
        const isActive = i < current; // fill up to current step
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

export default SignUp1;
