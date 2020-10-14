import React from "react";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

export const EditEmail = ({ control, errors }) => {
  return (
    <Controller
      as={TextField}
      rules={{
        required: "Email is required",
        pattern: {
          value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
          message: "Enter a valid email address",
        },
      }}
      control={control}
      defaultValue=""
      variant="outlined"
      size="small"
      id="email"
      fullWidth
      label="Email Address"
      name="email"
      autoComplete="email"
      error={!!errors.email}
      helperText={errors.email ? errors.email.message : ""}
    />
  );
};
