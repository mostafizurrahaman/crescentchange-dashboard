/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Checkbox, ConfigProvider, Form, Input, message, Spin } from "antd";
import img from "../../../assets/images/login.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { useLoginApiMutation } from "../../../redux/features/auth/authApi";

interface login {
  email: string;
  password: string;
}

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
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
    <div className="h-screen flex p-2">
      <div className="bg-white flex flex-col justify-center items-center w-full md:w-1/2">
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
                <div className="flex justify-center items-center">
                  <Spin className="h-20 w-20"></Spin>
                </div>
              ) : (
                <Form
                  name="contact"
                  initialValues={{ remember: false }}
                  onFinish={onFinish}
                  layout="vertical"
                  className=""
                  form={form}
                >
                  <div className="mb-8 text-center">
                    <h2 className="text-xl md:text-[30px] font-bold mb-3">
                      Welcome Back!
                    </h2>
                    <p className="text-neutral-400 lg:text-[14px">
                      Sign in to manage everything.
                    </p>
                  </div>
                  <Form.Item
                    name="email"
                    label={<p className="text-[14px]">Email</p>}
                  >
                    <Input
                      required
                      className=""
                      prefix={<AiOutlineMail className="mr-2 h-5 w-5" />}
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
                      prefix={<MdLockOutline className="mr-2 h-5 w-5" />}
                      placeholder="********"
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        width: "100%",
                        height: "52px",
                      }}
                    />
                  </Form.Item>
                  {/* Forgot password and signup link */}
                  <div className="flex justify-between items-center font-semibold gap-2 text-md my-6">
                    <ConfigProvider
                      theme={{
                        components: {
                          Checkbox: {
                            colorPrimary: "rgb(209,255,67)",
                            colorPrimaryBorder: "rgb(209,255,67)",
                            colorPrimaryHover: "rgb(209,255,67)",
                            colorWhite: "rgb(0,0,0)",
                          },
                        },
                      }}
                    >
                      {" "}
                      <Checkbox>Remember Password</Checkbox>{" "}
                    </ConfigProvider>
                    <Link
                      to="/auth/forgate-password"
                      className="text-md underline hover:text-black"
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
                  <p className="mt-6 text-lg text-center font-semibold">
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
