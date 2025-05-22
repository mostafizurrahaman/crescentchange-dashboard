import { CiSearch } from "react-icons/ci";
import AnalyticsCard from "../../components/PagesComponents/AnalyticsCard";
import AnanlyticsCharts from "../../components/PagesComponents/AnanlyticsCharts";
import TopDonors from "../../components/PagesComponents/TopDonors";
import { IoNotificationsOutline } from "react-icons/io5";
import user from "../../assets/images/user.png";

const Analytics = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center gap-5">
        <div className="w-full md:w-[70%]">
          <h1 className="text-xl md:text-3xl font-semibold my-3">Dashboard</h1>
          <p className="text-gray-500 mb-10">
            See how your supporters are giving and where your impact is growing.
          </p>
        </div>
        <div className="w-full md:w-[30%] flex justify-start items-center gap-5">
          <div className="flex items-center gap-5">
            <CiSearch className="h-8 w-8 border p-1 rounded-full" />
            <IoNotificationsOutline className="h-8 w-8 border p-1 rounded-full" />
            <div className="h-10 border-r-2"></div>
          </div>
          <div className="flex items-center gap-2">
            <img src={user} alt="" />
            <p>HFL Foundation</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-5">
        <div className=" w-full md:w-[70%]">
          <AnalyticsCard />
          <AnanlyticsCharts />
        </div>
        <div className="hidden md:block w-[30%]">
          <TopDonors />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
