import { DatePicker, Table } from "antd";
import { FC } from "react";

interface DepositData {
    key: string;
    date: string;
    amount: string;
    donor: string;
    method: string;
    card: string;
}

const Deposits: FC = () => {
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",

        },
        {
            title: "Donor Name",
            dataIndex: "donor",
            key: "donor",

        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",

        },
        {
            title: "Payment Method",
            dataIndex: "method",
            key: "method",

        },
        {
            title: "Card Number",
            dataIndex: "card",
            key: "card",

        },
    ];

    const data: DepositData[] = [
        {
            key: "1",
            date: "Thursday, 31st of June",
            donor: "John Doe",
            amount: "$500",
            method: "Credit Card",
            card: "**** 521456",
        },
        {
            key: "2",
            date: "Wednesday, 30th of June",
            donor: "Jane Smith",
            amount: "$250",
            method: "PayPal",
            card: "**** 874512",
        },

        {
            key: "3",
            date: "Tuesday, 29th of June",
            donor: "Michael Johnson",
            amount: "$1000",
            method: "Bank Transfer",
            card: "**** 963258",
        },


    ];

    return (
        <div className="max-w-screen-lg mx-auto mt-10">
            <div className="mb-4">
                <h1 className="text-3xl font-bold mb-5">Upcoming Deposits</h1>
                <div className="flex justify-between items-center my-5">
                    <p className="text-xl font-semibold">Change Deposit Date</p>
                    <DatePicker />
                </div>
                <div className="mb-4 shadow-lg p-5 border rounded-md bg-blue-600 text-white">
                    <p>Your next deposit amount: <strong>$500</strong></p>
                    <p>Deposit Date: <strong>Thursday, 31st of June</strong></p>
                    <p>Deposit from: <strong>John Doe</strong></p>
                    <p>Payment Method: <strong>Credit Card</strong></p>
                    <p>Deposit to Card: <strong>**** 521456</strong></p>
                </div>
            </div>

            <Table columns={columns} dataSource={data} pagination={false} bordered title={() => "Your Deposits"} />
        </div>
    );
};

export default Deposits;