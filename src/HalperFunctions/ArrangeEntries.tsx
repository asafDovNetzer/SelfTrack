import * as types from "../Types";

export const rawEntriesToPairs = (
  entries: types.StopwatchEntry[],
  stopwatchId: string,
  today: Date,
  date: Date
) => {
  const biEntries: types.ArrangedEntries = [];

  // const dayStart = new Date(
  //   entries[0].year,
  //   entries[0].month,
  //   entries[0].day,
  //   0
  // ).getTime();
  const dayStart = date.getTime();

  const dayEnd = new Date(
    entries[0].year,
    entries[0].month,
    entries[0].day + 1,
    0,
    0,
    -1
  ).getTime();

  let a: types.StopwatchEntry | null = null;
  let accum: number = 0;
  let fromLimit: number = dayStart;
  let count: number = 0;

  entries.forEach((entry, index) => {
    //   console.log(entry);

    if (index % 2) {
      biEntries.pop();
      const subTotal = entry.timestamp - a!.timestamp;
      accum += subTotal;

      const from = {
        timestamp: a!.timestamp,
        id: a!.entryId,
        limit: fromLimit,
      };
      const to = {
        timestamp: entry.timestamp,
        id: entry.entryId,
        limit: null,
      };

      fromLimit = to.timestamp;

      const biEntry: types.CompleteEntry = {
        stopwatchId: stopwatchId,
        from: from,
        to: to,
        subTotal: subTotal,
        total: accum,
        index: count,
      };
      biEntries.push(biEntry);
    }

    if (!(index % 2)) {
      a = entry;
      count++;

      if (date.getTime() === today.getTime()) {
        const biEntry: types.CompleteEntry = {
          stopwatchId: stopwatchId,
          from: {
            timestamp: entry.timestamp,
            id: entry.entryId,
            limit: 0,
          },
          to: {
            timestamp: 0,
            id: ``,
            limit: 0,
          },
          subTotal: 0,
          total: 0,
          index: count,
        };
        biEntries.push(biEntry);
      }
      if (date.getTime() !== today.getTime()) {
        const endOfDay: number = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1,
          0,
          0,
          -1
        ).getTime();

        const biEntry: types.CompleteEntry = {
          stopwatchId: stopwatchId,
          from: {
            timestamp: entry.timestamp,
            id: entry.entryId,
            limit: date.getTime(),
          },
          to: {
            timestamp: endOfDay,
            id: ``,
            limit: endOfDay,
          },
          subTotal: endOfDay - entry.timestamp,
          total: accum + endOfDay - entry.timestamp,
          index: count,
        };
        biEntries.push(biEntry);
      }
    }
  });

  const reversed = biEntries.reverse();
  let toLimit: number = dayEnd;

  reversed.forEach((entry) => {
    // entry.to!.limit = toLimit;
    if (entry.to) {
      entry.to.limit = toLimit;
    }

    toLimit = entry.from.timestamp;
  });

  return reversed;
};

export const createFakeLastEntry = (entry: types.StopwatchEntry) => {
  const newTimeStamp: number = new Date(
    entry.year,
    entry.month,
    entry.day + 1,
    0,
    0,
    -1
  ).getTime();

  const newEntry = {
    ...entry,
    timestamp: newTimeStamp,
  };

  return newEntry;
};

export async function getEntries(userDb: any, dates: types.CustomDate[]) {
  const promises: Promise<any>[] = [];

  dates.forEach((date) => {
    const dailyEntries = createPromise(userDb, date.year, date.month, date.day);

    promises.push(dailyEntries);
  });

  const responses = await Promise.all(promises);

  return responses.map((res) => res.docs);
}

const createPromise = (
  userDb: any,
  year: number,
  month: number,
  day: number
) => {
  return userDb!
    .collection(`entries`)
    .where("year", "==", year)
    .where("month", "==", month)
    .where("day", "==", day)
    .orderBy("timestamp", "asc")
    .get();
};

export function createDates(startDate: Date, days: number) {
  const dates: types.CustomDate[] = [];

  const year: number = startDate.getFullYear();
  const month: number = startDate.getMonth();

  for (let i = 0; i < days; i++) {
    const day: number = startDate.getDate() - i;

    if (day > 0) {
      dates.push({
        year: year,
        month: month,
        day: day,
      });
    }

    if (day <= 0) {
      const newDate: Date = new Date(year, month, day);

      const newDay: number = newDate.getDate();
      const newMonth: number = newDate.getMonth();
      const newYear: number = newDate.getFullYear();

      dates.push({
        year: newYear,
        month: newMonth,
        day: newDay,
      });
    }
  }

  return dates;
}

export function createDatesFromRange(dateRange: Date[]) {
  const dates: types.CustomDate[] = [];

  const year: number = dateRange[1].getFullYear();
  const month: number = dateRange[1].getMonth();

  // console.log(dateRange[0]);
  // console.log(dateRange[1]);

  const days: number =
    (dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 60 * 60 * 24);

  // console.log(Math.round(days));

  for (let i = 0; i < Math.round(days); i++) {
    const day: number = dateRange[1].getDate() - i;

    const newDate: Date = new Date(year, month, day);

    const newDay: number = newDate.getDate();
    const newMonth: number = newDate.getMonth();
    const newYear: number = newDate.getFullYear();

    dates.push({
      year: newYear,
      month: newMonth,
      day: newDay,
    });
    // }
  }

  return dates;
}
