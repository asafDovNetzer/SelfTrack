import React, { useContext, useState, useEffect } from "react";
import * as types from "../../../Types";
import Rating from "@material-ui/lab/Rating";
import classes from "./Rater.module.css";
import trackerClasses from "../Tracker.module.css";
import DbContext from "../../../Context/DbContext";
import { connect, ConnectedProps } from "react-redux";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const Rater = (props: Props) => {
  const [value, setValue] = useState<number | null>(0);
  const userDb = useContext(DbContext);
  const [entry, setEntry] = useState<types.RaterEntry | null>(null);

  useEffect(() => {
    setEntry(null);
    setValue(0);

    const entriesRef = collection(userDb!, "entries");

    const q = query(
      entriesRef,
      where("trackerId", "==", props.rater.id),
      where("year", "==", props.date.getFullYear()),
      where("month", "==", props.date.getMonth()),
      where("day", "==", props.date.getDate()),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      snapshot.forEach((doc: any) => {
        const data = doc.data();
        const entry = {
          timestamp: data.timestamp,
          value: data.value,
          trackerId: data.trackerId,
          entryId: doc.id,
          year: data.year,
          month: data.month,
          day: data.day,
          type: `raterEntry`,
        };
        setEntry(entry);
        setValue(entry.value);
      });
    });

    return unsubscribe;
  }, [userDb, props.date, props.rater.id, props.user]);

  const rateHandler = (event: React.ChangeEvent<{}>, value: number | null) => {
    const timestamp = Date.now();

    if (!entry) {
      userDb!
        .collection(`entries`)
        .add({
          value: value,
          timestamp: timestamp,
          trackerId: props.rater.id,
          year: props.date.getFullYear(),
          month: props.date.getMonth(),
          day: props.date.getDate(),
          type: `raterEntry`,
        })
        .then(() => {})
        .catch((err: any) => console.log(err));
    }

    if (entry) {
      userDb!
        .collection(`entries`)
        .doc(entry.entryId)
        .update({ value: value })
        .then(() => {})
        .catch((err: any) => console.log(err));
    }
  };

  const select = (event: any) => {
    if (!!event.target.closest(`.main-button`)) return;
    props.selector(props.rater.id);
  };

  return (
    <div
      onClick={select}
      style={{
        borderColor: props.rater.color,
        boxShadow: props.isSelected
          ? `1px 1px 10px 1px ${props.rater.color}`
          : `none`,
      }}
      className={trackerClasses.Tracker}
    >
      <div className={classes.Content}>
        <h5 className={classes.Header}>{props.rater.name}</h5>
        <Rating
          className={classes.Rating}
          name={props.rater.id}
          value={value}
          onChange={rateHandler}
          size="large"
          precision={0.5}
        />
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
  rater: types.RaterType;
  date: Date;
  isSelected: boolean;
  selector: (id: string) => void;
};

export default connector(Rater);
