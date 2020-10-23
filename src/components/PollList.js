import React from "react";
import { Grid } from "@material-ui/core";
import { PollItem } from "./PollItem";

export function PollList({
  data,
  setOpenDeleteAlert,
  setSelectedPollResult,
  setSelectedPollQuestion,
  setOpenResults,
  setStatusMessage,
  setStatus,
  setOpenAlertDialog,
}) {
  return (
    <Grid container direction="column">
      {data.map((poll) => (
        <PollItem
          key={poll.id}
          setOpenDeleteAlert={setOpenDeleteAlert}
          poll={poll}
          setSelectedPollResult={setSelectedPollResult}
          setSelectedPollQuestion={setSelectedPollQuestion}
          setOpenResults={setOpenResults}
          setStatusMessage={setStatusMessage}
          setStatus={setStatus}
          setOpenAlertDialog={setOpenAlertDialog}
        />
      ))}
    </Grid>
  );
}