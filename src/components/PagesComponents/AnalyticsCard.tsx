import { BsArrowUpRight } from "react-icons/bs";


interface TopCause {
  _id: string;
  name: string;
  totalAmount: number;
}

interface AnalyticsData {
  totalDonatedAmount: {
    value: number;
    percentageChange: number;
    isIncrease: boolean;
  };
  averageDonationPerUser: {
    value: number;
    percentageChange: number;
    isIncrease: boolean;
  };
  totalDonors: {
    value: number;
    percentageChange: number;
    isIncrease: boolean;
  };
  topCause: TopCause | null;
}

interface AnalyticsCardProps {
  filter: "today" | "this_week" | "this_month";
  data: {
    message: string;
    data: AnalyticsData;
  };
}
// interface AnalyticsCardProps {
//   filter: "today" | "this_week" | "this_month";
//   data: {
//     message: string;
//     data: {
//       totalDonatedAmount: {
//         isIncrease: boolean;
//         percentageChange: number;
//         value: number;
//       };
//       averageDonationPerUser: {
//         isIncrease: boolean;
//         percentageChange: number;
//         value: number;
//       };
//       totalDonors: {
//         value: number;
//         percentageChange: number;
//         isIncrease: boolean;
//       };
//       topCause: string | null;
//     };
//   };
// }

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({  data }) => {
  const stats = data?.data;

  return (
    <div className="bg-white border rounded-3xl p-6">
      <div className="flex justify-between items-start gap-5 my-5">
        <div>
          <h1 className="text-3xl font-bold">Total Donated</h1>
          <p className="text-gray-500 mb-12">
            {stats?.totalDonatedAmount?.isIncrease ? "+" : "-"}$
            {stats?.totalDonatedAmount?.value} from last month
          </p>

          <div className="flex justify-start items-end gap-2">
            <p className="text-3xl md:text-5xl font-bold text-gray-400">
              $ <span className="text-black">{stats?.totalDonatedAmount?.value}</span>
            </p>
            <p className="text-gray-400">
              <span
                className={
                  stats?.totalDonatedAmount?.isIncrease
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {stats?.totalDonatedAmount?.percentageChange}%
              </span>{" "}
              vs last month
            </p>
          </div>
        </div>

        <BsArrowUpRight className="h-5 w-5 cursor-pointer" />
      </div>

      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        
        <div className="bg-[#f7f2fa] px-6 py-8 rounded-3xl">
          <h1 className="text-xl font-medium mb-12">Avg. Donation</h1>

          <div className="flex items-end gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-black">
              <span className="text-gray-400">$</span>{" "}
              {stats?.averageDonationPerUser?.value}
            </h1>
            <p className="text-gray-400">per user</p>
          </div>
        </div>

        <div className="bg-[#f7f2fa] px-6 py-8 rounded-3xl">
          <h1 className="text-xl font-medium mb-12">Total Donors</h1>

          <div className="flex items-end gap-2">
            <h1 className="text-2xl md:text-3xl text-black font-bold">
              {stats?.totalDonors?.value}
            </h1>
            <p
              className={
                stats?.totalDonors?.isIncrease
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stats?.totalDonors?.percentageChange}%
            </p>
          </div>
        </div>

        <div className="bg-[#f7f2fa] px-6 py-8 rounded-3xl">
          <h1 className="text-xl font-medium mb-12">Top Cause</h1>
          <p className="underline text-xl font-medium">
            {stats?.topCause?.name || "No cause available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
