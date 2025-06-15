import React, { useState, useEffect } from 'react';
import ModalWrapper from '../ModalWrapper';
import Textbox from '../Textbox';
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import UserList from "./UserList";

const AddTask = ({ open, setOpen, task }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [team, setTeam] = useState(task?.team || []);

  useEffect(() => {
    if (!open) {
      reset();
      setTeam([]);
    }
  }, [open, reset]);

  const submitHandler = (data) => {
    console.log("Form submitted with data:", data, "Team:", team);
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)} className="dialog-form">
        <Dialog.Title as="h2" className="dialog-title">
          {task ? "UPDATE TASK" : "ADD TASK"}
        </Dialog.Title>

        <div className="task-form-group">
          <Textbox
            placeholder="Task Title"
            type="text"
            name="title"
            label="Task Title"
            className="input-full"
            register={register("title", { required: "Title is required" })}
            error={errors.title ? errors.title.message : ""}
          />

          <UserList setTeam={setTeam} team={team} />
        </div>

        {/*NEW CODE*/}
        <button type="submit" className="submit-task-btn">
          {task ? "Update" : "Create"} Task
        </button>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;