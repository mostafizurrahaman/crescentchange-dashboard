import { FaArrowUp, FaHandHoldingHeart } from "react-icons/fa";
import dollor from "../../assets/images/dollor.png";
import { Select } from "antd";
import { FaUserGroup } from "react-icons/fa6";
import flower from "../../assets/images/Flower.png";
import flower1 from "../../assets/images/Flower (1).png";
import flower2 from "../../assets/images/Flower (2).png";

const AnalyticsCard = () => {
  return (
    <div>
      <div className="flex justify-start items-center gap-5 my-5">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <Select defaultValue="This Month" className="w-[150px]">
          <Select.Option value="Last 30 Days">Last 30 Days</Select.Option>
          <Select.Option value="2">Last 60 Days</Select.Option>
          <Select.Option value="3">Last 90 Days</Select.Option>
          <Select.Option value="4">Last 120 Days</Select.Option>
        </Select>
      </div>
      <div className="bg-[#d8f77c] p-5 rounded-md relative ">
        <img src={dollor} alt="" className="mb-5" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-start items-center gap-5">
              <h1 className="text-3xl md:text-5xl font-bold"> $40,000</h1>
              <p className="flex justify-center items-center gap-2 text-green-500 bg-white px-4 py-1 rounded-md">
                <FaArrowUp />
                8.2%
              </p>
            </div>
            <p className="text-gray-500 text-2xl mt-5">Total Donated</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-md">
              <FaHandHoldingHeart className="h-8 w-8" />
              <h1 className="text-2xl font-bold my-3">$400</h1>
              <p>Avg Donation</p>
            </div>
            <div className="bg-white p-5 rounded-md">
              <FaUserGroup className="h-8 w-8" />
              <h1 className="text-2xl font-bold my-3">$400</h1>
              <p>Total donors</p>
            </div>
          </div>
        </div>
        <img src={flower} alt="" className="absolute top-0 right-56 " />
        <img src={flower1} alt="" className="absolute bottom-0 left-96 " />
        <img src={flower2} alt="" className="absolute top-0 left-52 " />
      </div>
   
    </div>
  );
};

export default AnalyticsCard;
