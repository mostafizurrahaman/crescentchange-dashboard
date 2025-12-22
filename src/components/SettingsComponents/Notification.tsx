import {
  useGetNotificationQuery,
  useNotificationMarkASReadMutation,
} from "../../redux/features/auth/authApi";
import { IoHeart } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { TbBrandStripe } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useState, useEffect } from "react";
import { message } from "antd";

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

const formatTime = (date: string) =>
  new Date(date).toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const Notification = () => {
  const { data: notificationData, isLoading } = useGetNotificationQuery({});
  const notifications = notificationData?.data?.data || [];
  const [notificationMarkASRead] = useNotificationMarkASReadMutation();
  const [localNotifications, setLocalNotifications] = useState<any[]>([]);

  // Sync local state with API data
  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  const handleMarkAsRead = async (id: string) => {
    console.log("Marking notification as read:", id);
    // Optimistic UI update
    setLocalNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isSeen: true } : n))
    );

    try {
      const res = await notificationMarkASRead(id).unwrap();
      message.success(res?.message);
    } catch (err) {
      console.error("Failed to mark notification as read", err);
      message.error("Failed to mark notification as read");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold my-10">Notifications</h1>

      <div className="w-full md:w-[70%] space-y-4">
        {isLoading && (
          <p className="text-center text-gray-400">Loading notifications...</p>
        )}

        {!isLoading && localNotifications.length === 0 && (
          <p className="text-center text-gray-400">No notifications found</p>
        )}

        {localNotifications.map((item) => {
          const config = notificationTypeMap[item.type];

          return (
            <div
              key={item._id}
              onClick={() => !item.isSeen && handleMarkAsRead(item._id)}
              className={`cursor-pointer flex gap-4 p-4 rounded-lg border transition duration-200 hover:shadow-md ${
                item.isSeen
                  ? "bg-white border-gray-100"
                  : "bg-gray-100 border-gray-00"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  config?.bg || "bg-gray-100"
                }`}
              >
                {config?.icon || <BsChatDots />}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p
                    className={`font-semibold ${
                      item.isSeen ? "text-gray-500" : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </p>
                  {!item.isSeen && (
                    <span className="text-xs text-primary font-medium">
                      New
                    </span>
                  )}
                </div>

                <p
                  className={`text-sm mt-1 ${
                    item.isSeen ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.message}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {formatTime(item.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notification;
