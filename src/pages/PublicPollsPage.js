import React from "react";
import usePublicPolls from "../queries/use-public-polls";
import { ThemeCircularProgress } from "../components/ThemeCircularProgress";

export const PublicPollsPage = () => {
  const { polls, loading } = usePublicPolls();

  return (
    <div>
      {loading ? (
        <ThemeCircularProgress />
      ) : (
        polls.map((poll) => (
          <div>
            Pollname: {poll.pollName} Question: {poll.question}
          </div>
        ))
      )}
    </div>
  );
};
