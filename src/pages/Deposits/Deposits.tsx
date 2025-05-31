/* eslint-disable @typescript-eslint/no-unused-vars */
import { DatePicker, Pagination, Select } from "antd";
import { FC } from "react";
import card from "../../assets/images/card.png";
import dollor from "../../assets/images/card.png";
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/Vector (2).png";
import img4 from "../../assets/images/Vector (3).png";
import { GoArrowUpRight } from "react-icons/go";
import { FaDownload } from "react-icons/fa";
interface DepositData {
  key: string;
  date: string;
  amount: string;
  donor: string;
  method: string;
  card: string;
  status?: string; // Optional field for status
}

const Deposits: FC = () => {
  const data: DepositData[] = [
    {
      key: "1",
      date: "Thursday, 31st of June",
      donor: "John Doe",
      amount: "$500",
      method: "Credit Card",
      card: "**** 521456",
      status: "Successful",
    },
    {
      key: "2",
      date: "Wednesday, 30th of June",
      donor: "Jane Smith",
      amount: "$250",
      method: "PayPal",
      card: "**** 874512",
      status: "Pending",
    },

    {
      key: "3",
      date: "Tuesday, 29th of June",
      donor: "Michael Johnson",
      amount: "$1000",
      method: "Bank Transfer",
      card: "**** 963258",
      status: "Failed",
    },
  ];

  return (
    <div className="">
      <div className="w-full">
        <h1 className="text-xl md:text-3xl font-semibold my-3">Deposits</h1>
        <div className="flex justify-between items-center mb-5">
          <p className="text-gray-500 mb-10">
            Your funds, flowing with purpose. Track every deposit here.
          </p>
          <div>
            <Select defaultValue="This Month" className="w-[150px]">
              <Select.Option value="Last 30 Days">Last 30 Days</Select.Option>
              <Select.Option value="2">Last 60 Days</Select.Option>
              <Select.Option value="3">Last 90 Days</Select.Option>
              <Select.Option value="4">Last 120 Days</Select.Option>
            </Select>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-[#fdb1f1] p-5 rounded-md relative ">
          <img src={dollor} alt="" className="mb-5" />
          <div className="flex gap-6 justify-between items-center">
            <div>
              <div className="flex justify-start items-center gap-5">
                <h1 className="text-3xl md:text-5xl font-bold"> $40,000</h1>
              </div>
              <p className="text-gray-500 text-2xl mt-5">Total Donated</p>
            </div>
            <div className="flex flex-col gap-6 absolute right-5 top-10 z-[1]">
              <DatePicker
                className="w-full"
                placeholder="Select Deposit Date"
                style={{ width: "200px" }}
              ></DatePicker>
              <div className="flex justify-between items-center bg-white px-2 rounded-md mt-10">
                <img src={card} alt="" />
                Your Next Payout is onits way -May 10
              </div>
            </div>
          </div>
          <img src={img1} alt="" className="absolute top-0 left-56 " />
          <img src={img3} alt="" className="absolute bottom-0 left-96 " />
          <img src={img4} alt="" className="absolute bottom-0 right-5 " />
          <img src={img2} alt="" className="absolute top-0 right-52 " />
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl md:text-3xl font-semibold">
            Transection History
          </h1>
          <div className="flex gap-3">
            <Select defaultValue="Newest First" className="w-[150px]">
              <Select.Option value="Newest First">Newest First</Select.Option>
              <Select.Option value="Oldest First">Oldest First</Select.Option>
            </Select>
            <Select defaultValue="Low to high" className="w-[150px]">
              <Select.Option value="Low to high">Low to high</Select.Option>
              <Select.Option value="High to low">High to low</Select.Option>
            </Select>
            <Select defaultValue="PayPal" className="w-[150px]">
              <Select.Option value="PayPal">PayPal</Select.Option>
              <Select.Option value="Credit Card">Credit Card</Select.Option>
              <Select.Option value="Bank Transfer">Bank Transfer</Select.Option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
          {data.map((item) => (
            <div
              key={item.key}
              className="bg-white p-5 rounded-xl shadow-md border "
            >
              <div className="flex justify-between items-center mb-5 border-b pb-5">
                <div className="flex justify-start items-center gap-5">
                  <h1 className="text-xl md:text-2xl text-green-500 font-semibold flex justify-center items-center gap-2">
                    {item.amount}
                    <GoArrowUpRight />
                  </h1>
                </div>
                <FaDownload className="bg-btnPrimary text-white p-2 rounded-full h-8 w-8" />
              </div>
              <div className="text-lg">
                <div className="flex justify-between items-center gap-5 mb-3">
                  <p className="text-gray-500">Date & Time</p>
                  <p>{item.date}</p>
                </div>
                <div className="flex justify-between items-center gap-5 mb-3">
                  <p className="text-gray-500">Deposited into</p>
                  <p>{item.card}</p>
                </div>
                <div className="flex justify-between items-center gap-5 mb-3">
                  <p className="text-gray-500">Transfer Via</p>
                  <p>{item.method}</p>
                </div>
                <div className="flex justify-between items-center gap-5 mb-3">
                  <p className="text-gray-500">Status</p>
                  <p
                    className={`${
                      item.status === "Successful"
                        ? "bg-green-500 text-white px-3 py-1 rounded-md"
                        : ""
                    } ${
                      item.status === "Failed"
                        ? "bg-red-500 text-white px-3 py-1 rounded-md"
                        : ""
                    } ${
                      item.status === "Pending"
                        ? "bg-yellow-500 text-white px-3 py-1 rounded-md"
                        : ""
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="my-10 flex justify-end items-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Deposits;
