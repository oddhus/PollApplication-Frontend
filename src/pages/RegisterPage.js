import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../mock/auth";
import { Container, Grid, Link, TextField } from "@material-ui/core";
import { ThemeButton } from "../components/ThemeButton";
import { ThemeCircularProgress } from "../components/ThemeCircularProgress";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    login();
    const response = await new Promise((resolve) => {
      setTimeout(() => resolve(true), 10000);
    });
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
              name="password"
              inputRef={register({ required: "You have to give a password!" })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              type="password"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              name="secondPassword"
              inputRef={register({ required: "You have to give a password!" })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              type="password"
            />
          </Grid>
          <Grid item>
            <ThemeButton>
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
}));
