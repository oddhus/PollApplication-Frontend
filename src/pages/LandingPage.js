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

  const onSubmit = async (data) => {
    //Just a delay when testing
    const response = await new Promise((resolve) => {
      setTimeout(() => resolve(false), 1000);
    });

    console.log(data);
    if (response) {
      history.push(`/vote/${data.pin}`);
    } else {
      setStatusMessage(!!response.text ? response.text : "");
      setOpenStatus(true);
    }
  };

  return (
    <div className={classes.root}>
      <StatusBar open={openStatus} setOpen={setOpenStatus} severity="error">
        {statusMessage.length !== 0
          ? statusMessage
          : "Something went wrong, could not find poll"}
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
                    value: 6,
                    message: "Maximum pin code length is 6",
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
