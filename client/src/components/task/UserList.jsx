import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";
import { useGetTeamListsQuery } from "../../redux/slices/api/userApiSlice.js";
import { getInitials } from "../../utils/index.js";

export default function UserList({ team, setTeam }) {
  const { data, isLoading } = useGetTeamListsQuery({ search: "" });
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChange = (el) => {
    setSelectedUsers(el);
    setTeam(el.map((el) => el._id));
  };

  useEffect(() => {
    if (team?.length < 1) {
      data && setSelectedUsers([data[0]]);
    } else {
      setSelectedUsers(team);
    }
  }, [isLoading]);

  return (
    <div className="userlist-wrapper">
      <p className="userlist-label">Assign Task To:</p>
      <Listbox value={selectedUsers} onChange={handleChange} multiple>
        <div className="listbox-container">
          <Listbox.Button className="listbox-button">
            <span className="listbox-selected">
              {selectedUsers?.map((user) => user.name).join(", ")}
            </span>
            <span className="listbox-icon">
              <BsChevronExpand className="icon" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="listbox-options">
              {data?.map((user, userIdx) => (
                <Listbox.Option
                  key={userIdx}
                  className={({ active }) =>
                    `listbox-option ${active ? "active" : ""}`
                  }
                  value={user}
                >
                  {({ selected }) => (
                    <>
                      <div className={`option-item ${selected ? "selected" : ""}`}>
                        <div className="user-avatar">
                          <span className='avatar-initials'>
                            {getInitials(user.name)}
                          </span>
                        </div>
                        <span>{user.name}</span>
                      </div>
                      {selected ? (
                        <span className="selected-check">
                          <MdCheck className='icon' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
