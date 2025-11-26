/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import profile from "../../assets/images/profile.png";
import hfl from "../../assets/images/Profile Logo.png";
import tick from "../../assets/images/Checkmark.png";
import { IoCallOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import books from "../../assets/images/books.png";
import dream from "../../assets/images/Phone Device.png";
import cloth from "../../assets/images/Jacket.png";
import meal from "../../assets/images/Food.png";
import cat from "../../assets/images/Animal Cat.png";

import { DatePicker, Modal, Select, Space, Typography } from "antd";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import {
  useGetAllProfileQuery,
  useGetCauseStatsQuery,
  useGetRaisedCausedQuery,
} from "../../redux/features/profileApi/profileApi";

const Profile = () => {
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedCauseId, setSelectedCauseId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fromMonth = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;
  const toMonth = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;

  const { data: profileData } = useGetAllProfileQuery(null);
  const OrgProfile = profileData?.data;

  const { data: causeData } = useGetRaisedCausedQuery({
    orgId: profileData?.data?._id,
    startDate: fromMonth,
    endDate: toMonth,
    page: 1,
    limit: 5,
  });

  const { data: chartData } = useGetCauseStatsQuery({
    orgId: profileData?.data?._id,
    causeId: selectedCauseId || undefined,
    year: selectedYear,
  });

  const formattedChartData =
    chartData?.data?.map((item: any) => ({
      name: item.month,
      value: item.totalAmount,
    })) || [];

  const data = chartData?.data;
  console.log("data", causeData?.data);
  console.log("selectedCauseId", selectedCauseId);
  return (
    <div>
      <div className="flex justify-between items-center gap-2">
        <div>
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <p className="text-lg text-gray-600 mb-4">
            See how your supporters are giving and where your impact is growing.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white px-4 py-3 rounded-3xl border"
          >
            Preview Profile{" "}
          </button>
          <Link to="/edit-profile">
            <button className="bg-white px-4 py-3 rounded-3xl border">
              Update Profile
            </button>
          </Link>
        </div>
      </div>
      <div className="my-6 relative">
        <img src={profile} alt="" className="w-full" />
        <div className="absolute ml-28 top-60">
          <img src={hfl} alt="" className="h-40 w-40" />
        </div>
      </div>
      {/* main data start */}
      <div className="flex flex-col md:flex-row gap-5 justify-between items-center mt-24">
        <div className="flex justify-start items-center gap-5">
          <h1 className="text-2xl font-bold">{OrgProfile?.name}</h1>
          <img src={tick} alt="" />
        </div>

        <p className="text-gray-400">
          Established since:{" "}
          <span className="text-black">{OrgProfile?.dateOfEstablishment}</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-5 justify-between items-start">
        <div className="w-full md:w-[70%]">
          <div className="my-10">
            <div className="p-6 bg-white rounded-3xl border">
              <p className="text-gray-400">About</p>
              <p className="my-6 text-gray-800">{OrgProfile?.aboutUs}</p>
              <p className="text-gray-400">Connect & Contact</p>
              <div className="flex justify-start items-center gap-2 my-3">
                <CiGlobe className="h-5 w-5" />
                <p className="text-gray-400">
                  Website:{" "}
                  <span className="text-black underline">
                    {OrgProfile?.website}
                  </span>
                </p>
              </div>
              <div className="flex justify-start items-center gap-5">
                <div className="flex justify-start items-center gap-2 my-3">
                  <MdOutlineEmail className="h-5 w-5" />
                  <p className="text-gray-400">
                    Email:{" "}
                    <span className="text-black underline">
                      {OrgProfile?.auth?.email}
                    </span>
                  </p>
                </div>
                <div className="flex justify-start items-center gap-2 my-3">
                  <IoCallOutline className="h-5 w-5" />
                  <p className="text-gray-400">
                    Phone:
                    <span className="text-black underline">
                      {OrgProfile?.phoneNumber}
                    </span>
                  </p>
                </div>
              </div>
              <div className="my-6">
                <p className="text-gray-400">Address</p>
                <div className="flex justify-start items-center gap-2 my-3">
                  <TfiLocationPin className="h-5 w-5" />
                  <p className="font-medium">{OrgProfile?.address}</p>
                </div>
              </div>
            </div>
          </div>
          {/* chart */}
          <div className="bg-white p-6 rounded-3xl border">
            <div
              style={{ width: "100%", height: 420 }}
              className="bg-secondary p-4 rounded-lg"
            >
              <h1 className="text-2xl font-medium mb-4">Causes Analytics</h1>

              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                <Select
                  placeholder={causeData?.data?.[0]?.name || "Select a Cause"}
                  style={{ width: 300 }}
                  value={selectedCauseId}
                  onChange={setSelectedCauseId}
                >
                  {causeData?.data?.map((cause: any) => (
                    <Select.Option key={cause.causeId} value={cause.causeId}>
                      {cause.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formattedChartData}>
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full md:w-[30%]">
          <div className="bg-white p-6 rounded-3xl border mt-10">
            <div className="flex justify-between items-start gap-5 ">
              <div>
                <h1 className="text-2xl font-bold my-3">Raised Causes</h1>
                <p className="text-gray-400">Sorted by total donations</p>
              </div>
              <Link to="">
                <button className="text-purple-500 underline">View All</button>
              </Link>
            </div>
            <div className="flex justify-between items-start gap-5 my-5">
              <div className="flex gap-2">
                <div className="bg-blue-200 h-14 w-14 rounded-full p-1 flex justify-center items-center">
                  <img src={books} alt="" className="" />
                </div>
                <div>
                  <h1 className="text-lg font-medium">Backpacks & Books</h1>
                  <p className="text-neutral-400">July 2025-oct 2025</p>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end">
                <p className="text-neutral-400">Raised: </p>
                <p className="text-green-500 text-xl">$8,489,509</p>
              </div>
            </div>
            <div className="flex justify-between items-start gap-5 my-5">
              <div className="flex gap-2">
                <div className="bg-purple-100 h-14 w-14 rounded-full p-1 flex justify-center items-center">
                  <img src={dream} alt="" className="" />
                </div>

                <div>
                  <h1 className="text-lg font-bold">Digital Dreams</h1>
                  <p className="text-neutral-400">July 2025-oct 2025</p>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end">
                <p className="text-neutral-400">Raised: </p>
                <p className="text-green-500 text-xl">$8,489,509</p>
              </div>
            </div>
            <div className="flex justify-between items-start gap-5 my-5">
              <div className="flex gap-2">
                <div className="bg-yellow-100 h-14 w-14 rounded-full p-1 flex justify-center items-center">
                  <img src={cloth} alt="" className="" />
                </div>

                <div>
                  <h1 className="text-lg font-bold">Warmth in Winter</h1>
                  <p className="text-neutral-400">July 2025-oct 2025</p>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end">
                <p className="text-neutral-400">Raised: </p>
                <p className="text-green-500 text-xl">$8,489,509</p>
              </div>
            </div>
            <div className="flex justify-between items-start gap-5 my-5">
              <div className="flex gap-2">
                <div className="bg-red-100 h-14 w-14 rounded-full p-1 flex justify-center items-center">
                  <img src={meal} alt="" className="" />
                </div>

                <div>
                  <h1 className="text-lg font-bold">Every Child, Every Meal</h1>
                  <p className="text-neutral-400">July 2025-oct 2025</p>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end">
                <p className="text-neutral-400">Raised: </p>
                <p className="text-green-500 text-xl">$8,489,509</p>
              </div>
            </div>
            <div className="flex justify-between items-start gap-5 my-5">
              <div className="flex gap-2">
                <div className="bg-pink-100 h-14 w-14 rounded-full p-1 flex justify-center items-center">
                  <img src={cat} alt="" className="" />
                </div>

                <div>
                  <h1 className="text-lg font-bold">Meow Care Center</h1>
                  <p className="text-neutral-400">July 2025-oct 2025</p>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end">
                <p className="text-neutral-400">Raised: </p>
                <p className="text-green-500 text-xl">$8,489,509</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={500}
        className="rounded-3xl my-10"
      >
        <div className="rounded-2xl overflow-hidden">
          {/* Cover + Logo */}
          <div className="relative">
            <img
              src={profile}
              alt="cover"
              className="w-full h-40 object-cover"
            />
            <div className="absolute -bottom-10 left-4">
              <img
                src={hfl}
                alt="logo"
                className="h-20 w-20 rounded-full border-4 border-white shadow-md"
              />
            </div>
          </div>

          {/* Foundation Details */}
          <div className="flex flex-col md:flex-row gap-5 justify-between items-center mt-10">
            <div className="flex justify-start items-center gap-5">
              <h1 className="text-2xl font-bold">HFL Foundation</h1>
            </div>

            <p className="text-gray-400">
              Established since:{" "}
              <span className="text-black">01 July 2018</span>
            </p>
          </div>

          <div className="flex flex-col  gap-5 justify-between items-start ">
            <div className="w-full">
              {/* About Section */}
              <div className="my-10">
                <div className="p-6 bg-white rounded-3xl border">
                  <p className="text-gray-400">About</p>
                  <p className="my-3 text-gray-800">
                    Hope for Learning Foundation exists to unlock the power of
                    education for underserved communities. We champion access,
                    equity, and opportunity — because every child deserves a
                    future filled with knowledge, growth, and hope.
                  </p>
                  <p className="text-gray-400">Connect & Contact</p>

                  <div className="flex justify-start items-center gap-2 my-3">
                    <CiGlobe className="h-5 w-5" />
                    <p className="text-gray-400">
                      Website:{" "}
                      <span className="text-black underline">
                        www.hfl-foundation.org
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <div className="flex justify-start items-center gap-2 my-3">
                      <MdOutlineEmail className="h-5 w-5" />
                      <p className="text-gray-400">
                        Email:{" "}
                        <span className="text-black underline">
                          contact@hfl-foundation.org
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-start items-center gap-2 my-3">
                      <IoCallOutline className="h-5 w-5" />
                      <p className="text-gray-400">
                        Phone:{" "}
                        <span className="text-black underline">
                          +61 470 292 023
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-gray-400">Address</p>
                    <div className="flex justify-start items-center gap-2 my-3">
                      <TfiLocationPin className="h-5 w-5" />
                      <p className="font-medium">
                        57 Donut Road, Crescent Lane, Sydney, Australia
                      </p>
                    </div>
                    <div className="flex justify-start items-center gap-2 my-3">
                      <TfiLocationPin className="h-5 w-5" />
                      <p className="font-medium">
                        67 Burger Road, Moon Lane, Sydney, Australia
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Causes Analytics */}
              <div className="bg-white p-3 rounded-3xl border">
                <h1 className="text-2xl font-medium">Causes Analytics</h1>
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-gray-50 p-3 rounded-3xl">
                    <Select
                      style={{ width: 300 }}
                      defaultValue="Backpacks & Books"
                    >
                      <Select.Option value="backpacks">
                        Backpacks & Books
                      </Select.Option>
                    </Select>
                  </div>

                  <DatePicker
                    // onChange={onChange}
                    defaultValue={dayjs(selectedYear, "YYYY")}
                    format={"YYYY"}
                    picker="year"
                    className="w-full md:w-auto"
                  />
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Raised Causes Section */}
            <div className="w-full">
              <div className="bg-white p-6 rounded-3xl border ">
                <div className="flex justify-between items-start gap-5 ">
                  <div>
                    <h1 className="text-2xl font-bold my-3">Raised Causes</h1>
                    <p className="text-gray-400">Sorted by total donations</p>
                  </div>
                  <Link to="">
                    <button className="text-purple-500 underline">
                      View All
                    </button>
                  </Link>
                </div>
                <div className="flex justify-between items-start gap-5 my-5">
                  <div className="flex gap-2">
                    <div className="bg-blue-200 h-14 w-14 rounded-full p-1 flex justify-center items-center">
                      <img src={books} alt="" className="" />
                    </div>
                    <div>
                      <h1 className="text-lg font-medium">Backpacks & Books</h1>
                      <p className="text-neutral-400">July 2025-oct 2025</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="text-neutral-400">Raised: </p>
                    <p className="text-green-500 text-xl">$8,489,509</p>
                  </div>
                </div>
                <div className="flex justify-between items-start gap-5 my-5">
                  <div className="flex gap-2">
                    <div className="bg-purple-100 h-14 w-14 rounded-full p-1 flex justify-center items-center">
                      <img src={dream} alt="" className="" />
                    </div>

                    <div>
                      <h1 className="text-lg font-bold">Digital Dreams</h1>
                      <p className="text-neutral-400">July 2025-oct 2025</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="text-neutral-400">Raised: </p>
                    <p className="text-green-500 text-xl">$8,489,509</p>
                  </div>
                </div>
                <div className="flex justify-between items-start gap-5 my-5">
                  <div className="flex gap-2">
                    <div className="bg-yellow-100 h-14 w-14 rounded-full p-1 flex justify-center items-center">
                      <img src={cloth} alt="" className="" />
                    </div>

                    <div>
                      <h1 className="text-lg font-bold">Warmth in Winter</h1>
                      <p className="text-neutral-400">July 2025-oct 2025</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="text-neutral-400">Raised: </p>
                    <p className="text-green-500 text-xl">$8,489,509</p>
                  </div>
                </div>
                <div className="flex justify-between items-start gap-5 my-5">
                  <div className="flex gap-2">
                    <div className="bg-red-100 h-14 w-14 rounded-full p-1 flex justify-center items-center">
                      <img src={meal} alt="" className="" />
                    </div>

                    <div>
                      <h1 className="text-lg font-bold">
                        Every Child, Every Meal
                      </h1>
                      <p className="text-neutral-400">July 2025-oct 2025</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="text-neutral-400">Raised: </p>
                    <p className="text-green-500 text-xl">$8,489,509</p>
                  </div>
                </div>
                <div className="flex justify-between items-start gap-5 my-5">
                  <div className="flex gap-2">
                    <div className="bg-pink-100 h-14 w-14 rounded-full p-1 flex justify-center items-center">
                      <img src={cat} alt="" className="" />
                    </div>

                    <div>
                      <h1 className="text-lg font-bold">Meow Care Center</h1>
                      <p className="text-neutral-400">July 2025-oct 2025</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="text-neutral-400">Raised: </p>
                    <p className="text-green-500 text-xl">$8,489,509</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
