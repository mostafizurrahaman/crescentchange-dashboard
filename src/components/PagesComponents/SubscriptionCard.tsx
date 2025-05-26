import { FaHandHoldingHeart } from "react-icons/fa";
import vectors from "../../assets/images/Vectors.png";
import vector1 from "../../assets/images/Vector (1).png";
import vector2 from "../../assets/images/Frame.png";
const SubscriptionCard = () => {
  return (
    <div className="my-5 grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-4">
      {/* Free Subscription */}
      <div className=" bg-[#fdb1f1] p-5 rounded-xl relative z-[999]">
        <div className="flex justify-start items-center gap-3 mb-5">
          <FaHandHoldingHeart className="h-10 w-10 bg-white p-2 rounded-full" />
          <p className="text-xl font-semibold">Foundation Plan</p>
        </div>
        <h1 className="text-3xl font-bold">
          $12 <span className="text-sm font-thin">/ month</span>
        </h1>
        <button className="bg-btnPrimary text-white  w-full py-2 rounded-2xl my-10">
          Get Started
        </button>
        <ul className="text-lg  text-gray-700 list-decimal px-5">
          <li>Basic donor analytics</li>
          <li>Org profile page</li>
          <li>Track recurring donations</li>
        </ul>
        <img src={vectors} alt="" className="absolute top-0 right-0 z-[-1]" />
      </div>
      <div className=" bg-[#b5e0ff] p-5 rounded-xl relative z-[999]">
        <div className="flex justify-start items-center gap-3 mb-5">
          <FaHandHoldingHeart className="h-10 w-10 bg-white p-2 rounded-full" />
          <p className="text-xl font-semibold">Focus Plan </p>
        </div>
        <h1 className="text-3xl font-bold">
          $12{" "}
          <span className="text-sm font-thin">
            / month{" "}
            <span className="bg-green-800 text-neutral-700 px-3 py-1 rounded-lg">
              Active plan
            </span>
          </span>
        </h1>
        <button className="bg-btnPrimary text-white  w-full py-2 rounded-2xl my-10">
          Cancel subscription
        </button>
        <ul className="text-lg  text-gray-700 list-decimal px-5">
          <li>Everything in Basic, and more</li>
          <li>Advanced donation filters</li>
          <li>Monthly deposit reports</li>
          <li>Real-time donation tracking</li>
        </ul>
        <img src={vector1} alt="" className="absolute top-0 right-0 z-[-1]" />
      </div>
      <div className=" bg-[#ffe599] p-5 rounded-xl relative z-[999]">
        <div className="flex justify-start items-center gap-3 mb-5">
          <FaHandHoldingHeart className="h-10 w-10 bg-white p-2 rounded-full" />
          <p className="text-xl font-semibold">Freedom Plan</p>
        </div>
        <h1 className="text-3xl font-bold">
          $40 <span className="text-sm font-thin">/ year</span>
        </h1>
        <button className="bg-btnPrimary text-white  w-full py-2 rounded-2xl my-10">
          Upgrade pro
        </button>
        <ul className="text-lg  text-gray-700 list-decimal px-5">
          <li>Access to donation dashboard</li>
          <li> View donor analytics</li>
          <li>Priority support</li>
          <li> Real-time donation tracking</li>
        </ul>
        <img src={vector2} alt="" className="absolute top-0 right-0 z-[-1]" />
      </div>
    </div>
  );
};

export default SubscriptionCard;
