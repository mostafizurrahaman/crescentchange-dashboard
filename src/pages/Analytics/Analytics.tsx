import AnalyticsCard from "../../components/PagesComponents/AnalyticsCard";
import AnanlyticsCharts from "../../components/PagesComponents/AnanlyticsCharts";
import TopDonors from "../../components/PagesComponents/TopDonors";
import DashboardChart from "../../components/PagesComponents/DashboardChart";
import { useState } from "react";
import QuickLinks from "../../components/DashboardComponnets/QuickLinks";
import { useGetDonationStatsQuery } from "../../redux/features/dashboardApi/dashboardApi";

type FilterType = "today" | "this_week" | "this_month";

const Analytics = () => {
  const [active, setActive] = useState<FilterType>("today");

  const { data: dashboardData } = useGetDonationStatsQuery({
    filter: active,
    donationType: "all",
  });

  const btnClass = (filter: FilterType) =>
    `px-9 py-3 rounded-3xl border transition ${
      active === filter ? "bg-black text-white" : "bg-white text-black"
    }`;

  return (
    <div className="">
      <div className="flex justify-between items-start gap-5">
        <div className="w-full">
          <h1 className="font-familjen text-xl md:text-4xl font-bold  mb-3">
            Your impact at a glance.
          </h1>
          <p className="text-gray-500 mb-10">
            Track donation patterns, donor behavior, and how contributions are
            shaping results.
          </p>
        </div>
        <div className="w-full flex justify-end items-start gap-5">
          <button
            className={btnClass("today")}
            onClick={() => setActive("today")}
          >
            Today
          </button>
          <button
            className={btnClass("this_week")}
            onClick={() => setActive("this_week")}
          >
            This Week
          </button>
          <button
            className={btnClass("this_month")}
            onClick={() => setActive("this_month")}
          >
            This Month
          </button>
        </div>
      </div>

      <div className="flex justify-between items-start gap-5">
        <div className=" w-full md:w-[70%]">
          <AnalyticsCard filter={active} data={dashboardData} />
          <AnanlyticsCharts filter={active} data={dashboardData} />
          <DashboardChart filter={active} data={dashboardData} />
        </div>
        <div className="hidden md:block w-[30%]">
          <QuickLinks />
          <TopDonors filter={active} data={dashboardData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
