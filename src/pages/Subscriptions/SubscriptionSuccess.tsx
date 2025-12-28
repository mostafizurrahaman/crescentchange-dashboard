import { Link } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi2";

const SubscriptionSuccess: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="my-3 text-xl font-semibold md:text-3xl">
          Subscription Successful
        </h1>
        <p className="text-gray-500">
          Your subscription has been activated successfully.
        </p>
      </div>

      <div className="p-6 bg-white border rounded-3xl">
        <div className="flex items-center gap-3 mb-4">
          <HiCheckCircle className="text-green-600 h-7 w-7" />
          <p className="text-xl font-semibold">Payment confirmed</p>
        </div>

        <p className="text-gray-600">
          You can now return to the subscription page and continue using all
          premium features.
        </p>

        <div className="mt-6">
          <Link
            to="/subscription"
            className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-purple-500 rounded-3xl"
          >
            Back to Subscriptions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
