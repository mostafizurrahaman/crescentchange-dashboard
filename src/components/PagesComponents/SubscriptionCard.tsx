import star from "../../assets/images/Star Emphasis.png";
import { HiCheckBadge, HiArrowPath } from "react-icons/hi2";
import {
  useCreateSubscriptionSessionMutation,
  useGetSubscriptionMeQuery,
} from "../../redux/features/subscriptionApi/subscriptionApi";

const SubscriptionCard: React.FC = () => {
  const { data: subscriptionMeData } = useGetSubscriptionMeQuery();
  const [createSession, { isLoading: isCreatingSession }] =
    useCreateSubscriptionSessionMutation();

  const hasActiveSubscription = subscriptionMeData?.data?.status === "active";
  const activePlanType = hasActiveSubscription
    ? subscriptionMeData?.data?.planType
    : undefined;
  const isFocusActive = activePlanType === "monthly";
  const isFreedomActive = activePlanType === "yearly";

  const startCheckout = async (planType: "monthly" | "yearly") => {
    const res = await createSession({ planType }).unwrap();
    const url = res?.data?.url ?? res?.url;
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div className="grid items-start justify-between grid-cols-1 gap-4 my-5 md:grid-cols-2">
      {/* Focus */}
      <div className="p-6 bg-white rounded-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100">
            <img src={star} alt="" className="w-5 h-5" />
          </div>
          <p className="text-2xl font-semibold">Focus Plan</p>
          {isFocusActive ? (
            <button
              className="px-2 py-1 text-white bg-green-500 rounded-3xl"
              aria-label="Current plan"
            >
              Active Plan
            </button>
          ) : null}
        </div>

        <div className="my-6 space-y-2">
          <h1 className="text-4xl font-bold">
            <span className="text-gray-400"> $</span>
            20 <span className="text-sm font-thin text-gray-600">/ month</span>
          </h1>

          <ul className="text-lg text-gray-500 list-decimal">
            <li className="flex items-center gap-2">
              <HiCheckBadge className="w-4 h-4" /> Everything in Basic, and
              more.
            </li>
            <li className="flex items-center gap-2">
              <HiCheckBadge className="w-4 h-4" /> Advanced donation filters.
            </li>
            <li className="flex items-center gap-2">
              <HiCheckBadge className="w-4 h-4" />
              Monthly deposit reports.
            </li>
            <li className="flex items-center gap-2">
              <HiCheckBadge className="w-4 h-4" />
              Real-time donation tracking.
            </li>
          </ul>
        </div>

        {isFocusActive ? (
          <button className="w-full py-4 font-bold text-purple-500 border-2 border-purple-500 rounded-3xl">
            Cancel Subscription
          </button>
        ) : (
          <button
            className="flex items-center justify-center w-full gap-2 py-4 text-white bg-purple-500 rounded-3xl disabled:opacity-60"
            onClick={() => startCheckout("monthly")}
            disabled={isCreatingSession || hasActiveSubscription}
          >
            {isCreatingSession ? (
              <>
                <HiArrowPath className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : hasActiveSubscription ? (
              "Active subscription"
            ) : (
              "Upgrade"
            )}
          </button>
        )}
      </div>

      {/* Freedom */}
      <div className="p-6 bg-white rounded-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100">
            <img src={star} alt="" className="w-5 h-5" />
          </div>
          <p className="text-2xl font-semibold">Freedom Plan</p>
          {isFreedomActive ? (
            <button
              className="px-2 py-1 text-white bg-green-500 rounded-3xl"
              aria-label="Current plan"
            >
              Active Plan
            </button>
          ) : null}
        </div>

        <div className="my-6 space-y-2">
          <h1 className="text-4xl font-bold">
            <span className="text-gray-400"> $</span>
            120 <span className="text-sm font-thin text-gray-600">/ 6 months</span>
          </h1>

          <ul className="text-lg text-gray-500 list-decimal">
            <li className="flex items-center gap-2">
              <HiCheckBadge className="w-4 h-4" />
              Access to donation dashboard.
            </li>
            <li className="flex items-center gap-2">
              <HiCheckBadge className="w-4 h-4" /> View donor analytics.
            </li>
            <li className="flex items-center gap-2">
              <HiCheckBadge className="w-4 h-4" />
              Priority support.
            </li>
            <li className="flex items-center gap-2">
              <HiCheckBadge className="w-4 h-4" />
              Real-time donation tracking.
            </li>
          </ul>
        </div>

        {isFreedomActive ? (
          <button className="w-full py-4 font-bold text-purple-500 border-2 border-purple-500 rounded-3xl">
            Cancel Subscription
          </button>
        ) : (
          <button
            className="flex items-center justify-center w-full gap-2 py-4 text-white bg-purple-500 rounded-3xl disabled:opacity-60"
            onClick={() => startCheckout("yearly")}
            disabled={isCreatingSession || hasActiveSubscription}
          >
            {isCreatingSession ? (
              <>
                <HiArrowPath className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : hasActiveSubscription ? (
              "Active subscription"
            ) : (
              "Upgrade"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;
