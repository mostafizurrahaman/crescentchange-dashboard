/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConfigProvider, Drawer, Popover } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import brandlogo from "../../assets/images/logo.png";
import hfl from "../../assets/images/hfl.png";
import Sidebar from "./Sidebar/Sidebar";
import { useGetAllProfileQuery } from "../../redux/features/profileApi/profileApi";
import { IMAGE_URL } from "../../redux/utils/baseUrl";
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
        <div className="h-20 bg-primary flex justify-between  items-center px-2 md:px-20 gap-2 border-b sticky top-0 z-30 flex-shrink-0">
          {isMobile && (
            <GiHamburgerMenu
              onClick={toggleDrawer}
              className="h-8 w-8 cursor-pointer "
            />
          )}
          <div>
            <Link to="/">
              <div className="">
                <img
                  src={brandlogo}
                  alt="brandlogo"
                  className="md:h-full md:w-full object-cover"
                />
              </div>
            </Link>
          </div>
          <div className="">
            <div className="flex justify-between items-center gap-2  mx-10">
              <div className="relative ">
                <div className=" flex justify-between items-center gap-5 py-5 ">
                  {/* <Link to="/notification">
                    <div className="relative ">
                      <IoIosNotificationsOutline className="h-10 w-10 bg-white  text-black p-1 border rounded-full border-primary " />
                      <span className="bg-red-500 h-5 w-5 rounded-full flex justify-center items-center absolute top-0 right-0 text-white text-xs">
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
                    <div className="relative cursor-pointer">
                      <IoIosNotificationsOutline className="h-10 w-10 bg-white text-black p-1 border rounded-full border-primary" />
                      <span className="bg-red-500 h-5 w-5 rounded-full flex justify-center items-center absolute top-0 right-0 text-white text-xs">
                        {unreadNotification?.data}
                      </span>
                    </div>
                  </Popover>

                  <Link to="/profile">
                    <div className="flex justify-center items-center gap-2 bg-white py-2 px-3 rounded-3xl">
                      <img
                        src={`${orgData?.data?.logoImage}` || hfl}
                        alt=""
                        className="w-10 h-10 rounded-full border border-primary"
                      />
                      <p className="md:text-xl font-semibold ">
                        {orgData?.data?.name}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
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
        <div className="flex h-screen">
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
              <Sidebar onClose={closeDrawer} collapsed={false} />
            </Drawer>
          ) : (
            <div className="w-64  top-0 left-0 h-[80vh] border-r pt-20 fixed">
              <Sidebar collapsed={false} />
            </div>
          )}
          <div
            className={`flex-1 bg-[#f7f7f7] overflow-auto min-h-[80vh] pl-72 ${
              isMobile ? "p-4" : "p-10"
            }`}
          >
            <Outlet />
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default RootLayout;
