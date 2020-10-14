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

const useStyles = makeStyles(() => ({
  headerContainer: {
    paddingTop: 10,
    color: grey.A700,
  },
}));

const DUMMY_USER = {
  email: "test@test.com",
};

export const AccountPage = () => {
  const user = DUMMY_USER;
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState("success");
  const [statusMessage, setStatusMessage] = useState("");

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
    //Just a delay when testing
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
    //success
    setStatusMessage("Updated your settings");
    setOpenStatus(true);

    // error
    // setStatusMessage("Failed to update your settings");
    // setIsSuccess("error");
    // setOpenStatus(true);

    console.log(data);
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <StatusBar open={openStatus} setOpen={setOpenStatus} severity={isSuccess}>
        {statusMessage}
      </StatusBar>
      <Grid container justify="center">
        <Grid container item direction="column" spacing={3} xs={12} sm={6}>
          <Grid item>
            <Box borderBottom={1} className={classes.headerContainer}>
              <Typography variant="h4">My account</Typography>
            </Box>
          </Grid>
          <Grid item>
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <Grid item container direction="column" spacing={2}>
                <Grid item container>
                  <Box borderBottom={1} className={classes.headerContainer}>
                    <Typography variant="subtitle1">Password</Typography>
                  </Box>
                </Grid>
                {editPassword && (
                  <EditPassword
                    control={control}
                    errors={errors}
                    watch={watch}
                  />
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
            </form>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
