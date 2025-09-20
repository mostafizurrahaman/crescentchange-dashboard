/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import user from "../../assets/images/user.png";
interface AnalyticsCardProps {
  filter: "Today" | "This Week" | "This Month";
  data: { message: string };
}

const TopDonors: React.FC<AnalyticsCardProps> = () => {
  const data = [
    {
      id: 1,
      name: "Josh Bill",
      img: user,
      time: "Since: July, 2025",
      money: "24,000",
      percentage: "8.2%",
    },
    {
      id: 2,
      name: "Emily Carter",
      img: user,
      time: "Since: March, 2024",
      money: "18,500",
      percentage: "6.5%",
    },
    {
      id: 3,
      name: "Michael Brown",
      img: user,
      time: "Since: January, 2023",
      money: "15,200",
      percentage: "5.1%",
    },
    {
      id: 4,
      name: "Sophia Davis",
      img: user,
      time: "Since: October, 2022",
      money: "12,700",
      percentage: "4.2%",
    },
    {
      id: 5,
      name: "Daniel Wilson",
      img: user,
      time: "Since: May, 2021",
      money: "10,300",
      percentage: "3.7%",
    },
  ];

  return (
    <div>
      <div className="bg-white rounded-3xl p-6 border my-3">
        <h1 className="text-2xl font-medium mb-2">Top 05 Donors</h1>
        <p className="text-gray-400 mb-6">Sorted by total donations</p>
        {data.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center gap-2 mb-4"
          >
            <div className="flex justify-start items-center gap-2">
              <p>{item.id}</p>
              <img src={user} alt="" />
              <div>
                <h1>{item.name}</h1>
                <p className="text-gray-400">{item.time} </p>
              </div>
            </div>
            <div>
              <p>${item.money}</p>
              <p className="text-green-500">+ {item.percentage}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-3xl p-6 border my-3">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-medium mb-2">Recent donors</h1>
          <Link to="">
            <button className="text-purple-500 underline ">View All</button>
          </Link>
        </div>

        {data.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center gap-2 mb-4"
          >
            <div className="flex justify-start items-center gap-2">
              {/* <p>{item.id}</p> */}
              <img src={user} alt="" />
              <div>
                <h1>{item.name}</h1>
                <p className="text-gray-400">{item.time} </p>
              </div>
            </div>
            {/* <div>
              <p>${item.money}</p>
              <p className="text-green-500">+ {item.percentage}</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDonors;
