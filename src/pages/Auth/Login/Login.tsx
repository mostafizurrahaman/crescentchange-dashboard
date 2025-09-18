import { Checkbox, ConfigProvider, Form, Input } from "antd";
import img from "../../../assets/images/login.png"; // Path to the image
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png"; // Path to the logo

const Login = () => {
  const onFinish = () => {};

  return (
    <div className="">
      <div className="relative grid grid-cols-1 md:grid-cols-2 justify-center items-center p-4">
        {/* Left section - Login Form */}
        <div className="bg-white p-10">
          <img src={logo} alt="Logo" className="absolute top-5" />
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
                name="login"
                initialValues={{ remember: false }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                layout="vertical"
              >
                <div className="mb-4 text-center">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                    Welcome Back!
                  </h2>
                  <p className="text-neutral-600 lg:text-lg pt-3 pb-6">
                    Sign in to manage everything.
                  </p>
                </div>

                {/* Email input field */}
                <Form.Item
                  name="email"
                  label={<p className="text-md">Email</p>}
                >
                  <Input
                    required
                    className="text-md"
                    placeholder="Enter Email Address"
                  />
                </Form.Item>

                {/* Password input field */}
                <Form.Item
                  name="password"
                  label={<p className="text-md">Password</p>}
                >
                  <Input.Password
                    required
                    className="text-md"
                    placeholder="Enter Password"
                  />
                </Form.Item>

                {/* Sign In button */}
                <Form.Item>
                  <Link to="/">
                    <button
                      className="w-full py-4 font-bold bg-btnPrimary rounded-md text-xl"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </Link>
                </Form.Item>

                {/* Forgot password and signup link */}
                <div className="flex justify-between items-center font-semibold gap-2 text-md">
                  <ConfigProvider
                    theme={{
                      components: {
                        Checkbox: {
                          colorPrimary: "rgb(209,255,67)",
                          colorPrimaryBorder: "rgb(209,255,67)",
                          colorPrimaryHover: "rgb(209,255,67)",
                        },
                      },
                    }}
                  >
                    {" "}
                    <Checkbox>Remember Password</Checkbox>{" "}
                  </ConfigProvider>
                  <Link
                    to="/auth/forgot-password"
                    className="text-md underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Sign-up redirect */}
                <p className="mt-6 text-lg text-center font-semibold">
                  Don't have an account?{" "}
                  <Link to="/auth/signup" className="text-[#a55eea]">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </ConfigProvider>
          </div>
        </div>

        {/* Right section - Image */}
        <div className="flex justify-end items-end">
          <img src={img} alt="sign-up" className="w-full h-screen" />
        </div>
      </div>
    </div>
  );
};

export default Login;
