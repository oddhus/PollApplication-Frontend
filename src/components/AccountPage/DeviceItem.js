import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { DangerButton } from "../DangerButton";

export const DeviceItem = ({ id, displayName }) => {
  const onDelete = () => {};

  return (
    <Grid container>
      <Grid item>
        <Typography>{displayName}</Typography>
      </Grid>
      <Grid>
        <DangerButton>Delete</DangerButton>
      </Grid>
    </Grid>
  );
};
