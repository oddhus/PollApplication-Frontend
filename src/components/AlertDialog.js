import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { DangerButton } from "./DangerButton";
import { ThemeCircularProgress } from "./ThemeCircularProgress";

export function AlertDialog({
  open,
  setOpen,
  title,
  children,
  button,
  onClick,
  isLoading,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <DangerButton onClick={onClick} autoFocus>
            {isLoading ? <ThemeCircularProgress /> : button}
          </DangerButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  button: PropTypes.string,
  onClick: PropTypes.func,
};
