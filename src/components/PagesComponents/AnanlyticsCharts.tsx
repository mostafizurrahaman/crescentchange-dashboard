import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface ChartData {
    month: string;
    transactions: number;
}

const AnalyticsCharts: React.FC = () => {
    const data: ChartData[] = [
        { month: "January", transactions: 4000 },
        { month: "February", transactions: 3000 },
        { month: "March", transactions: 2000 },
        { month: "April", transactions: 2780 },
        { month: "May", transactions: 1890 },
        { month: "June", transactions: 2390 },
        { month: "July", transactions: 3490 },
        { month: "August", transactions: 4000 },
        { month: "September", transactions: 3000 },
        { month: "October", transactions: 2000 },
        { month: "November", transactions: 2780 },
        { month: "December", transactions: 1890 },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                <div className="border p-4 rounded-md">
                    <p className="font-bold text-lg mb-4">Monthly Transactions</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <XAxis dataKey="month" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="transactions" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCharts;
