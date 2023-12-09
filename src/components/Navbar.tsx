"use client";
import React, { useEffect } from "react";
import { MdOutlineAccountCircle, MdNotifications } from "react-icons/md";
import { usePathname } from "next/navigation";
import Image from "next/image";
import NotificationDropdown from "./NotificationDropdown";
import { Session } from "next-auth";
import { Notification } from "@prisma/client";

const Navbar = ({
  user,
  notifications,
}: {
  user: Session["user"];
  notifications: Notification[];
}) => {
  const pathname = usePathname();
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [notificationsState, setNotificationsState] =
    React.useState(notifications);
  const hasUnreadNotifications = notifications.some(
    (notification) => !notification.isRead
  );

  // Add heartbeat effect when there are unread notifications
  useEffect(() => {
    const icon = document.getElementById("notificationIcon");

    if (icon && hasUnreadNotifications) {
      icon.classList.add("heartbeat");
    } else {
      icon?.classList.remove("heartbeat");
    }
  }, [hasUnreadNotifications]);

  // Change the first word of the pathname to uppercase and remove the "/"
  const formattedPathName = () => {
    const formattedPathName = pathname
      .split("/")[1]
      .replace(/^\w/, (c) => c.toUpperCase());
    return formattedPathName;
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  if (formattedPathName() === "") {
    return (
      <div className="w-full z-50 bg-[#044D3A] relative top-0 left-0 transition">
        <style>
          {`
          @keyframes heartbeat {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }

          .heartbeat {
            animation: heartbeat 1s infinite;
          }
        `}
        </style>
        <div className="relative">
          <Image
            src="/imgdashboard.png"
            alt="logo"
            width={710}
            height={600}
            className="absolute top-0 right-0 pointer-events-none"
          />
          <div className="px-12 py-4 relative z-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src="/logonavbar.png"
                  alt="logo"
                  width={32}
                  height={32}
                />
                <a href="/">
                  <p className="text-xl font-semibold text-white">EaseFarm</p>
                </a>
              </div>
              <div className="icon-container hidden lg:flex items-center gap-4">
                <div>
                  <a href="/fields">
                    <button className="rounded-full px-6 py-2 text-white flex items-center gap-2 hover:bg-slate-200 hover:text-black transition-all">
                      Fields
                    </button>
                  </a>
                </div>
                <div>
                  <a href="/">
                    <button className="rounded-full px-6 py-2 text-white flex items-center gap-2 hover:bg-slate-200 hover:text-black transition-all">
                      Warehouse
                    </button>
                  </a>
                </div>
                <div>
                  <a href="/">
                    <button className="rounded-full px-6 py-2 text-white flex items-center gap-2 hover:bg-slate-200 hover:text-black transition-all">
                      Hotline
                    </button>
                  </a>
                </div>
                <div>
                  <button className="relative" onClick={toggleNotification}>
                    {hasUnreadNotifications ? (
                      <Image
                        src="/icons/red-bell.svg"
                        alt="red-bell"
                        width={19}
                        height={29}
                        className={hasUnreadNotifications ? "heartbeat" : ""}
                      />
                    ) : (
                      <MdNotifications
                        id="notificationIcon"
                        size={24}
                        color="white"
                      />
                    )}
                    <NotificationDropdown
                      isOpen={isNotificationOpen}
                      notifications={notificationsState}
                      username={user?.username || ""}
                      userId={user?.id || ""}
                    />
                  </button>
                </div>
                <div>
                  <button className="rounded-full shadow-lg px-6 py-2 bg-white text-black flex items-center gap-2 hover:bg-slate-200 transition-all">
                    <MdOutlineAccountCircle size={24} />
                    Account
                  </button>
                </div>
              </div>
            </div>
            <div className="flex text-5xl font-bold text-white mt-24 ml-28">
              Smart
            </div>
            <div className="flex text-5xl font-bold text-white mt-1 ml-48">
              Farming
            </div>
            <div className="flex text-5xl font-bold text-white mt-1 ml-28 mb-24">
              System
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full z-50 bg-[#044D3A] relative top-0 left-0 transition">
      <style>
        {`
          @keyframes heartbeat {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }

          .heartbeat {
            animation: heartbeat 1s infinite;
          }
        `}
      </style>

      <div className="px-12 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logonavbar.png" alt="logo" width={32} height={32} />
            <a href="/">
              <p className="text-xl font-semibold text-white">EaseFarm</p>
            </a>
          </div>
          <div className="icon-container hidden lg:flex items-center gap-4">
            <div>
              <a href="/fields">
                <button className="rounded-full px-6 py-2 text-white flex items-center gap-2 hover:bg-slate-200 hover:text-black transition-all">
                  Fields
                </button>
              </a>
            </div>
            <div>
              <a href="/dashboard">
                <button className="rounded-full px-6 py-2 text-white flex items-center gap-2 hover:bg-slate-200 hover:text-black transition-all">
                  Warehouse
                </button>
              </a>
            </div>
            <div>
              <a href="/dashboard">
                <button className="rounded-full px-6 py-2 text-white flex items-center gap-2 hover:bg-slate-200 hover:text-black transition-all">
                  Hotline
                </button>
              </a>
            </div>
            <div>
              <button className="relative" onClick={toggleNotification}>
                {hasUnreadNotifications ? (
                  <Image
                    src="/icons/red-bell.svg"
                    alt="red-bell"
                    width={19}
                    height={29}
                    className={hasUnreadNotifications ? "heartbeat" : ""}
                  />
                ) : (
                  <MdNotifications
                    id="notificationIcon"
                    size={24}
                    color="white"
                  />
                )}
                <NotificationDropdown
                  isOpen={isNotificationOpen}
                  notifications={notificationsState}
                  username={user?.username || ""}
                  userId={user?.id || ""}
                />
              </button>
            </div>
            <div>
              <button className="rounded-full shadow-lg px-6 py-2 bg-white text-black flex items-center gap-2 hover:bg-slate-200 transition-all">
                <MdOutlineAccountCircle size={24} />
                Account
              </button>
            </div>
          </div>

          <div className="icon-container flex lg:hidden items-center gap-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
