/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Select } from "antd";

import { Table } from "antd";
import roundup from "../../assets/images/one-time.png";
import people from "../../assets/images/onetime-people.png";
import { Input } from "antd";
import { MoreOutlined } from "@ant-design/icons";


const OneTime = () => {
  const { Search } = Input;
  const { Option } = Select;
  const onSearch = (value: string) => {
    console.log("Search input: ", value);
  };
  const data = [
    {
      key: "1",
      name: "Josh Bill",
      email: "johnnb@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "Round Up",
      donationMessage: "-",
      amount: 34.5,
    },
    {
      key: "2",
      name: "M Karim",
      email: "kkkarim@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "Recurring",
      donationMessage: "“Sending love & hope to everyone you’re helping”",
      amount: 62.75,
    },
    {
      key: "3",
      name: "Josh Adam",
      email: "jadddam@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "One Time",
      donationMessage: "-",
      amount: 15.2,
    },
    {
      key: "4",
      name: "Fajar Surya",
      email: "fjsurya@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "One Time",
      donationMessage: "“Sending love & hope to everyone you’re helping”",
      amount: 47.3,
    },
    {
      key: "5",
      name: "Linda Blair",
      email: "lindablair98@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "Recurring",
      donationMessage: "“Sending love & hope to everyone you’re helping”",
      amount: 23.9,
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Donation Type",
      dataIndex: "donationType",
      key: "donationType",
    },
    {
      title: "Donation Message",
      dataIndex: "donationMessage",
      key: "donationMessage",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount:any) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div>
          <a href="#">View</a> | <a href="#">Reset</a>
        </div>
      ),
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
        <div className="grid grid-cols-2 justify-between items-center gap-2">
          <div className="flex justify-start items-end gap-1 mt-10 mb-6">
            <h1 className="text-3xl md:text-5xl font-bold">
              {" "}
              <span className="text-gray-400">$</span> 10,000
            </h1>
            <p className="text-green-500">
              +6.2% <span className="text-gray-400"> vs last month</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 ">
            <div className=" bg-[#faf0f9] p-6 rounded-3xl">
              <div className="flex justify-between items-center gap-2">
                <p className="text-lg font-medium">Avg Donation</p>
                <img src={roundup} alt="" />
              </div>
              <h1 className="text-2xl font-medium mt-10">
                <span className="text-gray-400">$</span> 400{" "}
                <span className="text-sm text-gray-400">per user</span>{" "}
              </h1>
            </div>
            <div className="bg-[#faf0f9] p-6 rounded-3xl">
              <div className="flex justify-between items-center gap-2">
                <p className="text-lg font-medium">Total Donors</p>
                <img src={people} alt="" />
              </div>

              <h1 className="text-2xl text-gray-400 font-medium mt-10">
                <span className="text-black">12.2</span>K
                <span className="text-sm text-green-500">5.4%</span>{" "}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-3xl border my-6">
        <div className="flex justify-between items-center gap-5">
          <h1 className="text-xl font-medium">Donation History</h1>

          <div className="flex items-center gap-3">
            <div className="mt-4 md:mt-0">
              <Search
                placeholder="input search text"
                onSearch={onSearch}
                enterButton
              />
            </div>

            <div className="mt-4 md:mt-0">
              <Select defaultValue="selected" style={{ width: 120 }}>
                <Option value="selected">Selected</Option>
                <Option value="all">All</Option>
              </Select>
            </div>

            <div className="mt-4 md:mt-0">
              <button className="px-3 py-2 border rounded-md text-sm text-gray-700">
                Monthly
              </button>
            </div>
            {/* export korte hobe */}
            <div className="group relative mt-4 md:mt-0">
              <MoreOutlined className="text-xl cursor-pointer" />
              <span className="absolute left-0 bottom-0 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Export
              </span>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          style={{ marginTop: 20 }}
        />

        <div className="flex justify-end items-center my-10">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default OneTime;
