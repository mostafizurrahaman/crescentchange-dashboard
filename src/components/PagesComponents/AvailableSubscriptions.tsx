import { FaDollarSign } from "react-icons/fa";

const AvailableSubscriptions = () => {
    return (
        <div className=" grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-2 border border-primary rounded-md">
                <p>Monthly subscription</p>
                <p>10$</p>
                <p>Youth organization</p>
                <ul>
                    <li className="">use multiple payment methods</li>
                    <li>use multiple payment methods</li>
                    <li>use multiple payment methods</li>
                </ul>
            </div>
        </div>
    );
};

export default AvailableSubscriptions;