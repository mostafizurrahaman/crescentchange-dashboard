/* eslint-disable @typescript-eslint/no-unused-vars */
import {  Select } from "antd";
import { FC } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import dollor from "../../assets/images/card.png";
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/Vector (2).png"
import img4 from "../../assets/images/Vector (3).png"
interface DepositData {
  key: string;
  date: string;
  amount: string;
  donor: string;
  method: string;
  card: string;
}

const Deposits: FC = () => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Donor Name",
      dataIndex: "donor",
      key: "donor",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Payment Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Card Number",
      dataIndex: "card",
      key: "card",
    },
  ];

  const data: DepositData[] = [
    {
      key: "1",
      date: "Thursday, 31st of June",
      donor: "John Doe",
      amount: "$500",
      method: "Credit Card",
      card: "**** 521456",
    },
    {
      key: "2",
      date: "Wednesday, 30th of June",
      donor: "Jane Smith",
      amount: "$250",
      method: "PayPal",
      card: "**** 874512",
    },

    {
      key: "3",
      date: "Tuesday, 29th of June",
      donor: "Michael Johnson",
      amount: "$1000",
      method: "Bank Transfer",
      card: "**** 963258",
    },
  ];

  return (
    <div className="">
      <div className="w-full md:w-[70%]">
        <h1 className="text-xl md:text-3xl font-semibold my-3">Deposits</h1>
        <p className="text-gray-500 mb-10">
          Your funds, flowing with purpose. Track every deposit here.
        </p>
      </div>
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
        <div className="bg-[#fdb1f1] p-5 rounded-md relative ">
          <img src={dollor} alt="" className="mb-5" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-start items-center gap-5">
                <h1 className="text-3xl md:text-5xl font-bold"> $40,000</h1>
                {/* <p className="flex justify-center items-center gap-2 text-green-500 bg-white px-4 py-1 rounded-md">
                  <FaArrowUp />
                  8.2%
                </p> */}
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
          <img src={img1} alt="" className="absolute top-0 left-56 " />
          <img src={img3} alt="" className="absolute bottom-0 left-96 " />
          <img src={img4} alt="" className="absolute bottom-0 right-5 " />
          <img src={img2} alt="" className="absolute top-0 right-52 " />
        </div>
      </div>
    </div>
  );
};

export default Deposits;
