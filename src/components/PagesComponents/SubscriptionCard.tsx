import star from "../../assets/images/Star Emphasis.png";
import { HiCheckBadge } from "react-icons/hi2";
const SubscriptionCard = () => {
  return (
    <div className="my-5 grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-4">
      {/* Free Subscription */}
      <div className="bg-white p-6 rounded-3xl">
        <div className="flex justify-start items-center gap-3 mb-6">
          <div className="bg-neutral-100 h-8 w-8 rounded-full flex justify-center items-center">
            <img src={star} alt="" className="h-5 w-5" />
          </div>
          <p className="text-2xl font-semibold ">Foundation Plan</p>
        </div>
        <div className="my-6 space-y-2 ">
          <h1 className="text-4xl font-bold">
            <span className="text-gray-400"> $</span>
            12 <span className="text-sm font-thin text-gray-600">/ month</span>
          </h1>

          <ul className="text-lg  text-gray-500 list-decimal ">
            <li className="flex justify-start items-center gap-2">
              <HiCheckBadge className="h-4 w-4" /> Basic donor analytics
            </li>
            <li className="flex justify-start items-center gap-2">
              {" "}
              <HiCheckBadge className="h-4 w-4" /> Org profile page
            </li>
            <li className="flex justify-start items-center gap-2">
              {" "}
              <HiCheckBadge className="h-4 w-4" />
              Track recurring donations
            </li>
          </ul>
        </div>

        <button className="bg-purple-500 text-white  w-full py-4 rounded-3xl ">
          Get Started
        </button>
      </div>
      <div className="bg-white p-6 rounded-3xl">
        <div className="flex justify-start items-center gap-3 mb-6">
          <div className="bg-neutral-100 h-8 w-8 rounded-full flex justify-center items-center">
            <img src={star} alt="" className="h-5 w-5" />
          </div>
          <p className="text-2xl font-semibold ">Focus Plan</p>
          <button className="bg-green-500 text-white px-2 py-1 rounded-3xl">
            Active Plan
          </button>
        </div>
        <div className="my-6 space-y-2 ">
          <h1 className="text-4xl font-bold">
            <span className="text-gray-400"> $</span>
            20 <span className="text-sm font-thin text-gray-600">/ month</span>
          </h1>

          <ul className="text-lg  text-gray-500 list-decimal ">
            <li className="flex justify-start items-center gap-2">
              <HiCheckBadge className="h-4 w-4" /> Everything in Basic, and
              more.
            </li>
            <li className="flex justify-start items-center gap-2">
              {" "}
              <HiCheckBadge className="h-4 w-4" /> Advanced donation filters.
            </li>
            <li className="flex justify-start items-center gap-2">
              {" "}
              <HiCheckBadge className="h-4 w-4" />
              Monthly deposit reports.
            </li>
            <li className="flex justify-start items-center gap-2">
              {" "}
              <HiCheckBadge className="h-4 w-4" />
              Real-time donation tracking.
            </li>
          </ul>
        </div>

        <button className="border-2 border-purple-500 text-purple-500 font-bold w-full py-4 rounded-3xl ">
    Cancel Subscription
        </button>
      </div>
      <div className="bg-white p-6 rounded-3xl">
        <div className="flex justify-start items-center gap-3 mb-6">
          <div className="bg-neutral-100 h-8 w-8 rounded-full flex justify-center items-center">
            <img src={star} alt="" className="h-5 w-5" />
          </div>
          <p className="text-2xl font-semibold ">Freedom Plan</p>
        </div>
        <div className="my-6 space-y-2 ">
          <h1 className="text-4xl font-bold">
            <span className="text-gray-400"> $</span>
            40 <span className="text-sm font-thin text-gray-600">/ month</span>
          </h1>

          <ul className="text-lg  text-gray-500 list-decimal ">
            <li className="flex justify-start items-center gap-2">
              <HiCheckBadge className="h-4 w-4" />
              Access to donation dashboard.
            </li>
            <li className="flex justify-start items-center gap-2">
              {" "}
              <HiCheckBadge className="h-4 w-4" /> View donor analytics.
            </li>
            <li className="flex justify-start items-center gap-2">
              {" "}
              <HiCheckBadge className="h-4 w-4" />
              Priority support.
            </li>
            <li className="flex justify-start items-center gap-2">
              {" "}
              <HiCheckBadge className="h-4 w-4" />
              Real-time donation tracking.
            </li>
          </ul>
        </div>

        <button className="bg-purple-500 text-white  w-full py-4 rounded-3xl ">
          Upgrade 
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
