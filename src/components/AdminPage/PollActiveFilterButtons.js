import React from "react";
import PropTypes from "prop-types";
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";

export function PollActiveFilterButtons({
  btnsValue,
  handleRadioBtnChange
}) {

  return (
    <div>
      <RadioGroup
        row
        value={btnsValue}
        onChange={handleRadioBtnChange}
      >
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel value="0" control={<Radio />} label="Not started" />
        <FormControlLabel value="1" control={<Radio />} label="Ongoing" />
        <FormControlLabel value="2" control={<Radio />} label="Finished" />
      </RadioGroup>
    </div>
  );
}

PollActiveFilterButtons.propTypes = {
    btnsValue: PropTypes.string.isRequired,
    handleRadioBtnChange: PropTypes.func.isRequired
  };
  