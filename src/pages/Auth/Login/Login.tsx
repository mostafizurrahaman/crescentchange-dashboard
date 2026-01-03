/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { ConfigProvider, Form, Input, message, Spin } from "antd";
import img from "../../../assets/images/login.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { useLoginApiMutation } from "../../../redux/features/auth/authApi";
import { useState } from "react";

interface login {
  email: string;
  password: string;
}

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [rememberPassword, setRememberPassword] = useState(true);
  const [loginApi, { isLoading }] = useLoginApiMutation();
  const onFinish = async (values: login) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await loginApi(data).unwrap();
      // console.log("Access token:", res?.data?.accessToken);
      // console.log("Token in localStorage before navigate:", localStorage.getItem("token"));

      // Check if 2FA is required
      if (res?.data?.twoFactorRequired) {
        message.info(
          res?.data?.message || "Two-factor authentication required"
        );
        localStorage.setItem("pending2FAEmail", res?.data.email);
        navigate("/auth/verify2FA"); // Fixed typo
        return;
      }

      // If 2FA not required, store token and redirect
      if (res?.data?.accessToken) {
        localStorage.setItem("token", res?.data.accessToken);
        message.success(res?.message || "Login successful");
        navigate("/"); // Fixed typo
      } else {
        message.error("No access token returned from server");
      }

      form.resetFields();
    } catch (error: any) {
      message.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen p-2">
      <div className="flex flex-col items-center mt-32 w-full bg-white md:w-1/2">
        <img src={logo} alt="Logo" className="absolute top-5 right-5 left-10" />
        <div className=" w-[400px] ">
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
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Spin className="w-20 h-20"></Spin>
                </div>
              ) : (
                <Form
                  name="contact"
                  initialValues={{ remember: rememberPassword }}
                  onFinish={onFinish}
                  layout="vertical"
                  className=""
                  form={form}
                >
                  <div className="mb-4 text-center">
                    <h2 className="mb-2 font-familjen text-xl font-bold md:text-2xl lg:text-3xl">
                      Welcome Back!
                    </h2>
                    <p className="text-neutral-400 text-base">
                      Sign in to manage everything.
                    </p>
                  </div>
                  <Form.Item
                    name="email"
                    label={<p className="text-lg ">Email</p>}
                  >
                    <Input
                      required
                      className=""
                      prefix={<AiOutlineMail className="w-5 h-5 mr-2" />}
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
                    name="password"
                    label={<p className="text-lg ">Password</p>}
                  >
                    <Input.Password
                      required
                      className=""
                      prefix={<MdLockOutline className="w-5 h-5 mr-2" />}
                      placeholder="**********"
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        width: "100%",
                        height: "52px",
                      }}
                    />
                  </Form.Item>
                  {/* Forgot password and signup link */}
                  <div className="flex items-center justify-between gap-2 my-6 font-semibold text-md">
                    <label
                      className="inline-flex items-center gap-3 text-base text-black cursor-pointer"
                      onClick={() => setRememberPassword((prev) => !prev)}
                    >
                      <input
                        type="checkbox"
                        checked={rememberPassword}
                        onChange={() => setRememberPassword((prev) => !prev)}
                        className="sr-only"
                      />
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-[4px] border-2 border-[#d1ff43] ${
                          rememberPassword ? "bg-[#d1ff43]" : "bg-white"
                        }`}
                      >
                        {rememberPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="w-3 h-3 text-black"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        ) : null}
                      </span>
                      Remember Password
                    </label>
                    <Link
                      to="/auth/forgate-password"
                      className="underline text-md hover:text-black"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <Form.Item>
                    <button
                      className="text-center text-lg p-2 font-bold bg-[#d1ff43]   w-full py-4 rounded-md hover:text-black"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </Form.Item>
                  {/* Sign-up redirect */}
                  <p className="mt-6 text-lg font-semibold text-center">
                    Don't have an account?{" "}
                    <Link to="/auth/signUp1" className="text-[#a55eea]">
                      Sign Up
                    </Link>
                  </p>
                </Form>
              )}
            </ConfigProvider>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 ">
        <img src={img} alt="sign-up" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Login;
