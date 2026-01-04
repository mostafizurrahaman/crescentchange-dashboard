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
    <div className="flex min-h-screen p-2 bg-white md:h-screen">
      <div className="flex flex-col items-center mt-32 w-full px-6 py-10 md:px-16 md:w-1/2">
        <img src={logo} alt="Logo" className="absolute top-5 left-6 md:left-16" />
        <div className="w-full max-w-md">
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
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold font-familjen md:text-4xl">
                  Reset your password
                </h2>
                <p className="mt-3 text-base text-gray-500">
                  We’ll send you a code on your registered email.
                </p>
              </div>
              <Form.Item
                name="email"
                label={<p className="text-sm font-medium text-gray-700 md:text-base">Enter your registered email</p>}
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
                  className="w-full px-8 py-4 text-lg font-semibold text-center text-black rounded-xl bg-btnPrimary disabled:opacity-60"
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
      <div className="hidden w-full h-full md:block md:w-1/2">
        <img src={img} alt="sign-up" className="object-cover w-full h-full rounded-r-3xl" />
      </div>
    </div>
  );
};

export default ForgatePassword;
