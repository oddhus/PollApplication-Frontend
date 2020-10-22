import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { DangerButton } from "../components/DangerButton";
import { AlertDialog } from "../components/AlertDialog";
import moment from "moment";
import { categorizePolls, filterPolls } from "../utils/categorizePolls";
import { useHistory } from "react-router-dom";
import { StatusBar } from "../components/StatusBar";
import { ResultModal } from "../components/ResultModal";
import { ResultChart } from "../components/ResultChart";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 20,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  buttonContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      paddingBottom: theme.spacing(1),
    },
  },
  pollContainer: {
    marginBottom: theme.spacing(2),
  },
  searchBarContainer: {
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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

const DUMMY_DATA = [
  {
    id: 123,
    name: "My awesome poll",
    question: "Pineapple pizza?",
    startTime: moment().subtract(2, "days").get(),
    duration: 1000,
  },
  {
    id: 1234,
    name: "My awesome poll",
    question: "Do you prefer React?",
    startTime: moment(),
    duration: 10000,
  },
  {
    id: 12345,
    name: "Not activated",
    question: "Do you prefer Vue?",
    startTime: undefined,
    duration: 10000,
  },
  {
    id: 123456,
    name: "Another Not activated",
    question: "Use the keyword gruppe 5?",
    startTime: undefined,
    duration: 10000,
  },
];

export function UserPollsPage() {
  const theme = useTheme();
  const classes = useStyles();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const history = useHistory();
  const [tabValue, setTabValue] = useState(0);
  const [filteredPolls, setFilteredPolls] = useState([]);
  const [keyword, setKeyWord] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [status, setStatus] = useState("success");
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openResults, setOpenResults] = useState(false);
  const [selectedPollQuestion, setSelectedPollQuestion] = useState(null);
  const [selectedPollResults, setSelectedPollResult] = useState([]);

  const data = DUMMY_DATA;

  useEffect(() => {
    setFilteredPolls(filterPolls(categorizePolls(data, tabValue), keyword));
  }, [tabValue, data, keyword]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onDelete = async (id) => {
    const response = await new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
    if (response.ok) {
      setStatusMessage("Poll deleted!");
      setStatus("success");
    } else {
      setStatusMessage("Could not delete the poll. Please try again later");
      setStatus("error");
    }
    setOpenDeleteAlert(false);
    setOpenAlertDialog(true);
  };

  const onActivate = async (id) => {
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
  };

  const onEdit = (id) => {
    history.push(`/polls/${id}`);
  };

  const onDisplayResults = async (id, question) => {
    console.log(id);
    console.log(question);
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
  };

  const searchBar = (
    <Grid container spacing={2} className={classes.searchBarContainer}>
      <Grid item xs={9} sm={6}>
        <TextField
          fullWidth
          placeholder="Keyword"
          onChange={(e) => setKeyWord(e.target.value)}
        ></TextField>
      </Grid>
      <Grid item xs={3}>
        <Button variant="outlined">Search</Button>
      </Grid>
    </Grid>
  );

  const polls = (
    <Grid container direction="column">
      {filteredPolls.map((poll) => (
        <Grid item key={poll.id} className={classes.pollContainer}>
          <Paper>
            <Grid item container direction="row">
              <Grid item container direction="column" sm={8}>
                <Grid>
                  <Typography
                    variant="h5"
                    className={classes.title}
                    color="textSecondary"
                  >
                    {poll.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.question}
                    color="textSecondary"
                  >
                    {poll.question}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                sm={4}
                alignContent="center"
                justify="flex-end"
              >
                <Grid item className={classes.buttonContainer}>
                  <DangerButton onClick={() => setOpenDeleteAlert(true)}>
                    Delete
                  </DangerButton>
                </Grid>
                {poll.category === 0 && (
                  <Grid item className={classes.buttonContainer}>
                    <Button
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onActivate(poll.id)}
                    >
                      Activate
                    </Button>
                  </Grid>
                )}
                {poll.category !== 0 && (
                  <Grid item className={classes.buttonContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onDisplayResults(poll.id, poll.question)}
                    >
                      Results
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <React.Fragment>
      <ResultModal
        open={openResults}
        setOpen={setOpenResults}
        header={selectedPollQuestion}
      >
        <ResultChart data={selectedPollResults} />
      </ResultModal>
      <StatusBar
        open={openAlertDialog}
        setOpen={setOpenAlertDialog}
        severity={status}
      >
        {statusMessage}
      </StatusBar>
      <AlertDialog
        title={"Delete this poll?"}
        button={"Delete"}
        open={openDeleteAlert}
        setOpen={setOpenDeleteAlert}
        onClick={onDelete}
      >
        Are you sure you permanently want to delete this poll?
      </AlertDialog>
      <Paper className={classes.root}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          centered
          variant={xs ? "fullWidth" : "standard"}
        >
          <Tab label="Polls" />
          <Tab label="Ongoing" />
          <Tab label="Finished" />
        </Tabs>
      </Paper>
      <Grid container direction="column" className={classes.container}>
        <Grid item>{searchBar}</Grid>
        <Grid item>{polls}</Grid>
      </Grid>
    </React.Fragment>
  );
}
