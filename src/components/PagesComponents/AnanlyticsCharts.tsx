import { useOrganizationCurrency } from "../../hooks/useOrganizationCurrency";
import { LuCoins, LuCalendarClock, LuGift } from "react-icons/lu";

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
  const currency = useOrganizationCurrency();
  // console.log("stats", stats);

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
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
              <LuCoins className="w-5 h-5" />
            </div>
          </div>

          <h1 className="text-3xl font-bold">
            <span className="text-gray-400">{currency.organizationCurrency}</span>
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
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <LuCalendarClock className="w-5 h-5" />
            </div>
          </div>

          <h1 className="text-3xl font-bold">
            <span className="text-gray-400">{currency.organizationCurrency}</span>
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
            <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600 flex-shrink-0">
              <LuGift className="w-5 h-5" />
            </div>
          </div>

          <h1 className="text-3xl font-bold">
            <span className="text-gray-400">{currency.organizationCurrency}</span>
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
