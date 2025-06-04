import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const Tasks = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

  return loading ? (
    <div style={{ padding: "2.5rem 0" }}>
      <Loading />
    </div>
  ) : (
    <div style={{ width: "100%" }}>
      <div className="tasks-header">
        <Title title={status ? `${status} Tasks` : "Tasks"} />
        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd />}
            className="btn-create-task"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className="task-titles-wrapper">
            <TaskTitle label="To Do" className="bg-blue-600" />
            <TaskTitle label="In Progress" className="bg-yellow-600" />
            <TaskTitle label="Completed" className="bg-green-600" />
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default Tasks;
