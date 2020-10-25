import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { DangerButton } from "../components/DangerButton";
import { ThemeCircularProgress } from "../components/ThemeCircularProgress";
import { ThemeButton } from "../components/ThemeButton";
import { useHistory } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      paddingBottom: theme.spacing(1),
    },
  },
  finishedInfo: {
    fontStyle: "italic",
    paddingTop: 10,
    paddingLeft: 20,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
      paddingLeft: 10,
    },
  },
  pollContainer: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      height: 60,
    },
  },
  title: {
    color: "#323949",
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 24,
  },
  question: {
    paddingLeft: 10,
    marginBottom: 8,
  },
}));

export function PollItem({
  poll,
  setOpenDeleteAlert,
  setSelectedPollResult,
  setSelectedPollQuestion,
  setOpenResults,
  setStatusMessage,
  setStatus,
  setOpenAlertDialog,
}) {
  const theme = useTheme();
  const classes = useStyles();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onActivate = async (id) => {
    setIsLoading(true);
    const response = await new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
    if (response.ok) {
      setStatusMessage("Poll activated");
      setStatus("success");
    } else {
      setStatusMessage("Could not activate the poll. Please try again later");
      setStatus("error");
    }
    setOpenAlertDialog(true);
    setIsLoading(false);
  };

  const onEdit = (id) => {
    history.push({ pathname: `/polls/${id}`, state: poll });
  };

  const onDisplayResults = async (id, question) => {
    setIsLoading(true);
    const response = await new Promise((resolve) => {
      setTimeout(() => resolve({ ok: true, data: { yes: 5, no: 1 } }), 1000);
    });
    if (response.ok) {
      setSelectedPollResult([response.data]);
      setSelectedPollQuestion(question);
      setOpenResults(true);
    } else {
      setStatusMessage("Could not retrieve results. Please try again later");
      setStatus("error");
      setOpenAlertDialog(true);
    }
    setIsLoading(false);
  };

  return (
    <Grid item className={classes.pollContainer}>
      <Paper>
        <Grid item container direction="row">
          <Grid item container direction="column" sm={6} md={8}>
            <Grid item container>
              <Grid item>
                <Typography
                  variant="h5"
                  className={classes.title}
                  color="textSecondary"
                  noWrap
                >
                  {poll.name}
                </Typography>
              </Grid>
              {poll.category === 2 && (
                <Grid item container sm={12} md={4} alignItems="center">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.finishedInfo}
                  >
                    Finished{" "}
                    {moment(poll.startTime).add(poll.duration).fromNow()}
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid item>
              <Typography
                className={classes.question}
                color="textSecondary"
                noWrap
              >
                {poll.question}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={6}
            md={4}
            alignContent="center"
            justify="flex-end"
          >
            <Grid item className={classes.buttonContainer}>
              <DangerButton
                size={xs ? "small" : "medium"}
                onClick={() => setOpenDeleteAlert(true)}
              >
                Delete
              </DangerButton>
            </Grid>
            {poll.category === 0 && (
              <Grid item className={classes.buttonContainer}>
                <Button
                  size={xs ? "small" : "medium"}
                  variant="outlined"
                  color="secondary"
                  onClick={() => onEdit(poll.id)}
                >
                  Edit
                </Button>
              </Grid>
            )}
            {poll.category === 0 && (
              <Grid item className={classes.buttonContainer}>
                <ThemeButton
                  disabled={isLoading}
                  size={xs ? "small" : "medium"}
                  onClick={() => onActivate(poll.id)}
                >
                  {isLoading ? <ThemeCircularProgress /> : "Activate"}
                </ThemeButton>
              </Grid>
            )}
            {poll.category !== 0 && (
              <Grid item className={classes.buttonContainer}>
                <ThemeButton
                  size={xs ? "small" : "medium"}
                  onClick={() => onDisplayResults(poll.id, poll.question)}
                >
                  {isLoading ? <ThemeCircularProgress /> : "Results"}
                </ThemeButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
