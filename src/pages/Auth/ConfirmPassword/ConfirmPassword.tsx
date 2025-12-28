import { ConfigProvider, Form, Input, message } from "antd";
import img from "../../../assets/images/image 420.png"; // Path to the image
import logo from "../../../assets/images/logo.png"; // Path to the logo
import { useNavigate } from "react-router-dom";
import { MdLockOutline } from "react-icons/md";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";

const ConfirmPassword = () => {
  const neviaget = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onFinish = async (values: {
    "new-password": string;
    "confirm-password": string;
  }) => {
    const newPassword = values["new-password"];
    const confirmPassword = values["confirm-password"];

    if (newPassword !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    const resetPasswordToken = localStorage.getItem("resetPasswordToken") ?? "";
    if (!resetPasswordToken) {
      message.error("Please verify OTP again");
      neviaget("/auth/verifyOtp");
      return;
    }

    try {
      const res = await resetPassword({ resetPasswordToken, newPassword }).unwrap();
      message.success(res?.message ?? "Password updated");

      localStorage.removeItem("forgotPasswordEmail");
      localStorage.removeItem("forgotPasswordToken");
      localStorage.removeItem("resetPasswordToken");

      neviaget("/auth/login");
    } catch (err: unknown) {
      const errorMessage =
        typeof err === "object" && err !== null && "data" in err
          ? (err as { data?: { message?: string } }).data?.message
          : undefined;
      message.error(errorMessage ?? "Failed to update password");
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
              name="login"
              initialValues={{ remember: false }}
              onFinish={onFinish}
              layout="vertical"
            >
              <div className="mb-4 text-center">
                <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
                  Reset Your Password
                </h2>
                <p className="pt-3 pb-6 text-neutral-400">
                  The password must be different than previous password.
                </p>
              </div>

              <Form.Item
                name="new-password"
                label={<p className="text-lg ">New Password</p>}
              >
                <Input.Password
                  required
                  className=""
                  prefix={<MdLockOutline className="w-5 h-5 mr-2" />}
                  placeholder="********"
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    width: "100%",
                    height: "52px",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="confirm-password"
                label={
                  <p className="text-lg ">Confirm Password</p>
                }
              >
                <Input.Password
                  required
                  className=""
                  prefix={<MdLockOutline className="w-5 h-5 mr-2" />}
                  placeholder="********"
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    width: "100%",
                    height: "52px",
                  }}
                />
              </Form.Item>

              <Form.Item>
                <button
                  className="w-full py-4 text-xl font-bold rounded-md bg-btnPrimary disabled:opacity-60"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>

      <div className="w-full md:w-1/2 ">
        <img src={img} alt="sign-up" className="w-full h-full" />
      </div>
    </div>
  );
};

export default ConfirmPassword;
