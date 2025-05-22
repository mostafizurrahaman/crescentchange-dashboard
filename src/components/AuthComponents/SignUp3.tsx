import { ConfigProvider, Form, Input } from "antd";
import img from "../../assets/images/login.png";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const SignUp3 = () => {
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
                    Register Your Organization
                  </h2>
                  <p className="text-neutral-600  lg:text-lg">
                    Register your nonprofit to join our trusted network and
                    amplify your impact. It’s quick, secure, and built to
                    support your mission.
                  </p>
                </div>
                <div className="my-10">
                  <div className="h-2 w-full bg-btnPrimary"></div>
                  <p className="">Step 3/5</p>
                </div>
                <Form.Item
                  name="ten-digit"
                  label={<p className=" text-md ">TFN/ABN</p>}
                  style={{}}
                >
                  <Input
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="Your TFN or ABN"
                  />
                </Form.Item>
                <Form.Item
                  name="website"
                  label={<p className=" text-md ">Organization Website </p>}
                  style={{}}
                >
                  <Input
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="Your Email"
                  />
                </Form.Item>

             
                  <Form.Item className="">
                    <Link to="/auth/signUp4">
                      <button
                        className="text-center  p-2 font-bold bg-btnPrimary text-white w-full py-2 rounded-md shadow-lg"
                        type="submit"
                      >
                        Continue
                      </button>
                    </Link>
                  </Form.Item>
          
              </Form>
              <div className=" font-semibold gap-2 text-md">
                <Link
                  to="/auth/signUp2"
                  className=" text-md flex items-center justify-start gap-2"
                >
                  <FaArrowLeft />
                  Back
                </Link>
              </div>
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

export default SignUp3;
