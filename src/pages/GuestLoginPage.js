import React, { useState } from "react";
import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { StatusBar } from "../components/StatusBar";
import axios from "axios";
import usePollInfo from "../queries/use-pollinfo";
import { saveGuestInfo } from "../utils/storageUtils";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  formContainer: {
    minHeight: "80vh",
  },
  fullWidthContainer: {
    width: "100%",
  },
  welcomeText: {
    textAlign: "center",
  },
}));
const getPin = (props) => {
  return props.location.state;
};

export const GuestLoginPage = (props) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm();
  const history = useHistory();
  const [openStatus, setOpenStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const { mutate } = usePollInfo(getPin(props));

  const onSubmit = async ({ displayName }) => {
    try {
      const guestresponse = await axios.post("/guests/signup", {
        displayName,
      });
      if (guestresponse.data && getPin(props)) {
        saveGuestInfo(guestresponse.data);
        const pollresponse = await axios.get(`/polls/${getPin(props)}`);
        if (pollresponse.data) {
          mutate({ ...pollresponse.data });
          history.push({
            pathname: `/vote/${getPin(props)}`,
            state: pollresponse.data,
          });
        }
      } else if (guestresponse.data) {
        history.push("/");
      } else {
        throw new Error();
      }
    } catch (error) {
      setStatusMessage(
        !!error.response ? error.response.data : "Could not create guest"
      );
      setOpenStatus(true);
    }
  };

  return (
    <div className={classes.root}>
      <StatusBar open={openStatus} setOpen={setOpenStatus} severity="error">
        {statusMessage}
      </StatusBar>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.formContainer}
        direction="column"
        spacing={2}
      >
        <Grid container item xs={10} sm={4} md={3} justify="center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.fullWidthContainer}
          >
            <Grid item>
              <Controller
                as={TextField}
                rules={{
                  required: "Name is required",
                }}
                control={control}
                defaultValue=""
                variant="standard"
                margin="normal"
                name="displayName"
                label="Username"
                error={!!errors.displayName}
                helperText={
                  errors.displayName ? errors.displayName.message : ""
                }
                fullWidth
              />
            </Grid>
            <Grid item className={classes.buttonContainer}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {isSubmitting ? (
                  <CircularProgress size={20} color="secondary" />
                ) : (
                  "Go to poll!"
                )}
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
