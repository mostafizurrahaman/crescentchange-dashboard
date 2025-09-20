/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import user from "../../assets/images/user.png";
interface AnalyticsCardProps {
  filter: "Today" | "This Week" | "This Month";
  data: { message: string };
}

const TopDonors: React.FC<AnalyticsCardProps> = () => {
  return (
    <div>
      <div className="">
        <h1 className="text-3xl font-bold mb-4">Top 05 Donors</h1>
        <div className="mt-5 border rounded-lg  p-5">
          <div className="flex justify-start items-center gap-5 bg-white p-5 rounded-lg  border-b overflow-y-auto">
            <div className="relative h-10 w-10 rounded-full">
              <img src={user} alt="" />
              <div className="absolute bottom-0 right-0 bg-black text-white h-5 w-5 flex justify-center items-center rounded-full  ">
                1
              </div>
            </div>
            <div>
              <h1>John Doe</h1>
              <div className="flex justify-start items-center gap-5">
                <p className="text-green-500">$45,000</p>
                <p className="h-5 border-r px-5"></p>
                <p>Since:July,2025</p>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 bg-white p-5 rounded-lg  border-b overflow-y-auto">
            <div className="relative h-10 w-10 rounded-full">
              <img src={user} alt="" />
              <div className="absolute bottom-0 right-0 bg-black text-white h-5 w-5 flex justify-center items-center rounded-full  ">
                1
              </div>
            </div>
            <div>
              <h1>John Doe</h1>
              <div className="flex justify-start items-center gap-5">
                <p className="text-green-500">$45,000</p>
                <p className="h-5 border-r px-5"></p>
                <p>Since:July,2025</p>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 bg-white p-5 rounded-lg  border-b overflow-y-auto">
            <div className="relative h-10 w-10 rounded-full">
              <img src={user} alt="" />
              <div className="absolute bottom-0 right-0 bg-black text-white h-5 w-5 flex justify-center items-center rounded-full  ">
                1
              </div>
            </div>
            <div>
              <h1>John Doe</h1>
              <div className="flex justify-start items-center gap-5">
                <p className="text-green-500">$45,000</p>
                <p className="h-5 border-r px-5"></p>
                <p>Since:July,2025</p>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 bg-white p-5 rounded-lg  border-b overflow-y-auto">
            <div className="relative h-10 w-10 rounded-full">
              <img src={user} alt="" />
              <div className="absolute bottom-0 right-0 bg-black text-white h-5 w-5 flex justify-center items-center rounded-full  ">
                2
              </div>
            </div>
            <div>
              <h1>John Doe</h1>
              <div className="flex justify-start items-center gap-5">
                <p className="text-green-500">$45,000</p>
                <p className="h-5 border-r px-5"></p>
                <p>Since:July,2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 ">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Recent Donors</h1>
          <Link to="/donors">
            <p className="text-lg">View All</p>
          </Link>
        </div>
        <div className="mt-5 border rounded-lg  p-5">
          <div className="flex justify-start items-center gap-5 bg-white p-5 rounded-lg  border-b overflow-y-auto">
            <img src={user} alt="" />
            <div>
              <h1>John Doe</h1>
              <p>Donated 20 min ago</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 bg-white p-5 rounded-lg  border-b overflow-y-auto">
            <img src={user} alt="" />
            <div>
              <h1>John Doe</h1>
              <p>Donated 20 min ago</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 bg-white p-5 rounded-lg  border-b overflow-y-auto">
            <img src={user} alt="" />
            <div>
              <h1>John Doe</h1>
              <p>Donated 20 min ago</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 bg-white p-5 rounded-lg  border-b overflow-y-auto">
            <img src={user} alt="" />
            <div>
              <h1>John Doe</h1>
              <p>Donated 20 min ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDonors;
