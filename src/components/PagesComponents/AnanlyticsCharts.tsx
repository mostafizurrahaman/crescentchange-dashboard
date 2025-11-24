import oneTime from "../../assets/images/one-time.png";
import recurring from "../../assets/images/recurring.png";
import rounup from "../../assets/images/roundup.png";

interface AnalyticsCardProps {
  filter: "today" | "this_week" | "this_month";
  data: {
    message: string;
    data: {
      totalDonatedAmount: {
        isIncrease: boolean;
        percentageChange: number;
        value: number;
      };
      averageDonationPerUser: {
        isIncrease: boolean;
        percentageChange: number;
        value: number;
      };
      totalDonors: {
        value: number;
        percentageChange: number;
        isIncrease: boolean;
      };
      topCause: string | null;
      donationTypeBreakdown: {
        "round-up": {
          amount: number;
          value: number;
          percentageChange: number;
          isIncrease: boolean;
        };
        recurring: {
          amount: number;
          value: number;
          percentageChange: number;
          isIncrease: boolean;
        };
        "one-time": {
          amount: number;
          value: number;
          percentageChange: number;
          isIncrease: boolean;
        };
      };
    };
  };
}

const AnanlyticsCharts: React.FC<AnalyticsCardProps> = ({ data }) => {
  const stats = data?.data;
  console.log("stats", stats);

  return (
    <div className="my-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* ROUND-UP */}
        <div className="bg-white border p-6 rounded-2xl relative">
          <div className="flex justify-between items-start mb-6 h-20">
            <div>
              <p className="text-xl font-medium">Round Up</p>
              <p className="text-gray-500">
                Donations from automatic spare change
              </p>
            </div>
            <img src={rounup} alt="" />
          </div>

          <h1 className="text-3xl font-bold">
            <span className="text-gray-400">$</span>
            {stats?.donationTypeBreakdown["round-up"]?.amount ?? 0}
          </h1>
          <p className="text-gray-400 mt-2">
            <span className="text-green-500">
              {stats?.donationTypeBreakdown["round-up"].isIncrease ? "+" : "-"}
              {stats?.donationTypeBreakdown["round-up"].percentageChange}%
            </span>{" "}
            vs last month
          </p>
        </div>

        {/* RECURRING */}
        <div className="bg-white border p-6 rounded-2xl relative">
          <div className="flex justify-between items-start mb-6 h-20">
            <div>
              <p className="text-xl font-medium">Recurring</p>
              <p className="text-gray-500">Commitments</p>
            </div>
            <img src={recurring} alt="" />
          </div>

          <h1 className="text-3xl font-bold">
            <span className="text-gray-400">$</span>
            {stats?.donationTypeBreakdown.recurring?.amount ?? 0}
          </h1>
          <p className="text-gray-400 mt-2">
            <span className="text-green-500">
              {stats?.donationTypeBreakdown["recurring"].isIncrease ? "+" : "-"}
              {stats?.donationTypeBreakdown["recurring"].percentageChange}%
            </span>{" "}
            vs last month
          </p>
        </div>

        {/* ONE-TIME */}
        <div className="bg-white border p-6 rounded-2xl relative">
          <div className="flex justify-between items-start mb-6 h-20">
            <div>
              <p className="text-xl font-medium">One-time</p>
              <p className="text-gray-500">Single contributions</p>
            </div>
            <img src={oneTime} alt="" />
          </div>

          <h1 className="text-3xl font-bold">
            <span className="text-gray-400">$</span>
            {stats?.donationTypeBreakdown["one-time"]?.amount ?? 0}
          </h1>
          <p className="text-gray-400 mt-2">
            <span className="text-green-500">
              {stats?.donationTypeBreakdown["one-time"].isIncrease ? "+" : "-"}
              {stats?.donationTypeBreakdown["one-time"].percentageChange}%
            </span>{" "}
            vs last month
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnanlyticsCharts;
