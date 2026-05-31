import { ConfigProvider, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

import { IoMdSettings } from "react-icons/io";
import shape from "../../../assets/images/Shape.png";
import user from "../../../assets/images/Icons.png";
import donor from "../../../assets/images/donor.png";
import deposit from "../../../assets/images/deposit.png";
import logout from "../../../assets/images/Sign Out.png";
import calenderimg from "../../../assets/images/Calendar.png";
// import integration from "../../../assets/images/integration.png";
import report from "../../../assets/images/reports.png";

const { Sider } = Layout;

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const location = useLocation().pathname.split("/")[1];

  const menuItems = [
    {
      key: "analytics",
      icon: <img src={shape} alt="Analytics" className="w-5 h-5" />,
      label: <Link to="/analytics">Dashboard</Link>,
    },
    {
      key: "profile",
      icon: <img src={user} alt="Profile" className="w-5 h-5" />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "donors",
      icon: <img src={donor} alt="Donors" className="w-5 h-5" />,
      label: <Link to="/donors">Donors</Link>,
    },
    {
      key: "deposits",
      icon: <img src={deposit} alt="Deposits" className="w-5 h-5" />,
      label: <Link to="/deposits">Deposits</Link>,
    },
    // {
    //   key: "integrations",
    //   icon: <img src={integration} alt="Deposits" className="w-5 h-5" />,
    //   label: <Link to="/integrations">Integrations</Link>,
    // },
    {
      key: "reports",
      icon: <img src={report} alt="Reports" className="w-5 h-5" />,
      label: <Link to="/reports">Reports</Link>,
    },
  ];

  const bottomMenuItems = [
    {
      key: "subscription",
      icon: <img src={calenderimg} alt="Deposits" className="w-5 h-5"></img>,
      label: <Link to="/subscription">Subscription</Link>,
    },
    {
      key: "Settings",
      icon: <IoMdSettings className="w-5 h-5" />,
      label: <Link to="/settings">Settings</Link>,
    },
    {
      key: "logout",
      icon: <img src={logout} alt="Logout" className="w-5 h-5" />,
      label: <Link to="/auth/login">Logout</Link>,
    },
  ];

  return (
    <div className="h-full bg-[#f7f7f7] border-r border-black/5">
      <Sider
        className="h-full w-[300px] bg-[#f7f7f7]"
        width={250}
        trigger={null}
      >
        {/* <div className="flex items-center justify-center ">
          <img src={logo} alt="" className="my-10 " />
        </div> */}

        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemBg: "transparent",
                itemColor: "rgba(0,0,0,0.8)",
                itemHoverBg: "rgba(255,255,255,0.75)",
                itemSelectedBg: "#d8f77c",
                itemSelectedColor: "rgba(0,0,0,0.9)",
                itemBorderRadius: 12,
                itemHeight: 44,
                iconSize: 18,
                borderRadius: 12,
                borderRadiusLG: 12,
                fontSize: 16,
              },
            },
          }}
        >
          <div className="flex flex-col h-full">
            <Menu
              mode="inline"
              className="px-3 pt-3 font-semibold font-familjen"
              selectedKeys={[location]}
              style={{
                backgroundColor: "#f7f7f7",
                color: "black",
                borderInlineEnd: 0,
              }}
              items={menuItems}
            />

            <div className="px-3 pb-6 mt-72">
              <Menu
                mode="inline"
                className="font-semibold font-familjen"
                style={{
                  backgroundColor: "#f7f7f7",
                  color: "black",
                  borderInlineEnd: 0,
                }}
                items={bottomMenuItems}
              />
            </div>
          </div>
        </ConfigProvider>
      </Sider>
    </div>
  );
};

export default Sidebar;
