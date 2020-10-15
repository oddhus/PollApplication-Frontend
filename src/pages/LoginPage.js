import React from 'react'
import { useForm } from "react-hook-form";

export const LoginPage = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
          <input name="usernameLoginField" defaultValue="Username" ref={register( {required: true})} />
          <input name="passwordLoginField" ref={register({ required: true })} />
          {errors.usernameLoginField && <span>Du må skrive inn brukernavn!</span>}
          {errors.passwordLoginField && <span>Du må skrive inn passord!</span>}
          <input type="submit" />
      </form>
  )
}