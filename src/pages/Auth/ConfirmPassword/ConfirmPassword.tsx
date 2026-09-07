import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { MdLockOutline } from "react-icons/md";
import { FiEye, FiEyeOff } from "react-icons/fi";
import img from "../../../assets/images/image 420.png";
import logo from "../../../assets/images/logo.png";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";

interface IConfirmPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

const ConfirmPassword: React.FC = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IConfirmPasswordFormValues>({
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = watch("newPassword");

  const onSubmit = async (values: IConfirmPasswordFormValues) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    const resetPasswordToken =
      localStorage.getItem("resetPasswordToken") ?? "";
    if (!resetPasswordToken) {
      message.error("Please verify OTP again");
      navigate("/auth/verifyOtp");
      return;
    }

    try {
      const res = await resetPassword({
        resetPasswordToken,
        newPassword: values.newPassword,
      }).unwrap();

      message.success(res?.message ?? "Password updated");

      localStorage.removeItem("forgotPasswordEmail");
      localStorage.removeItem("forgotPasswordToken");
      localStorage.removeItem("resetPasswordToken");

      navigate("/auth/login");
    } catch (err: unknown) {
      const errorMessage =
        typeof err === "object" && err !== null && "data" in err
          ? (err as { data?: { message?: string } }).data?.message
          : undefined;
      message.error(errorMessage ?? "Failed to update password");
    }
  };

  return (
    <div className="flex min-h-screen p-2 bg-white md:h-screen">
      {/* Left Section - Form */}
      <div className="flex flex-col items-center justify-center w-full px-6 py-10 md:px-16 md:w-1/2 relative">
        <img
          src={logo}
          alt="Logo"
          className="absolute top-5 left-6 md:left-16 cursor-pointer h-10 w-auto"
          onClick={() => navigate("/")}
        />

        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold font-familjen md:text-3xl text-black">
              Reset Your Password
            </h2>
            <p className="mt-2 text-base text-neutral-400">
              The password must be different than previous password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block text-base font-medium text-black/80 mb-2">
                New Password
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 z-10 text-neutral-400">
                  <MdLockOutline className="w-5 h-5" />
                </span>
                <input
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword", {
                    required: "New Password is required",
                    validate: (v: string) => {
                      if (!v || v.length < 8) {
                        return "Password must be at least 8 characters long!";
                      }
                      if (!/[A-Z]/.test(v)) {
                        return "Password must contain at least one uppercase letter!";
                      }
                      if (!/[a-z]/.test(v)) {
                        return "Password must contain at least one lowercase letter!";
                      }
                      if (!/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\/'`~;]/.test(v)) {
                        return "Password must contain at least one special character!";
                      }
                      return true;
                    },
                  })}
                  placeholder="**********"
                  className={`w-full h-14 pl-12 pr-12 bg-white border ${
                    errors.newPassword ? "border-red-500" : "border-neutral-200"
                  } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                >
                  {showNewPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-base font-medium text-black/80 mb-2">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 z-10 text-neutral-400">
                  <MdLockOutline className="w-5 h-5" />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (v: string) => {
                      if (v !== newPasswordValue) {
                        return "Passwords do not match!";
                      }
                      return true;
                    },
                  })}
                  placeholder="**********"
                  className={`w-full h-14 pl-12 pr-12 bg-white border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-neutral-200"
                  } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                className="w-full py-4 text-lg font-bold text-black rounded-xl bg-btnPrimary hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden w-full h-full md:block md:w-1/2 p-2">
        <img
          src={img}
          alt="confirm-password-banner"
          className="object-cover w-full h-full rounded-2xl max-h-[calc(100vh-1rem)]"
        />
      </div>
    </div>
  );
};

export default ConfirmPassword;
