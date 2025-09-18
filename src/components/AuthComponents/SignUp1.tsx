import { ConfigProvider, Form, Input } from "antd";
import img from "../../assets/images/login.png";  // Adjust path as necessary
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";  // Adjust path as necessary

const SignUp1 = () => {
  const onFinish = () => {};
  return (
    <div className="h-screen flex">
      {/* Left section - Form */}
      <div className="bg-white p-10 flex flex-col justify-center items-center w-full md:w-1/2">
        <img src={logo} alt="Logo" className="absolute top-5 left-10" />
        <div className="w-full max-w-sm mt-20">
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
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Let's Setup Your Account</h2>
                <p className="text-neutral-600 text-lg mb-6">
                  Start your journey. Empower your cause. Accept donations easily.
                </p>
                <div className="h-2 w-1/2 mx-auto bg-[#a55eea] mb-4"></div>
                <p className="mb-6">Step 1/5</p>
              </div>

              <Form.Item
                name="organisation"
                label="Organisation Name"
                required
              >
                <Input placeholder="Enter Organisation Name" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                required
              >
                <Input placeholder="Enter Email Address" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                required
              >
                <Input.Password placeholder="Enter Password" />
              </Form.Item>

              <Form.Item>
                <Link to="/auth/signUp2">
                  <button className="bg-btnPrimary  w-full py-2 rounded-md shadow-lg font-bold">
                    Continue
                  </button>
                </Link>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>

      {/* Right section - Image */}
      <div className="w-full md:w-1/2">
        <img src={img} alt="sign-up" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SignUp1;
