const Success = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Stripe Connected Successfully
                </h1>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                    Your Stripe account has been connected. You can now start receiving
                    payments securely.
                </p>

                {/* CTA */}
                <button
                    onClick={() => window.location.href = "/"}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition"
                >
                    Go to Dashboard
                </button>

                {/* Optional helper text */}
                <p className="text-sm text-gray-400 mt-4">
                    You can manage payouts and settings anytime from your dashboard.
                </p>
            </div>
        </div>
    );
};

export default Success;
