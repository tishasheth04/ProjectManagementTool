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
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
import Table from "../components/task/Table";
/*import AddTask from "../components/task/AddTask";*/

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg_blue_600",
  "in progress": "bg_yellow_600",
  completed: "bg_green_600",
};

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

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
          <BoardView tasks={tasks} />
        ) : (
          <div className="table_wrapper">
            <Table tasks={tasks} />
          </div>
        )}
      </Tabs>

      {/*<AddTask open={open} setOpen={setOpen} />*/}
    </div>
  );
};

export default Tasks;
