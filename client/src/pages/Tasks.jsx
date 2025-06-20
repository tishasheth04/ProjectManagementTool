// === Updated Tasks.jsx ===
import React, { useState, useEffect } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import { tasks as initialTasks } from "../assets/data";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taskList, setTaskList] = useState(() => {
    try {
      const localTasks = localStorage.getItem("tasks");
      if (!localTasks || localTasks === "undefined") return initialTasks;
      return JSON.parse(localTasks);
    } catch (e) {
      console.error("Error parsing tasks from localStorage:", e);
      return initialTasks;
    }
  });

  const status = params?.status || "";

  const handleAddSubTask = (taskId, subTaskData) => {
    const updatedTasks = taskList.map((task) =>
      task._id === taskId
        ? {
            ...task,
            subTasks: [subTaskData, ...(task.subTasks || [])],
            updatedAt: new Date().toISOString(),
          }
        : task
    );
    setTaskList(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (taskId) => {
    const taskToDelete = taskList.find((task) => task._id === taskId);
    const updatedTasks = taskList.filter((task) => task._id !== taskId);
    setTaskList(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    if (taskToDelete) {
      const existingTrash = JSON.parse(localStorage.getItem("trashedTasks") || "[]");
      localStorage.setItem("trashedTasks", JSON.stringify([taskToDelete, ...existingTrash]));
    }
  };

  const updateTaskList = (newList) => {
    setTaskList(newList);
    localStorage.setItem("tasks", JSON.stringify(newList));
  };

  return loading ? (
    <div className="loading_wrapper">
      <Loading />
    </div>
  ) : (
    <div className="tasks_container">
      <div className="tasks_header">
        <Title title={status ? `${status} Tasks` : "Tasks"} />
        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="icon_lg" />}
            className="create_task_btn"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && selected === 1 && (
          <div className="task_tabs_group">
            <TaskTitle label="To Do" className={TASK_TYPE.todo} />
            <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
            <TaskTitle label="Completed" className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView
            tasks={taskList}
            onAddSubTask={handleAddSubTask}
            setTaskList={updateTaskList}
            onDeleteTask={handleDeleteTask} // ✅ pass to BoardView
          />
        ) : (
          <div className="table_wrapper">
            <Table
              tasks={taskList}
              onAddSubTask={handleAddSubTask}
              setTaskList={updateTaskList}
              onDeleteTask={handleDeleteTask} // ✅ pass to Table
            />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} setTaskList={updateTaskList} />
    </div>
  );
};

export default Tasks;