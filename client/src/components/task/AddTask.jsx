// === Updated AddTask.jsx ===
import React, { useState, useEffect } from 'react';
import ModalWrapper from '../ModalWrapper';
import Textbox from '../Textbox';
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from '../SelectList';
import { BiImages } from "react-icons/bi";
import Loading from '../Loader';
import { toast } from 'sonner';

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen, task, setTaskList }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [team, setTeam] = useState(task?.team || []);
  const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORITY[2]);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [uploading, setUploading] = useState(false);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    if (task) {
      setValue("title", task.title || "");
      setValue("description", task.description || "");
      setValue("date", task.date || "");
      setValue("links", task.links?.join(',') || "");
      setTeam(task.team || []);
      setPriority(task.priority?.toUpperCase() || PRIORITY[2]);
      setStage(task.stage?.toUpperCase() || LISTS[0]);
    } else {
      reset();
      setTeam([]);
      setPriority(PRIORITY[2]);
      setStage(LISTS[0]);
    }
  }, [open, task, reset, setValue]);

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  const submitHandler = (data) => {
    if (task) {
      if (typeof setTaskList === 'function') {
        setTaskList(prev => prev.map(t =>
          t._id === task._id
            ? {
                ...t,
                title: data.title,
                description: data.description,
                date: data.date,
                links: data.links?.split(',') || [],
                team,
                stage: stage.toLowerCase(),
                priority: priority.toLowerCase(),
                updatedAt: new Date().toISOString(),
              }
            : t
        ));
        toast.success("Task updated");
      } else {
        toast.error("Unable to update task – missing setTaskList");
      }
    } else {
  const newTask = {
    _id: Date.now().toString(),
    title: data.title,
    description: data.description,
    date: data.date,
    links: data.links?.split(',') || [],
    team,
    stage: stage.toLowerCase(),
    priority: priority.toLowerCase(),
    assets: [],
    isTrashed: false,
    subTasks: [],
    activities: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  };

  setTaskList(prev => {
    const updated = [newTask, ...prev];
    localStorage.setItem("tasks", JSON.stringify(updated)); // ✅ Save to localStorage
    return updated;
  });

  toast.success("Task created");
}


    setOpen(false);
    reset();
    setTeam([]);
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
          <SelectList label="Task Stage" lists={LISTS} selected={stage} setSelected={setStage} />
          <SelectList label="Priority Level" lists={PRIORITY} selected={priority} setSelected={setPriority} />
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
              onChange={handleSelect}
              accept=".jpg, .png, .jpeg"
              multiple
            />
            <BiImages className="file-upload-icon" />
            <span>Add Assets</span>
          </label>
        </div>

        <div className="textarea-container">
          <label>Task Description</label>
          <textarea name="description" {...register("description")} className="task-textarea"></textarea>
        </div>

        <div className="textarea-container">
          <label>
            Add Links <span className="hint-text">separated by comma (,)</span>
          </label>
          <textarea name="links" {...register("links")} className="task-textarea"></textarea>
        </div>

        {uploading ? (
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
