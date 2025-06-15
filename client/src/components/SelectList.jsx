import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";

const SelectList = ({ lists, selected, setSelected, label }) => {
  return (
    <div className="select-list-container">
      {label && <p className="select-list-label">{label}</p>}
      <Listbox value={selected} onChange={setSelected}>
        <div className="select-list-wrapper">
          <Listbox.Button className="select-list-button">
            <span className="select-list-selected">{selected}</span>
            <span className="select-list-icon">
              <BsChevronExpand />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="select-list-transition-leave"
            leaveFrom="select-list-transition-leave-from"
            leaveTo="select-list-transition-leave-to"
          >
            <Listbox.Options className="select-list-options">
              {lists.map((list, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) => 
                    `select-list-option ${active ? "select-list-option-active" : ""}`
                  }
                  value={list}
                >
                  {({ selected }) => (
                    <>
                      <span className={`select-list-option-text ${selected ? "select-list-option-selected" : ""}`}>
                        {list}
                      </span>
                      {selected && (
                        <span className="select-list-option-check">
                          <MdCheck />
                        </span>
                      )}
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
};

export default SelectList;