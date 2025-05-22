import { ConfigProvider, Form, Input } from "antd";
import img from "../../assets/images/signup.png";
import { Link } from "react-router-dom";
const SignUp1 = () => {
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
                <div className="mb-4">
                  <h2 className="  text-xl md:text-2xl  lg:text-3xl font-bold mb-6 ">
                    Create Your Account{" "}
                  </h2>
                  <p className=" text-neutral-600 lg:text-lg font-bold">
                    Start your journey. Empower your cause. Accept donations
                    easily.
                  </p>
                </div>
                <div className="h-2 w-full bg-[#a55eea] mt-10"></div>
                <p className="mb-10">Step 1/5</p>

                <Form.Item
                  name="email"
                  label={<p className=" text-md "> Email</p>}
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
                  name="create-password"
                  label={<p className=" text-md ">Create a Password</p>}
                  style={{}}
                >
                  <Input.Password
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="** * * * * *"
                  />
                </Form.Item>
                <Form.Item
                  name="confirm-password"
                  label={<p className=" text-md ">Confirm Password</p>}
                  style={{}}
                >
                  <Input.Password
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="** * * * * *"
                  />
                </Form.Item>

                <Form.Item className="">
                  <Link to="/auth/signUp2">
                    <button
                      className="text-center  p-2 font-bold bg-btnPrimary text-white w-full py-2 rounded-md shadow-lg"
                      type="submit"
                    >
                      Continue
                    </button>
                  </Link>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </div>
        <div className="md:full md:w-[50%] ">
          <img src={img} alt="sign up" className="w-full  h-screen " />
        </div>
      </div>
    </div>
  );
};

export default SignUp1;
