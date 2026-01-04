/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DatePicker } from "antd";
import { useState } from "react";
import { useGetTrendsQuery } from "../../redux/features/dashboardApi/dashboardApi";
import moment from "moment";

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  const value = payload[0].value;

  return (
    <div className="px-4 py-1 rounded-3xl shadow-sm bg-white border border-neutral-200 text-sm font-medium text-black">
      {Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}
    </div>
  );
};

const BarChartComponents = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  const { data: trendsData } = useGetTrendsQuery(year);

  // Convert API response → Recharts format
  const chartData =
    trendsData?.data?.map((item: any) => ({
      name: item.month,
      value: item.totalAmount,
    })) || [];

  const maxValue = chartData.reduce(
    (max: number, item: any) => (item.value > max ? item.value : max),
    0
  );

  const hasData = chartData.length > 0 && maxValue > 0;

  return (
    <div
      style={{ width: "100%", height: 400 }}
      className="rounded-[32px] bg-white p-6 shadow-sm"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="mb-6">
          <h3 className="font-familjen text-xl md:text-2xl font-semibold text-black">
            Trends &amp; Insights
          </h3>
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

      {hasData ? (
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 24, right: 16, left: 0, bottom: 24 }}>
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
              cursor={{ fill: "transparent" }}
              content={<CustomTooltip />}
              wrapperStyle={{ outline: "none" }}
            />

            <Bar
              dataKey="value"
              barSize={36}
              radius={[999, 999, 999, 999]}
              shape={(props: any) => {
                const { x, y, width, height, value } = props;
                const isMax = value === maxValue;
                const color = isMax ? "#c08fff" : "#ede9f2";
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    rx={18}
                    ry={18}
                    fill={color}
                  />
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-[260px] items-center justify-center text-sm text-neutral-400">
          No trends data available for this year.
        </div>
      )}
    </div>
  );
};

export default BarChartComponents;
