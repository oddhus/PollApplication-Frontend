import React from "react";
import { DeviceItem } from "./DeviceItem";
import useUserDevices from "../../queries/use-userdevices";
import { ThemeCircularProgress } from "../ThemeCircularProgress";
import { Grid } from "@material-ui/core";

export const DeviceList = ({
  setStatusMessage,
  setIsSuccess,
  setOpenStatus,
}) => {
  const { devices, loading, mutate } = useUserDevices();

  return loading ? (
    <ThemeCircularProgress />
  ) : (
    <Grid item container spacing={1} direction="column">
      {devices.map((device) => (
        <DeviceItem
          id={device.id}
          displayName={device.displayName}
          uuid={device.id}
          key={device.id}
          setStatusMessage={setStatusMessage}
          setIsSuccess={setIsSuccess}
          setOpenStatus={setOpenStatus}
          mutate={mutate}
        />
      ))}
    </Grid>
  );
};
