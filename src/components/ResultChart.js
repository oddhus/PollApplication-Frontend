import React from "react";
import {
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import usePollResults from "../queries/use-pollresults";
import { ThemeCircularProgress } from "./ThemeCircularProgress";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingRight: theme.spacing(2),
  },
}));

export function ResultChart({ id }) {
  const { results, loading, error } = usePollResults(id);

  const theme = useTheme();
  const classes = useStyles();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container justify="center" className={classes.container}>
      {loading ? (
        <Grid item alignItems="center">
          <ThemeCircularProgress />
        </Grid>
      ) : error ? (
        <Grid item alignItems="center">
          <Typography variant="h6">Could not retrieve results</Typography>
        </Grid>
      ) : (
        <BarChart
          width={xs ? 300 : md ? 400 : 500}
          height={xs ? 300 : md ? 400 : 500}
          data={[results]}
        >
          <XAxis dataKey="votes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="yes" fill="#8884d8" />
          <Bar dataKey="no" fill="#82ca9d" />
        </BarChart>
      )}
    </Grid>
  );
}
