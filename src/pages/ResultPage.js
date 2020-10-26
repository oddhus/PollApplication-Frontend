import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { ResultChart } from "../components/ResultChart";

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    paddingTop: theme.spacing(3),
  },
}));

export const ResultPage = (props) => {
  const { pollId } = useParams();
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.chartContainer}>
      <Grid item container direction="column" sm={6} spacing={2}>
        <Grid item container alignItems="center">
          <Typography variant="h3">{props.location.query.question}</Typography>
        </Grid>
        <Grid item>
          <ResultChart id={pollId} />
        </Grid>
      </Grid>
    </Grid>
  );
};
