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

  console.log(TotalDonationAmount);

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
                    <p className="text-gray-400">{item?.lastDonationDate} </p>
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
      {/* TODO */}
      <div className="bg-white rounded-3xl p-6 border my-3">
        <h1 className="text-xl font-medium">Breakdown by Causes</h1>
        <div className="my-6">
          <p className="text-gray-400">Total Donations</p>
          <h1 className="text-2xl font-medium">
            <span className="text-gray-400">$</span>
            {TotalDonationAmount?.totalDonationAmount}
          </h1>
        </div>
        <div className="flex justify-between items-center gap-1">
          <div className="bg-pink-200 h-12 w-[60%] rounded-2xl"></div>
          <div className="bg-blue-200 h-12 w-[20%] rounded-2xl"></div>
          <div className="bg-yellow-200 h-12 w-[20%] rounded-2xl"></div>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-6">
          <div>
            <div className="flex justify-start items-center gap-1">
              <div className="h-2 w-2 bg-pink-200"></div>
              <p>Non-profit</p>
            </div>
            <h1 className="text-2xl font-medium">
              <span className="text-gray-400">$</span> 40,0000
            </h1>
          </div>
          <div>
            <div className="flex justify-start items-center gap-1">
              <div className="h-2 w-2 bg-blue-200"></div>
              <p>Non-profit</p>
            </div>
            <h1 className="text-2xl font-medium">
              <span className="text-gray-400">$</span> 40,0000
            </h1>
          </div>
          <div>
            <div className="flex justify-start items-center gap-1">
              <div className="h-2 w-2 bg-yellow-200"></div>
              <p>Non-profit</p>
            </div>
            <h1 className="text-2xl font-medium">
              <span className="text-gray-400">$</span> 40,0000
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDonors;
