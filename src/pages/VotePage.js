import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Button } from "@material-ui/core/";
import { getDaysHoursMinFromMin } from "../utils/calculateTime";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { StatusBar } from "../components/StatusBar";
import moment from "moment";

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
  console.log(data);
  const history = useHistory();
  const [openStatus, setOpenStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function sendVote(vote) {
    const pollId = props.match.params.pollId;
    try {
      const response = await axios.post(`/votes/${pollId}`, { vote });
      console.log(response);
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
        !!error.response ? error.response.message : "Could not cast vote"
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
            {"Time remaining: " +
              moment(data.startTime).add(data.duration).fromNow(true)}
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
            onClick={() => sendVote("YES")}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => sendVote("NO")}
          >
            no
          </Button>
        </div>
      </Paper>
    </div>
  );
};
