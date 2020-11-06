import React, { useEffect, useState } from "react";
import usePublicPolls from "../queries/use-public-polls";
import { ThemeCircularProgress } from "../components/ThemeCircularProgress";
import { PublicPollItem } from "../components/PublicPollItem";
import { categorizePolls } from "../utils/categorizePolls";

export const PublicPollsPage = () => {
  const { polls, loading } = usePublicPolls();
  const [categorizedPolls, setCategorizedPolls] = useState([]);

  useEffect(() => {
    if (polls) {
      setCategorizedPolls(categorizePolls(polls));
    }
  }, [polls]);

  return (
    <div>
      {loading ? (
        <ThemeCircularProgress />
      ) : (
        categorizedPolls.map((poll) => <PublicPollItem poll={poll} />)
      )}
    </div>
  );
};
