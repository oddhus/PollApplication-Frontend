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
import { AlertDialog } from "../components/AlertDialog";
import moment from "moment";
import { categorizePolls, filterPolls } from "../utils/categorizePolls";
import { StatusBar } from "../components/StatusBar";
import { ResultModal } from "../components/ResultModal";
import { ResultChart } from "../components/ResultChart";
import { ThemeCircularProgress } from "../components/ThemeCircularProgress";
import { PollList } from "../components/PollList";
import useMyPolls from "../queries/use-polls";
import useUser from "../queries/use-user";
import axios from "axios";
import { mutate } from "swr";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 20,
  },
  notFound: {
    paddingTop: theme.spacing(3),
  },
  searchBarContainer: {
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

let DUMMY_DATA2 = [];
for (let index = 0; index < 100; index++) {
  DUMMY_DATA2[index] = {
    id: index,
    name: "Another Not activated",
    question: "Use the keyword gruppe 5?",
    startTime: undefined,
    duration: 10000,
  };
}

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

  const [tabValue, setTabValue] = useState(0);
  const [filteredPolls, setFilteredPolls] = useState([]);
  const [keyword, setKeyWord] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [status, setStatus] = useState("success");
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [pollToDelete, setPollToDelete] = useState(null);
  const [openResults, setOpenResults] = useState(false);
  const [selectedPollQuestion, setSelectedPollQuestion] = useState(null);
  const [selectedPollResults, setSelectedPollResult] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const { user } = useUser();
  const { polls, loading, mutate, error } = useMyPolls(user.id);

  useEffect(() => {
    if (polls) {
      setFilteredPolls(filterPolls(categorizePolls(polls, tabValue), keyword));
    }
  }, [tabValue, polls, keyword, loading]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`/polls/${pollToDelete}`);
      if (response.data) {
        mutate();
        setStatusMessage("Poll deleted!");
        setStatus("success");
      } else {
        setStatusMessage("Could not delete the poll. Please try again later");
        setStatus("error");
      }
    } catch (error) {
      setStatusMessage("Could not delete the poll. Please try again later");
      setStatus("error");
    }
    setOpenDeleteAlert(false);
    setOpenAlertDialog(true);
    setPollToDelete(null);
    setIsDeleting(false);
  };

  const searchBar = (
    <Grid container spacing={2} className={classes.searchBarContainer}>
      <Grid item xs={8} sm={6}>
        <TextField
          fullWidth
          placeholder="Keyword"
          onChange={(e) => setKeyWord(e.target.value)}
        ></TextField>
      </Grid>
      <Grid item xs={4} md={3}>
        <Button variant="outlined">Search</Button>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={3}
        alignContent="center"
        justify="flex-end"
      >
        <Typography variant="subtitle1">
          Number of polls: {filteredPolls.length}
        </Typography>
      </Grid>
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
        isLoading={isDeleting}
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
        {loading ? (
          <ThemeCircularProgress />
        ) : filteredPolls.length === 0 ? (
          <Grid item container justify="center" className={classes.notFound}>
            <Typography variant="h5">Found no polls...</Typography>
          </Grid>
        ) : (
          <Grid item>
            <PollList
              data={filteredPolls}
              setOpenDeleteAlert={setOpenDeleteAlert}
              setSelectedPollResult={setSelectedPollResult}
              setSelectedPollQuestion={setSelectedPollQuestion}
              setOpenResults={setOpenResults}
              setPollToDelete={setPollToDelete}
              setStatusMessage={setStatusMessage}
              setStatus={setStatus}
              setOpenAlertDialog={setOpenAlertDialog}
            />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
