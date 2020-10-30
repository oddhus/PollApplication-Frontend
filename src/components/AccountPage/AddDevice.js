import React, { useState } from "react";
import { Grid, Button, CircularProgress, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import useUserDevices from "../../queries/use-userdevices";

export const AddDevice = ({
  setIsSuccess,
  setStatusMessage,
  setOpenStatus,
}) => {
  const [editDevices, setEditDevices] = useState(false);

  const {
    errors,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const { mutate } = useUserDevices();

  const onAddDevice = async (data) => {
    try {
      const response = await axios.post(`/voting-device`, {
        displayName: data.displayName,
      });
      if (response.data) {
        mutate((devices) => [...devices, response.data]);
        setStatusMessage(`Device added!`);
        setOpenStatus(true);
        reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      setStatusMessage("Failed to add device");
      setIsSuccess("error");
      setOpenStatus(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onAddDevice)}>
      <Grid item container direction="row" spacing={1}>
        {editDevices && (
          <Grid item>
            <Controller
              as={TextField}
              rules={{
                required: "Device name is required",
              }}
              control={control}
              defaultValue=""
              variant="outlined"
              size="small"
              id="displayName"
              label="Display Name"
              name="displayName"
              error={!!errors.displayName}
              helperText={errors.displayName ? errors.displayName.message : ""}
            />
          </Grid>
        )}
        <Grid item>
          <Button
            onClick={() => {
              setEditDevices(!editDevices);
            }}
            variant="outlined"
          >
            {isSubmitting ? (
              <CircularProgress size={20} />
            ) : editDevices ? (
              "Cancel"
            ) : (
              "Add device"
            )}
          </Button>
        </Grid>
        {editDevices && (
          <Grid item>
            <Button variant="outlined" type="submit" color="primary">
              {isSubmitting ? <CircularProgress size={20} /> : "Add"}
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
};
