/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAddBankAccountMutation } from "../../redux/features/integrationApi/integrationApi";
import { message } from "antd";

const Cancel = () => {
  const [addBankAccount] = useAddBankAccountMutation();
  const handleAddBankModal = async () => {
    try {
      const res = await addBankAccount({}).unwrap();
      console.log("url", res.data.onboardingUrl);
      window.location.href = res.data.onboardingUrl;

      message.success(res?.message);
    } catch (error: any) {
      message.error("Bank Not Added");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Connection Cancelled
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          The Stripe connection process was cancelled or not completed. No
          changes were made to your account.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleAddBankModal}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition"
          >
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-lg transition"
          >
            Go to Dashboard
          </button>
        </div>

        {/* Helper Text */}
        <p className="text-sm text-gray-400 mt-4">
          If you’re having trouble connecting Stripe, please contact support.
        </p>
      </div>
    </div>
  );
};

export default Cancel;
