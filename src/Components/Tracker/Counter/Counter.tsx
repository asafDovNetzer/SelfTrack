import React, { useContext, useState, useEffect } from "react";
import * as types from "../../../Types";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import classes from "./Counter.module.css";
import DbContext from "../../../Context/DbContext";
import { Button, ButtonGroup } from "@material-ui/core";
import { connect, ConnectedProps } from "react-redux";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
// import Aux from "../../../hoc/Auxiliary";

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

  const changeCount = (event: any) => {
    const isPlus = !!event.target.closest(`.plus`);

    let newCount: number;

    if (isPlus) {
      newCount = count + props.counter.size;
    } else {
      newCount =
        count - props.counter.size < 0 ? 0 : count - props.counter.size;
    }

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
    if (!!event.target.closest(`.main-button`)) return;
    props.selector(props.counter.id);
  };

  return (
    <div
      onClick={select}
      className={classes.Counter}
      style={{
        borderRightColor: props.isSelected
          ? props.counter.color
          : `rgb(128, 128, 128)`,
        borderTopColor: props.isSelected
          ? props.counter.color
          : `rgb(128, 128, 128)`,
        borderBottomColor: props.isSelected
          ? props.counter.color
          : `rgb(128, 128, 128)`,
        borderLeftColor: props.counter.color,
      }}
    >
      <div className={classes.Content}>
        <h5>{props.counter.name}</h5>
        <ButtonGroup className={classes.Buttons} color="primary">
          <Button className="main-button   plus" onClick={changeCount}>
            <svg width="20" height="20" fill="currentColor">
              <use href={`${icons}#plus`} />
            </svg>
          </Button>
          <Button className="main-button" color="primary">
            {count}
          </Button>
          <Button
            className="main-button   minus"
            onClick={changeCount}
            disabled={count === 0}
          >
            <svg width="20" height="20" fill="currentColor">
              <use href={`${icons}#dash`} />
            </svg>
          </Button>
        </ButtonGroup>
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
  isSelected: boolean;
  selector: (id: string) => void;
};

export default connector(Counter);
