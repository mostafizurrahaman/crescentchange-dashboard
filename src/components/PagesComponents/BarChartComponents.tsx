/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DatePicker } from "antd";
import { useState } from "react";
import { useGetTrendsQuery } from "../../redux/features/dashboardApi/dashboardApi";
import moment from "moment";
const BarChartComponents = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  const { data: trendsData } = useGetTrendsQuery(year);
  console.log("trendsData", trendsData?.data);
  console.log("year", year);

  // Convert API response → Recharts format
  const chartData =
    trendsData?.data?.map((item: any) => ({
      name: item.month,
      value: item.totalAmount,
    })) || [];

  return (
    <div style={{ width: "100%", height: 400 }} className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="mb-6">
          <h3 className="font-bold text-xl">Trends & Insights</h3>
          <p className="text-gray-400">+8.2% from last month</p>
        </div>

        <DatePicker
          picker="year"
          value={moment(year, "YYYY")}
          onChange={(date) => {
            if (date) {
              setYear(date.year());
            }
          }}
          placeholder="Select Year"
        />
      </div>

      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#000000" />
          <YAxis stroke="#000000" />
          <CartesianGrid strokeDasharray="3 3" stroke="#d3d3d3" />

          <Tooltip
            contentStyle={{
              backgroundColor: "#ebe9ec",
              borderRadius: "12px",
            }}
            itemStyle={{ color: "#000000" }}
            labelStyle={{ color: "#000000" }}
          />

          <Bar
            dataKey="value"
            fill="#c08fff"
            barSize={30}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponents;
