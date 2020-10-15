import React from 'react'
import {ThemeButton} from "../components/ThemeButton";
import { useForm } from "react-hook-form";
import {TextField, Container, Grid, Box} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

export const LoginPage = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
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
                      {errors.usernameLoginField && <span>Du må skrive inn brukernavn!</span>}
                  </Box>
                  <Box marginTop={5}>
                      <TextField label="Password" name="passwordLoginField" inputRef={register({ required: true })} type="password" />
                      {errors.passwordLoginField && <span>Du må skrive inn passord!</span>}
                  </Box>
                  <Box marginTop={5}>
                     <ThemeButton text={"log in"}/>
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