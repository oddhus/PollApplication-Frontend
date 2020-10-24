import moment from "moment";

/**
 * Categorizes polls in three different categories: 0,1,2. And returns the category you want.
 * 0: Have not started
 * 1: Ongoing
 * 2: Finished
 * @param {*} polls List of polls
 * @param category Returns polls of desired category
 */

export function categorizePolls(polls, category) {
  return polls
    .map((poll) => {
      if (!poll.startTime) {
        poll.category = 0;
        return poll;
      } else if (
        moment(poll.startTime).add(poll.duration, "seconds").isAfter(moment())
      ) {
        poll.category = 1;
        return poll;
      } else {
        poll.category = 2;
        return poll;
      }
    })
    .filter((poll) => poll.category === category);
}

export function filterPolls(polls, keyword) {
  if (keyword.length === 0) {
    return polls;
  }

  return polls.filter(
    (poll) =>
      poll.name.toLowerCase().includes(keyword.toLowerCase()) ||
      poll.question.toLowerCase().includes(keyword)
  );
}
