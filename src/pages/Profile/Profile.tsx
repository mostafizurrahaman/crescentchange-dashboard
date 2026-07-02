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
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import {
  useGetAllProfileQuery,
  useGetCauseStatsQuery,
  useGetRaisedCausedQuery,
} from "../../redux/features/profileApi/profileApi";

// import water from "../../assets/images/water.png";
// import food from "../../assets/images/🍽️.png";
// import education from "../../assets/images/📚 (1).png";
// import youth from "../../assets/images/🧑_🤝_🧑.png";
// import orphans from "../../assets/images/🧸.png";
// import Quran from "../../assets/images/📖.png";
// import health from "../../assets/images/🏥.png";
// import emergency from "../../assets/images/🚨.png";
// import shelter from "../../assets/images/🏠.png";
// import mosque from "../../assets/images/🕌.png";
// import zakat from "../../assets/images/💰.png";
// import sadaqah from "../../assets/images/🤲.png";
// import ramadan from "../../assets/images/🌙.png";
// import fitrah from "../../assets/images/🥖.png";
// import admin from "../../assets/images/🗂️.png";
// import refugee from "../../assets/images/🧳.png";
// import digital from "../../assets/images/💻.png";
// import mental from "../../assets/images/🧠.png";
// import qurban from "../../assets/images/🐑.png";
// import women from "../../assets/images/👩_👧.png";
import world from "../../assets/images/🌍.png";
import logo from "../../assets/images/Profile Logo.png";
import profile from "../../assets/images/profile.png";

