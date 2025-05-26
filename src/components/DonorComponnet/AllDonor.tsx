import { Pagination, Select } from "antd";

import dollor from "../../assets/images/dollor.png";
import flower from "../../assets/images/Flower.png";
import flower1 from "../../assets/images/Flower (1).png";
import flower2 from "../../assets/images/Flower (2).png";
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
    <div>
      <div className="w-full">
        <div className="flex justify-between items-center mb-5">
          <p className="text-gray-500 mb-10">Total Donation</p>
          <div>
            <Select defaultValue="Monthly" className="w-[150px]">
              <Select.Option value="Last 30 Days">Last 30 Days</Select.Option>
              <Select.Option value="2">Last 60 Days</Select.Option>
              <Select.Option value="3">Last 90 Days</Select.Option>
              <Select.Option value="4">Last 120 Days</Select.Option>
            </Select>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-[#d8f77c] p-5 rounded-md relative z-[1]">
          <img src={dollor} alt="" className="mb-5" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
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
            <div className="grid grid-cols-2 gap-6  ">
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
          <img src={flower2} alt="" className="absolute top-0 left-52" />
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
