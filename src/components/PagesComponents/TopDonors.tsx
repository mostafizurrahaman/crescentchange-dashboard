/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button, Space, Table } from 'antd';
import user from "../../assets/images/user.png";

const TopDonors = () => {

    type Donor = {
        id: string;
        slno: string;
        name: string;
        profileImage: string;
        email: string;
        contactNumber: string;
        transactionId: string;
        totalDonations: number;
        lastDonationDate: string;
        status: "Active" | "Inactive";
    };

    const data: Donor[] = [
        {
            id: "1",
            slno: "1",
            name: "John Doe",
            profileImage: user,
            email: "john.doe@example.com",
            contactNumber: "9876543210",
            transactionId: "TXN12345",
            totalDonations: 5000,
            lastDonationDate: "2024-01-15",
            status: "Active",
        },
        {
            id: "2",
            slno: "2",
            name: "Jane Smith",
            profileImage: user,
            email: "jane.smith@example.com",
            contactNumber: "9123456789",
            transactionId: "TXN67890",
            totalDonations: 3000,
            lastDonationDate: "2024-01-10",
            status: "Active",
        },
        {
            id: "3",
            slno: "3",
            name: "Robert Brown",
            profileImage: user,
            email: "robert.brown@example.com",
            contactNumber: "9812345678",
            transactionId: "TXN11223",
            totalDonations: 7000,
            lastDonationDate: "2023-12-25",
            status: "Inactive",
        }
    ];

    const columns = [
        {
            title: "Sl No",
            dataIndex: "slno",
            key: "slno",
        },
        {
            title: "Name",
            key: "name",
            render: (_: any, record: Donor) => (
                <div className="flex items-center gap-2">
                    <Avatar size={40} className="shadow-md" src={record.profileImage} />
                    <span>{record.name}</span>
                </div>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Contact Number",
            dataIndex: "contactNumber",
            key: "contactNumber",
        },

        {
            title: "Total Donations",
            dataIndex: "totalDonations",
            key: "totalDonations",
            render: (total: number) => `₹${total.toLocaleString()}`,
        },
        {
            title: "Last Donation Date",
            dataIndex: "lastDonationDate",
            key: "lastDonationDate",
            render: (date: string) => new Date(date).toLocaleDateString(),
        },

        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Donor) => (
                <Space size="middle">
                    <Button type="link" onClick={() => console.log("View Details:", record)}>
                        View
                    </Button>
                    <Button type="link" danger onClick={() => console.log("Delete Donor:", record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='mt-5'>
            <h1 className="text-3xl font-bold mb-4">Top 03 Donors</h1>
            <div className="bg-white rounded-xl shadow-lg">
                <Table columns={columns} dataSource={data} rowKey="id" style={{ borderRadius: "20px", overflow: "auto" }} pagination={false} />
            </div>
        </div>
    );
};

export default TopDonors;