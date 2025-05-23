/* eslint-disable @typescript-eslint/no-unused-vars */

import profile from "../../assets/images/profile.png";
import hfl from "../../assets/images/hfl.png";
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

const Profile = () => {
 const [selectedYear, setSelectedYear] = useState(dayjs().year());
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

  const onChange = () => {
    
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="text-lg text-gray-600 mb-4">
        See how your supporters are giving and where your impact is growing.
      </p>
      <div className="my-6">
        <img src={profile} alt="" className="w-full" />
      </div>

      <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
        <div className="flex justify-start items-center gap-5">
          <img src={hfl} alt="" />
          <h1 className="text-2xl font-bold">HFL Foundation</h1>
        </div>
        <button className="bg-btnPrimary  py-2 px-4 rounded-3xl flex justify-center items-center gap-2 text-white">
          <FiEdit3 className="h-5 w-5" />
          Edit
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-5 justify-start items-center mt-10 mb-3">
        <div className="flex  justify-start items-center gap-5">
          <LuCalendarDays />
          <p>Date established: 01/01/2023</p>
          <p className="h-5 border-r border-dashed"></p>
        </div>
        <div className="flex  justify-start items-center gap-5">
          <IoIosLink />
          <p>www.hflfoundation.org</p>
          <p className="h-5 border-r border-dashed"></p>
        </div>
        <div className="flex  justify-start items-center gap-5">
          <AiOutlineMail />
          <p>contact@hflfoundation.org</p>
          <p className="h-5 border-r border-dashed"></p>
        </div>
        <div className="flex  justify-start items-center gap-5">
          <IoCallOutline />
          <p>+234 80 0000 0000</p>
          {/* <p className="h-5 border-r border-dashed"></p> */}
        </div>
      </div>
      <div className="flex  justify-start items-center gap-2">
        <CiLocationOn />
        <p>Darul Huda Center 45 Crescent Lane Sydney, Australia</p>
      </div>

   
      <div className="my-6 border-b"></div>
      <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
        <div className="w-full md:w-[70%]">
          <h1 className="text-2xl font-bold">Mission & Operations</h1>
          <p className="text-lg text-gray-600 my-4">
            Hope for Learning Foundation exists to unlock the power of education
            for underserved communities. We champion access, equity, and
            opportunity — because every child deserves a future filled with
            knowledge, growth, and hope.
          </p>
          <p className="my-5 border-b"></p>
          <div className="my-10">
            <div className="flex justify-between items-center gap-5">
              <h1 className="text-2xl font-bold">Causes Analytics</h1>
              <Select defaultValue={"Backpacks & Books"}>
                <Select.Option value="Backpacks & Books">
                  Backpacks & Books
                </Select.Option>
                <Select.Option value="Every Child, Every Meal">
                  Every Child, Every Meal
                </Select.Option>
                <Select.Option value="Warmth in Winter">
                  Warmth in Winter
                </Select.Option>
                <Select.Option value="Digital Dreams">
                  Digital Dreams
                </Select.Option>
              </Select>
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
