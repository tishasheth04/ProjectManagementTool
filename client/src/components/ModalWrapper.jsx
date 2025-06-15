import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ModalWrapper = ({ open, setOpen, children }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="modal-wrapper"
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="modal-transition-enter"
          enterFrom="modal-transition-enter-from"
          enterTo="modal-transition-enter-to"
          leave="modal-transition-leave"
          leaveFrom="modal-transition-leave-from"
          leaveTo="modal-transition-leave-to"
        >
          <div className="modal-backdrop" />
        </Transition.Child>

        <div className="modal-container">
          <div className="modal-inner-container">
            <Transition.Child
              as={Fragment}
              enter="modal-transition-enter"
              enterFrom="modal-transition-slide-enter-from"
              enterTo="modal-transition-slide-enter-to"
              leave="modal-transition-leave"
              leaveFrom="modal-transition-slide-leave-from"
              leaveTo="modal-transition-slide-leave-to"
            >
              <Dialog.Panel className="modal-panel">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalWrapper;