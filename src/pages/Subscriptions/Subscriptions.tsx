import AvailableSubscriptions from "../../components/PagesComponents/AvailableSubscriptions";
import Invoices from "../../components/PagesComponents/Invoices";
import SubscriptionCard from "../../components/PagesComponents/SubscriptionCard";

const Subscriptions = () => {
  return (
    <div>
      <div className="w-full">
        <h1 className="text-xl md:text-3xl font-semibold my-3">
          Subscriptions
        </h1>
        <p className="text-gray-500 mb-10">
          Overview of your active subscriptions.
        </p>
      </div>
      <SubscriptionCard />

      <AvailableSubscriptions />
      <Invoices />
    </div>
  );
};

export default Subscriptions;
