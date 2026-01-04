/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import user from "../../assets/images/user.png";
interface IDonor {
  _id: string;
  name: string;
  email: string;
  image: string | null;
}

interface IbreakDownByCause {
  totalDonationAmount: number;
  category: string;
  causeId: string;
  causeName: string;
}
interface ITopDonor {
  donor: IDonor;
  totalAmount: number;
  donationCount: number;
  previousAmount: number;
  percentageChange: number;
  isIncrease: boolean;
  lastDonationDate: string;
  lastDonationAmount: number;
}

interface ITopDonors {
  breakDownByCause: any;
  topDonors: ITopDonor[];
  recentDonors: ITopDonor[];
  IbreakDownByCause: IbreakDownByCause;
}

interface AnalyticsCardProps {
  filter: "today" | "this_week" | "this_month";
  data: { message: string; data: ITopDonors };
}

const TopDonors: React.FC<AnalyticsCardProps> = ({ data }) => {
  const topDonors = data?.data?.topDonors;
  const recentDonors = data?.data?.recentDonors;
  const TotalDonationAmount = data?.data?.breakDownByCause;

  console.log("breakDownByCause", data?.data?.breakDownByCause?.categories);

  return (
    <div>
      <div className="bg-white rounded-3xl p-6 border my-3">
        <h1 className="text-2xl font-medium mb-2">Top 05 Donors</h1>
        <p className="text-gray-400 mb-6">Sorted by total donations</p>
        {topDonors?.length > 0 ? (
          <>
            {" "}
            {topDonors?.map((item) => (
              <div
                key={item.donor._id}
                className="flex justify-between items-center gap-2 mb-4"
              >
                <div className="flex justify-start items-center gap-2">
                  <img
                    src={item.donor.image || user}
                    alt={item.donor.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <h1>{item.donor.name}</h1>
                    <p className="text-gray-400">
                      Donations: {item.donationCount}
                    </p>
                  </div>
                </div>
                <div>
                  <p>${item.totalAmount}</p>
                  <p
                    className={`text-${item.isIncrease ? "green" : "red"}-500`}
                  >
                    {item.isIncrease ? "+" : "-"}
                    {item.percentageChange}%
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-400">No top donors</p>
        )}
      </div>
      {/* recent donors */}
      <div className="bg-white rounded-3xl p-6 border my-3">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-medium mb-2">Recent donors</h1>
          <Link to="/donors">
            <button className="text-purple-500 underline ">View All</button>
          </Link>
        </div>

        {recentDonors?.length > 0 ? (
          <>
            {" "}
            {recentDonors?.map((item) => (
              <div
                key={item?.donor._id}
                className="flex justify-between items-center gap-2 mb-4"
              >
                <div className="flex justify-start items-center gap-2">
                  <img src={user} alt="" />
                  <div>
                    <h1>{item?.donor?.name}</h1>
                    <p className="text-gray-400">
                      {new Date(item?.lastDonationDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <p>${item.lastDonationAmount}</p>
                  <p className="text-gray-400">Last Donation</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-400">No recent donors</p>
        )}
      </div>

      {/* breakdown by causes */}
      <div className="bg-white rounded-3xl p-6 border my-3">
        <h1 className="text-xl font-medium mb-4">Breakdown by Causes</h1>

        <div className="mb-6">
          <p className="text-gray-400 text-sm">Total Donations</p>
          <h1 className="text-3xl font-semibold">
            <span className="text-gray-400 align-middle">$</span>
            <span className="align-middle">
              {TotalDonationAmount?.totalDonationAmount?.toLocaleString() ?? "0"}
            </span>
          </h1>
        </div>

        {(() => {
          const categories = data?.data?.breakDownByCause?.categories ?? [];
          const colors = ["bg-pink-200", "bg-blue-200", "bg-yellow-200"];

          const totals = categories.map((c: any) => c.totalDonationAmount ?? 0);
          const grandTotal = totals.reduce((sum: number, v: number) => sum + v, 0);

          const topThree = [...categories]
            .sort((a: any, b: any) => (b.totalDonationAmount ?? 0) - (a.totalDonationAmount ?? 0))
            .slice(0, 3);

          const segments = topThree.length
            ? topThree
            : [
                { category: "Non-profit", totalDonationAmount: 0 },
                { category: "Charity", totalDonationAmount: 0 },
                { category: "Mosque", totalDonationAmount: 0 },
              ];

          return (
            <>
              {/* separate rounded pills */}
              <div className="flex w-full gap-4 mb-6">
                {segments.map((seg: any, idx: number) => {
                  const value = seg.totalDonationAmount ?? 0;
                  const share = grandTotal > 0 ? value / grandTotal : 1 / segments.length;
                  // base width: 40% for first, 20% for others, scaled by share
                  const base = idx === 0 ? 0.5 : 0.2;
                  const widthPercent = Math.max(base * share * 100, 12);
                  return (
                    <div
                      key={seg.category ?? idx}
                      className={`${colors[idx] ?? "bg-gray-200"} h-16 rounded-3xl`}
                      style={{ width: `${widthPercent}%` }}
                    />
                  );
                })}
              </div>

              {/* legend + amounts */}
              <div className="grid grid-cols-3 gap-5 mt-4">
                {segments.map((seg: any, idx: number) => (
                  <div key={seg.category ?? idx}>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`${colors[idx] ?? "bg-gray-200"} h-2 w-2 rounded-full`}
                      />
                      <p className="text-sm text-gray-500">
                        {seg.category ?? (idx === 0 ? "Non-profit" : idx === 1 ? "Charity" : "Mosque")}
                      </p>
                    </div>
                    <h1 className="text-2xl font-medium">
                      <span className="text-gray-400">$</span>
                      {Number(seg.totalDonationAmount ?? 0).toLocaleString()}
                    </h1>
                  </div>
                ))}
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default TopDonors;
