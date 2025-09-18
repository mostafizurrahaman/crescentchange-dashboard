import { ConfigProvider, Form, Input } from "antd";
import img from "../../../assets/images/Frame 2087326397.png";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
const ForgatePassword = () => {
  const onFinish = () => {};
  return (
    <div className="">
      <div className="relative grid grid-cols-1 md:grid-cols-2 justify-center items-center p-4">
        <div className="bg-white p-10">
          <img src={logo} alt="Logo" className="absolute top-5" />

          <div className="flex justify-center items-center">
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
                  style={{ maxWidth: 800 }}
                onFinish={onFinish}
                layout="vertical"
                className="mt-20"
              >
                <div className="mb-4 text-center ">
                  <h2 className="  text-xl md:text-2xl  lg:text-3xl font-bold">
                  Reset your password
                  </h2>
                  <p className="text-gray-600 mt-3 mb-6">
                   We’ll send you a code on your registered email.
                  </p>
                </div>
                <Form.Item
                  name="email"
                  label={
                    <p className=" text-md ">Enter your registered email</p>
                  }
                  style={{}}
                >
                  <Input
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="Enter Email Address"
                  />
                </Form.Item>
                {/* <Form.Item
                                    name="password"
                                    label={<p className=" text-md text-white">Enter your Password</p>}
                                    style={{}}
                                >
                                    <Input
                                        required
                                        style={{ padding: "6px" }}
                                        className=" text-md"
                                        placeholder="Password"
                                    />
                                </Form.Item> */}

                <Form.Item className="">
                  <Link to="/auth/varification">
                    <button
                      className="text-center w-full p-2 font-bold bg-btnPrimary text-black px-8 py-2 rounded-md shadow-lg"
                      type="submit"
                    >
                      Send
                    </button>
                  </Link>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </div>
        <div className="flex justify-end items-end">
          <img src={img} alt="sign-up" className="w-full h-screen" />
        </div>
      </div>
    </div>
  );
};

export default ForgatePassword;
