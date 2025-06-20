import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { summary } from "../assets/data";
import { getInitials } from "../utils";
import AddUser from "../components/AddUser";
import ConfirmatioDialog from "../components/ConfirmationDialog";
import UserAction from "../components/UserAction";

const Users = () => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : summary.users;
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const deleteHandler = () => {
    const updatedUsers = users.filter((u) => u._id !== selected);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setOpenDialog(false);
  };

  const handleSubmitUser = (user) => {
    let updatedUsers;

    if (isEditing) {
      updatedUsers = users.map((u) =>
        u._id === user._id ? { ...user, isActive: u.isActive } : u
      );
    } else {
      const newUser = { ...user, _id: Date.now().toString(), isActive: true };
      updatedUsers = [newUser, ...users];
    }

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setOpen(false);
    setSelected(null);
    setIsEditing(false);
  };

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (user) => {
    setSelected(user);
    setIsEditing(true);
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
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button className={user?.isActive ? "status-active" : "status-disabled"}>
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>
      <td>
        <div className="user-action-buttons">
          <Button className="btn_edit" label="Edit" onClick={() => editClick(user)} />
          <Button className="btn_delete" label="Delete" onClick={() => deleteClick(user._id)} />
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
          onClick={() => {
            setOpen(true);
            setSelected(null);
            setIsEditing(false);
          }}
        />
      </div>

      <div className="user-table-wrapper">
        <div className="user-table-scroll">
          <table className="user-table">
            <TableHeader />
            <tbody>
              {users.map((user, index) => (
                <TableRow key={index} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        onSubmit={handleSubmitUser}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={() => {}}
      />
    </div>
  );
};

export default Users;
