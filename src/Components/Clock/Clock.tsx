import React, { useEffect, useState, useCallback } from "react";
import { reletiveTimestampToString } from "../../HalperFunctions/HandleStopwatches";
import classes from "./Clock.module.css";

const Clock: React.FC<{
  accum: number;
  isRunning: boolean;
  lastEntry: number;
}> = ({ accum, isRunning, lastEntry }) => {
  const [output, setOutput] = useState<string>(`00:00:00`);
  const [gap, setGap] = useState<number>(0);

  const tick = useCallback(() => {
    setGap(Date.now() - lastEntry);
  }, [lastEntry]);

  useEffect(() => {
    let interval: any;

    if (!isRunning) {
      setGap(0);
    }

    if (isRunning) {
      tick();

      interval = window.setInterval(function () {
        tick();
      }, 1000);
    }
    return () => {
      window.clearInterval(interval);
    };
  }, [isRunning, tick]);

  useEffect(() => {
    const outputInMilliSecs: number = gap + accum;

    const outputString = reletiveTimestampToString(outputInMilliSecs);

    setOutput(outputString);
  }, [accum, lastEntry, gap]);

  return (
    <div className={classes.Clock}>
      <h3>{output}</h3>
    </div>
  );
};

export default Clock;
