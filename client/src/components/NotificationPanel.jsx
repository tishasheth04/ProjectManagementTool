import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const data = [
  {
    _id: "65c5bbf3787832cf99f28e6d",
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c27a0e18c0a1b750ad5cad",
      "65c30b96e639681a13def0b5",
    ],
    text: "New task has been assigned to you and 2 others. The task priority is set a normal priority, so check and act accordingly. The task date is Thu Feb 29 2024. Thank you!!!",
    task: null,
    notiType: "alert",
    isRead: [],
    createdAt: "2024-02-09T05:45:23.353Z",
    updatedAt: "2024-02-09T05:45:23.353Z",
    __v: 0,
  },
  {
    _id: "65c5f12ab5204a81bde866ab",
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    text: "New task has been assigned to you and 2 others. The task priority is set a high priority, so check and act accordingly. The task date is Fri Feb 09 2024. Thank you!!!",
    task: {
      _id: "65c5f12ab5204a81bde866a9",
      title: "Test task",
    },
    notiType: "alert",
    isRead: [],
    createdAt: "2024-02-09T09:32:26.810Z",
    updatedAt: "2024-02-09T09:32:26.810Z",
    __v: 0,
  },
];

const ICONS = {
  alert: <HiBellAlert className="notification-icon" />,
  message: <BiSolidMessageRounded className="notification-icon" />,
};

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const readHandler = () => {};
  const viewHandler = () => {};

  const callsToAction = [
    { name: "Cancel", href: "#", icon: "" },
    {
      name: "Mark All Read",
      href: "#",
      icon: "",
      onClick: () => readHandler("all", ""),
    },
  ];

  return (
    <Popover className="relative">
      {/* Replaced Popover.Button with div */}
      <div className="notification-button">
        <div className="notification-icon-wrapper">
          <IoIosNotificationsOutline className="text-2xl" />
          {data?.length > 0 && (
            <span className="notification-badge">{data?.length}</span>
          )}
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="notification-panel">
          {data?.length > 0 && (
            <div className="notification-content">
              <div className="notification-list">
                {data?.slice(0, 5).map((item, index) => (
                  <div
                    key={item._id + index}
                    className="notification-item"
                  >
                    <div className="notification-icon-container">
                      {ICONS[item.notiType]}
                    </div>

                    <div
                      className="notification-info"
                      onClick={() => viewHandler(item)}
                    >
                      <div className="notification-header">
                        <p>{item.notiType}</p>
                        <span className="notification-time">
                          {moment(item.createdAt).fromNow()}
                        </span>
                      </div>
                      <p className="notification-text">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="notification-actions">
                {callsToAction.map((item) => (
                  <Link
                    key={item.name}
                    onClick={
                      item?.onClick ? () => item.onClick() : () => close()
                    }
                    className="action-button"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default NotificationPanel;
