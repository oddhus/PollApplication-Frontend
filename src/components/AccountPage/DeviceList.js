import React from "react";
import { DeviceItem } from "./DeviceItem";
import useUserDevices from "../../queries/use-userdevices";
import { ThemeCircularProgress } from "../ThemeCircularProgress";
import { Typography } from "@material-ui/core";

export const DeviceList = ({ control, errors }) => {
  const { devices, loading } = useUserDevices();

  return loading ? (
    <ThemeCircularProgress />
  ) : devices.length === 0 ? (
    <Typography>No devices</Typography>
  ) : (
    devices.map((device) => (
      <DeviceItem id={device.id} displayName={device.displayName} />
    ))
  );
};
