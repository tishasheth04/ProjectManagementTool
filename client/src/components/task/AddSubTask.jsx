import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateSubTaskMutation } from "../../redux/slices/api/taskApiSlice";
import Button from "../Button";
import Loading from "../Loader";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";

const AddSubTask = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addSbTask, { isLoading }] = useCreateSubTaskMutation();

  const handleOnSubmit = async (data) => {
    try {
      const res = await addSbTask({ data, id }).unwrap();
      toast.success(res.message);
      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
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
        {isLoading ? (
          <div className="subtask-loading">
            <Loading />
          </div>
        ) : (
          <div className="subtask-buttons">
            <Button
              type="submit"
              className="subtask-submit-btn"
              label="Add Task"
            />
            <Button
              type="button"
              className="subtask-cancel-btn"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddSubTask;