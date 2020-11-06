import React, { useState } from "react";
import { ThemeButton } from "../components/ThemeButton";
import { ThemeCircularProgress } from "../components/ThemeCircularProgress";
import { useForm } from "react-hook-form";
import { TextField, Container, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useHistory } from "react-router-dom";
import axios from "axios";
import useUser from "../queries/use-user";
import { guestCookieDelete, guestCookieExists } from "../utils/cookieUtils";

export const LoginPage = () => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm();
  const history = useHistory();
  const { mutate } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await axios.post("/auth/signin", { email, password });
      if (response.status === 200) {
        if (guestCookieExists()) {
          guestCookieDelete();
        }
        mutate({ ...response.data });
        history.push("/polls");
      } else {
        throw new Error();
      }
    } catch (error) {
      setErrorMessage(
        error.response && error.response.data.error === "Unauthorized"
          ? "Wrong username or password"
          : "Could not log in. Please try again later"
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
              label="Email"
              name="email"
              inputRef={register({ required: "You have to give a email." })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              name="password"
              inputRef={register({ required: "You have to give a password." })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
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
              {isSubmitting ? <ThemeCircularProgress /> : "Log in"}
            </ThemeButton>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to={"/register"}>
              Create an account.
            </Link>
          </Grid>
          <Grid item>
            {" "}
            <Link
              component={RouterLink}
              to={"/login"}
              onClick={() =>
                alert(JSON.stringify("We sent you a new password to: mail"))
              }
            >
              Send me a new password.
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
