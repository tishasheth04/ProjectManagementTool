import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import ConfirmatioDialog from "../ConfirmationDialog";

const TaskDialog = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const duplicateHandler = () => {};
  const deleteClicks = () => {};
  const deleteHandler = () => {};

  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className="menu_icon" aria-hidden="true" />,
      onClick: () => navigate(`/task/${task._id}`),
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className="menu_icon" aria-hidden="true" />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: "Add Sub-Task",
      icon: <MdAdd className="menu_icon" aria-hidden="true" />,
      onClick: () => setOpen(true),
    },
    {
      label: "Duplicate",
      icon: <HiDuplicate className="menu_icon" aria-hidden="true" />,
      onClick: () => duplicateHandler(),
    },
  ];

  return (
    <>
      <div>
        <Menu as="div" className="menu_wrapper">
          <Menu.Button className="menu_button">
            <BsThreeDots />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="fade_enter"
            enterFrom="fade_enter_from"
            enterTo="fade_enter_to"
            leave="fade_leave"
            leaveFrom="fade_leave_from"
            leaveTo="fade_leave_to"
          >
            <Menu.Items className="menu_items">
              <div className="menu_group">
                {items.map((el) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el?.onClick}
                        className={`menu_item ${active ? "menu_item_active" : ""}`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>

              <div className="menu_group">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => deleteClicks()}
                      className={`menu_item delete_item ${active ? "menu_item_active" : ""}`}
                    >
                      <RiDeleteBin6Line className="menu_icon delete_icon" aria-hidden="true" />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={task}
        key={task?._id}
      />

      <AddSubTask open={open} setOpen={setOpen} id={task?._id} />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default TaskDialog;