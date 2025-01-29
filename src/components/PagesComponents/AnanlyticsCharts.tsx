import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

interface BarChartData {
    month: string;
    transactions: number;
}

interface PieChartData {
    name: string;
    value: number;
    color: string;

}
interface renderCustomizedLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
}

const AnalyticsCharts: React.FC = () => {
    const barData: BarChartData[] = [
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

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

    const pieData: PieChartData[] = [
        { name: "General", value: 5, color: COLORS[0] },
        { name: "Utilities", value: 5, color: COLORS[1] },
        { name: "Women", value: 5, color: COLORS[2] },
        { name: "Imam", value: 5, color: COLORS[3] },
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel: React.FC<renderCustomizedLabelProps> = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                <div className="flex flex-c">

                </div>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <div className="border p-4 rounded-md">
                <p className="font-bold text-lg mb-4">Monthly Transactions</p>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                        <XAxis dataKey="month" stroke="#8884d8" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="transactions" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="border p-4 rounded-md">
                <p className="font-bold text-lg mb-4">Envelope Types</p>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 flex justify-center items-center gap-5">
                    {pieData.map((item, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: item.color }}></div>
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCharts;
