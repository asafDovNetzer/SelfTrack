import React, { useState, useEffect, useContext } from "react";
import * as types from "../../../Types";
import DateContext from "../../../Context/DateContext";
import BarLineChart from "./BarLineChart";
import { createFakeLastEntry } from "../../../HalperFunctions/ArrangeEntries";
import hexRgb from "hex-rgb";

// import Checks from "../../Checks/Checks";

const BarLineChartPreAmp: React.FC<{
  dateStrings: string[];
  stopwatches: types.StopwatchType[];
  stopwatchEntries: Map<string, types.StopwatchEntry[]>;
  raters: types.RaterType[];
  checkers: types.CheckerType[];
  counters: types.CounterType[];
  counterEntries: Map<string, types.CounterEntry[]>;
  checkerEntries: Map<string, types.CheckerEntry[]>;
  selectedTrackers: types.Tracker[];
  raterEntries: Map<string, types.RaterEntry[]>;
}> = React.memo(
  ({
    stopwatches,
    selectedTrackers,
    stopwatchEntries,
    raters,
    raterEntries,
    dateStrings,
    checkers,
    counters,
    counterEntries,
    checkerEntries,
  }) => {
    const [trackerDatasets, setTrackerDatasets] = useState<
      types.BarChartDataset[]
    >([]);

    const [options, setOptions] = useState<any>({});
    const todaysDate = useContext(DateContext);

    useEffect(() => {
      const newOptions: any = {
        elements: {
          point: {
            radius: 1,
          },
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,
        scales: {
          y: {
            type: "linear",
            display: false,
            position: "left",
            title: {
              display: false,
            },
          },
          y1: {
            suggestedMax: 5,
            ticks: {
              stepSize: 1,
            },
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: `Rating`,
            },
            grid: {
              drawOnChartArea: true,
            },
          },
        },
        plugins: {
          tooltip: {
            enabled: false,
            displayColors: false,
          },
          legend: {
            display: false,
          },
        },
      };

      if (!selectedTrackers.length) {
        setTrackerDatasets([
          {
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: `black`,
            borderColor: `black`,
            type: `bar`,
            stepped: false,
            order: 1,
            yAxisID: "y",
            tension: 1,
          },
        ]);
        setOptions(newOptions);
        return;
      }

      const datasets: types.BarChartDataset[] = [];

      stopwatches.forEach((stopwatch) => {
        if (
          !selectedTrackers.map((tracker) => tracker.id).includes(stopwatch.id)
        ) {
          return;
        }

        newOptions.scales.y.display = true;
        newOptions.scales.y.suggestedMax = 4;
        newOptions.scales.y.title = {
          display: true,
          text: `Hours`,
        };
        newOptions.scales.y1.grid.drawOnChartArea = false;
        // const days: string[] = [];
        const totals: number[] = [];

        stopwatchEntries.forEach((entries) => {
          const filteredEntries = entries.filter(
            (entry) => entry.trackerId === stopwatch.id
          );

          if (filteredEntries.length % 2) {
            const lastEntry: types.StopwatchEntry =
              filteredEntries[filteredEntries.length - 1];

            const dayOfEntry: Date = new Date(
              lastEntry.year,
              lastEntry.month,
              lastEntry.day
            );

            const isToday: boolean =
              dayOfEntry.getTime() === todaysDate!.getTime();

            if (!isToday) {
              const fakeLastEntry: types.StopwatchEntry =
                createFakeLastEntry(lastEntry);
              filteredEntries.push(fakeLastEntry);
            }

            if (isToday) {
              filteredEntries.push({
                ...lastEntry,
                timestamp: Date.now(),
              });
            }
          }

          let accum: number = 0;

          filteredEntries.forEach((entry, index) => {
            if (index % 2 === 0) {
              accum -= entry.timestamp;
            } else {
              accum += entry.timestamp;
            }
          });

          const hours: number = accum / (1000 * 60 * 60);

          // days.unshift(key);
          totals.unshift(hours);
        });

        const dataset: types.BarChartDataset = {
          data: totals,
          backgroundColor: stopwatch.color,
          borderColor: stopwatch.color,
          type: `bar`,
          stepped: false,
          order: 1,
          yAxisID: "y",
          tension: 1,
        };

        datasets.push(dataset);
      });
      raters.forEach((rater) => {
        if (!selectedTrackers.map((tracker) => tracker.id).includes(rater.id))
          return;

        const totals: (number | null)[] = [];

        raterEntries.forEach((entries) => {
          const filteredEntries = entries.filter(
            (entry) => entry.trackerId === rater.id
          );

          const value: number | undefined =
            filteredEntries[filteredEntries.length - 1]?.value;
          totals.unshift(value ? value : null);
        });

        const dataset: types.BarChartDataset = {
          data: totals,
          backgroundColor: rater.color,
          borderColor: rater.color,
          type: `line`,
          stepped: false,
          order: 0,
          yAxisID: "y1",
          tension: 0.4,
        };

        datasets.push(dataset);
      });
      checkers.forEach((checker) => {
        if (!selectedTrackers.map((tracker) => tracker.id).includes(checker.id))
          return;
        newOptions.scales.y.display = false;
        newOptions.scales.y1.grid.drawOnChartArea = true;

        // const days: string[] = [];
        const totals: number[] = [];

        checkerEntries.forEach((entries) => {
          const filteredEntry = entries.filter(
            (entry) => entry.trackerId === checker.id
          )[0];
          // days.unshift(key);
          totals.unshift(filteredEntry?.checked ? 1 : 0);
        });

        const rgb = hexRgb(checker.color);
        // console.log(rgb);

        const color: string = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.6)`;

        const dataset: types.BarChartDataset = {
          data: totals,
          backgroundColor: color,
          borderColor: checker.color,
          type: `bar`,
          stepped: false,
          order: 1,
          yAxisID: "y",
          tension: 1,
        };

        datasets.push(dataset);
      });
      counters.forEach((counter) => {
        newOptions.scales.y.display = true;

        if (!selectedTrackers.map((tracker) => tracker.id).includes(counter.id))
          return;
        newOptions.scales.y.suggestedMax = counter.size;
        newOptions.scales.y.title.text = `Count`;
        newOptions.scales.y1.grid.drawOnChartArea = false;

        // const days: string[] = [];
        const totals: number[] = [];

        counterEntries.forEach((entries) => {
          const filteredEntry = entries.filter(
            (entry) => entry.trackerId === counter.id
          )[0];
          const count: number | undefined = filteredEntry?.count;
          totals.unshift(count ? count : 0);
        });

        // const rgb = hexRgb(counter.color);
        // // console.log(rgb);

        // const color: string = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.6)`;

        const dataset: types.BarChartDataset = {
          data: totals,
          backgroundColor: counter.color,
          borderColor: counter.color,
          type: `bar`,
          stepped: false,
          order: 1,
          yAxisID: "y",
          tension: 1,
        };

        datasets.push(dataset);
      });

      setTrackerDatasets(datasets);
      setOptions(newOptions);
    }, [
      stopwatchEntries,
      selectedTrackers,
      stopwatches,
      raterEntries,
      raters,
      checkers,
      checkerEntries,
      counters,
      counterEntries,
      todaysDate,
    ]);

    return (
      <div style={{ display: `flex`, flexFlow: `column` }}>
        <BarLineChart
          datasets={trackerDatasets}
          labels={dateStrings}
          options={options}
          width=""
        />
      </div>
    );
  }
);

export default BarLineChartPreAmp;
