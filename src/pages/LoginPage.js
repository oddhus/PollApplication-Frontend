import React from 'react'
import { useForm } from "react-hook-form";
import {TextField, Container} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

export const LoginPage = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const classes = useStyles();

  return (
      <Container className={classes.container} maxWidth="xs">
          <form onSubmit={handleSubmit(onSubmit)}>
              <TextField name="usernameLoginField" defaultValue="Username" ref={register( {required: true})} />
              <TextField name="passwordLoginField" ref={register({ required: true })} />
              {errors.usernameLoginField && <span>Du må skrive inn brukernavn!</span>}
              {errors.passwordLoginField && <span>Du må skrive inn passord!</span>}
              <input type="submit" />
          </form>
      </Container>
  )
}

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
}));