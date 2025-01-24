import { Col } from "antd";
import { BsDatabase } from "react-icons/bs";
import { FaDollarSign, FaUsers } from "react-icons/fa6";
import user from "../../assets/images/user.png"
const AnalyticsCard = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* earning */}
                <Col>
                    <div className="flex flex-col justify-between md:justify-center items-center border-r-2 p-4 bg-btnPrimary text-primary rounded-md gap-5  h-auto md:h-28">
                        <div className="flex  gap-3 items-center">
                            <p className=" rounded-full flex justify-center items-center">
                                <FaDollarSign size={20} />
                            </p>
                            <p className="text-base md:text-lg ">Total Donation</p>
                        </div>
                        <p className="text-green-500 text-xl font-bold ">
                            90,0000
                        </p>
                    </div>
                </Col>
                {/* user  */}
                <Col>
                    <div className="flex flex-col justify-between md:justify-center items-center border-r-2 p-4 bg-[#ffc8c6] rounded-md gap-5  h-auto md:h-28">
                        <div className="flex gap-3 items-center">
                            <p className=" rounded-full flex justify-center items-center">
                                <FaUsers size={20} />
                            </p>
                            <p className="text-base md:text-lg ">Total Donar</p>
                        </div>
                        <p className="text-green-500 text-xl font-bold ">
                            25.5K
                        </p>
                    </div>
                </Col>
                {/* patient */}
                <Col>
                    <div className="flex flex-col justify-between md:justify-center items-center border-r-2 p-4 bg-[#c6ffd4] rounded-md gap-5  h-auto md:h-28">
                        <div className="flex gap-3 items-center">
                            <p className=" rounded-full flex justify-center items-center">
                                <FaDollarSign size={20} />
                            </p>
                            <p className="text-base md:text-lg ">Total Deposit</p>
                        </div>
                        <p className="text-green-500 text-xl font-bold ">
                            920
                        </p>
                    </div>
                </Col>

                {/* blocked      */}
                <Col>
                    <div className="flex flex-col justify-between md:justify-center items-center border-r-2 p-4 bg-[#ffedc6] rounded-md gap-5  h-auto md:h-28">
                        <div className="flex gap-3 items-center">
                            <p className=" rounded-full flex justify-center items-center">
                                <FaUsers size={20} />
                            </p>

                            <p className="text-base md:text-lg ">Blocked Accounts</p>
                        </div>
                        <p className="text-red-500 text-xl font-bold ">
                            920
                        </p>
                    </div>
                </Col>

            </div>
        </div>
    );
};

export default AnalyticsCard;