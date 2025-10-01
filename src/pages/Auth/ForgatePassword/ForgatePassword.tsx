import { ConfigProvider, Form, Input } from "antd";
import img from "../../../assets/images/Frame 2087326397.png";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
const ForgatePassword = () => {
  const onFinish = () => {};
  return (
    <div className="h-screen flex p-2">
      <div className="bg-white flex flex-col justify-center items-center w-full md:w-1/2">
        <img src={logo} alt="Logo" className="absolute top-5 right-5 left-10" />
        <div className=" w-[400px] ">
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
              onFinish={onFinish}
              layout="vertical"
              className=""
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
                label={<p className=" text-md ">Enter your registered email</p>}
                style={{}}
              >
                <Input
                  required
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    width: "100%",
                    height: "52px",
                  }}
                  className=" text-md"
                  placeholder="Enter Email Address"
                />
              </Form.Item>
         

              <Form.Item className="">
                <Link to="/auth/varification">
                  <button
                    className="text-center w-full py-4 text-lg bg-btnPrimary text-black px-8 rounded-md shadow-lg"
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
  );
};

export default ForgatePassword;
