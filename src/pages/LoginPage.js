import React from 'react'
import { useForm } from "react-hook-form";
import {TextField, Container, Grid, Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

export const LoginPage = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    const classes = useStyles();

  return (
      <Container className={classes.container} maxWidth="xs">
          <form onSubmit={handleSubmit(onSubmit)}>
              <Grid>
                  <TextField label="Username" name="usernameLoginField" inputRef={register( {required: true})} />
                  {errors.usernameLoginField && <span>Du må skrive inn brukernavn!</span>}
              </Grid>
              <Grid>
                  <TextField label="Password" name="passwordLoginField" inputRef={register({ required: true })} type="password" />
                  {errors.passwordLoginField && <span>Du må skrive inn passord!</span>}
              </Grid>
              <Grid>
                  <Button variant="contained" color="primary" className={classes.button} type="submit">Submit</Button>
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