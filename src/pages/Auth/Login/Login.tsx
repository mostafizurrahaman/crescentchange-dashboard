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
  const nevigate = useNavigate();
  const [loginApi, { isLoading }] = useLoginApiMutation();
  const onFinish = async (values: login) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await loginApi(data).unwrap();
      message.success(res?.message);
      form.resetFields();
      localStorage.setItem("token", res?.data?.accessToken);
      nevigate("/");
    } catch (error) {
      // message.error(error?.data.message);
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
                  <div className="mb-4 text-center">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
                      Welcome Back!
                    </h2>
                    <p className="text-neutral-400 lg:text-lg">
                      Sign in to access the Super Admin Dashboard.
                    </p>
                  </div>
                  <Form.Item
                    name="email"
                    label={<p className="text-lg ">Email Address</p>}
                  >
                    <Input
                      required
                      className=""
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
                    label={<p className="text-lg ">Password</p>}
                  >
                    <Input.Password
                      required
                      className=""
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
                  {/* Forgot password and signup link */}
                  <div className="flex justify-between items-center font-semibold gap-2 text-md my-6">
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
