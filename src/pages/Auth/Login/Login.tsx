import {  ConfigProvider, Form, Input } from "antd";
import img from "../../../assets/images/login.png";
import { Link } from "react-router-dom";
type FieldType = {
  remember: boolean;
};

const Login = () => {
  const onFinish = () => {};
  return (
    <div className="h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="bg-white h-screen w-full md:w-[50%]  px-32 py-40">
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
                name="contact"
                initialValues={{ remember: false }}
                //   style={{ maxWidth: 800 }}
                onFinish={onFinish}
                layout="vertical"
                className="mt-20"
              >
                <div className="mb-4  ">
                  <h2 className="   text-xl md:text-2xl  lg:text-3xl font-bold mb-6 ">
                    Sign In
                  </h2>
                  <p className="text-neutral-600  lg:text-lg">
                    Start your journey. Empower your cause. Accept donations
                    easily.
                  </p>
                </div>
                <Form.Item
                  name="email"
                  label={<p className=" text-md ">Enter your Email</p>}
                  style={{}}
                >
                  <Input
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="Your Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label={<p className=" text-md ">Enter your Password</p>}
                  style={{}}
                >
                  <Input
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item<FieldType>
                  name={"remember"}
                  valuePropName="checked"
                  label={null}
                ></Form.Item>

                <Form.Item className="">
                  <Link to="/">
                    <button
                      className="text-center w-full p-2 font-bold bg-[#a55eea] text-white px-8 py-2 rounded-md shadow-lg"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </Link>
                </Form.Item>
                <div className="flex justify-center items-center font-semibold gap-2 text-md">
                  <Link to="/auth/forgate-password" className=" text-md ">
                    Forgate Password
                  </Link>
                </div>
                <p className="text-md mt-40 text-lg text-center font-semibold">
                  Don't have an account ?{" "}
                  <Link to="/auth/signUp1" className=" text-md text-[#a55eea]">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </ConfigProvider>
          </div>
        </div>
        <div className="md:full md:w-[50%] ">
          <img
            src={img}
            alt="sign up"
            className="w-full h-screen hidden md:block "
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
