import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

export const DangerButton = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <Button className={classes.deleteButton} {...rest}>
      {children}
    </Button>
  );
};
