import React, { useState, useEffect } from "react";
import { Switch, FormControlLabel } from "@material-ui/core";
import { AlertDialog } from "./AlertDialog";
import { EditEmail } from "./AccountPage/EditEmail";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "90%",
    margin: "auto",
  },
}));

export function EditUserDialog({ open, setOpen, user, onSave }) {
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  const { control, register, reset, handleSubmit } = useForm();

  const classes = useStyles();

  const onSubmit = (data) => {
    data = { ...user, ...data };
    data.roles = data.isAdmin === true ? ["ADMIN"] : ["USER"];
    onSave(data);
  };

  useEffect(() => {
    setIsAdmin(user.isAdmin);
  }, [user.isAdmin]);

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        id: user.id,
      });
    }
  }, [user, reset]);

  return (
    <AlertDialog
      open={open}
      setOpen={setOpen}
      title={"Edit user: " + user.email}
      button={"Save"}
      onClick={handleSubmit(onSubmit)}
      components={
        <form className={classes.formContainer}>
          <EditEmail control={control} errors={"fds"} />
          <FormControlLabel
            control={
              <Switch
                inputRef={register}
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
                name="isAdmin"
                color="primary"
              />
            }
            label="Admin"
          />
        </form>
      }
    ></AlertDialog>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onSAve: PropTypes.func.isRequired,
};
