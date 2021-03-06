import React from "react";
import { Grid } from "@material-ui/core";
import { PollItem } from "./PollItem";

export function PollList({
  data,
  setOpenDeleteAlert,
  setSelectedPollId,
  setSelectedPollQuestion,
  setOpenResults,
  setPollToDelete,
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
          setSelectedPollId={setSelectedPollId}
          setSelectedPollQuestion={setSelectedPollQuestion}
          setOpenResults={setOpenResults}
          setPollToDelete={setPollToDelete}
          setStatusMessage={setStatusMessage}
          setStatus={setStatus}
          setOpenAlertDialog={setOpenAlertDialog}
        />
      ))}
    </Grid>
  );
}
