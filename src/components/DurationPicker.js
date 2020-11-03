import React from "react";
import { TextField } from "@material-ui/core";

/**
 * Component containing three number fields. Days, hours and minutes with max values and cannot be negative values.
 * @param {*} props
 */

export function DurationPicker(props) {
  console.log(props);
  const handleDaysChanged = (e) => {
    if (e.target.value <= 1000 && e.target.value >= 0) {
      props.onDaysChanged({ attr: "days", value: e.target.value });
    } else if (e.target.value === "") {
      props.onDaysChanged({ attr: "days", value: "" });
    }
  };

  const handleHoursChange = (e) => {
    if (e.target.value < 24 && e.target.value >= 0) {
      props.onHoursChanged({ attr: "hours", value: e.target.value });
    } else if (e.target.value === "") {
      props.onHoursChanged({ attr: "hours", value: "" });
    }
  };

  const handleMinutesChange = (e) => {
    if (e.target.value < 60 && e.target.value >= 0) {
      props.onMinutesChanged({ attr: "minutes", value: e.target.value });
    } else if (e.target.value === "") {
      props.onMinutesChanged({ attr: "minutes", value: "" });
    }
  };

  return (
    <div>
      <TextField
        id="days"
        label="DD"
        type="number"
        variant="outlined"
        onChange={handleDaysChanged}
        inputProps={{ min: "0", max: "1000", step: "1", value: props.days }}
      />
      <TextField
        id="hours"
        label="HH"
        type="number"
        variant="outlined"
        onChange={handleHoursChange}
        inputProps={{ min: "0", max: "23", step: "1", value: props.hours }}
      />
      <TextField
        id="minutes"
        label="MM"
        type="number"
        variant="outlined"
        onChange={handleMinutesChange}
        inputProps={{ min: "0", max: "59", step: "1", value: props.minutes }}
      />
    </div>
  );
}
