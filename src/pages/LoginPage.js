import React from "react";
import { ThemeButton } from "../components/ThemeButton";
import { ThemeCircularProgress } from "../components/ThemeCircularProgress";
import { useForm } from "react-hook-form";
import { TextField, Container, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { login } from "../mock/auth";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    login();
  };
  const classes = useStyles();

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
              name="username"
              inputRef={register({ required: "You have to give a username." })}
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
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
          <Grid item>
            <ThemeButton>
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
}));
