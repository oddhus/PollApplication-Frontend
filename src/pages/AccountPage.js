import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Box,
  Button,
  useRadioGroup,
  CircularProgress,
} from "@material-ui/core";
import { EditPassword } from "../components/AccountPage/EditPassword";
import { EditEmail } from "../components/AccountPage/EditEmail";
import { useForm } from "react-hook-form";

const useStyles = makeStyles(() => ({
  headerContainer: {
    paddingTop: 10,
  },
  fullWidthContainer: {
    width: "100%",
  },
  welcomeText: {
    textAlign: "center",
  },
}));

const DUMMY_USER = {
  email: "test@test.com",
};

export const AccountPage = () => {
  const user = DUMMY_USER;
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const {
    errors,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (useRadioGroup) {
      reset({
        email: user.email,
      });
    }
  }, [user]);

  const onSubmit = async (data) => {
    //Just a delay when testing
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
    console.log(data);
  };

  const classes = useStyles();
  return (
    <Grid container direction="column" spacing={4}>
      <Grid item xs={12} sm={6}>
        <Box borderBottom={1} className={classes.headerContainer}>
          <Typography variant="h3">My account</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item>
              <Box borderBottom={1}>
                <Typography variant="h5">Email</Typography>
              </Box>
            </Grid>
            <Grid item container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6}>
                {editEmail ? (
                  <EditEmail control={control} errors={errors} />
                ) : (
                  <Typography variant="body1">{user.email}</Typography>
                )}
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setEditEmail(!editEmail)}
                >
                  {editEmail ? "Cancel" : "Edit"}
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
                <Typography variant="h5">Password</Typography>
              </Box>
            </Grid>
            {editPassword && (
              <EditPassword control={control} errors={errors} watch={watch} />
            )}
            <Grid item container direction="row" spacing={2}>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setEditPassword(!editPassword)}
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
  );
};
