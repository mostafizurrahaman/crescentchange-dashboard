import BarChartComponents from "./BarChartComponents";
import Envlope from "./Envlope";
interface AnalyticsCardProps {
  filter: "Today" | "This Week" | "This Month";
  data: { message: string };
}

const DashboardChart:React.FC<AnalyticsCardProps> = () => {
  return (
    <div className="flex  gap-5">
      <div className="w-full md:w-[70%]">
        <BarChartComponents />
      </div>
      <div className=" w-[30%]">
        <Envlope />
      </div>
    </div>
  );
};

export default DashboardChart;
