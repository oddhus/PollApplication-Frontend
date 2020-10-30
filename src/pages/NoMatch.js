import React from "react";
import BugReportOutlinedIcon from "@material-ui/icons/BugReportOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Tile } from "../components/Tile";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    width: "20vh",
    height: "20vh",
  },
  navigationIcon: {
    width: "10vh",
    height: "10vh",
  },
}));

export const NoMatch = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <BugReportOutlinedIcon className={classes.icon} />
        <Typography variant="h4">No matching route found!</Typography>
        <div className={classes.btnContainer}>
          <Link to={"/"}>
            <Tile
              icon={<HomeOutlinedIcon className={classes.navigationIcon} />}
              backgroundColor={"#ffc107"}
            >
              <Typography>Home</Typography>
            </Tile>
          </Link>

          <Link to={"/create"}>
            <Tile
              icon={
                <AddCircleOutlineOutlinedIcon
                  className={classes.navigationIcon}
                />
              }
              backgroundColor={"#388e3c"}
            >
              <Typography>Create Poll</Typography>
            </Tile>
          </Link>

          <Link to={"/public"}>
            <Tile
              icon={<PollOutlinedIcon className={classes.navigationIcon} />}
              backgroundColor={"#ee82ee"}
            >
              <Typography>Public polls</Typography>
            </Tile>
          </Link>
        </div>
      </div>
    </div>
  );
};
