import BarChartComponents from "./BarChartComponents";
interface AnalyticsCardProps {
  filter:  "today" | "this_week" | "this_month";
  data: { message: string };
}

const DashboardChart:React.FC<AnalyticsCardProps> = () => {
  return (
    <div className="bg-white h-[50vh] rounded-3xl border ">
          <BarChartComponents />
      {/* <div className=" w-[30%]">
        <Envlope />
      </div> */}
    </div>
  );
};

export default DashboardChart;
