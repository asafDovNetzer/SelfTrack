import React, { useState, useContext, useEffect } from "react";
import classes from "./DataPanel.module.css";
import * as types from "../../Types";

import TrackerSelector from "../../Components/TrackerSelector/TrackerSelector";
import RangeSelector from "../../Components/TimeRange/RangeSelector";
import ChartSelect from "../../Components/Charts/ChartSelect";
import DateContext from "../../Context/DateContext";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";

const DataPanel: React.FC<{
  stopwatches: types.StopwatchType[];
  raters: types.RaterType[];
  checkers: types.CheckerType[];
  counters: types.CounterType[];
}> = React.memo(({ stopwatches, raters, checkers, counters }) => {
  const todaysDate = useContext(DateContext);
  // console.log(checkers);
  // const [position, setPosition] = useState<string>(`left`);

  const [selectedTrackers, setSelectedTrackers] = useState<types.Tracker[]>([]);

  useEffect(() => {
    if (!stopwatches.length || !raters.length) return;

    setSelectedTrackers([raters[0], stopwatches[0]]);
  }, [stopwatches, raters]);

  // console.log(selectedTrackers);
  const [dateRange, setDateRange] = useState<Date[]>([new Date(), new Date()]);

  console.log(`rendering DataPanel`);

  // const changePosition = () => {
  //   const newPosition = position === `left` ? `right` : `left`;

  //   setPosition(newPosition);
  // };

  useEffect(() => {
    if (!todaysDate) return;
    setDateRange([
      new Date(
        todaysDate!.getFullYear(),
        todaysDate!.getMonth(),
        todaysDate!.getDate() - 7
      ),
      new Date(
        todaysDate!.getFullYear(),
        todaysDate!.getMonth(),
        todaysDate!.getDate()
      ),
    ]);
  }, [todaysDate]);

  const selectTracker = (trackerId: string) => {
    // console.log(trackerId);
    let isSelected: boolean = false;
    let newTrackers: types.Tracker[] = [];

    const allTrackers: types.Tracker[] = [
      ...stopwatches,
      ...raters,
      ...checkers,
      ...counters,
    ];

    const tracker: types.Tracker = allTrackers.filter(
      (tracker) => trackerId === tracker.id
    )[0];

    // console.log(tracker);

    if (!tracker) return;

    selectedTrackers.forEach((tracker) => {
      if (tracker.id === trackerId) isSelected = true;
    });

    if (isSelected) {
      newTrackers = selectedTrackers.filter(
        (selected) => selected.id !== trackerId
      );
    }
    if (!isSelected) {
      newTrackers = [...selectedTrackers, tracker];

      if (tracker.type === `stopwatch`) {
        newTrackers = newTrackers.filter(
          (tracker) => tracker.type !== `checker` && tracker.type !== `counter`
        );
      }

      if (tracker.type === `checker`) {
        newTrackers = newTrackers.filter(
          (tracker) =>
            tracker.type !== `stopwatch` && tracker.type !== `counter`
        );
      }
      if (tracker.type === `counter`) {
        newTrackers = newTrackers.filter(
          (tracker) =>
            tracker.type !== `stopwatch` && tracker.type !== `checker`
        );
      }
    }
    setSelectedTrackers(newTrackers);
    // }
  };

  return (
    <div className={classes.DataPanel}>
      <RangeSelector
        todaysDate={todaysDate!}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <div className={classes.Main}>
        <TrackerSelector
          raters={raters}
          stopwatches={stopwatches}
          checkers={checkers}
          counters={counters}
          handler={selectTracker}
          selectedTrackers={selectedTrackers}
        />
        <ChartSelect
          dateRange={dateRange}
          stopwatches={stopwatches}
          selectedTrackers={selectedTrackers}
          raters={raters}
          checkers={checkers}
          counters={counters}
        />
      </div>
    </div>
  );
});

export default DataPanel;
