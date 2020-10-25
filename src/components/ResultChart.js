import React from "react";
import { Grid, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingRight: theme.spacing(2),
  },
}));

export function ResultChart({ data }) {
  const theme = useTheme();
  const classes = useStyles();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid className={classes.container}>
      <BarChart
        width={xs ? 300 : md ? 400 : 500}
        height={xs ? 300 : md ? 400 : 500}
        data={data}
      >
        <XAxis dataKey="votes" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="yes" fill="#8884d8" />
        <Bar dataKey="no" fill="#82ca9d" />
      </BarChart>
    </Grid>
  );
}
