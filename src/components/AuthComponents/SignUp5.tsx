import { Checkbox, ConfigProvider, Form } from "antd";
import img from "../../assets/images/login.png";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const SignUp5 = () => {
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
                    Review & Sign Up
                  </h2>
                  <p className="  lg:text-lg text-neutral-600">
                    Securely enter your card information to complete your
                    donation. Your data is encrypted and protected at every
                    step.
                  </p>
                </div>
                <div className="my-10">
                  <div className="h-2 w-full bg-btnPrimary"></div>
                  <p className="">Step 5/5</p>
                </div>

                <div className="my-10">
                  <h1 className="text-lg font-bold">Terms & Donation Policy</h1>
                  <p className="text-neutral-600">
                    These Terms apply to your use of our dashboard and your
                    participation in automated donations and reward programs.
                  </p>
                  <p className="text-neutral-600">
                    By continuing, you agree to:
                  </p>
                  <ul className="list-disc ml-10 my-5">
                    <li className="text-neutral-600 list-disc">
                      We may process recurring donations on your behalf
                      according to your selected plan.
                    </li>
                    <li className="text-neutral-600 list-disc">
                      Your payment information will be securely stored and never
                      shared.
                    </li>
                    <li className="text-neutral-600 list-disc">
                      You may occasionally receive updates or perks from trusted
                      partner brands.
                    </li>
                    <li className="text-neutral-600 list-disc">
                      You acknowledge that all activity complies with our
                      privacy policy and nonprofit verification standards.
                    </li>
                  </ul>
                  <Checkbox style={{ color: "black" }}>
                    I Agree with terms & conditions
                  </Checkbox>
                </div>
                <Form.Item className="">
                  <Link to="/auth/login">
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
                  to="/auth/signUp4"
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

export default SignUp5;
