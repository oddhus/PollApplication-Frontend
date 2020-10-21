import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { DangerButton } from "../components/DangerButton";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  container: {
    paddingTop: 20,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
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
    startTime: new Date(),
    duration: 1000,
  },
  {
    id: 1234,
    name: "My awesome poll",
    question: "Do you prefer React?",
    startTime: new Date(),
    duration: 1000,
  },
];

export function UserPollsPage() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const polls = (
    <Grid container spacing={2} direction="column">
      {DUMMY_DATA.map((poll) => (
        <Grid item>
          <Paper className={classes.root}>
            <Grid item container key={poll.id} direction="row">
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
                justify="space-around"
              >
                <Grid item>
                  <DangerButton>Delete</DangerButton>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="secondary">
                    Edit
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Activate
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          centered
        >
          <Tab label="Polls" />
          <Tab label="Ongoing" />
          <Tab label="Finished" />
        </Tabs>
      </Paper>
      <Grid
        container
        spacing={2}
        direction="column"
        className={classes.container}
      >
        <Grid item>{polls}</Grid>
      </Grid>
    </React.Fragment>
  );
}
