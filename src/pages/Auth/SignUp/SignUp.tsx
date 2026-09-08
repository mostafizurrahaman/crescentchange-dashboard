/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import logo from "../../../assets/images/logo.svg";
import img from "../../../assets/images/login.png";
import { useSignUpMutation } from "../../../redux/features/auth/authApi";
import { ISignUpFormValues } from "../../../components/AuthComponents/steps/types";
import Step1Account from "../../../components/AuthComponents/steps/Step1Account";
import Step2Organization from "../../../components/AuthComponents/steps/Step2Organization";
import Step3Compliance from "../../../components/AuthComponents/steps/Step3Compliance";
import Step4BoardMember from "../../../components/AuthComponents/steps/Step4BoardMember";

const TOTAL_STEPS = 4;

const SignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [signUpMutation, { isLoading: isSubmitting }] = useSignUpMutation();

  const methods = useForm<ISignUpFormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      serviceType: "charity",
      address: "",
      state: "",
      postalCode: "",
      country: "",
      website: "",
      phoneNumber: "",
      tfnOrAbnNumber: "",
      acncNumber: "",
      zakatLicenseHolderNumber: "",
      boardMemberName: "",
      boardMemberEmail: "",
      boardMemberPhoneNumber: "",
      drivingLicense: null,
    },
  });

  const handleNext = async (fieldsToValidate: (keyof ISignUpFormValues)[]) => {
    const isValid = await methods.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(TOTAL_STEPS, prev + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: ISignUpFormValues) => {
    const isStep4Valid = await methods.trigger([
      "boardMemberName",
      "boardMemberEmail",
      "boardMemberPhoneNumber",
      "drivingLicense",
    ]);

    if (!isStep4Valid) {
      return;
    }

    if (!data.drivingLicense) {
      message.error("Please upload your document");
      return;
    }

    const payload = {
      name: data.name ?? "",
      email: data.email ?? "",
      password: data.password ?? "",

      serviceType: data.serviceType ?? "charity",
      address: data.address ?? "",
      state: data.state ?? "",
      country: data.country ?? "",
      postalCode: data.postalCode ?? "",
      phoneNumber: data.phoneNumber ?? "",
      website: data.website ?? "",

      tfnOrAbnNumber: data.tfnOrAbnNumber ?? "",
      acncNumber: data.acncNumber ?? "",
      zakatLicenseHolderNumber: data.zakatLicenseHolderNumber ?? "",

      boardMemberName: data.boardMemberName ?? "",
      boardMemberEmail: data.boardMemberEmail ?? "",
      boardMemberPhoneNumber: data.boardMemberPhoneNumber ?? "",
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      formData.append("drivingLicense", data.drivingLicense);

      const res = await signUpMutation(formData).unwrap();
      message.success(res?.message ?? "Account created successfully");

      // Save email for OTP screen fallback on refresh
      localStorage.setItem("organization", JSON.stringify({ email: data.email }));

      navigate("/auth/verifyOtpforSignUp", {
        state: { email: data.email },
      });
    } catch (err: any) {
      message.error(
        err?.data?.message || err?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex p-2 bg-white">
      {/* Crescent Change Logo */}
      <img
        src={logo}
        alt="Logo"
        className="absolute top-5 left-8 z-20 h-10 w-auto cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Left Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-4 py-20 relative">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full flex justify-center"
          >
            {currentStep === 1 && (
              <Step1Account
                totalSteps={TOTAL_STEPS}
                currentStep={currentStep}
                onNext={() => handleNext(["name", "email", "password"])}
              />
            )}

            {currentStep === 2 && (
              <Step2Organization
                totalSteps={TOTAL_STEPS}
                currentStep={currentStep}
                onNext={() =>
                  handleNext([
                    "serviceType",
                    "address",
                    "state",
                    "postalCode",
                    "country",
                    "website",
                    "phoneNumber",
                  ])
                }
                onPrev={handlePrev}
              />
            )}

            {currentStep === 3 && (
              <Step3Compliance
                totalSteps={TOTAL_STEPS}
                currentStep={currentStep}
                onNext={() => handleNext(["tfnOrAbnNumber", "acncNumber"])}
                onPrev={handlePrev}
              />
            )}

            {currentStep === 4 && (
              <Step4BoardMember
                totalSteps={TOTAL_STEPS}
                currentStep={currentStep}
                onSubmit={methods.handleSubmit(onSubmit)}
                onPrev={handlePrev}
                isSubmitting={isSubmitting}
              />
            )}
          </form>
        </FormProvider>
      </div>

      {/* Right Image Banner */}
      <div className="hidden md:block md:w-1/2 p-2">
        <img
          src={img}
          alt="sign-up banner"
          className="w-full h-full object-cover rounded-2xl max-h-[calc(100vh-1rem)] sticky top-2"
        />
      </div>
    </div>
  );
};

export default SignUp;