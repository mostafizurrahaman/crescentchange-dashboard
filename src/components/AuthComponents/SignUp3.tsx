import { ConfigProvider, Form, Input,} from "antd";
import img from "../../assets/images/login.png"; // Adjust path as necessary
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // Adjust path as necessary


const SignUp3 = () => {

  const onFinish = () => {};

  return (
    <div className="h-screen flex">
      {/* Left section - Form */}
      <div className="bg-white p-10 flex flex-col justify-center items-center w-full md:w-1/2">
        <img src={logo} alt="Logo" className="absolute top-5 left-10" />
        <div className="w-full max-w-sm mt-20">
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
                   Verify Your Registration
                  </h2>
                  <p className="text-neutral-600  lg:text-lg">
                   Verify your registration details for compliance.
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
                    placeholder="62 123 456 789"
                  />
                </Form.Item>
                <Form.Item
                  name="ten-digit"
                  label={<p className=" text-md ">ACNC Registration Number</p>}
                  style={{}}
                >
                  <Input
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="ACNC-987654"
                  />
                </Form.Item>
                <Form.Item
                  name="ten-digit"
                  label={<p className=" text-md ">Zakat License Holder Number (Optional)</p>}
                  style={{}}
                >
                  <Input
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="ZL-45678"
                  />
                </Form.Item>


                
                <Form.Item className="">
                  <Link to="/auth/signUp4">
                    <button
                      className="text-center  p-2 font-bold bg-btnPrimary  w-full py-2 rounded-md shadow-lg"
                      type="submit"
                    >
                      Continue
                    </button>
                  </Link>
                </Form.Item>
              </Form>
              {/* <div className=" font-semibold gap-2 text-md">
                <Link
                  to="/auth/signUp2"
                  className=" text-md flex items-center justify-start gap-2"
                >
                  <FaArrowLeft />
                  Back
                </Link>
              </div> */}
            </ConfigProvider>
          </div>
        </div>
      </div>

      {/* Right section - Image */}
      <div className="w-full md:w-1/2">
        <img src={img} alt="sign-up" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SignUp3;
