/* eslint-disable @typescript-eslint/no-unused-vars */
import { DatePicker, Pagination, Select } from "antd";
import { FC } from "react";
import setting from "../../assets/images/Settings.png";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";
interface DepositData {
  key: string;
  amount: string;
  depositedTo: string;
  method: string;
  status: "Successful" | "Pending" | "Failed";
  timestamp: string;
  transactionId: string;
}

const Deposits: FC = () => {
  const data: DepositData[] = [
    {
      key: "1",
      amount: "$12,450.00",
      depositedTo: "2323 **** 4756",
      method: "PayPal",
      status: "Successful",
      timestamp: "July 30, 2025 - 2:48 PM",
      transactionId: "8FSD-4829-ACDF",
    },
    {
      key: "2",
      amount: "$12,450.00",
      depositedTo: "2323 **** 4756",
      method: "PayPal",
      status: "Pending",
      timestamp: "July 30, 2025 - 2:48 PM",
      transactionId: "8FSD-4829-ACDF",
    },
    {
      key: "3",
      amount: "$12,450.00",
      depositedTo: "2323 **** 4756",
      method: "PayPal",
      status: "Successful",
      timestamp: "July 30, 2025 - 2:48 PM",
      transactionId: "8FSD-4829-ACDF",
    },
    {
      key: "4",
      amount: "$12,450.00",
      depositedTo: "2323 **** 4756",
      method: "PayPal",
      status: "Failed",
      timestamp: "July 30, 2025 - 2:48 PM",
      transactionId: "8FSD-4829-ACDF",
    },
  ];

  return (
    <div className="">
      <div>
        <h1 className="text-3xl font-bold mb-4">Deposit</h1>
        <p className="text-lg text-gray-600 mb-4">
          See how your supporters are giving and where your impact is growing.
        </p>
      </div>
      <div className="bg-white border rounded-3xl p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-medium">Total Deposits</h1>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-3xl text-sm text-gray-900 border hover:bg-blue-100">
            <img src={setting} alt="" />
            <p> Adjust Payout Schedule</p>
            <DatePicker className=" " style={{ width: 50 }} />
          </div>
        </div>
        <div className="flex justify-between items-center mt-12">
          <div className="flex justify-start items-end gap-1 mt-10 mb-6">
            <h1 className="text-3xl md:text-5xl font-bold">
              {" "}
              <span className="text-gray-400">$</span> 40,000
            </h1>
            <p className="text-green-500">
              8.2% <span className="text-gray-400"> vs last month</span>
            </p>
          </div>
          <p className="px-4 py-2 bg-gray-100 rounded-3xl">
            Your next payout is in 3 days: 10th May, 2025
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-5 mt-8">
        <h1 className="text-xl md:text-2xl font-semibold">Deposit</h1>
        <div className="flex gap-3">
          <Select defaultValue="Newest First" className="w-[150px]">
            <Select.Option value="Newest First">Newest First</Select.Option>
            <Select.Option value="Oldest First">Oldest First</Select.Option>
          </Select>
          <Select defaultValue="High to Low" className="w-[150px]">
            <Select.Option value="High to Low">High to Low</Select.Option>
            <Select.Option value="Low to High">Low to High</Select.Option>
          </Select>
          <Select defaultValue="PayPal" className="w-[150px]">
            <Select.Option value="PayPal">PayPal</Select.Option>
            <Select.Option value="Credit Card">Credit Card</Select.Option>
            <Select.Option value="Bank Transfer">Bank Transfer</Select.Option>
          </Select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item) => (
          <div
            key={item.key}
            className="bg-white p-6 rounded-xl shadow-sm border flex flex-col gap-4"
          >
            <div className="flex justify-between items-center gap-2 border-b pb-6">
              <h2 className="text-2xl font-semibold">{item.amount}</h2>
              <div className="bg-purple-500 h-10 w-10 rounded-full flex justify-center items-center">
                <HiOutlineArrowNarrowDown className="h-5 w-5 text-white" />
              </div>
            </div>
            <h1 className="text-xl font-lg">Summery</h1>
            <div className="text-gray-600 space-y-2 text-sm">
              <div className="flex justify-between">
                <p>Deposited to</p>
                <p>{item.depositedTo}</p>
              </div>
              <div className="flex justify-between">
                <p>Transfer via</p>
                <p>{item.method}</p>
              </div>
              <div className="flex justify-between border-b pb-6">
                <p>Status</p>
                <span
                  className={`px-3 py-1 rounded-md text-white ${
                    item.status === "Successful"
                      ? "bg-green-500"
                      : item.status === "Pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="flex justify-between pt-6">
                <p>Timestamp</p>
                <p>{item.timestamp}</p>
              </div>
              <div className="flex justify-between">
                <p>Transaction ID</p>
                <p>{item.transactionId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="my-10 flex justify-end">
        <Pagination />
      </div>
    </div>
  );
};

export default Deposits;
