import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { StatusBar } from "../components/StatusBar";
import axios from "axios";
import useUser from "../queries/use-user";
import { guestCookieExists } from "../utils/cookieUtils";

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

export const LandingPage = () => {
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

  const { loggedOut } = useUser();

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(`/polls/${data.pin}`);
      if (response.data && loggedOut && !guestCookieExists()) {
        history.push({
          pathname: `/guest`,
          state: data.pin,
        });
      } else if (response.data) {
        history.push({
          pathname: `/vote/${data.pin}`,
          state: response.data,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error.response);
      setStatusMessage(
        !!error.response ? error.response.data : "Could not find poll"
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
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" className={classes.welcomeText}>
            Welcome to Survey Service! To vote enter a pin below, or login in to
            create your own poll!
          </Typography>
        </Grid>
        <Grid container item xs={10} sm={4} md={3} justify="center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.fullWidthContainer}
          >
            <Grid item>
              <Controller
                as={TextField}
                rules={{
                  required: "Pin code is required",
                  minLength: {
                    value: 6,
                    message: "Minimum pin code length is 6",
                  },
                  maxLength: {
                    value: 8,
                    message: "Maximum pin code length is 8",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]*$/,
                    message: "Only chars and digits allowed",
                  },
                }}
                control={control}
                defaultValue=""
                variant="standard"
                margin="normal"
                name="pin"
                label="Pin Code"
                id="pin"
                error={!!errors.pin}
                helperText={errors.pin ? errors.pin.message : ""}
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
                  "Find"
                )}
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
