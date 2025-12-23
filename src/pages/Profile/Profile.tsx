/* eslint-disable @typescript-eslint/no-explicit-any */

import tick from "../../assets/images/Checkmark.png";
import { IoCallOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import { Modal, Select } from "antd";
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
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import {
  useGetAllProfileQuery,
  useGetCauseStatsQuery,
  useGetRaisedCausedQuery,
} from "../../redux/features/profileApi/profileApi";

import water from "../../assets/images/water.png";
import food from "../../assets/images/🍽️.png";
import education from "../../assets/images/📚 (1).png";
import youth from "../../assets/images/🧑_🤝_🧑.png";
import orphans from "../../assets/images/🧸.png";
import Quran from "../../assets/images/📖.png";
import health from "../../assets/images/🏥.png";
import emergency from "../../assets/images/🚨.png";
import shelter from "../../assets/images/🏠.png";
import mosque from "../../assets/images/🕌.png";
import zakat from "../../assets/images/💰.png";
import sadaqah from "../../assets/images/🤲.png";
import ramadan from "../../assets/images/🌙.png";
import fitrah from "../../assets/images/🥖.png";
import admin from "../../assets/images/🗂️.png";
import refugee from "../../assets/images/🧳.png";
import digital from "../../assets/images/💻.png";
import mental from "../../assets/images/🧠.png";
import qurban from "../../assets/images/🐑.png";
import women from "../../assets/images/👩_👧.png";

const Profile = () => {
  const [selectedYear] = useState(dayjs().year());
  const [selectedMonth] = useState(dayjs().month() + 1);
  const [selectedCauseId, setSelectedCauseId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fromMonth = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;
  const toMonth = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;

  const { data: profileData, isLoading: isProfileLoading } =
    useGetAllProfileQuery(null);
  const OrgProfile = profileData?.data;
  const orgId = profileData?.data?._id;
  console.log("orgId", orgId);

  const { data: causeData, isLoading: isCauseLoading } =
    useGetRaisedCausedQuery(
      {
        orgId,
        startDate: fromMonth,
        endDate: toMonth,
        page: 1,
        limit: 5,
      },
      { skip: !orgId }
    );

  const { data: chartData, isLoading: isChartLoading } = useGetCauseStatsQuery(
    {
      orgId,
      causeId: selectedCauseId ? selectedCauseId : null,
      year: selectedYear,
    },
    {
      skip: !orgId || !selectedYear || !selectedCauseId,
    }
  );

  const formattedChartData =
    chartData?.data?.map((item: any) => ({
      name: item.month,
      value: item.totalAmount,
    })) || [];

  // const data = chartData?.data;
  // console.log("causeData", causeData?.data);
  // console.log("selectedCauseId", selectedCauseId);
  const isLoading = isProfileLoading || isCauseLoading || isChartLoading;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  const causeList = [
    { cause: "water", icon: water },
    { cause: "education", icon: education },
    { cause: "food", icon: food },
    { cause: "youth", icon: youth },
    { cause: "orphans", icon: orphans },
    { cause: "quran_education", icon: Quran },
    { cause: "health_medical", icon: health },
    { cause: "emergency_relief", icon: emergency },
    { cause: "shelter_housing", icon: shelter },
    { cause: "mosque_utilities", icon: mosque },
    { cause: "zakat", icon: zakat },
    { cause: "sadaqah", icon: sadaqah },
    { cause: "ramadan", icon: ramadan },
    { cause: "qurban", icon: qurban },
    { cause: "fitrah", icon: fitrah },
    { cause: "admin_operational", icon: admin },
    { cause: "refugees", icon: refugee },
    { cause: "digital_dawah", icon: digital },
    { cause: "women_families", icon: women },
    { cause: "mental_health", icon: mental },
  ];

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
        <img
          src={`${OrgProfile?.coverImage}`}
          alt=""
          className="w-full h-80  rounded-3xl"
        />
        <div className="absolute ml-28 top-60">
          <img
            src={`${OrgProfile?.logoImage}`}
            alt=""
            className="h-40 w-40 rounded-full"
          />
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

            {causeData?.data?.map((data: any) => {
              const matchedCausedData = causeList?.find(
                (item) =>
                  item?.cause.toLocaleLowerCase() ===
                  data?.category?.toLocaleLowerCase()
              );
              return (
                <div
                  key={data._id}
                  className="flex justify-between items-start gap-5 my-5 "
                >
                  <div className="flex gap-2">
                    <div className="bg-blue-200 h-14 w-14 rounded-full p-1 flex justify-center items-center">
                      {matchedCausedData && (
                        <img
                          src={matchedCausedData?.icon}
                          alt={data.name}
                          className="h-10 w-10"
                        />
                      )}
                    </div>
                    <div>
                      <h1 className="text-lg font-medium">{data?.name}</h1>
                      <p className="text-neutral-400">
                        {data?.startMonth}- {data?.endMonth}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="text-neutral-400">Raised: </p>
                    <p className="text-green-500 text-xl">
                      ${data?.totalDonationAmount}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={800}
        className="rounded-3xl my-10"
      >
        <div className="rounded-2xl overflow-hidden">
          {/* Cover + Logo */}
          <div className="relative">
            <img
              src={`${OrgProfile?.coverImage}`}
              alt=""
              className="w-full h-80  rounded-3xl"
            />
            <div className="absolute -bottom-10 left-5">
              <img
                src={`${OrgProfile?.logoImage}`}
                alt=""
                className="h-40 w-40 rounded-full"
              />
            </div>
          </div>

          {/* PROFILE SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-12 px-3">
            <h1 className="text-2xl font-bold">{OrgProfile?.name}</h1>
            <p className="text-gray-500">
              Established:{" "}
              <span className="text-black">
                {OrgProfile?.dateOfEstablishment}
              </span>
            </p>
          </div>

          {/* ABOUT + CONTACT */}
          <div className="p-5 mt-5 bg-white border rounded-3xl">
            <p className="text-gray-400">About</p>
            <p className="my-2">{OrgProfile?.aboutUs}</p>

            <p className="text-gray-400 mt-4">Connect & Contact</p>

            <div className="flex items-center gap-2 mt-2">
              <CiGlobe />
              <p className="text-gray-500">
                Website:{" "}
                <span className="underline">{OrgProfile?.website}</span>
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <div className="flex items-center gap-2">
                <MdOutlineEmail />
                <p className="text-gray-500">
                  Email:{" "}
                  <span className="underline">{OrgProfile?.auth?.email}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <IoCallOutline />
                <p className="text-gray-500">
                  Phone:{" "}
                  <span className="underline">{OrgProfile?.phoneNumber}</span>
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-400">Address</p>
              <div className="flex items-center gap-2 mt-2">
                <TfiLocationPin />
                <p className="text-gray-800 font-medium">
                  {OrgProfile?.address}
                </p>
              </div>
            </div>
          </div>

          {/* CAUSES ANALYTICS */}
          <div className="p-5 mt-6 bg-white rounded-3xl border">
            <h2 className="text-xl font-semibold mb-3">Cause Analytics</h2>

            <Select
              placeholder="Select Cause"
              value={selectedCauseId}
              onChange={setSelectedCauseId}
              style={{ width: "100%" }}
            >
              {causeData?.data?.map((d: any) => (
                <Select.Option key={d.causeId} value={d.causeId}>
                  {d.name}
                </Select.Option>
              ))}
            </Select>

            <div className="mt-5">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={formattedChartData}>
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#7b42f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RAISED CAUSES LIST */}
          <div className="p-5 my-6 bg-white border rounded-3xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Raised Causes</h2>
              <button className="text-purple-500 underline">View All</button>
            </div>

            {causeData?.data?.map((c: any) => {
              const iconMatch = causeList.find(
                (i) => i.cause === c.category?.toLowerCase()
              );
              return (
                <div
                  key={c._id}
                  className="flex justify-between items-center border-b py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      {iconMatch && (
                        <img src={iconMatch.icon} className="h-8 w-8" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-[16px]">{c.name}</p>
                      <p className="text-gray-500 text-sm">
                        {c.startMonth} - {c.endMonth}
                      </p>
                    </div>
                  </div>
                  <p className="text-green-600 font-bold text-lg">
                    ${c.totalDonationAmount}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
