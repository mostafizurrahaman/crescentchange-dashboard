import SubscriptionCard from "../../components/PagesComponents/SubscriptionCard";
import { FaDownload, FaHandHoldingHeart } from "react-icons/fa";

interface DepositData {
  title: string;
  key: string;
  date: string;
  amount: string;
  donor: string;
  method: string;
  card: string;
  status?: string; // Optional field for status
}

const Subscriptions = () => {
  const data: DepositData[] = [
    {
      key: "1",
      title: "Foundation Plan",
      date: "Thursday, 31st of June",
      donor: "John Doe",
      amount: "$500",
      method: "Credit Card",
      card: "**** 521456",
      status: "Successful",
    },
    {
      key: "2",
      title: "Focus Plan",
      date: "Wednesday, 30th of June",
      donor: "Jane Smith",
      amount: "$250",
      method: "PayPal",
      card: "**** 874512",
      status: "Pending",
    },

    {
      key: "3",
      title: "Freedom Plan",
      date: "Tuesday, 29th of June",
      donor: "Michael Johnson",
      amount: "$1000",
      method: "Bank Transfer",
      card: "**** 963258",
      status: "Failed",
    },
  ];
  return (
    <div>
      <div className="w-full">
        <h1 className="text-xl md:text-3xl font-semibold my-3">
          Subscriptions
        </h1>
        <p className="text-gray-500 mb-10">
          Overview of your active subscriptions.
        </p>
      </div>
      <SubscriptionCard />

      <h1 className="text-xl md:text-3xl font-semibold my-3">
        Subscriptions History
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
        {data.map((item) => (
          <div
            key={item.key}
            className="bg-white p-5 rounded-xl shadow-md border "
          >
            <div className="flex justify-between items-center mb-5 border-b pb-5">
              <div className="flex justify-start items-center gap-5">
                <h1 className="text-xl md:text-2xl  font-semibold flex justify-center items-center gap-2">
                  <FaHandHoldingHeart className="h-10 w-10 bg-[#b5e0ff] p-2 rounded-full"/>
                  {item.title}
                </h1>
              </div>
              <FaDownload className="bg-btnPrimary text-white p-2 rounded-full h-8 w-8" />
            </div>
            <div className="text-lg">
              <div className="flex justify-between items-center gap-5 mb-3">
                <p className="text-gray-500">Payment Date & Time</p>
                <p>{item.date}</p>
              </div>
              <div className="flex justify-between items-center gap-5 mb-3">
                <p className="text-gray-500">Plan Valodity</p>
                <p>{item.date}</p>
              </div>
              <div className="flex justify-between items-center gap-5 mb-3">
                <p className="text-gray-500">Amonunt</p>
                <p>{item.amount}</p>
              </div>
              <div className="flex justify-between items-center gap-5 mb-3">
                <p className="text-gray-500">Status</p>
                <p
                  className={`${
                    item.status === "Successful"
                      ? "bg-green-500 text-white px-3 py-1 rounded-md"
                      : ""
                  } ${
                    item.status === "Failed"
                      ? "bg-red-500 text-white px-3 py-1 rounded-md"
                      : ""
                  } ${
                    item.status === "Pending"
                      ? "bg-yellow-500 text-white px-3 py-1 rounded-md"
                      : ""
                  }`}
                >
                  {item.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
