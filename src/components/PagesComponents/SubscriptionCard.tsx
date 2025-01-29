const SubscriptionCard = () => {
    return (
        <div className="my-5 grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-4">
            {/* Free Subscription */}
            <div className="h-40 border bg-btnPrimary text-white border-primary py-4 px-6 rounded-xl text-center ">
                <p className="font-semibold text-2xl">Free Subscription</p>
                <p className="text-sm ">Access to limited features</p>
                <p className="text-xl font-bold mt-2">$0/month</p>
            </div >

            {/* Monthly Subscription */}
            <div className="h-40 border bg-btnPrimary text-white border-primary py-4 px-6 rounded-xl text-center ">
                < p className="font-semibold text-2xl" > Monthly Subscription</ p>
                <p className="text-sm ">Full access to premium features</p>
                <p className="text-xl font-bold mt-2">$9.99/month</p>
            </div >

            {/* Next Month Subscription */}
            <div className="h-40 border bg-btnPrimary text-white border-primary py-4 px-6 rounded-xl text-center ">
                < p className="font-semibold text-2xl" > Next Month Subscription</ p>
                <p className="text-sm ">Your subscription renews soon</p>
                <p className="text-xl font-bold mt-1">$9.99/month</p>
                <button className="mt-3 bg-white text-primary hover:bg-neutral-300 px-4 py-2 rounded-lg ">
                    Cancel Subscription
                </button>
            </div >
        </div >
    );
};

export default SubscriptionCard;
