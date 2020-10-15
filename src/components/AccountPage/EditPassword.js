import { Grid, TextField } from "@material-ui/core";
import React, { useRef } from "react";
import { Controller } from "react-hook-form";

export const EditPassword = ({ control, errors, watch }) => {
  const password = useRef({});
  password.current = watch("password", "");
  return (
    <React.Fragment>
      <Grid item xs={12} sm={8}>
        <Controller
          as={TextField}
          rules={{
            required: "Old password is required",
            minLength: {
              value: 8,
              message: "Password must be atleast 8 chars",
            },
          }}
          control={control}
          defaultValue=""
          size="small"
          variant="outlined"
          required
          name="oldpassword"
          label="Old Password"
          type="password"
          fullWidth
          error={!!errors.oldpassword}
          helperText={errors.oldpassword ? errors.oldpassword.message : ""}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Controller
          as={TextField}
          rules={{
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password must be atleast 8 chars",
            },
          }}
          control={control}
          defaultValue=""
          size="small"
          variant="outlined"
          required
          name="password"
          label="New Password"
          type="password"
          fullWidth
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Controller
          as={TextField}
          rules={{
            validate: (value) =>
              value === password.current || "The passwords do not match",
          }}
          control={control}
          defaultValue=""
          variant="outlined"
          required
          name="repeatpassword"
          label="Repeat Password"
          type="password"
          size="small"
          fullWidth
          error={!!errors.repeatpassword}
          helperText={
            errors.repeatpassword ? errors.repeatpassword.message : ""
          }
        />
      </Grid>
    </React.Fragment>
  );
};
