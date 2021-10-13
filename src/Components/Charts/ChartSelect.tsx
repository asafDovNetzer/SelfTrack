import React, { useEffect, useContext, useState } from "react";
import * as types from "../../Types";
import DbContext from "../../Context/DbContext";
import BarLineChartPreAmp from "./BarLineChart/BarLineChartPreAmp";
import DateContext from "../../Context/DateContext";
import {
  getEntries,
  createDatesFromRange,
} from "../../HalperFunctions/ArrangeEntries";
import "react-calendar/dist/Calendar.css";

const ChartSelect: React.FC<{
  dateRange: Date[];
  stopwatches: types.StopwatchType[];
  raters: types.RaterType[];
  checkers: types.CheckerType[];
  counters: types.CounterType[];
  selectedTrackers: types.Tracker[];
}> = React.memo(
  ({
    stopwatches,
    checkers,
    raters,
    selectedTrackers,
    dateRange,
    counters,
  }) => {
    const [stopwatchEntries, setStopwatchEntries] = useState<
      Map<string, types.StopwatchEntry[]>
    >(new Map());
    const [checkerEntries, setCheckerEntries] = useState<
      Map<string, types.CheckerEntry[]>
    >(new Map());
    const [raterEntries, setRaterEntries] = useState<
      Map<string, types.RaterEntry[]>
    >(new Map());
    const [counterEntries, setCounterEntries] = useState<
      Map<string, types.CounterEntry[]>
    >(new Map());
    const [dateStrings, setDateStrings] = useState<string[]>([]);
    // const [barLineChart, setBarLineChart] = useState({
    //   display: true,
    //   disabled: false,
    // });
    // const [pieChart, setPieChart] = useState({
    //   display: false,
    //   disabled: true,
    // });
    // const [areaChart] = useState({
    //   display: false,
    //   disabled: true,
    // });

    const userDb = useContext(DbContext);
    const todaysDate = useContext(DateContext);

    console.log(`rendering chart selector`);

    // useEffect(() => {
    //   const fromTimestamp: number = dateRange[0].getTime();
    //   const toTimestamp: number = dateRange[1].getTime();
    //   const dayLengthInMilli: number = 24 * 60 * 60 * 1000;

    //   if (fromTimestamp + dayLengthInMilli > toTimestamp) {
    //     setPieChart({
    //       display: true,
    //       disabled: false,
    //     });
    //   } else {
    //     setPieChart({
    //       display: false,
    //       disabled: true,
    //     });
    //   }
    // }, [dateRange]);

    useEffect(() => {
      const dates = createDatesFromRange(dateRange);
      const dateStrings = dates.map((date) => `${date.day}/${date.month + 1}`);

      setDateStrings(dateStrings.reverse());

      const weekMapStopwatch: Map<string, types.StopwatchEntry[]> = new Map();
      const weekMapRater: Map<string, types.RaterEntry[]> = new Map();
      const weekMapChecker: Map<string, types.CheckerEntry[]> = new Map();
      const weekMapCounter: Map<string, types.CounterEntry[]> = new Map();

      getEntries(userDb, dates).then((res) => {
        res.forEach((day: any[], index) => {
          const stopwatchEntries: types.StopwatchEntry[] = [];
          const raterEntries: types.RaterEntry[] = [];
          const checkerEntries: types.CheckerEntry[] = [];
          const counterEntries: types.CounterEntry[] = [];

          day.forEach((doc) => {
            const entry: types.Entry = doc.data();

            switch (entry.type) {
              case `stopwatchEntry`:
                stopwatchEntries.push(entry as types.StopwatchEntry);
                break;
              case `raterEntry`:
                raterEntries.push(entry as types.RaterEntry);
                break;
              case `counterEntry`:
                counterEntries.push(entry as types.CounterEntry);
                break;
              default:
                checkerEntries.push(entry as types.CheckerEntry);
                break;
            }
          });

          weekMapStopwatch.set(dateStrings[index], stopwatchEntries);
          weekMapRater.set(dateStrings[index], raterEntries);
          weekMapChecker.set(dateStrings[index], checkerEntries);
          weekMapCounter.set(dateStrings[index], counterEntries);
        });

        setStopwatchEntries(weekMapStopwatch);
        setRaterEntries(weekMapRater);
        setCheckerEntries(weekMapChecker);
        setCounterEntries(weekMapCounter);
      });
    }, [todaysDate, userDb, dateRange]);

    return (
      <div style={{ marginLeft: `4px` }}>
        {/* <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={barLineChart.display}
                disabled={barLineChart.disabled}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setBarLineChart({
                    display: barLineChart.display ? false : true,
                    disabled: false,
                  });
                }}
                name="barLineChart"
              />
            }
            label="Bar Line Chart"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={pieChart.display}
                disabled={pieChart.disabled}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setBarLineChart({
                    display: pieChart.display ? false : true,
                    disabled: false,
                  });
                }}
                name="pieChart"
              />
            }
            label="Pie Chart"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={areaChart.display}
                disabled={areaChart.disabled}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setBarLineChart({
                    display: areaChart.display ? false : true,
                    disabled: false,
                  });
                }}
                name="areaChart"
              />
            }
            label="Area Chart"
          />
        </FormGroup> */}
        <BarLineChartPreAmp
          stopwatchEntries={stopwatchEntries}
          checkerEntries={checkerEntries}
          raterEntries={raterEntries}
          counterEntries={counterEntries}
          stopwatches={stopwatches}
          raters={raters}
          checkers={checkers}
          counters={counters}
          selectedTrackers={selectedTrackers}
          dateStrings={dateStrings}
        />
      </div>
    );
  }
);

export default ChartSelect;
