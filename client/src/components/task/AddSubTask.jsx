// === New version of AddSubTask.jsx ===
import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";
import Button from "../Button";
import Loading from "../Loader";

const AddSubTask = ({ open, setOpen, id, onAdd }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleOnSubmit = (data) => {
    const subTask = {
      _id: Date.now().toString(),
      title: data.title,
      date: data.date,
      tag: data.tag,
    };

    onAdd(id, subTask);
    setOpen(false);
    reset();
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="subtask-form">
        <Dialog.Title as="h2" className="subtask-title">
          ADD SUB-TASK
        </Dialog.Title>
        <div className="subtask-fields">
          <Textbox
            placeholder="Sub-Task title"
            type="text"
            name="title"
            label="Title"
            className="subtask-input"
            register={register("title", { required: "Title is required!" })}
            error={errors.title ? errors.title.message : ""}
          />

          <div className="subtask-row">
            <Textbox
              placeholder="Date"
              type="date"
              name="date"
              label="Task Date"
              className="subtask-input"
              register={register("date", { required: "Date is required!" })}
              error={errors.date ? errors.date.message : ""}
            />
            <Textbox
              placeholder="Tag"
              type="text"
              name="tag"
              label="Tag"
              className="subtask-input"
              register={register("tag", { required: "Tag is required!" })}
              error={errors.tag ? errors.tag.message : ""}
            />
          </div>
        </div>

        <div className="subtask-buttons">
          <Button type="submit" className="subtask-submit-btn" label="Add Task" />
          <Button type="button" className="subtask-cancel-btn" onClick={() => setOpen(false)} label="Cancel" />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddSubTask;
