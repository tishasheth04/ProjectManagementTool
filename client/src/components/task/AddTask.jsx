import React, { useState, useEffect } from 'react';
import ModalWrapper from '../ModalWrapper';
import Textbox from '../Textbox';
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from '../SelectList';
import { BiImages } from "react-icons/bi";
import Loading from '../Loader';

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen, task }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [team, setTeam] = useState(task?.team || []);
  const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORITY[2]);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [uploading, setUploading] = useState(false);
  const [assets, setAssets] = useState([]);
  const uploadedFileURLs = [];

  const isLoading = false;
  const isUpdating = false;

  useEffect(() => {
    if (!open) {
      reset();
      setTeam([]);
    }
  }, [open, reset]);

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

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

        <div className="form-row">
          <SelectList
            label="Task Stage"
            lists={LISTS}
            selected={stage}
            setSelected={setStage}
          />
          <SelectList
            label="Priority Level"
            lists={PRIORITY}
            selected={priority}
            setSelected={setPriority}
          />
        </div>

        <div className="form-row">
          <Textbox
            placeholder="Date"
            type="date"
            name="date"
            label="Task Date"
            className="input-full"
            register={register("date", { required: "Date is required!" })}
            error={errors.date ? errors.date.message : ""}
          />
        </div>

        <div className="file-upload-container">
          <label className="file-upload-label" htmlFor="imgUpload">
            <input
              type="file"
              className="file-upload-input"
              id="imgUpload"
              onChange={(e) => handleSelect(e)}
              accept=".jpg, .png, .jpeg"
              multiple={true}
            />
            <BiImages className="file-upload-icon" />
            <span>Add Assets</span>
          </label>
        </div>

        <div className="textarea-container">
          <label>Task Description</label>
          <textarea
            name="description"
            {...register("description")}
            className="task-textarea"
          ></textarea>
        </div>

        <div className="textarea-container">
          <label>
            Add Links <span className="hint-text">separated by comma (,)</span>
          </label>
          <textarea
            name="links"
            {...register("links")}
            className="task-textarea"
          ></textarea>
        </div>

        {isLoading || isUpdating || uploading ? (
          <div className="loading-container">
            <Loading />
          </div>
        ) : (
          <button type="submit" className="submit-task-btn">
            {task ? "Update" : "Create"} Task
          </button>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddTask;