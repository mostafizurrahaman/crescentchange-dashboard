import { Avatar, Button, Select, Space, Table, Tooltip } from 'antd';
import user from "../../assets/images/user.png";
const Donors = () => {



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
        },
        {
            id: "4",
            slno: "4",
            name: "Emily Davis",
            profileImage: user,
            email: "emily.davis@example.com",
            contactNumber: "9823456789",
            transactionId: "TXN44556",
            totalDonations: 2000,
            lastDonationDate: "2023-11-05",
            status: "Active",
        },
        {
            id: "5",
            slno: "5",
            name: "Michael Johnson",
            profileImage: user,
            email: "michael.johnson@example.com",
            contactNumber: "9781234567",
            transactionId: "TXN77889",
            totalDonations: 15000,
            lastDonationDate: "2024-01-20",
            status: "Active",
        },
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
            title: "Transaction ID",
            dataIndex: "transactionId",
            key: "transactionId",
            render: (id: string) => (
                <Tooltip title="Copy Transaction ID">
                    <span
                        onClick={() => navigator.clipboard.writeText(id)}
                        className="cursor-pointer text-blue-500"
                    >
                        {id}
                    </span>
                </Tooltip>
            ),
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
        // {
        //     title: "Status",
        //     dataIndex: "status",
        //     key: "status",
        //     render: (status: "Active" | "Inactive") => (
        //         <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
        //     ),
        // },
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
        <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mt-10 md:mt-5 mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-black">
                    All Donors : 100
                </h3>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Search to Select"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                        {
                            value: '1',
                            label: 'All Donors',
                        },
                        {
                            value: '2',
                            label: 'One Time Donors',
                        },
                        {
                            value: '3',
                            label: 'Recurring Donors',
                        },
                        {
                            value: '4',
                            label: 'Round-Ups Donors',
                        },

                    ]}
                />
                {/* <div className="mt-4 md:mt-0">
                    <Search allowClear placeholder="input search text" onSearch={onSearch} enterButton />
                </div> */}
            </div>
            <div className='my-5'>
                <div className='flex justify-end items-end'>

                </div>
                <div className="bg-white rounded-xl shadow-lg">
                    <Table columns={columns} dataSource={data} rowKey="id" style={{ borderRadius: "20px", overflow: "auto" }} />
                </div>
            </div>

        </div>
    );
};

export default Donors; 