const Profile = () => {
  const [selectedYear] = useState(dayjs().year());
  const [selectedMonth] = useState(dayjs().month() + 1);
  const [selectedCauseId, setSelectedCauseId] = useState<string | null>(null);
  const [isCauseDropdownOpen, setIsCauseDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coverMediaType, setCoverMediaType] = useState<"image" | "video">(
    "image",
  );
  const [mediaLoadAttempts, setMediaLoadAttempts] = useState(0);
  const causeSelectRef = useRef<HTMLDivElement | null>(null);

  const fromMonth = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;
  const toMonth = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;

  const { data: profileData, isLoading: isProfileLoading } =
    useGetAllProfileQuery(null);
  const OrgProfile = profileData?.data;
  const orgId = profileData?.data?._id;
  console.log(OrgProfile, "OrgProfile");

  // Simple media type detection based on URL patterns
  const detectMediaType = (url: string): "image" | "video" => {
    const urlLower = url.toLowerCase();

    // Check for video indicators in URL
    if (
      urlLower.includes("video") ||
      urlLower.includes("mp4") ||
      urlLower.includes("webm") ||
      urlLower.includes("mov") ||
      urlLower.includes("avi") ||
      urlLower.includes("ogg")
    ) {
      return "video";
    }

    // Default to image for most cases
    return "image";
  };

  // Detect media type when profile data loads
  useEffect(() => {
    if (OrgProfile?.coverImage) {
      const detectedType = detectMediaType(OrgProfile.coverImage);
      setCoverMediaType(detectedType);
      setMediaLoadAttempts(0);
    }
  }, [OrgProfile?.coverImage]);

  // Handle media loading errors with automatic fallback
  const handleMediaError = (currentType: "image" | "video") => {
    console.error(`${currentType} failed to load`);

    // Only switch types if we haven't tried both types yet
    if (mediaLoadAttempts < 2) {
      const newType = currentType === "image" ? "video" : "image";
      // console.log(`Attempting to load as ${newType}`);
      setCoverMediaType(newType);
      setMediaLoadAttempts((prev) => prev + 1);
    } else {
      console.error("Both image and video loading attempts failed");
    }
  };

  const { data: causeData, isLoading: isCauseLoading } =
    useGetRaisedCausedQuery(
      {
        orgId,
        startDate: fromMonth,
        endDate: toMonth,
        page: 1,
        limit: 5,
      },
      { skip: !orgId },
    );

  const { data: chartData, isLoading: isChartLoading } = useGetCauseStatsQuery(
    {
      orgId,
      causeId: selectedCauseId ? selectedCauseId : null,
      year: selectedYear,
    },
    {
      skip: !orgId || !selectedYear || !selectedCauseId,
    },
  );

  const formattedChartData =
    chartData?.data?.map((item: any) => ({
      name: item.month,
      value: item.totalAmount,
    })) || [];

  // console.log("Causes analytics chart data", formattedChartData);

  const causeList = [
    { cause: "water", icon: "💧" },
    { cause: "education", icon: "📚" },
    { cause: "food", icon: "🍽️" },
    { cause: "youth", icon: "🧑‍🤝‍🧑" },
    { cause: "orphans", icon: "🧸" },
    { cause: "quran_education", icon: "📖" },
    { cause: "health_medical", icon: "🏥" },
    { cause: "emergency_relief", icon: "🚨" },
    { cause: "shelter_housing", icon: "🏠" },
    { cause: "mosque_utilities", icon: "🕌" },
    { cause: "zakat", icon: "💰" },
    { cause: "sadaqah", icon: "🤲" },
    { cause: "ramadan", icon: "🌙" },
    { cause: "qurban", icon: "🐑" },
    { cause: "fitrah", icon: "🥖 " },
    { cause: "admin_operational", icon: "🗂️" },
    { cause: "refugees", icon: "🗂️" },
    { cause: "digital_dawah", icon: "💻" },
    { cause: "women_families", icon: "👩‍👧" },
    { cause: "mental_health", icon: "🧠" },
  ];

  useEffect(() => {
    if (!selectedCauseId && causeData?.data?.length) {
      setSelectedCauseId(causeData.data[0].causeId);
    }
  }, [causeData, selectedCauseId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        causeSelectRef.current &&
        !causeSelectRef.current.contains(event.target as Node)
      ) {
        setIsCauseDropdownOpen(false);
      }
    };

    if (isCauseDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCauseDropdownOpen]);

  const isLoading = isProfileLoading || isCauseLoading || isChartLoading;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className=" overflow-hidden">
      <div className="flex justify-between items-center gap-2">
        <div>
          <h1 className="text-xl md:text-4xl font-bold font-familjen mb-3">
            Profile
          </h1>
          <p className="text-gray-500">
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
        {OrgProfile?.coverImage ? (
          coverMediaType === "video" ? (
            <video
              src={OrgProfile?.coverImage}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-80 object-cover object-top rounded-3xl hide:controls"
              onError={() => handleMediaError("video")}
            />
          ) : (
            <img
              src={OrgProfile?.coverImage}
              alt=""
              className="w-full h-80 object-cover rounded-3xl"
              onError={() => handleMediaError("image")}
            />
          )
        ) : (
          <img
            src={profile}
            alt=""
            className="w-full h-80 object-cover object-top rounded-3xl"
            onError={() => handleMediaError("image")}
          />
        )}

        <div className="absolute ml-28 top-60">
          {OrgProfile?.logoImage ? (
            <img
              src={`${OrgProfile?.logoImage}`}
              alt=""
              className="h-40 w-40 rounded-full"
            />
          ) : (
            <img src={logo} alt="" className="h-40 w-40 rounded-full" />
          )}
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
          <span className="text-black">
            {" "}
            {new Date(OrgProfile?.dateOfEstablishment).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            )}
          </span>
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
            <div style={{ width: "100%", height: 420 }}>
              <h1 className="text-2xl font-familjen font-semibold mb-6">
                Causes Analytics
              </h1>

              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div
                  ref={causeSelectRef}
                  className="relative w-full md:w-[380px]"
                >
                  <button
                    type="button"
                    onClick={() => setIsCauseDropdownOpen((prev) => !prev)}
                    className="w-full h-12 px-5 pr-10 rounded-2xl bg-[#f7f4fb] text-left flex items-center text-[16px] font-medium text-black/90"
                  >
                    {selectedCauseId
                      ? causeData?.data?.find(
                          (c: any) => c.causeId === selectedCauseId,
                        )?.name || "Select a Cause"
                      : causeData?.data?.[0]?.name || "Select a Cause"}

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/80">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.5 6L8 9.5L11.5 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  {isCauseDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-full rounded-2xl bg-white shadow-lg border py-1 max-h-64 overflow-auto">
                      {causeData?.data?.map((cause: any) => (
                        <button
                          key={cause.causeId}
                          type="button"
                          onClick={() => {
                            setSelectedCauseId(cause.causeId);
                            setIsCauseDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-[15px] hover:bg-gray-100"
                        >
                          {cause.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {formattedChartData.length > 0 &&
              formattedChartData.some((item: any) => item.value > 0) ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={formattedChartData}
                    margin={{ top: 16, right: 24, left: 0, bottom: 16 }}
                  >
                    <CartesianGrid stroke="#f1eef5" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#000", fontSize: 12 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#000", fontSize: 12 }}
                      tickFormatter={(v) => `${v / 1000}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 16,
                        border: "1px solid #e5e1f0",
                        padding: "6px 10px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#7b42f6"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-[260px] items-center justify-center text-sm text-neutral-400">
                  No analytics data available for this cause.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full md:w-[30%]">
          <div className="bg-white p-6 rounded-3xl border mt-10">
            <div className="flex justify-between items-start gap-5 ">
              <div>
                <h1 className="text-3xl font-semibold my-3 font-familjen text-black/80">
                  Raised Causes
                </h1>
                <p className="text-gray-400">Sorted by total donations</p>
              </div>
              <Link to="/edit-profile">
                <button className="text-purple-500 underline">View All</button>
              </Link>
            </div>

            {causeData?.data?.map((data: any) => {
              const matchedCausedData = causeList?.find(
                (item) =>
                  item?.cause.toLocaleLowerCase() ===
                  data?.category?.toLocaleLowerCase(),
              );
              return (
                <div
                  key={data._id}
                  className="flex justify-between items-start gap-5 my-5"
                >
                  <div className="flex gap-2">
                    <div className="bg-blue-200 h-14 w-14 rounded-full p-1 flex justify-center items-center">
                      {matchedCausedData && (
                        // <img
                        //   src={matchedCausedData?.icon}
                        //   alt={data.name}
                        //   className="h-10 w-10"
                        // />
                        <h1 className=" text-4xl">{matchedCausedData?.icon}</h1>
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
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={520}
        style={{ maxHeight: "85vh", overflow: "hidden", borderRadius: "22px" }}
        className="my-10"
      >
        <h1 className="text-2xl font-bold mb-4">Preview</h1>
        <div>
          <div className="bg-white max-h-[80vh] pb-4 overflow-y-auto">
            {/* Cover + Logo */}
            <div className="relative">
              {coverMediaType === "video" ? (
                <video
                  src={`${OrgProfile?.coverImage}`}
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full h-auto rounded-3xl"
                  onError={() => handleMediaError("video")}
                />
              ) : (
                <img
                  src={`${OrgProfile?.coverImage}`}
                  alt=""
                  className="w-full h-auto rounded-3xl"
                  onError={() => handleMediaError("image")}
                />
              )}
              <div className="absolute -bottom-10 left-5">
                <img
                  src={`${OrgProfile?.logoImage}`}
                  alt=""
                  className="h-20 w-20 rounded-full"
                />
              </div>
            </div>

            {/* PROFILE SECTION */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-12 ">
              <div className="flex justify-start items-center gap-5">
                <h1 className="text-xl font-bold">{OrgProfile?.name}</h1>
                <img src={tick} alt="" />
              </div>

              {/* <p className="text-gray-500">
              Established:{" "}
              <span className="text-black">
                {" "}
                {new Date(OrgProfile?.dateOfEstablishment).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </p> */}
            </div>
            <div className="text-gray-800 bg-[#EAF7EB] font-medium border rounded-full w-fit px-2 text-center flex justify-center items-center gap-2 my-3">
              <img src={world} alt="" />
              <p className="text-gray-400"> {OrgProfile?.address}</p>
            </div>
            <p className="my-2">{OrgProfile?.aboutUs}</p>
            {/* ABOUT + CONTACT */}
            <div className="p-5 mt-5 bg-[#EAF7EB] border rounded-3xl">
              <p className="text-gray-400">About</p>
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

              {/* <div className="mt-4">
              <p className="text-gray-400">Address</p>
              <div className="flex items-center gap-2 mt-2">
                <TfiLocationPin />
                <p className="text-gray-800 font-medium">
                  {OrgProfile?.address}
                </p>
              </div>
            </div> */}
            </div>

            {/* CAUSES ANALYTICS */}
            <div
              className="p-5 mt-6 bg-white rounded-3xl border"
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
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
                {formattedChartData.length > 0 &&
                formattedChartData.some((item: any) => item.value > 0) ? (
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
                ) : (
                  <div className="flex h-[200px] items-center justify-center text-sm text-neutral-400">
                    No analytics data available for this cause.
                  </div>
                )}
              </div>
            </div>

            {/* RAISED CAUSES LIST */}
            <div className="p-5 my-6 bg-white border rounded-3xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Raised Causes</h2>
                <Link to="/edit-profile">
                  <button className="text-purple-500 underline">
                    View All
                  </button>
                </Link>
              </div>

              {causeData?.data?.map((c: any) => {
                const iconMatch = causeList.find(
                  (i) => i.cause === c.category?.toLowerCase(),
                );
                return (
                  <div
                    key={c._id}
                    className="flex justify-between items-center border-b py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        {/* {iconMatch && (
                        <img src={iconMatch.icon} className="h-8 w-8" />
                      )} */}
                        <p className="text-3xl ">{iconMatch?.icon}</p>
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
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
