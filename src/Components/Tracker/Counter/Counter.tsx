import React, { useContext, useState, useEffect } from "react";
import * as types from "../../../Types";
import trackerClasses from "../Tracker.module.css";
import classes from "./Counter.module.css";
import DbContext from "../../../Context/DbContext";
import { connect, ConnectedProps } from "react-redux";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import CounterIcon from "../../Icons/CounterIcon";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";

const Counter = (props: Props) => {
  const [count, setCount] = useState<number>(0);
  const userDb = useContext(DbContext);
  const [entry, setEntry] = useState<types.CounterEntry | null>(null);

  useEffect(() => {
    setCount(0);
    setEntry(null);

    const entriesRef = collection(userDb!, "entries");

    const q = query(
      entriesRef,
      where("trackerId", "==", props.counter.id),
      where("year", "==", props.date.getFullYear()),
      where("month", "==", props.date.getMonth()),
      where("day", "==", props.date.getDate()),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      snapshot.forEach((doc: any) => {
        const data = doc.data();
        const entry = {
          count: data.count,
          timestamp: data.timestamp,
          trackerId: data.trackerId,
          entryId: doc.id,
          year: data.year,
          month: data.month,
          day: data.day,
          type: `counterEntry`,
        };
        setCount(data.count);
        setEntry(entry);
      });
    });

    return unsubscribe;
  }, [userDb, props.date, props.counter.id, props.user]);

  const changeCount = (newCount: number) => {
    const timestamp = Date.now();

    if (!entry) {
      userDb!
        .collection(`entries`)
        .add({
          count: newCount,
          timestamp: timestamp,
          trackerId: props.counter.id,
          year: props.date.getFullYear(),
          month: props.date.getMonth(),
          day: props.date.getDate(),
          type: `counterEntry`,
        })
        .then(() => {})
        .catch((err: any) => console.log(err));
    }

    if (entry) {
      userDb!
        .collection(`entries`)
        .doc(entry.entryId)
        .update({ count: newCount })
        .then(() => {})
        .catch((err: any) => console.log(err));
    }
  };

  const select = (event: any) => {
    // if (!!event.target.closest(`.main-button`)) return;
    props.selector(props.counter.id);
  };

  return (
    <div
      // onClick={select}
      className={trackerClasses.Tracker}
      style={{
        borderColor: props.counter.color,
        // boxShadow: props.isSelected
        //   ? `1px 1px 10px 1px ${props.counter.color}`
        //   : `none`,
      }}
    >
      <div className={classes.Content}>
        <h5 className={classes.Header}>{props.counter.name}</h5>
        <CounterIcon
          count={count}
          size={props.counter.size}
          plus={changeCount}
          minus={changeCount}
        />
      </div>
      <div className={trackerClasses.Expand}>
        <svg onClick={select} width="30" height="30" fill="currentColor">
          <use href={`${icons}#chevron-expand`} />
        </svg>
      </div>
    </div>
  );
};

const mapStateToProps = (state: types.State) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  counter: types.CounterType;
  date: Date;
  // isSelected: boolean;
  selector: (id: string) => void;
};

export default connector(Counter);
