import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Button } from "@material-ui/core/";
import { getDaysHoursMinFromMin } from "../utils/calculateTime";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { StatusBar } from "../components/StatusBar";
import moment, { duration } from "moment";
import { DateTime } from "luxon";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  paper: {
    margin: theme.spacing(3),
    paddingTop: theme.spacing(2),
  },
  pollInfo: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(3),
  },
  title: {
    marginTop: theme.spacing(5),
  },
  btnContainer: {
    marginTop: theme.spacing(5),
  },
  btn: {
    width: "15%",
    margin: theme.spacing(2),
  },
}));

function getData(props) {
  return props.location.state;
}

export const VotePage = (props) => {
  const classes = useStyles();
  const data = getData(props);
  const history = useHistory();
  const [openStatus, setOpenStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isActivated, setIsActivated] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(
    moment(data.startTime).add(data.pollDuration, "seconds").fromNow()
  );

  useEffect(() => {
    setIsActivated(
      data.startTime &&
        moment(data.startTime)
          .add(data.pollDuration, "seconds")
          .isAfter(moment())
    );
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActivated) {
        const pollEnding = moment(data.startTime).add(
          data.pollDuration,
          "seconds"
        );
        console.log(pollEnding.diff(moment(), "seconds") < 60);
        if (pollEnding.diff(moment(), "seconds") > 60) {
          setTimeRemaining(pollEnding.fromNow(true));
        } else {
          setTimeRemaining(pollEnding.diff(moment(), "seconds") + " seconds");
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [data.pollDuration, data.startTime, isActivated]);

  async function sendVote(vote) {
    const pollId = props.match.params.pollId;
    try {
      const response = await axios.post(`/votes/${pollId}`, { vote });
      if (response.status === 200) {
        history.replace({
          pathname: `/result/${pollId}`,
          state: data,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      setStatusMessage(
        error.response && error.response.data
          ? error.response.data
          : "Could not cast vote"
      );
      setOpenStatus(true);
    }
  }

  return (
    <div className={classes.root}>
      <StatusBar open={openStatus} setOpen={setOpenStatus} severity="error">
        {statusMessage}
      </StatusBar>
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.pollInfo}>
          {/* <Typography>{data.pollOwner + "'s poll"}</Typography> */}
          <Typography>
            {isActivated
              ? "Time remaining: " + timeRemaining
              : data.startTime
              ? "Poll finished"
              : "Poll not activated"}
          </Typography>
        </div>
        <Typography variant="h4" className={classes.title}>
          {data.question}
        </Typography>

        <div className={classes.btnContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            disabled={!isActivated}
            onClick={() => sendVote("YES")}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            disabled={!isActivated}
            onClick={() => sendVote("NO")}
          >
            no
          </Button>
        </div>
      </Paper>
    </div>
  );
};
