import React, { useContext, useEffect, useState } from "react";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import * as types from "../../../Types";
import classes from "./Stopwatch.module.css";
import trackerClasses from "../Tracker.module.css";
import Clock from "../../Clock/Clock";
import DbContext from "../../../Context/DbContext";
import DateContext from "../../../Context/DateContext";
import StopwatchEntries from "../../Entries/StopwatchEntries/StopwatchEntries";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { connect, ConnectedProps } from "react-redux";
import * as actions from "../../../Store/Actions/ActionsIndex";

const Stopwatch = (props: Props) => {
  // const [expanded, setExpanded] = useState<boolean>(false);
  const [accum, setAccum] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lastEntry, setLastEntry] = useState<number>(Date.now());

  const todaysDate = useContext(DateContext);
  const userDb = useContext(DbContext);

  const [entries, setEntries] = useState<types.StopwatchEntry[]>([]);

  useEffect(() => {
    setEntries([]);
    setIsRunning(false);
    setAccum(0);

    const entriesRef = collection(userDb!, "entries");

    const q = query(
      entriesRef,
      where("trackerId", "==", props.stopwatch.id),
      where("year", "==", props.date.getFullYear()),
      where("month", "==", props.date.getMonth()),
      where("day", "==", props.date.getDate()),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      const newEntries: types.StopwatchEntry[] = [];

      snapshot.forEach((doc: any) => {
        const data = doc.data();
        const entry = {
          timestamp: data.timestamp,
          trackerId: data.trackerId,
          entryId: doc.id,
          year: data.year,
          month: data.month,
          day: data.day,
          type: `stopwatchEntry`,
        };
        newEntries.push(entry);
      });

      setEntries(newEntries);
    });

    return unsubscribe;
  }, [userDb, props.date, props.stopwatch.id, props.user]);

  useEffect(() => {
    if (!entries.length) {
      setIsRunning(false);
      setAccum(0);
      return;
    }

    const even: boolean = !(entries.length % 2);
    setIsRunning(!even);

    const entriesTimestamps: number[] = entries.map((entry) => entry.timestamp);

    if (!even) {
      // console.log(`i shouldn't see this`);
      if (props.date.getTime() === todaysDate!.getTime()) {
        // console.log(`today`);
        const firstEntry = entriesTimestamps.pop();
        setLastEntry(firstEntry!);
      }

      if (props.date.getTime() !== todaysDate!.getTime()) {
        setIsRunning(false);
        entriesTimestamps.push(
          new Date(
            props.date.getFullYear(),
            props.date.getMonth(),
            props.date.getDate() + 1,
            0,
            0,
            -1
          ).getTime()
        );
      }
    }

    let accum: number = 0;

    entriesTimestamps.forEach((entry, index) => {
      if (!(index % 2)) {
        accum -= entry;
      } else {
        accum += entry;
      }
    });

    setAccum(accum);
  }, [entries, props.date, todaysDate]);

  const mainButtonHandler = () => {
    const timestamp = Date.now();

    userDb!
      .collection(`entries`)
      .add({
        timestamp: timestamp,
        trackerId: props.stopwatch.id,
        year: todaysDate!.getFullYear(),
        month: todaysDate!.getMonth(),
        day: todaysDate!.getDate(),
        type: `stopwatchEntry`,
      })
      .then(() => {})
      .catch((err: any) => console.log(err));
  };

  const select = (event: any) => {
    props.selector(props.stopwatch.id);
  };

  return (
    <div
      className={trackerClasses.Tracker}
      style={{
        borderColor: props.stopwatch.color,
      }}
    >
      <div className={classes.Content}>
        <button
          className={classes.MainButton}
          onClick={mainButtonHandler}
          disabled={props.date.getTime() !== todaysDate!.getTime()}
        >
          <svg width="50" height="50" fill="currentColor">
            <use href={`${icons}#${isRunning ? `pause` : `play`}-circle`} />
          </svg>
        </button>
        <h5 className={classes.Header}>{props.stopwatch.name}</h5>
        <Clock isRunning={isRunning} accum={accum} lastEntry={lastEntry} />
      </div>
      <div className={trackerClasses.Expand}>
        <svg onClick={select} width="30" height="30" fill="currentColor">
          <use href={`${icons}#chevron-expand`} />
        </svg>
      </div>
      <StopwatchEntries
        show={props.entriesToDisplay === props.stopwatch.id}
        entries={entries}
        stopwatch={props.stopwatch}
        date={props.date}
        closeHandler={() => props.displayEntries(``)}
      />
    </div>
  );
};

const mapStateToProps = (state: types.State) => ({
  user: state.user,
  entriesToDisplay: state.entriesToDisplay,
});

const mapDispatchToProps = {
  displayEntries: (id: string) => actions.displayEntries(id),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  stopwatch: types.StopwatchType;
  date: Date;
  selector: (id: string) => void;
};

export default connector(Stopwatch);
