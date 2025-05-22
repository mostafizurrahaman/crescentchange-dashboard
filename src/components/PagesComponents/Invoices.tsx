/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Tag, Button } from "antd";
import { FaDownload } from "react-icons/fa";

interface Invoice {
    key: string;
    id: string;
    date: string;
    plan: string;
    amount: number;
    status: "Paid" | "Pending";
}

const invoices: Invoice[] = [
    {
        key: "1",
        id: "INV-001",
        date: "2024-01-15",
        plan: "Monthly Subscription",
        amount: 10,
        status: "Paid",
    },
    {
        key: "2",
        id: "INV-002",
        date: "2024-02-15",
        plan: "Quarterly Subscription",
        amount: 25,
        status: "Pending",
    },
    {
        key: "3",
        id: "INV-003",
        date: "2024-03-15",
        plan: "Annual Subscription",
        amount: 90,
        status: "Paid",
    },
    {
        key: "4",
        id: "INV-004",
        date: "2024-04-15",
        plan: "Lifetime Subscription",
        amount: 250,
        status: "Paid",
    },
];

const Invoices: React.FC = () => {
    const handleDownload = (_invoice: Invoice) => {
        // const invoiceData = `
        //     Invoice ID: ${invoice.id}
        //     Date: ${invoice.date}
        //     Plan: ${invoice.plan}
        //     Amount: $${invoice.amount}
        //     Status: ${invoice.status}
        // `;
        // const blob = new Blob([invoiceData], { type: "text/plain;charset=utf-8" });
        // saveAs(blob, `${invoice.id}.txt`);
    };

    const columns = [
        {
            title: "Invoice ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Plan",
            dataIndex: "plan",
            key: "plan",
        },
        {
            title: "Amount ($)",
            dataIndex: "amount",
            key: "amount",
            render: (amount: number) => <span className="font-semibold">${amount}</span>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: "Paid" | "Pending") => (
                <Tag color={status === "Paid" ? "green" : "red"}>{status}</Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: Invoice) => (
                <Button
                    type="primary"
                    icon={<FaDownload />}
                    onClick={() => handleDownload(record)}
                >
                    Download
                </Button>
            ),
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-5">Invoices</h1>
            <Table columns={columns} dataSource={invoices} pagination={{ pageSize: 5 }} />
        </div>
    );
};

export default Invoices;
