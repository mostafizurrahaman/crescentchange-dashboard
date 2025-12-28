import { ConfigProvider, Form, Input, message } from "antd";
import img from "../../../assets/images/Frame 2087326397.png";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useForgotPasswordMutation } from "../../../redux/features/auth/authApi";
const ForgatePassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const onFinish = async (values: { email: string }) => {
    try {
      const res = await forgotPassword({ email: values.email }).unwrap();
      const token = res?.data?.token;

      localStorage.setItem("forgotPasswordEmail", values.email);
      if (token) {
        localStorage.setItem("forgotPasswordToken", token);
      }

      message.success(res?.message ?? "OTP sent to your email");
      navigate("/auth/verifyOtp");
    } catch (err: unknown) {
      const errorMessage =
        typeof err === "object" && err !== null && "data" in err
          ? (err as { data?: { message?: string } }).data?.message
          : undefined;
      message.error(errorMessage ?? "Failed to send OTP");
    }
  };
  return (
    <div className="flex h-screen p-2">
      <div className="flex flex-col items-center justify-center w-full bg-white md:w-1/2">
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
                <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
                  Reset your password
                </h2>
                <p className="mt-3 mb-6 text-gray-600">
                  We’ll send you a code on your registered email.
                </p>
              </div>
              <Form.Item
                name="email"
                label={<p className=" text-md">Enter your registered email</p>}
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
                <button
                  className="w-full px-8 py-4 text-lg text-center text-black rounded-md shadow-lg bg-btnPrimary disabled:opacity-60"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send"}
                </button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
      <div className="flex items-end justify-end">
        <img src={img} alt="sign-up" className="w-full h-screen" />
      </div>
    </div>
  );
};

export default ForgatePassword;
