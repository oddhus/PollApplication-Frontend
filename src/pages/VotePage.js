import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Button, Grid } from "@material-ui/core/";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { StatusBar } from "../components/StatusBar";
import moment from "moment";
import usePollInfo from "../queries/use-pollinfo";
import { ThemeCircularProgress } from "../components/ThemeCircularProgress";
import { guestCookieExists, guestCookieId } from "../utils/cookieUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  paper: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(3),
    },
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
  resultBtnContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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

  const { poll, loading } = usePollInfo(data.id);

  useEffect(() => {
    if (poll) {
      setIsActivated(
        poll.startTime &&
          moment(poll.startTime)
            .add(poll.pollDuration, "seconds")
            .isAfter(moment())
      );
    }
  }, [poll]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActivated && poll.pollDuration) {
        const pollEnding = moment(poll.startTime).add(
          poll.pollDuration,
          "seconds"
        );
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
  }, [poll, isActivated]);

  async function sendVote(answer) {
    const pollId = props.match.params.pollId;
    let vote = { vote: answer };
    if (guestCookieExists()) {
      vote.id = guestCookieId();
    }
    try {
      const response = await axios.post(`/votes/${pollId}`, vote);
      if (response.status === 200) {
        history.push({
          pathname: `/result/${pollId}`,
          state: poll,
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

  const viewResult = () => {
    const pollId = props.match.params.pollId;
    history.push({
      pathname: `/result/${pollId}`,
      state: poll,
    });
  };

  return (
    <div className={classes.root}>
      <StatusBar open={openStatus} setOpen={setOpenStatus} severity="error">
        {statusMessage}
      </StatusBar>
      <Paper className={classes.paper} elevation={3}>
        {loading ? (
          <ThemeCircularProgress />
        ) : (
          <React.Fragment>
            <div className={classes.pollInfo}>
              <Typography noWrap>{data.owner + "'s poll"}</Typography>
              <Typography noWrap>
                {isActivated
                  ? "Time remaining: " + timeRemaining
                  : poll.startTime
                  ? "Poll finished"
                  : "Poll not activated"}
              </Typography>
            </div>
            <Typography variant="h4" className={classes.title}>
              {poll.question}
            </Typography>
          </React.Fragment>
        )}
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
        <Grid
          container
          justify="center"
          alignContent="center"
          spacing={2}
          className={classes.resultBtnContainer}
        >
          <Grid item xs={10} sm={4}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={viewResult}
            >
              View result
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
