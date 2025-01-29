import { FaDollarSign } from "react-icons/fa";

const AvailableSubscriptions = () => {
    const subscriptions = [
        {
            title: "Monthly Subscription",
            price: 10,
            target: "Youth Organization",
            features: [
                "Use multiple payment methods",
                "Access to basic features",
                "Email support",
            ],
        },
        {
            title: "Quarterly Subscription",
            price: 25,
            target: "Small Businesses",
            features: [
                "All monthly features included",
                "Priority email support",
                "Custom branding options",
            ],
        },
        {
            title: "Annual Subscription",
            price: 90,
            target: "Large Enterprises",
            features: [
                "All quarterly features included",
                "Dedicated account manager",
                "Advanced analytics dashboard",
            ],
        },
        {
            title: "Lifetime Subscription",
            price: 250,
            target: "Premium Users",
            features: [
                "All annual features included",
                "Lifetime updates & support",
                "Exclusive premium content",
            ],
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptions.map((sub, index) => (
                <div key={index} className="p-4 border border-primary rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">{sub.title}</h3>
                    <p className="flex items-center gap-1 text-xl font-bold text-primary">
                        <FaDollarSign /> {sub.price}
                    </p>
                    <p className="text-sm text-gray-600">{sub.target}</p>
                    <ul className="mt-2 text-sm">
                        {sub.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-1">
                                ✅ {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default AvailableSubscriptions;
