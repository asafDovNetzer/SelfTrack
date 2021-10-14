import React, { useCallback, useEffect, useState } from "react";
import * as types from "../../../Types";
import classes from "./BarChartPreAmp.module.css";
import { Stopwatch } from "../../../HalperFunctions/CreateTrackers";
import BarChart from "./BarChart";

const BarChartPreamp: React.FC<{
  stopwatch: Stopwatch;
  entries: types.StopwatchEntry[];
  date: Date;
}> = React.memo(({ stopwatch, entries, date }) => {
  const [nowTimestamp, setNowTimestamp] = useState<number>(Date.now());
  const [datasets, setDatasets] = useState<types.Datasets | null>(null);

  useEffect(() => {
    const datasetsArray: types.Datasets = [];

    const dayStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
    const dayEnd = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    ).getTime();

    const stopwatchEntries = [
      dayStart,
      ...entries.map((entry) => entry.timestamp),
    ];

    // console.log(stopwatchEntries);
    const currentTimestamp: number = nowTimestamp;

    stopwatchEntries.push(
      currentTimestamp < dayEnd ? currentTimestamp : dayEnd
    );

    const data: number[] = [];
    let a: number | null = null;

    stopwatchEntries.forEach((entry) => {
      if (a) {
        data.push((entry - a) / (1000 * 60 * 60));
      }
      a = entry;
    });

    // console.log(data);

    const setBackgroundColor = (index: number) => {
      let color: string = `rgb(225, 225, 225)`;

      if (index % 2) {
        color = stopwatch.color;
      }

      return color;
    };

    data.forEach((entry, index) => {
      datasetsArray.push({
        data: [entry],
        backgroundColor: setBackgroundColor(index),
      });
    });

    // console.log(datasetsArray);

    setDatasets(datasetsArray);
  }, [stopwatch, entries, date, nowTimestamp]);

  const tick = useCallback(() => {
    // console.log(`tick`);
    setNowTimestamp(Date.now());
  }, []);

  useEffect(() => {
    // if (!isRunning) return;

    const interval = setInterval(() => {
      tick();
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, [tick]);

  let barChart = <p>loading...</p>;

  if (datasets) {
    barChart = (
      <div className={classes.BarChartPreamp}>
        <BarChart chartData={datasets} />
      </div>
    );
  }

  return barChart;
});

export default BarChartPreamp;
