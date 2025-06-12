import React from 'react'
import ModalWrapper from '../ModalWrapper'
import Textbox from '../Textbox';
import { Dialog } from "@headlessui/react";
 
import {useForm} from "react-hook-form";

const AddTask = ({open, setOpen}) => {
    const task='';
    const {register, handleSubmit, formState: {errors},} = useForm();
    const [team, setTeam] = useState(task?.team || []);

    const submitHandler = () => {};
  return <>
  <ModalWrapper open={open} setOpen={setOpen}>
    <form onSubmit={handleSubmit(submitHandler)}>
       <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {task ? "UPDATE TASK" : "ADD TASK"}
          </Dialog.Title> 

          <div className ='mt-2 flex flex-col gap-6'>
            <Textbox
            placeholder="Task Title"
            type="text"
            name="title"
            label ="Task Title"
            className ="w-full rounded"
            register={register("title", {required: "Title is required"})}
            error={error.title ? errors.title.message : ""}
            
            />
            <UserList
            setTeam={setTeam}
            team={team}
            />
          </div>
    </form>
  </ModalWrapper>
  </>
}

export default AddTask
