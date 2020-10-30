import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    margin: theme.spacing.unit,
    fontSize: 70,
    padding: 0,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  text: {
    position: "absolute",
    fontSize: "1.25em",
    padding: 15,
    bottom: 0,
    left: 0,
  },
  paper: {
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    width: 150,
    border: 0.2,
    borderColor: "#ccc",
    borderStyle: "solid",
  },
  dummy: {
    marginTop: "100%",
  },
}));

export function Tile(props) {
  const { color, backgroundColor, icon } = props;
  const classes = useStyles();

  return (
    <Paper
      className={classes.paper}
      onClick={props.onClick}
      style={{ backgroundColor }}
      square={true}
    >
      <div className={classes.dummy} />
      <div className={classes.icon}>{icon}</div>
      <Typography
        className={classes.text}
        align={"center"}
        variant={"h5"}
        style={{ color }}
      >
        {props.children}
      </Typography>
    </Paper>
  );
}

Tile.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.object.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
};
