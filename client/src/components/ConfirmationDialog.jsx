import { Dialog } from "@headlessui/react";
import { FaQuestion } from "react-icons/fa";
import Button from "./Button"; // Assuming Button is in the same directory
import ModalWrapper from "./ModalWrapper"; // Import your ModalWrapper component

export default function ConfirmatioDialog({
  open,
  setOpen,
  msg,
  onClick = () => {},
  type = "delete",
  setMsg = () => {},
  setType = () => {},
}) {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };

  // CSS classes to replace clsx
  const iconClasses = type === "restore" || type === "restoreAll" 
    ? "confirmation-icon-restore" 
    : "confirmation-icon-delete";

  const buttonClasses = type === "restore" || type === "restoreAll"
    ? "confirmation-button-restore"
    : "confirmation-button-delete";

  return (
    <ModalWrapper open={open} setOpen={closeDialog}>
      <div className="confirmation-dialog-content">
        <Dialog.Title as="h3">
          <p className={`confirmation-icon ${iconClasses}`}>
            <FaQuestion size={60} />
          </p>
        </Dialog.Title>

        <p className="confirmation-message">
          {msg ?? "Are you sure you want to delete the selected record?"}
        </p>

        <div className="confirmation-buttons">
          <Button
            type="button"
            className={`confirmation-action-button ${buttonClasses}`}
            onClick={onClick}
            label={type === "restore" ? "Restore" : "Delete"}
          />

          <Button
            type="button"
            className="confirmation-cancel-button"
            onClick={() => closeDialog()}
            label="Cancel"
          />
        </div>
      </div>
    </ModalWrapper>
  );
}

export function UserAction({ open, setOpen, onClick = () => {} }) {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={closeDialog}>
      <div className="confirmation-dialog-content">
        <Dialog.Title as="h3">
          <p className="confirmation-icon confirmation-icon-delete">
            <FaQuestion size={60} />
          </p>
        </Dialog.Title>

        <p className="confirmation-message">
          Are you sure you want to activate or deactivate this account?
        </p>

        <div className="confirmation-buttons">
          <Button
            type="button"
            className="confirmation-action-button confirmation-button-delete"
            onClick={onClick}
            label="Yes"
          />

          <Button
            type="button"
            className="confirmation-cancel-button"
            onClick={() => closeDialog()}
            label="No"
          />
        </div>
      </div>
    </ModalWrapper>
  );
}