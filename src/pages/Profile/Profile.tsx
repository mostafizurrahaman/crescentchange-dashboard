/* eslint-disable @typescript-eslint/no-unused-vars */

import profile from "../../assets/images/profile.png";
import hfl from "../../assets/images/Profile Logo.png";
import tick from "../../assets/images/Checkmark.png";
import { FiEdit3 } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { IoIosLink } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import books from "../../assets/images/books.png";
import meal from "../../assets/images/meal.png";
import dress from "../../assets/images/dress.png";
import dreams from "../../assets/images/dreams.png";
import { DatePicker, Select } from "antd";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from "recharts";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [selectedYear] = useState(dayjs().year());
  const data = [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 50 },
    { name: "Mar", value: 40 },
    { name: "Apr", value: 70 },
    { name: "May", value: 90 },
    { name: "Jun", value: 60 },
    { name: "Jul", value: 80 },
    { name: "Aug", value: 100 },
    { name: "Sep", value: 75 },
    { name: "Oct", value: 85 },
    { name: "Nov", value: 95 },
    { name: "Dec", value: 100 },
  ];

  const onChange = () => {};

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
          <button className="bg-white px-4 py-3 rounded-3xl border">
            Preview Profile{" "}
          </button>
          <button className="bg-white px-4 py-3 rounded-3xl border">
            Update Profile
          </button>
        </div>
      </div>
      <div className="my-6 relative">
        <img src={profile} alt="" className="w-full" />
        <div className="absolute ml-28 top-60">
          <img src={hfl} alt="" className="h-40 w-40" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 justify-between items-center mt-24">
        <div className="flex justify-start items-center gap-5">
          <h1 className="text-2xl font-bold">HFL Foundation</h1>
          <img src={tick} alt="" />
        </div>

        <p className="text-gray-400">
          Established since: <span className="text-black">01 July 2018</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
        <div className="w-full md:w-[70%]">
          <div className="my-10">
            <div className="p-6 bg-white rounded-3xl border">
              <p className="text-gray-400">About</p>
              <p className="my-6 text-gray-800">
                Hope for Learning Foundation exists to unlock the power of
                education for underserved communities. We champion access,
                equity, and opportunity — because every child deserves a future
                filled with knowledge, growth, and hope.
              </p>
                <p className="text-gray-400">Connect & Contact</p>
            </div>

            <div
              style={{ width: "100%", height: 400 }}
              className="bg-secondary  p-4 rounded-lg"
            >
              <div className="flex justify-end items-center mb-4">
                <DatePicker
                  onChange={onChange}
                  defaultValue={dayjs(selectedYear, "YYYY")}
                  format={"YYYY"}
                  picker="year"
                  className="w-full md:w-auto"
                />
              </div>
              <ResponsiveContainer>
                <AreaChart data={data}>
                  <XAxis dataKey="name" stroke="#000000" />
                  <YAxis stroke="#000000" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#d3d3d3" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333333",
                      border: "none",
                    }}
                    itemStyle={{
                      color: "#bee4ff",
                    }}
                    labelStyle={{
                      color: "#bee4ff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#bee4ff"
                    fill="#bee4ff"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[30%]">
          <h1 className="text-2xl font-bold my-3">Raised Causes</h1>
          <div className="flex justify-start items-center gap-5 my-5">
            <img src={books} alt="" />
            <div>
              <h1 className="text-lg font-bold">Backpacks & Books</h1>
              <div className="flex justify-between items-center gap-36">
                <p className="text-green-500">Raised: $10,000</p>
                <p>July 2025-oct 2025</p>
              </div>
            </div>
          </div>
          <p className=" border border-b"></p>
          <div className="flex justify-start items-center gap-5 my-5">
            <img src={meal} alt="" />
            <div>
              <h1 className="text-lg font-bold">Every Child, Every Meal</h1>
              <div className="flex justify-between items-center gap-36">
                <p className="text-green-500">Raised: $10,000</p>
                <p>July 2025-oct 2025</p>
              </div>
            </div>
          </div>
          <p className=" border border-b"></p>
          <div className="flex justify-start items-center gap-5 my-5">
            <img src={dress} alt="" />
            <div>
              <h1 className="text-lg font-bold">Warmth in Winter</h1>
              <div className="flex justify-between items-center gap-36">
                <p className="text-green-500">Raised: $10,000</p>
                <p>July 2025-oct 2025</p>
              </div>
            </div>
          </div>
          <p className=" border border-b"></p>
          <div className="flex justify-start items-center gap-5 my-5">
            <img src={dreams} alt="" />
            <div>
              <h1 className="text-lg font-bold">Digital Dreams</h1>
              <div className="flex justify-between items-center gap-36">
                <p className="text-green-500">Raised: $10,000</p>
                <p>July 2025-oct 2025</p>
              </div>
            </div>
          </div>
          <p className=" border border-b"></p>
          <div className="flex justify-start items-center gap-5 my-5">
            <img src={meal} alt="" />
            <div>
              <h1 className="text-lg font-bold">Every Child, Every Meal</h1>
              <div className="flex justify-between items-center gap-36">
                <p className="text-green-500">Raised: $10,000</p>
                <p>July 2025-oct 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
