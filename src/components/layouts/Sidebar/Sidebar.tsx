import { ConfigProvider, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { FaUsers, FaMoneyCheckAlt, FaLongArrowAltLeft } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";
import { PiHandDepositDuotone } from "react-icons/pi";
import { FaQuestion } from "react-icons/fa6";

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
    const location = useLocation().pathname.split("/")[1];

    const menuItems = [
        {
            key: "analytics",
            icon: <GrAnalytics className="w-5 h-5" />,
            label: <Link to="/analytics">Analytics</Link>,
        },
        {
            key: "donors",
            icon: <FaUsers className="w-5 h-5" />,
            label: <Link to="/donors">Donors</Link>,
        },
        {
            key: "deposits",
            icon: <PiHandDepositDuotone className="w-5 h-5" />,
            label: <Link to="/deposits">Deposits</Link>,
        },
        {
            key: "subscription",
            icon: <FaMoneyCheckAlt className="w-5 h-5" />,
            label: <Link to="/subscription">Subscription</Link>,
        },
    ];

    const bottomMenuItems = [
        {
            key: "support",
            icon: <FaQuestion className="w-5 h-5" />,
            label: <Link to="https://crescent-change.webflow.io/">Support</Link>,
        },
        {
            key: "logout",
            icon: <FaLongArrowAltLeft className="w-5 h-5" />,
            label: <Link to="/auth/login">Logout</Link>,
        },
    ];

    return (
        <div className="fixed top-0 left-0 bottom-0 bg-primary">
            <Sider
                className="h-[100vh] w-[300px] bg-primary"
                width={250}
                collapsedWidth={80}
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <p
                    className={`${collapsed ? "text-lg" : "text-3xl"
                        } font-bold my-10 text-white text-center`}
                >
                    Logo
                </p>

                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                itemBg: "rgb(47,84,235)",
                                itemColor: "rgb(255,255,255)",
                                itemHoverBg: "rgb(255,255,255)",
                                itemSelectedBg: "rgb(255,255,255)",
                                itemSelectedColor: "rgb(0,0,0)",

                            },
                        },
                    }}
                >
                    <Menu
                        mode="inline"
                        className="px-2"
                        selectedKeys={[location]}
                        style={{
                            backgroundColor: "#3212eb",
                            color: "white",
                        }}
                        items={menuItems}
                    />


                    <div className="mt-[500px] px-2">
                        <Menu mode="inline"
                            style={{
                                backgroundColor: "#3212eb",
                                color: "white",
                            }}
                            items={bottomMenuItems} />
                    </div>
                </ConfigProvider>
            </Sider>
        </div>
    );
};

export default Sidebar;
