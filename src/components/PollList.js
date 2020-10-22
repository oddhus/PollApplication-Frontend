import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { DangerButton } from "../components/DangerButton";
import { ThemeCircularProgress } from "../components/ThemeCircularProgress";
import { ThemeButton } from "../components/ThemeButton";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      paddingBottom: theme.spacing(1),
    },
  },
  pollContainer: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      height: 60,
    },
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

export function PollList({
  data,
  onEdit,
  onActivate,
  isLoading,
  onDisplayResults,
  setOpenDeleteAlert,
}) {
  const theme = useTheme();
  const classes = useStyles();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Grid container direction="column">
      {data.map((poll) => (
        <Grid item key={poll.id} className={classes.pollContainer}>
          <Paper>
            <Grid item container direction="row">
              <Grid item container direction="column" sm={6} md={8}>
                <Grid>
                  <Typography
                    variant="h5"
                    className={classes.title}
                    color="textSecondary"
                    noWrap
                  >
                    {poll.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.question}
                    color="textSecondary"
                    noWrap
                  >
                    {poll.question}
                  </Typography>
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
                <Grid item className={classes.buttonContainer}>
                  <DangerButton
                    size={xs ? "small" : "medium"}
                    onClick={() => setOpenDeleteAlert(true)}
                  >
                    Delete
                  </DangerButton>
                </Grid>
                {poll.category === 0 && (
                  <Grid item className={classes.buttonContainer}>
                    <Button
                      size={xs ? "small" : "medium"}
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
                    <ThemeButton
                      disabled={isLoading}
                      size={xs ? "small" : "medium"}
                      onClick={() => onActivate(poll.id)}
                    >
                      {isLoading ? <ThemeCircularProgress /> : "Activate"}
                    </ThemeButton>
                  </Grid>
                )}
                {poll.category !== 0 && (
                  <Grid item className={classes.buttonContainer}>
                    <ThemeButton
                      size={xs ? "small" : "medium"}
                      onClick={() => onDisplayResults(poll.id, poll.question)}
                    >
                      {isLoading ? <ThemeCircularProgress /> : "Results"}
                    </ThemeButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
