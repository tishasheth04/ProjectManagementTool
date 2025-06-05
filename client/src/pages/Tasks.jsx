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
import BoardView from "../components/BoardView"; // BoardView is back!
import { tasks } from "../assets/data";
// import Table from "../components/task/Table"; // Commented out intentionally

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
    <div className='loading-wrapper'>
      <Loading />
    </div>
  ) : (
    <div className='tasks-container'>
      <div className='tasks-header'>
        <Title title={status ? `${status} Tasks` : "Tasks"} />
        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Task'
            icon={<IoMdAdd className='icon-md' />}
            className='create-task-button'
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && selected === 0 && <BoardView tasks={tasks} />}

        {selected === 1 && (
          <div className='tasks-table-wrapper'>
            {/* <Table tasks={tasks} /> */}
            <p>List view will go here.</p>
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default Tasks;
