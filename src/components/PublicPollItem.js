import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ThemeButton } from "./ThemeButton";
import { makeStyles } from "@material-ui/core/styles";
import { ResultChart } from "./ResultChart";
import { ResultModal } from "./ResultModal";
import { StatusPoll } from "./StatusPoll";

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
  linkContainer: {
    textDecoration: "none",
  },
  pollContainer: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      height: 65,
    },
  },
  status: {
    marginBottom: 8,
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

export const PublicPollItem = ({ poll }) => {
  const [openResults, setOpenResults] = useState(false);

  function onDisplayResults() {
    setOpenResults(true);
  }

  const classes = useStyles();
  return (
    <React.Fragment>
      <ResultModal
        open={openResults}
        setOpen={setOpenResults}
        header={poll.question}
      >
        <ResultChart id={poll.id} />
      </ResultModal>

      <Grid item className={classes.pollContainer}>
        <Paper>
          <Grid item container direction="row">
            <Grid item container direction="column" sm={6} md={8}>
              <Grid
                item
                container
                component={poll.category !== 0 ? Link : undefined}
                to={
                  poll.category !== 0
                    ? { pathname: `/result/${poll.id}`, state: poll }
                    : undefined
                }
                className={classes.linkContainer}
              >
                <Grid item className={classes.title}>
                  <PollQuestion poll={poll} />
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction="row" alignItems="center">
                  <Grid item className={classes.question}>
                    <PollId poll={poll} />
                  </Grid>
                  <Grid item className={classes.status}>
                    <StatusPoll poll={poll} classes={classes} />
                  </Grid>
                </Grid>
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
              {poll.category !== 0 && (
                <Grid item className={classes.buttonContainer}>
                  <ThemeButton onClick={() => onDisplayResults()}>
                    Results
                  </ThemeButton>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

const PollQuestion = ({ poll }) => {
  return (
    <Typography variant="h5" color="textSecondary">
      {poll.question}
    </Typography>
  );
};

const PollId = ({ poll }) => {
  return (
    <Typography color="textSecondary" noWrap>
      Poll id: {poll.id}
    </Typography>
  );
};
