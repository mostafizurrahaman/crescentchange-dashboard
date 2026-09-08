/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LuSparkles } from "react-icons/lu";
import { HiCheckBadge, HiArrowPath } from "react-icons/hi2";
import { message } from "antd";
import {
  useCreateSubscriptionSessionMutation,
  useCancelSubscriptionMutation,
  useGetSubscriptionMeQuery,
} from "../../redux/features/subscriptionApi/subscriptionApi";
import { useState } from "react";

const SubscriptionCard: React.FC = () => {
  const [loadingPlan, setLoadingPlan] = useState<"monthly" | "yearly" | null>(
    null
  );
  const { data: subscriptionMeData } = useGetSubscriptionMeQuery();
  const [createSession] =
    useCreateSubscriptionSessionMutation();
  const [cancelSubscription, { isLoading: isCancelingSubscription }] =
    useCancelSubscriptionMutation();

  const hasActiveSubscription = subscriptionMeData?.data?.status === "active";
  const isCancelAtPeriodEnd = Boolean(
    hasActiveSubscription && subscriptionMeData?.data?.cancelAtPeriodEnd
  );
  const activePlanType = hasActiveSubscription
    ? subscriptionMeData?.data?.planType
    : undefined;
  const isFocusActive = activePlanType === "monthly";
  const isFreedomActive = activePlanType === "yearly";
  const cancelAt = subscriptionMeData?.data?.currentPeriodEnd
    ? new Date(subscriptionMeData.data.currentPeriodEnd).toLocaleDateString()
    : undefined;

  const startCheckout = async (planType: "monthly" | "yearly") => {
    try {
      setLoadingPlan(planType);
      const res = await createSession({ planType }).unwrap();
      const url = res?.data?.url ?? res?.url;

      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      message.error("Failed to start checkout");
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const res = await cancelSubscription().unwrap();
      message.success(res?.message ?? "Subscription canceled");
    } catch {
      message.error("Failed to cancel subscription");
    }
  };

  return (
    <div className="grid items-start justify-between grid-cols-1 gap-4 my-5 md:grid-cols-2">
      {/* Focus */}
      <div className="p-6 bg-white rounded-3xl border border-neutral-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 text-neutral-800">
            <LuSparkles className="w-5 h-5" />
          </div>
          <p className="text-2xl font-semibold font-familjen">Focus Plan</p>
          {isFocusActive ? (
            <button
              className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${
                isCancelAtPeriodEnd ? "bg-yellow-500" : "bg-green-500"
              }`}
              aria-label="Current plan"
            >
              {isCancelAtPeriodEnd ? "Canceling" : "Active Plan"}
            </button>
          ) : null}
        </div>

        <div className="my-6 space-y-4">
          <h1 className="text-4xl font-bold font-familjen">
            <span className="text-gray-400">$</span>
            20 <span className="text-sm font-normal text-gray-500">/ month</span>
          </h1>

          <ul className="space-y-3 text-base text-neutral-600">
            <li className="flex items-center gap-2.5">
              <HiCheckBadge className="w-5 h-5 text-[#a55eea] flex-shrink-0" />
              <span>Everything in Basic, and more.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <HiCheckBadge className="w-5 h-5 text-[#a55eea] flex-shrink-0" />
              <span>Advanced donation filters.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <HiCheckBadge className="w-5 h-5 text-[#a55eea] flex-shrink-0" />
              <span>Monthly deposit reports.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <HiCheckBadge className="w-5 h-5 text-[#a55eea] flex-shrink-0" />
              <span>Real-time donation tracking.</span>
            </li>
          </ul>
        </div>

        {isFocusActive ? (
          <div>
            <button
              className="flex items-center justify-center w-full gap-2 py-4 font-bold text-purple-500 border-2 border-purple-500 rounded-3xl disabled:opacity-60 hover:bg-purple-50 transition-colors"
              onClick={handleCancelSubscription}
              disabled={isCancelingSubscription || isCancelAtPeriodEnd}
            >
              {isCancelingSubscription ? (
                <>
                  <HiArrowPath className="w-4 h-4 animate-spin" />
                  Canceling...
                </>
              ) : isCancelAtPeriodEnd ? (
                "Cancel scheduled"
              ) : (
                "Cancel Subscription"
              )}
            </button>
            {isCancelAtPeriodEnd && cancelAt ? (
              <p className="mt-2 text-sm text-center text-gray-500">
                Will cancel on: {cancelAt}
              </p>
            ) : null}
          </div>
        ) : (
          <button
            className="flex items-center justify-center w-full gap-2 py-4 font-semibold text-black bg-btnPrimary hover:opacity-95 active:scale-[0.99] rounded-3xl transition-all disabled:opacity-60"
            onClick={() => startCheckout("monthly")}
            disabled={loadingPlan === "monthly" || hasActiveSubscription}
          >
            {loadingPlan === "monthly" ? (
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
      <div className="p-6 bg-white rounded-3xl border border-neutral-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 text-neutral-800">
            <LuSparkles className="w-5 h-5" />
          </div>
          <p className="text-2xl font-semibold font-familjen">Freedom Plan</p>
          {isFreedomActive ? (
            <button
              className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${
                isCancelAtPeriodEnd ? "bg-yellow-500" : "bg-green-500"
              }`}
              aria-label="Current plan"
            >
              {isCancelAtPeriodEnd ? "Canceling" : "Active Plan"}
            </button>
          ) : null}
        </div>

        <div className="my-6 space-y-4">
          <h1 className="text-4xl font-bold font-familjen">
            <span className="text-gray-400">$</span>
            120{" "}
            <span className="text-sm font-normal text-gray-500">/ 6 months</span>
          </h1>

          <ul className="space-y-3 text-base text-neutral-600">
            <li className="flex items-center gap-2.5">
              <HiCheckBadge className="w-5 h-5 text-[#a55eea] flex-shrink-0" />
              <span>Access to donation dashboard.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <HiCheckBadge className="w-5 h-5 text-[#a55eea] flex-shrink-0" />
              <span>View donor analytics.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <HiCheckBadge className="w-5 h-5 text-[#a55eea] flex-shrink-0" />
              <span>Priority support.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <HiCheckBadge className="w-5 h-5 text-[#a55eea] flex-shrink-0" />
              <span>Real-time donation tracking.</span>
            </li>
          </ul>
        </div>

        {isFreedomActive ? (
          <div>
            <button
              className="flex items-center justify-center w-full gap-2 py-4 font-bold text-purple-500 border-2 border-purple-500 rounded-3xl disabled:opacity-60 hover:bg-purple-50 transition-colors"
              onClick={handleCancelSubscription}
              disabled={isCancelingSubscription || isCancelAtPeriodEnd}
            >
              {isCancelingSubscription ? (
                <>
                  <HiArrowPath className="w-4 h-4 animate-spin" />
                  Canceling...
                </>
              ) : isCancelAtPeriodEnd ? (
                "Cancel scheduled"
              ) : (
                "Cancel Subscription"
              )}
            </button>
            {isCancelAtPeriodEnd && cancelAt ? (
              <p className="mt-2 text-sm text-center text-gray-500">
                Will cancel on: {cancelAt}
              </p>
            ) : null}
          </div>
        ) : (
          <button
            className="flex items-center justify-center w-full gap-2 py-4 font-semibold text-black bg-btnPrimary hover:opacity-95 active:scale-[0.99] rounded-3xl transition-all disabled:opacity-60"
            onClick={() => startCheckout("yearly")}
            disabled={loadingPlan === "yearly" || hasActiveSubscription}
          >
            {loadingPlan === "yearly" ? (
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
