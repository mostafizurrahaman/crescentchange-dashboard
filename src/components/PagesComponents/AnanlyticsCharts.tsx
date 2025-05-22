import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import db from "../../assets/images/db.png";
import flower3 from "../../assets/images/Vector (1).png";
import flower4 from "../../assets/images/Vector.png";
import flower5 from "../../assets/images/Frame.png";
import recurring from "../../assets/images/recurring.png";
import onetime from "../../assets/images/ontime.png";
const AnanlyticsCharts = () => {
  return (
    <div className=" my-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#b5e0ff] p-5 rounded-2xl relative">
          <img src={db} alt="" />
          <p className="text-gray-500 my-5 text-xl">Round Up</p>
          <div className="flex justify-start items-center gap-5">
            <h1 className="text-3xl font-bold">$40,000</h1>
            <p className="flex justify-center items-center gap-2 text-green-500 bg-white px-4 py-1 rounded-2xl">
              <FaArrowUp />
              8.2%
            </p>
          </div>
          <img src={flower3} alt="" className="absolute bottom-0 right-0 top-0"/>
        </div>
        <div className="bg-[#9df2c1] p-5 rounded-2xl relative">
          <img src={recurring} alt="" />
          <p className="text-gray-500 my-5 text-xl">Recurring</p>
          <div className="flex justify-start items-center gap-5">
            <h1 className="text-3xl font-bold">$40,000</h1>
            <p className="flex justify-center items-center gap-2 text-red-500 bg-white px-4 py-1 rounded-2xl">
              <FaArrowDown />
              8.2%
            </p>
          </div>
          <img src={flower4} alt="" className="absolute bottom-0 right-0 top-0"/>
        </div>
        <div className="bg-[#ffe599] p-5 rounded-2xl relative">
          <img src={onetime} alt="" />
          <p className="text-gray-500 my-5 text-xl">One-Time</p>
          <div className="flex justify-start items-center gap-5">
            <h1 className="text-3xl font-bold">$40,000</h1>
            <p className="flex justify-center items-center gap-2 text-green-500 bg-white px-4 py-1 rounded-2xl">
              <FaArrowUp />
              8.2%
            </p>
          </div>
          <img src={flower5} alt="" className="absolute bottom-0 right-0 top-0"/>
        </div>
      </div>
    </div>
  );
};

export default AnanlyticsCharts;
