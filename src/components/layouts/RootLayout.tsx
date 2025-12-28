import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConfigProvider, Drawer, Popover } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import brandlogo from "../../assets/images/logo.png";
import hfl from "../../assets/images/hfl.png";
import Sidebar from "./Sidebar/Sidebar";
import { useGetAllProfileQuery } from "../../redux/features/profileApi/profileApi";
import NotificationPopover from "../AuthComponents/NotificationPopover";
import { useGetUnreadNotificationQuery } from "../../redux/features/auth/authApi";
const RootLayout = () => {
  const [drawer, setDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { data: orgData } = useGetAllProfileQuery(null);
  const toggleDrawer = () => setDrawer(!drawer);
  const closeDrawer = () => setDrawer(false);
  const { data: unreadNotification } = useGetUnreadNotificationQuery(null);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) closeDrawer();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="">
      <div
        className={`flex-1 flex flex-col sticky top-0 left-0 z-30 ${
          isMobile ? "pl-0" : "pl-0"
        }`}
      >
        <div className="h-20 bg-[#f7f7f7] flex justify-between items-center px-2 md:px-10 gap-2 border-b border-black/5 sticky top-0 z-30 flex-shrink-0">
          {isMobile && (
            <GiHamburgerMenu
              onClick={toggleDrawer}
              className="w-8 h-8 cursor-pointer text-black/70"
            />
          )}
          <div>
            <Link to="/">
              <div className="">
                <img
                  src={brandlogo}
                  alt="brandlogo"
                  className="object-cover md:h-full md:w-full"
                />
              </div>
            </Link>
          </div>

          <div className="flex-1"></div>

          <div className="">
            <div className="flex items-center justify-between gap-3">
              <Link
                to="/settings"
                className="h-10 w-10 rounded-full border border-black/5 bg-white shadow-[0_1px_0_rgba(0,0,0,0.02)] flex items-center justify-center"
              >
                <IoMdSettings className="w-5 h-5 text-black/60" />
              </Link>

              <div className="relative">
                {/* <Link to="/notification">
                    <div className="relative ">
                      <IoIosNotificationsOutline className="w-10 h-10 p-1 text-black bg-white border rounded-full border-primary " />
                      <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                        1
                      </span>
                    </div>
                  </Link> */}
                <Popover
                  content={<NotificationPopover />}
                  trigger="click"
                  placement="bottomRight"
                  overlayClassName="notification-popover"
                >
                  <div className="relative cursor-pointer h-10 w-10 rounded-full border border-black/5 bg-white shadow-[0_1px_0_rgba(0,0,0,0.02)] flex items-center justify-center">
                    <IoIosNotificationsOutline className="w-5 h-5 text-black/60" />
                    {unreadNotification?.data ? (
                      <span className="bg-red-500 h-2 w-2 rounded-full absolute top-[10px] right-[10px]"></span>
                    ) : null}
                  </div>
                </Popover>
              </div>

              <Link to="/profile">
                <div className="flex justify-center items-center gap-2 bg-white py-2 px-3 rounded-full border border-black/5 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f0ff]">
                    <img
                      src={`${orgData?.data?.logoImage}` || hfl}
                      alt=""
                      className="w-5 h-5"
                    />
                  </span>
                  <p className="text-sm font-medium text-black/80">
                    {orgData?.data?.name}
                  </p>
                  <FiChevronDown className="w-4 h-4 text-black/50" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Drawer: {
              footerPaddingInline: 0,
              footerPaddingBlock: 0,
              padding: 0,
              paddingLG: 0,
              paddingXS: 30,
            },
          },
        }}
      >
        <div className="flex min-h-screen">
          {isMobile ? (
            <Drawer
              title="Menu"
              placement="left"
              closable={true}
              onClose={closeDrawer}
              open={drawer}
              width="80%"
              closeIcon={<FaX className="text-black" />}
            >
              <Sidebar onClose={closeDrawer} />
            </Drawer>
          ) : (
            <div className="fixed bottom-0 left-0 w-64 top-20">
              <Sidebar />
            </div>
          )}
          <div
            className={`flex-1 bg-[#f7f7f7] pl-72 ${isMobile ? "p-4" : "p-10"}`}
          >
            <Outlet />
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default RootLayout;
