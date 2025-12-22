import { Tabs } from "antd";
import { IoHeart } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { useGetNotificationQuery } from "../../redux/features/auth/authApi";
import { TbBrandStripe } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
const NotificationPopover = () => {
  const { data: notificationData, isLoading } = useGetNotificationQuery({});
  const notificationTypeMap = {
    new_donation_received: {
      icon: <IoHeart className="text-red-500" />,
      bg: "bg-red-100",
    },
    payout_completed: {
      icon: <FaCheckCircle className="text-green-500" />,
      bg: "bg-green-100",
    },
    payout_failed: {
      icon: <ImCross className="text-red-600" />,
      bg: "bg-red-100",
    },
    stripe_restricted: {
      icon: <TbBrandStripe className="text-indigo-500" />,
      bg: "bg-indigo-100",
    },
  };
  const formatTime = (date: string) => {
    return new Date(date).toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
    });
  };

  console.log("notificationData", notificationData?.data?.data);
  const notifications = notificationData?.data?.data || [];
  
  const visibleNotifications = notifications.slice(0, 2);
  return (
    <div className="w-[360px]">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Notifications",
            children: (
              <div className="space-y-4">
                {isLoading && (
                  <p className="text-center text-gray-400">Loading...</p>
                )}

                {!isLoading && visibleNotifications.length === 0 && (
                  <p className="text-center text-gray-400">No notifications</p>
                )}

                {visibleNotifications.map((item: any) => {
                  const config = notificationTypeMap[item.type];

                  return (
                    <div
                      key={item._id}
                      className={`flex gap-3 p-2 rounded-lg ${
                        !item.isSeen ? "bg-gray-50" : ""
                      }`}
                    >
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          config?.bg || "bg-gray-100"
                        }`}
                      >
                        {config?.icon || <BsChatDots />}
                      </div>

                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatTime(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {notifications.length > 0 && (
                  <p className="text-center text-sm text-gray-500 cursor-pointer">
                    View all
                  </p>
                )}
              </div>
            ),
          },
          {
            key: "2",
            label: "Activity Log",
            children: <p className="text-gray-800">No activity yet</p>,
          },
        ]}
      />
    </div>
  );
};

export default NotificationPopover;
