import { ConfigProvider, Form, Input } from "antd";
import img from "../../assets/images/login.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
const SignUp2 = () => {
  const [active, setActive] = useState("Charity");

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
                    Tell Us About Your Organization
                  </h2>
                  <p className="text-neutral-600  lg:text-lg font-semibold">
                    Empowering change through education, relief, and support.
                    Your help makes an impact.
                  </p>
                </div>
                <div className="my-10">
                  <div className="h-2 w-full bg-btnPrimary"></div>
                  <p className="">Step 2/5</p>
                </div>
                <Form.Item
                  name="service-type"
                  label={
                    <p className=" text-lg text-neutral-500 "> services type</p>
                  }
                  style={{}}
                >
                  <div className="flex justify-between items-center gap-2">
                    <button
                      className={
                        active === "Charity"
                          ? "w-full py-2 bg-btnPrimary text-white rounded-md"
                          : "w-full py-2 bg-neutral-300 text-black rounded-md"
                      }
                      type="button"
                      onClick={() => setActive("Charity")}
                    >
                      Charity
                    </button>
                    <button
                      className={
                        active === "Mosque"
                          ? "w-full py-2 bg-btnPrimary text-white rounded-md"
                          : "w-full py-2 bg-neutral-300 text-black rounded-md"
                      }
                      type="button"
                      onClick={() => setActive("Mosque")}
                    >
                      Mosque
                    </button>
                    <button
                      className={
                        active === "Non profit Organization"
                          ? "w-full py-2 bg-btnPrimary text-white rounded-md"
                          : "w-full py-2 bg-neutral-300 text-black rounded-md"
                      }
                      type="button"
                      onClick={() => setActive("Non profit Organization")}
                    >
                      Non profit Organization
                    </button>
                  </div>
                </Form.Item>

                <Form.Item
                  name="organoisation-name"
                  label={
                    <p className=" text-lg text-neutral-500 ">
                      Your organisation name
                    </p>
                  }
                  style={{}}
                >
                  <Input
                    required
                    style={{ padding: "6px" }}
                    className=" text-neutral-500"
                    placeholder="Your Organisation Name"
                  />
                </Form.Item>
                <Form.Item
                  name="organoisation-address"
                  label={
                    <p className=" text-lg text-neutral-500 ">
                      Your organisation Address
                    </p>
                  }
                  style={{}}
                >
                  <Input
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="Your Organisation Address"
                  />
                </Form.Item>

                <Form.Item className="">
                  <Link to="/auth/signUp3">
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
                  to="/auth/signUp1"
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

export default SignUp2;
