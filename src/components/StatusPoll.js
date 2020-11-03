import React from "react";
import { Grid, Typography } from "@material-ui/core";
import moment from "moment";

export const StatusPoll = ({ poll, classes }) => {
  return (
    <React.Fragment>
      {poll.category === 0 && (
        <Grid item container sm={12} alignItems="center">
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.finishedInfo}
          >
            Status: Not started.
          </Typography>
        </Grid>
      )}
      {poll.category === 1 && (
        <Grid item container sm={12} alignItems="center">
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.finishedInfo}
          >
            Status:{" "}
            {moment(poll.startTime)
              .add(poll.pollDuration, "seconds")
              .fromNow(true)}{" "}
            until finished.
          </Typography>
        </Grid>
      )}
      {poll.category === 2 && (
        <Grid item container alignItems="center">
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.finishedInfo}
          >
            Status: Finished{" "}
            {moment(poll.startTime).add(poll.pollDuration, "seconds").fromNow()}
          </Typography>
        </Grid>
      )}
    </React.Fragment>
  );
};
