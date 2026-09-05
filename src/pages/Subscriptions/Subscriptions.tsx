import { LiaArrowDownSolid } from "react-icons/lia";
import SubscriptionCard from "../../components/PagesComponents/SubscriptionCard";
import star from "../../assets/images/Star Emphasis.png";
import { useGetSubscriptionMeQuery } from "../../redux/features/subscriptionApi/subscriptionApi";
import { useGetBillingHistoryQuery } from "../../redux/features/subscriptionApi/subscriptionApi";
import { formatMoney } from "../../utils/currency";

const Subscriptions = () => {
  const { data: subscriptionMeData } = useGetSubscriptionMeQuery();
  const activeSubscription =
    subscriptionMeData?.data?.status === "active" ? subscriptionMeData?.data : null;
  const isCanceling = Boolean(activeSubscription?.cancelAtPeriodEnd);
  const cancelAt = activeSubscription?.currentPeriodEnd
    ? new Date(activeSubscription.currentPeriodEnd).toLocaleDateString()
    : undefined;

  const { data: billingHistoryData } = useGetBillingHistoryQuery();
  const billingHistory = billingHistoryData?.data ?? [];
  return (
    <div>
      <div className="w-full">
        <h1 className="font-familjen my-3 text-xl font-semibold md:text-3xl">
          Subscriptions
        </h1>
        <p className="mb-10 text-gray-500">
          Overview of your active subscriptions.
        </p>
      </div>

      {activeSubscription ? (
        <div className="p-6 mb-6 bg-white border rounded-3xl">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100">
                <img src={star} alt="" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xl font-semibold">Current Subscription</p>
                <p className="text-sm text-gray-500">
                  {isCanceling ? "Canceling" : "Active"}
                </p>
              </div>
            </div>

            <span
              className={`px-3 py-1 text-sm font-semibold text-white rounded-3xl ${
                isCanceling ? "bg-yellow-500" : "bg-green-500"
              }`}
            >
              {activeSubscription.planType}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-4 border-t md:grid-cols-2">
            <div className="flex items-center justify-between gap-4">
              <p className="text-gray-500">Current period start</p>
              <p className="font-medium">
                {new Date(activeSubscription.currentPeriodStart).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-gray-500">Current period end</p>
              <p className="font-medium">
                {new Date(activeSubscription.currentPeriodEnd).toLocaleString()}
              </p>
            </div>
            {isCanceling && cancelAt ? (
              <div className="flex items-center justify-between gap-4 md:col-span-2">
                <p className="text-gray-500">Will cancel on</p>
                <p className="font-medium">{cancelAt}</p>
              </div>
            ) : null}
            <div className="flex items-center justify-between gap-4">
              <p className="text-gray-500">Cancel at period end</p>
              <p className="font-medium">
                {activeSubscription.cancelAtPeriodEnd ? "Yes" : "No"}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-gray-500">Subscription ID</p>
              <p className="font-medium truncate">{activeSubscription.stripeSubscriptionId}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 mb-6 bg-white border rounded-3xl">
          <p className="text-lg font-semibold">No active subscription</p>
          <p className="mt-1 text-gray-500">
            When you purchase a subscription, details will appear here.
          </p>
        </div>
      )}

      <SubscriptionCard />

      <h1 className="font-familjen my-3 text-xl font-semibold md:text-3xl">
        Subscriptions History
      </h1>

      {billingHistory.length ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {billingHistory.map((item) => (
            <div
              key={item._id}
              className="p-5 bg-white border shadow-md rounded-xl"
            >
              <div className="flex items-center justify-between pb-5 mb-5 border-b">
                <div className="flex items-center justify-start gap-5">
                  <h1 className="flex items-center justify-center gap-2 text-xl font-semibold md:text-2xl">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100">
                      <img src={star} alt="" className="w-5 h-5" />
                    </div>
                    {item.planType}
                  </h1>
                </div>

                {item.invoiceUrl ? (
                  <a
                    href={item.invoiceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-8 h-8 p-1 text-white bg-purple-500 rounded-full"
                    aria-label="Open invoice"
                  >
                    <LiaArrowDownSolid />
                  </a>
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 p-1 text-white bg-purple-500 rounded-full opacity-60">
                    <LiaArrowDownSolid />
                  </div>
                )}
              </div>

              <div className="pb-6 text-lg border-b">
                <div className="flex items-center justify-between gap-5 mb-3">
                  <p className="text-gray-500">Transaction date:</p>
                  <p>{new Date(item.transactionDate).toLocaleString()}</p>
                </div>

                <div className="flex items-center justify-between gap-5 mb-3">
                  <p className="text-gray-500">Amount:</p>
                  <p>
                    {formatMoney(item.amount, item.currency)}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-5 mb-3">
                  <p className="text-gray-500">Status</p>
                  <p
                    className={`${
                      item.status === "succeeded"
                        ? "bg-green-500 text-white px-2 py-1 rounded-3xl text-sm"
                        : ""
                    } ${
                      item.status === "failed"
                        ? "bg-red-500 text-white px-2 py-1 rounded-3xl text-sm"
                        : ""
                    } ${
                      item.status === "pending"
                        ? "bg-yellow-500 text-white px-2 py-1 rounded-3xl text-sm"
                        : ""
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <div className="flex items-center justify-between gap-5 mb-3">
                  <p className="text-gray-500">Timestamp:</p>
                  <p>{new Date(item.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between gap-5 mb-3">
                  <p className="text-gray-500">Invoice ID:</p>
                  <p className="truncate">{item.stripeInvoiceId}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 bg-white border rounded-3xl">
          <p className="text-lg font-semibold">No billing history</p>
          <p className="mt-1 text-gray-500">
            When billing occurs, history will appear here.
          </p>
        </div>
      )}

   
    </div>
  );
};

export default Subscriptions;
