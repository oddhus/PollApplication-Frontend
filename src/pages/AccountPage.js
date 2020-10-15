import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { EditPassword } from "../components/AccountPage/EditPassword";
import { EditEmail } from "../components/AccountPage/EditEmail";
import { useForm } from "react-hook-form";
import { grey } from "@material-ui/core/colors";
import { StatusBar } from "../components/StatusBar";
import { AlertDialog } from "../components/AlertDialog";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    paddingTop: 10,
    color: grey.A700,
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const DUMMY_USER = {
  email: "test@test.com",
};

export const AccountPage = () => {
  const user = DUMMY_USER;
  const classes = useStyles();
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState("success");
  const [statusMessage, setStatusMessage] = useState("");
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const history = useHistory();

  const {
    errors,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    //Just a delay when testing. To be replaced with request to server
    const response = await new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
    console.log(data);
    if (response) {
      setStatusMessage(`${data.password ? "Password" : "Email"} updated!`);
      setOpenStatus(true);
      setEditPassword(false);
      setEditEmail(false);
    } else {
      setStatusMessage("Failed to update your settings");
      setIsSuccess("error");
      setOpenStatus(true);
    }
  };

  const onDelete = async () => {
    //Just a delay when testing. To be replaced with request to server
    const response = await new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });

    if (response) {
      setOpenAlertDialog(false);
      history.push("/");
    } else {
      setStatusMessage("Failed to delete your account");
      setIsSuccess("error");
      setOpenStatus(true);
    }
  };

  const accountEmail = (
    <Grid container spacing={2} direction="column">
      <Grid item container>
        <Box borderBottom={1} className={classes.headerContainer}>
          <Typography variant="subtitle1">Email</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8}>
        {editEmail ? (
          <EditEmail control={control} errors={errors} />
        ) : (
          <Typography variant="body1">{user.email}</Typography>
        )}
      </Grid>
      <Grid item container spacing={1}>
        <Grid item>
          <Button
            disabled={editPassword}
            onClick={() => setEditEmail(!editEmail)}
            variant="outlined"
          >
            {editEmail ? "Cancel" : "Change Email"}
          </Button>
        </Grid>
        {editEmail && (
          <Grid item>
            <Button variant="outlined" type="submit" color="primary">
              {isSubmitting ? <CircularProgress size={20} /> : "Save"}
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );

  const accountPassword = (
    <Grid item container direction="column" spacing={2}>
      <Grid item container>
        <Box borderBottom={1} className={classes.headerContainer}>
          <Typography variant="subtitle1">Password</Typography>
        </Box>
      </Grid>
      {editPassword && (
        <EditPassword control={control} errors={errors} watch={watch} />
      )}
      <Grid item container direction="row" spacing={1}>
        <Grid item>
          <Button
            disabled={editEmail}
            onClick={() => setEditPassword(!editPassword)}
            variant="outlined"
          >
            {editPassword ? "Cancel" : "Change Password"}
          </Button>
        </Grid>
        {editPassword && (
          <Grid item>
            <Button variant="outlined" type="submit" color="primary">
              {isSubmitting ? <CircularProgress size={20} /> : "Save"}
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );

  const accountDelete = (
    <Grid
      item
      container
      direction="column"
      spacing={2}
      style={{ paddingLeft: 0, paddingTop: 40 }}
    >
      <Grid item>
        <Box borderBottom={1} className={classes.headerContainer}>
          <Typography variant="subtitle1">Danger zone</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Button
          className={classes.deleteButton}
          variant="contained"
          onClick={() => setOpenAlertDialog(true)}
        >
          Delete account
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <React.Fragment>
      <AlertDialog
        open={openAlertDialog}
        setOpen={setOpenAlertDialog}
        title={"Confirm delete"}
        button={"Delete"}
        buttonClass={classes.deleteButton}
        onClick={onDelete}
      >
        This will permanently delete your account
      </AlertDialog>
      <StatusBar open={openStatus} setOpen={setOpenStatus} severity={isSuccess}>
        {statusMessage}
      </StatusBar>
      <Grid container justify="center">
        <Grid container item direction="column" spacing={3} xs={12} sm={6}>
          <Grid item style={{ paddingLeft: 0 }}>
            <Box borderBottom={1} className={classes.headerContainer}>
              <Typography variant="h4">My account</Typography>
            </Box>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            {accountEmail}
            {accountPassword}
          </form>
          {accountDelete}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
