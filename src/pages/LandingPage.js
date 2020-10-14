import React from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

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
  const { control, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    console.log(data);
    //history.push(`/vote/${data.pin}`)
  };

  return (
    <div className={classes.root}>
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
                  pattern: {
                    value: /^[0-9]{1,6}$/,
                    message: "Must contain 6 digits",
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
                Find
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
