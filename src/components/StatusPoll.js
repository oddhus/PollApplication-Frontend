import React from "react";
import { Grid, Typography } from "@material-ui/core";
import moment from "moment";

export const StatusPoll = ({ poll, classes }) => {
  return (
    <React.Fragment>
      {poll.category === 0 && (
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.finishedInfo}
        >
          Status: Not started.
        </Typography>
      )}
      {poll.category === 1 && (
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
      )}
      {poll.category === 2 && (
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.finishedInfo}
        >
          Status: Finished{" "}
          {moment(poll.startTime).add(poll.pollDuration, "seconds").fromNow()}
        </Typography>
      )}
    </React.Fragment>
  );
};
