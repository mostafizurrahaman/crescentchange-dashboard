import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {  Select,  } from "antd";

const BarChartComponents = () => {
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

 

  return (
    <div
      style={{ width: "100%", height: 400 }}
      className="bg-secondary  py-10 px-5 rounded-lg border"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className=" font-bold text-xl">Donation Insights</h3>
        <Select defaultValue="2025" className="w-[150px]">
          <Select.Option value="Last 30 Days">Last 30 Days</Select.Option>
          <Select.Option value="2">Last 60 Days</Select.Option>
          <Select.Option value="3">Last 90 Days</Select.Option>
          <Select.Option value="4">Last 120 Days</Select.Option>
        </Select>
      </div>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#000000" />
          <YAxis stroke="#000000" />
          <CartesianGrid strokeDasharray="3 3" stroke="#d3d3d3" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "none",
            }}
            itemStyle={{
              color: "#000000",
            }}
            labelStyle={{
              color: "#000000",
            }}
          />
          <Bar
            dataKey="value"
            fill="#fdb1f1"
            barSize={30}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponents;
