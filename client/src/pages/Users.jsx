import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { summary } from "../assets/data";
import { getInitials } from "../utils";

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const userActionHandler = () => {};
  const deleteHandler = () => {};

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const TableHeader = () => (
    <thead className="user-table-header">
      <tr>
        <th>Full Name</th>
        <th>Title</th>
        <th>Email</th>
        <th>Role</th>
        <th>Active</th>
        <th></th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="user-table-row">
      <td>
        <div className="user-name-cell">
          <div className="user-avatar-circle">
            <span className="user-avatar-text">{getInitials(user.name)}</span>
          </div>
          {user.name}
        </div>
      </td>

      <td>{user.title}</td>
      <td>{user.email || "user.emal.com"}</td>
      <td>{user.role}</td>

      <td>
        <button className={user?.isActive ? "status-active" : "status-disabled"}>
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>

      <td>
        <div className="user-action-buttons">
          <Button
            className="btn_edit"
            label="Edit"
            type="button"
            onClick={() => editClick(user)}
          />

          <Button
            className="btn_delete"
            label="Delete"
            type="button"
            onClick={() => deleteClick(user?._id)}
          />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="user-container">
      <div className="user-header">
        <Title title="Team Members" />
        <Button
          label="Add New User"
          icon={<IoMdAdd className="icon_lg" />}
          className="btn_add_user"
          onClick={() => setOpen(true)}
        />
      </div>

      <div className="user-table-wrapper">
        <div className="user-table-scroll">
          <table className="user-table">
            <TableHeader />
            <tbody>
              {summary.users?.map((user, index) => (
                <TableRow key={index} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/*
      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
      */}
    </div>
  );
};

export default Users;
