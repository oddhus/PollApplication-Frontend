import { Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { ResultChart } from "../components/ResultChart";

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: -45,
    },
  },
  resultContainer: {
    paddingTop: theme.spacing(3),
  },
}));

export const ResultPage = (props) => {
  const { pollId } = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container justify="center" className={classes.resultContainer}>
      <Grid item container direction="column" xs={12} sm={8} md={6} spacing={2}>
        <Grid container justify="center">
          <Grid item>
            <Typography variant={sm ? "h5" : "h4"}>
              {props.location.state.question}
            </Typography>
          </Grid>
        </Grid>
        <Grid item className={classes.chartContainer}>
          <ResultChart id={pollId} />
        </Grid>
      </Grid>
    </Grid>
  );
};
