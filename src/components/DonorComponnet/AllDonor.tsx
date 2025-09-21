import { Pagination, Select } from "antd";

import { FaArrowUp, FaHandHoldingHeart } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import user from "../../assets/images/user.png";

const AllDonor = () => {
  const donors = [
    {
      id: 1,
      name: "John Doe",
      amount: "$45,000",
      since: "Since:July,2025",
      time: "20 min ago",
      image: user,
    },
    {
      id: 2,
      name: "Jane Smith",
      amount: "$30,000",
      since: "Since:June,2025",
      time: "1 hour ago",
      image: user,
    },
    {
      id: 3,
      name: "Michael Johnson",
      amount: "$25,000",
      since: "Since:May,2025",
      time: "2 hours ago",
      image: user,
    },
    {
      id: 3,
      name: "Michael Johnson",
      amount: "$25,000",
      since: "Since:May,2025",
      time: "2 hours ago",
      image: user,
    },
  ];

  return (
    <div className="">
      <div className="bg-white border rounded-3xl p-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <p className=" text-xl font-medium">Total Donation</p>
            <p className="text-neutral-400">+8.2% from last month</p>
          </div>
          <div>
            <Select defaultValue="Monthly" className="w-[150px]">
              <Select.Option value="Last 30 Days">Last 30 Days</Select.Option>
              <Select.Option value="2">Last 60 Days</Select.Option>
              <Select.Option value="3">Last 90 Days</Select.Option>
              <Select.Option value="4">Last 120 Days</Select.Option>
            </Select>
          </div>
        </div>
        <div className="flex justify-start items-end gap-1 mt-10 mb-6">
          <h1 className="text-3xl md:text-5xl font-bold">
            {" "}
            <span className="text-gray-400">$</span> 40,000
          </h1>
          <p className="text-green-500">
            8.2% <span className="text-gray-400"> vs last month</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6  ">
          <div className="bg-[#f7f4f9] p-6 rounded-3xl">
            <p className="text-lg font-medium">Avg Donation</p>
            <h1 className="text-2xl font-medium mt-10">
              {" "}
              <span className="text-gray-400">$</span> 400{" "}
              <span className="text-sm text-gray-400">per user</span>{" "}
            </h1>
          </div>
        <div className="bg-[#f7f4f9] p-6 rounded-3xl">
            <p className="text-lg font-medium">Total Donors</p>
            <h1 className="text-2xl text-gray-400 font-medium mt-10">
              {" "}
              <span className="text-black">12.2</span>K
              <span className="text-sm text-green-500">5.4%</span>{" "}
            </h1>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold my-10">Donation History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {donors.map((donor) => (
          <div
            key={donor.id}
            className="flex justify-between items-center mb-5 border-b border-r pb-5 pr-5"
          >
            <div>
              <img src={user} alt="" />
              <div className="flex flex-col justify-start ">
                <h1 className="text-xl font-bold">Donor Name</h1>
                <div className="flex justify-start items-center gap-5">
                  <p className="text-green-500">$45,000</p>
                  <p className="h-5 border-r "></p>
                  <p>Since: July,2025</p>
                </div>
              </div>
            </div>

            <p>20 min ago</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center my-10">
        <Pagination />
      </div>
    </div>
  );
};

export default AllDonor;
