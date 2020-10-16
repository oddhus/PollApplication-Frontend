import React from "react";
import { ThemeButton } from "../components/ThemeButton";
import { useForm } from "react-hook-form";
import { TextField, Container, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { login } from "../mock/auth";

export const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
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
              name="usernameLoginField"
              inputRef={register({ required: true })}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              name="passwordLoginField"
              inputRef={register({ required: true })}
              type="password"
            />
          </Grid>
          <Grid item>
            <ThemeButton text={"log in"} />
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
          <Grid item>
            {errors.usernameLoginField && <span>Du må gi et brukernavn!</span>}
            {errors.passwordLoginField && <span> Du må gi et passord!</span>}
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
