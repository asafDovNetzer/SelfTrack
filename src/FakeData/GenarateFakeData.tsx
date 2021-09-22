import React, { useState, useContext, useEffect } from "react";
import * as types from "../Types";
import DateContext from "../Context/DateContext";
import DbContext from "../Context/DbContext";

const GenarateFakeData: React.FC<{
  stopwatches: types.StopwatchType[];
  raters: types.RaterType[];
  checkers: types.CheckerType[];
  counters: types.CounterType[];
}> = React.memo(({ stopwatches, raters, checkers, counters }) => {
  const todaysDate = useContext(DateContext);
  const userDb = useContext(DbContext);

  const [newDay, setNewDay] = useState<boolean>(false);

  useEffect(() => {
    // console.log(userDb);
    if (userDb?.id !== `3Y554SVOZxYagcpu9lTkeiWesKC3`) return;

    // console.log(`isnt`);
    userDb!
      .collection(`entries`)
      .where("year", "==", todaysDate!.getFullYear())
      .where("month", "==", todaysDate!.getMonth())
      .where("day", "==", todaysDate!.getDate() - 1)
      .onSnapshot((snapshot: any) => {
        setNewDay(snapshot.empty);
      });
  }, [todaysDate, userDb]);

  useEffect(() => {
    if (!newDay) return;

    console.log(`new data for today`);

    stopwatches.forEach((stopwatch) => {
      console.log(`!!!!!!!!!1`);
      //   console.log(stopwatch);
      const numberOfEntries: number = (1 + Math.trunc(Math.random() * 4)) * 2;
      // console.log(numberOfEntries);

      const startOfDay: number = new Date(
        todaysDate!.getFullYear(),
        todaysDate!.getMonth(),
        todaysDate!.getDate() - 1,
        8
      ).getTime();

      let accum: number = startOfDay;

      for (let i = 0; i < numberOfEntries; i++) {
        const hours: number = Math.trunc(Math.random() * 3);
        const minutes: number = Math.trunc(Math.random() * 60);
        const seconds: number = Math.trunc(Math.random() * 60);

        //   console.log(`${hours}:${minutes}:${seconds}`);

        const milli: number =
          hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;

        //   console.log(milli);
        accum += milli;

        const date: Date = new Date(accum);

        userDb!
          .collection(`entries`)
          .add({
            timestamp: accum,
            trackerId: stopwatch.id,
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
            type: `stopwatchEntry`,
          })
          .then(() => {})
          .catch((err: any) => console.log(err));
      }
    });

    raters.forEach((rater) => {
      //   console.log(rater);
      const timeOfEntry: Date = new Date(
        todaysDate!.getFullYear(),
        todaysDate!.getMonth(),
        todaysDate!.getDate() - 1,
        8 + Math.trunc(Math.random() * 14),
        Math.trunc(Math.random() * 60),
        Math.trunc(Math.random() * 60)
      );

      userDb!
        .collection(`entries`)
        .add({
          timestamp: timeOfEntry.getTime(),
          trackerId: rater.id,
          year: timeOfEntry.getFullYear(),
          month: timeOfEntry.getMonth(),
          day: timeOfEntry.getDate(),
          type: `raterEntry`,
          value: 2 + Math.random() * 3,
        })
        .then(() => {})
        .catch((err: any) => console.log(err));
    });

    counters.forEach((counter) => {
      const timeOfEntry: Date = new Date(
        todaysDate!.getFullYear(),
        todaysDate!.getMonth(),
        todaysDate!.getDate() - 1,
        8 + Math.trunc(Math.random() * 14),
        Math.trunc(Math.random() * 60),
        Math.trunc(Math.random() * 60)
      );

      userDb!
        .collection(`entries`)
        .add({
          timestamp: timeOfEntry.getTime(),
          trackerId: counter.id,
          year: timeOfEntry.getFullYear(),
          month: timeOfEntry.getMonth(),
          day: timeOfEntry.getDate(),
          type: `counterEntry`,
          count: Math.trunc(Math.random() * 4) * counter.size,
        })
        .then(() => {})
        .catch((err: any) => console.log(err));
    });
    checkers.forEach((checker) => {
      const timeOfEntry: Date = new Date(
        todaysDate!.getFullYear(),
        todaysDate!.getMonth(),
        todaysDate!.getDate() - 1,
        8 + Math.trunc(Math.random() * 14),
        Math.trunc(Math.random() * 60),
        Math.trunc(Math.random() * 60)
      );

      userDb!
        .collection(`entries`)
        .add({
          timestamp: timeOfEntry.getTime(),
          trackerId: checker.id,
          year: timeOfEntry.getFullYear(),
          month: timeOfEntry.getMonth(),
          day: timeOfEntry.getDate(),
          type: `checkerEntry`,
          checked: !!Math.round(Math.random()),
        })
        .then(() => {})
        .catch((err: any) => console.log(err));
    });

    setNewDay(false);
  }, [stopwatches, todaysDate, userDb, raters, counters, checkers, newDay]);
  return <div></div>;
});

export default GenarateFakeData;
