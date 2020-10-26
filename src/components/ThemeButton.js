import React from "react";
import { Button } from "@material-ui/core";

export const ThemeButton = ({ children, ...rest }) => {
  return (
    <Button variant="contained" color="primary" {...rest}>
      {children}
    </Button>
  );
};
