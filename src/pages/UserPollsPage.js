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
import { filterCategory, filterList } from "../utils/categorizePolls";
import { StatusBar } from "../components/StatusBar";
import { ResultModal } from "../components/ResultModal";
import { ResultChart } from "../components/ResultChart";
import { ThemeCircularProgress } from "../components/ThemeCircularProgress";
import { PollList } from "../components/PollList";
import useMyPolls from "../queries/use-mypolls";
import useUser from "../queries/use-user";
import axios from "axios";

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

export function UserPollsPage(props) {
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
  const [selectedPollId, setSelectedPollId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { user, loggedOut } = useUser();
  const { polls, loading, mutate } = useMyPolls(loggedOut ? null : user.id);

  useEffect(() => {
    if (polls) {
      setFilteredPolls(
        filterList(filterCategory(polls, tabValue), keyword, "question")
      );
    }
  }, [tabValue, polls, keyword, loading]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (
      props.history.location.state &&
      props.history.location.state.addedPoll
    ) {
      mutate((polls) => {
        if(polls){
          return [...polls, props.history.location.state.addedPoll];
        }
      })
      setStatusMessage("Poll created!");
      setStatus("success");
      setOpenAlertDialog(true);
    } else if (
      props.history.location.state &&
      props.history.location.state.updatedPoll
    ) {
      const updatedPoll = props.history.location.state.updatedPoll;
      mutate((polls) => {
        return polls.map((poll) =>
          poll.id === updatedPoll.id ? updatedPoll : poll
        );
      });
      setStatusMessage("Poll updated!");
      setStatus("success");
      setOpenAlertDialog(true);
    }
  }, [props.history.location.state, mutate]);

  const onDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`/polls/${pollToDelete}`);
      if (response.data) {
        mutate((polls) => {
          const index = polls.findIndex((poll) => poll.id === pollToDelete);
          return [...polls.slice(index)];
        });
        setStatusMessage("Poll deleted!");
        setStatus("success");
      } else {
        throw new Error();
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
        <ResultChart id={selectedPollId} />
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
              setSelectedPollId={setSelectedPollId}
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
