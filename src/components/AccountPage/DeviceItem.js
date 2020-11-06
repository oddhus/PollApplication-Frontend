import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { DangerButton } from "../DangerButton";
import axios from "axios";
import { ThemeCircularProgress } from "../ThemeCircularProgress";

export const DeviceItem = ({
  id,
  displayName,
  uuid,
  setStatusMessage,
  setIsSuccess,
  setOpenStatus,
  mutate,
}) => {
  const [showId, setShowId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`/voting-device/${id}`);
      if (response.data) {
        mutate((devices) => {
          const index = devices.findIndex((device) => device.id === id);
          return [...devices.slice(index)];
        });
        setStatusMessage("Device removed");
        setIsSuccess("success");
        setOpenStatus(true);
      } else {
        throw new Error();
      }
    } catch (error) {
      setStatusMessage("Device was not removed");
      setIsSuccess("error");
      setOpenStatus(true);
    }
    setIsLoading(false);
  };

  return (
    <Grid item container spacing={1} direction="row">
      <Grid item container spacing={1} sm={6} alignContent="center">
        <Grid item>
          <Typography>{showId ? uuid : displayName}</Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={1} sm={6}>
        <Grid item>
          <Button
            disabled={isLoading}
            variant="outlined"
            color="primary"
            onClick={() => {
              setShowId(!showId);
            }}
          >
            Show id
          </Button>
        </Grid>
        <Grid item>
          <DangerButton disabled={isLoading} onClick={onDelete}>
            {isLoading ? <ThemeCircularProgress /> : "Delete"}
          </DangerButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
