import React from 'react'
import {ThemeButton} from "../components/ThemeButton";
import { useForm } from "react-hook-form";
import {TextField, Container, Grid, Box, Link} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

export const LoginPage = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        console.log(data);
    }
    const classes = useStyles();

  return (
      <Container className={classes.container} maxWidth="xs">
          <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
              >
                  <Box>
                      <TextField label="Username" name="usernameLoginField" inputRef={register( {required: true})} />
                  </Box>
                  <Box marginTop={2}>
                      <TextField label="Password" name="passwordLoginField" inputRef={register({ required: true })} type="password" />
                  </Box>
                  <Box marginTop={5}>
                     <ThemeButton text={"log in"}/>
                  </Box>
                  <Box marginTop={2}>
                      <Link component={RouterLink} to={"/register"}>Create an account.</Link>
                  </Box>
                  <Box marginTop={5}>
                      {errors.usernameLoginField && <span>Du må gi et brukernavn!  </span>}
                      {errors.passwordLoginField && <span>Du må gi et passord!</span>}
                  </Box>
              </Grid>
          </form>
      </Container>
  )
}

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
}));