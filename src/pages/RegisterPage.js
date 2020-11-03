import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Grid, Link, TextField } from "@material-ui/core";
import { ThemeButton } from "../components/ThemeButton";
import { ThemeCircularProgress } from "../components/ThemeCircularProgress";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import useUser from "../queries/use-user";
import { guestCookieDelete, guestCookieExists } from "../utils/cookieUtils";

export const RegisterPage = () => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
    watch,
  } = useForm();

  const firstPassword = useRef({});
  firstPassword.current = watch("firstPassword", "");
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate } = useUser();

  const onSubmit = async ({ displayName, email, firstPassword }) => {
    if (guestCookieExists()) {
      guestCookieDelete();
    }
    try {
      const response = await axios.post("/auth/signup", {
        displayName,
        email,
        password: firstPassword,
      });
      if (response.status === 200) {
        mutate({ ...response.data });
        history.push("/polls");
      } else {
        throw new Error();
      }
    } catch (error) {
      setErrorMessage(
        error.response
          ? error.response.data
          : "Could not complete the registration"
      );
    }
  };

  return (
    <Container className={classes.container} maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          spacing={2}
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <TextField
              label="Username"
              name="displayName"
              inputRef={register({ required: "You have to give a username." })}
              error={!!errors.displayName}
              helperText={errors.displayName ? errors.displayName.message : ""}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              name="email"
              inputRef={register({
                required: "You have to give an email-address.",
                pattern: {
                  value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                  message: "Your email is not valid.",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              name="firstPassword"
              inputRef={register({
                required: "You have to give a password!",
                minLength: {
                  value: 8,
                  message: "Password must be of length 8.",
                },
              })}
              error={!!errors.firstPassword}
              helperText={
                errors.firstPassword ? errors.firstPassword.message : ""
              }
              type="password"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Repeat password"
              name="secondPassword"
              inputRef={register({
                required: "You have to give a password!",
                validate: (value) =>
                  value === firstPassword.current ||
                  "The passwords do not match",
                minLength: {
                  value: 8,
                  message: "Password must be of length 8.",
                },
              })}
              error={!!errors.secondPassword}
              helperText={
                errors.secondPassword ? errors.secondPassword.message : ""
              }
              type="password"
            />
          </Grid>
          {errorMessage && (
            <Grid item className={classes.error}>
              {errorMessage}
            </Grid>
          )}
          <Grid item>
            <ThemeButton type="submit">
              {isSubmitting ? <ThemeCircularProgress /> : "Registrer"}
            </ThemeButton>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to={"/login"}>
              Already got an account? Sign in instead.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  error: {
    color: theme.palette.error.main,
  },
}));
