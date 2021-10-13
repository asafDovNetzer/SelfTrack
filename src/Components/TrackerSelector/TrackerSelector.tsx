import React, { useState } from "react";
import classes from "./TrackerSelector.module.css";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import Label from "./Label/Label";
import {
  RaterType,
  StopwatchType,
  CheckerType,
  Tracker,
  CounterType,
} from "../../Types";

const TrackerSelector: React.FC<{
  raters: RaterType[];
  stopwatches: StopwatchType[];
  checkers: CheckerType[];
  counters: CounterType[];
  selectedTrackers: Tracker[];
  handler: (trackerId: string) => void;
}> = React.memo(
  ({ checkers, raters, stopwatches, handler, selectedTrackers, counters }) => {
    const [expanded, setExpanded] = useState<string[]>([
      `stopwatches`,
      `raters`,
      `checkers`,
      `counters`,
    ]);

    const handleToggle = (event: any, nodeIds: string[]) => {
      setExpanded(nodeIds);
    };

    const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
      // console.log(nodeIds);
      handler(nodeIds as unknown as string);
    };

    return (
      <div className={classes.TrackerSelector}>
        <TreeView
          defaultCollapseIcon={
            <svg width="20" height="20" fill="currentColor">
              <use href={`${icons}#chevron-up`} />
            </svg>
          }
          defaultExpandIcon={
            <svg width="20" height="20" fill="currentColor">
              <use href={`${icons}#chevron-down`} />
            </svg>
          }
          expanded={expanded}
          selected={selectedTrackers.map((tracker) => tracker.id)}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
        >
          <TreeItem nodeId="raters" label="Raters">
            {raters.map((rater) => (
              <Label
                key={rater.id}
                color={rater.color}
                name={rater.name}
                id={rater.id}
                selected={selectedTrackers
                  .map((tracker) => tracker.id)
                  .includes(rater.id)}
                selectHandler={handler}
              />
            ))}
            {!raters.length ? <p>no raters yet...</p> : null}
          </TreeItem>
          <TreeItem nodeId="stopwatches" label="Stopwatches">
            {stopwatches.map((stopwatch) => (
              <Label
                key={stopwatch.id}
                color={stopwatch.color}
                name={stopwatch.name}
                id={stopwatch.id}
                selected={selectedTrackers
                  .map((tracker) => tracker.id)
                  .includes(stopwatch.id)}
                selectHandler={handler}
              />
            ))}
            {!stopwatches.length ? <p>no stopwatches yet...</p> : null}
          </TreeItem>
          <TreeItem nodeId="checkers" label="Checkers">
            {checkers.map((checker) => (
              <Label
                key={checker.id}
                color={checker.color}
                name={checker.name}
                id={checker.id}
                selected={selectedTrackers
                  .map((tracker) => tracker.id)
                  .includes(checker.id)}
                selectHandler={handler}
              />
            ))}
            {!checkers.length ? <p>no checkers yet...</p> : null}
          </TreeItem>
          <TreeItem nodeId="counters" label="Counters">
            {counters.map((counter) => (
              <Label
                key={counter.id}
                color={counter.color}
                name={counter.name}
                id={counter.id}
                selected={selectedTrackers
                  .map((tracker) => tracker.id)
                  .includes(counter.id)}
                selectHandler={handler}
              />
            ))}
            {!counters.length ? <p>no counters yet...</p> : null}
          </TreeItem>
        </TreeView>
      </div>
    );
  }
);

export default TrackerSelector;
