import moment from "moment";

/**
 * Categorizes polls in three different categories: 0,1,2
 * 0: Have not started
 * 1: Ongoing
 * 2: Finished
 * @param {*} polls List of polls
 * @param category Returns polls of desired category
 */

export function categorizePolls(polls) {
  return polls.map((poll) => {
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
  });
}

export function filterCategory(polls, category) {
  return polls.filter((poll) => poll.category === category);
}

export function filterList(list, keyword, attribute) {
  if (keyword.length === 0) {
    return list;
  }

  return list.filter(
    (list) =>
      list[attribute].toLowerCase().includes(keyword.toLowerCase())
  );
}



