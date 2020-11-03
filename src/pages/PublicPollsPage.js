import React from "react";
import usePublicPolls from "../queries/use-public-polls";
import { ThemeCircularProgress } from "../components/ThemeCircularProgress";
import { PublicPollItem } from "../components/PublicPollItem";

export const PublicPollsPage = () => {
  const { polls, loading } = usePublicPolls();

  return (
    <div>
      {loading ? (
        <ThemeCircularProgress />
      ) : (
        polls.map((poll) => <PublicPollItem poll={poll} />)
      )}
    </div>
  );
};
