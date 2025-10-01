import React from "react";
import { ConfigProvider, Form, Input } from "antd";
import img from "../../assets/images/login.png";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import building from "../../assets/images/Building.png";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";

// Define your step routes here, in order.
// Add a 6th step if you have one.
const STEPS = [
  { path: "/auth/signUp1", label: "Account" },
  { path: "/auth/signUp2", label: "Organization" },
  { path: "/auth/signUp3", label: "Branding" },
  { path: "/auth/signUp4", label: "Bank" },
  { path: "/auth/signUp5", label: "Review" },
  // { path: "/auth/signUp6", label: "Done" },
];

const SignUp1: React.FC = () => {
  const location = useLocation();
  const onFinish = () => {};

  // figure out which step we're on based on current route
  const total = STEPS.length;
  let currentIdx = STEPS.findIndex((s) => location.pathname.startsWith(s.path));
  if (currentIdx === -1) currentIdx = 0;
  const current = currentIdx + 1; // 1-based
  const isLast = current >= total;
  const nextPath = !isLast ? STEPS[currentIdx + 1].path : STEPS[currentIdx].path;

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
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Let's Setup Your Account
                </h2>
                <p className="text-neutral-600 text-lg mb-6">
                  Start your journey. Empower your cause. Accept donations
                  easily.
                </p>

                {/* Segmented step progress */}
                <Stepper total={total} current={current} />

                <p className="mt-4 mb-6">
                  Step {current}/{total}
                </p>
              </div>

              <Form.Item
                name="org-name"
                label={<p className="text-lg">Organisation Name</p>}
              >
                <Input
                  required
                  prefix={<img src={building} alt="" className="mr-2 h-5 w-5" />}
                  placeholder="Enter Name"
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    width: "100%",
                    height: "52px",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="email-address"
                label={<p className="text-lg">Email Address</p>}
              >
                <Input
                  required
                  type="email"
                  prefix={<AiOutlineMail className="mr-2 h-5 w-5" />}
                  placeholder="mailto:admin@crescentchange.org"
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    width: "100%",
                    height: "52px",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={<p className="text-lg">Password</p>}
              >
                <Input.Password
                  required
                  prefix={<MdLockOutline className="mr-2 h-5 w-5" />}
                  placeholder="Enter Your Password"
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
                    <button className="bg-btnPrimary w-full py-4 rounded-md shadow-lg text-lg font-medium hover:text-black">
                      Continue
                    </button>
                  </Link>
                ) : (
                  <button
                    type="submit"
                    className="bg-btnPrimary w-full py-4 rounded-md shadow-lg text-lg font-medium hover:text-black"
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
        <img src={img} alt="sign-up" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

/** Thin segmented progress bar like your screenshot */
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
        const isActive = i < current; // fill up to current step
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

export default SignUp1;
