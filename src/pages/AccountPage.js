import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { AddDevice } from "../components/AccountPage/AddDevice";
import { EditPassword } from "../components/AccountPage/EditPassword";
import { EditEmail } from "../components/AccountPage/EditEmail";
import { DeviceList } from "../components/AccountPage/DeviceList";
import { useForm } from "react-hook-form";
import { grey } from "@material-ui/core/colors";
import { StatusBar } from "../components/StatusBar";
import { AlertDialog } from "../components/AlertDialog";
import { useHistory } from "react-router-dom";
import useUser from "../queries/use-user";
import axios from "axios";
import useUserDevices from "../queries/use-userdevices";

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

export const AccountPage = () => {
  const classes = useStyles();
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editDevices, setEditDevices] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState("success");
  const [statusMessage, setStatusMessage] = useState("");
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const history = useHistory();

  const { user, loading, mutate } = useUser();

  const {
    errors,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm();

  const { mutate: mutateDevices } = useUserDevices();

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
      });
    }
  }, [user, reset]);

  const onAddDevice = async (data) => {
    console.log("hi");
    console.log(data);
    try {
      const response = await axios.post(`/voting-device/add`, {
        displayName: data.displayName,
      });
      if (response.data) {
        mutateDevices((devices) => [...devices, response.data]);
        setStatusMessage(`Device added!`);
        setOpenStatus(true);
      } else {
        throw new Error();
      }
    } catch (error) {
      setStatusMessage("Failed to add device");
      setIsSuccess("error");
      setOpenStatus(true);
    }
  };

  const onSubmit = async ({ email, newPassword, oldPassword }) => {
    try {
      const response = await axios.patch(`/users/${user.id}`, {
        username: email,
        newPassword,
        oldPassword,
      });
      if (response.data) {
        mutate({ ...user, ...(email && { username: email }) });
        setStatusMessage(`${newPassword ? "Password" : "Email"} updated!`);
        setOpenStatus(true);
        setEditPassword(false);
        setEditEmail(false);
      } else {
        throw new Error();
      }
    } catch (error) {
      setStatusMessage("Failed to update your settings");
      setIsSuccess("error");
      setOpenStatus(true);
    }
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(`/users/${user.id}`);
      if (response.data) {
        mutate(null);
        setOpenAlertDialog(false);
        history.push("/");
      } else {
        throw new Error();
      }
    } catch (error) {
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
        {loading ? (
          <CircularProgress />
        ) : editEmail ? (
          <EditEmail control={control} errors={errors} />
        ) : (
          <Typography variant="body1">{user.email}</Typography>
        )}
      </Grid>
      <Grid item container spacing={1}>
        <Grid item>
          <Button
            onClick={() => {
              setEditEmail(!editEmail);
              setEditPassword(false);
            }}
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
            onClick={() => {
              setEditPassword(!editPassword);
              setEditEmail(false);
            }}
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

  const accountDevices = (
    <Grid
      item
      container
      direction="column"
      spacing={2}
      style={{ paddingLeft: 0 }}
    >
      <Grid item container>
        <Box borderBottom={1} className={classes.headerContainer}>
          <Typography variant="subtitle1">Devices</Typography>
        </Box>
      </Grid>
      <Grid item container>
        <DeviceList
          setStatusMessage={setStatusMessage}
          setIsSuccess={setIsSuccess}
          setOpenStatus={setOpenStatus}
        />
      </Grid>
      <Grid item container>
        <AddDevice
          setStatusMessage={setStatusMessage}
          setIsSuccess={setIsSuccess}
          setOpenStatus={setOpenStatus}
        />
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
        onClick={onDelete}
      >
        This will permanently delete your account
      </AlertDialog>
      <StatusBar open={openStatus} setOpen={setOpenStatus} severity={isSuccess}>
        {statusMessage}
      </StatusBar>
      <Grid container justify="center">
        <Grid
          container
          item
          direction="column"
          spacing={3}
          xs={12}
          sm={9}
          md={6}
        >
          <Grid item style={{ paddingLeft: 0 }}>
            <Box borderBottom={1} className={classes.headerContainer}>
              <Typography variant="h4">My account</Typography>
            </Box>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            {accountEmail}
            {accountPassword}
          </form>
          {accountDevices}
          {accountDelete}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
