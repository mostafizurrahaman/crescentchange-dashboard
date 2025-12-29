import { Link } from "react-router-dom";
import { HiXCircle } from "react-icons/hi2";

const SubscriptionCancel: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="my-3 text-xl font-semibold md:text-3xl">
          Subscription Cancelled
        </h1>
        <p className="text-gray-500">Your checkout session was cancelled.</p>
      </div>

      <div className="rounded-3xl border bg-white p-6">
        <div className="mb-4 flex items-center gap-3">
          <HiXCircle className="h-7 w-7 text-red-600" />
          <p className="text-xl font-semibold">No payment was made</p>
        </div>

        <p className="text-gray-600">
          If you faced any issue during payment, you can try again from the
          subscription page.
        </p>

        <div className="mt-6">
          <Link
            to="/subscription"
            className="inline-flex items-center justify-center rounded-3xl bg-purple-500 px-6 py-3 font-semibold text-white"
          >
            Back to Subscriptions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCancel;
