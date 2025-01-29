import AvailableSubscriptions from "../../components/PagesComponents/AvailableSubscriptions";
import Invoices from "../../components/PagesComponents/Invoices";
import SubscriptionCard from "../../components/PagesComponents/SubscriptionCard";

const Subscriptions = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold">Subscriptions</h1>
            <SubscriptionCard />
           
            <AvailableSubscriptions />
            <Invoices />
        </div>
    );
};

export default Subscriptions;