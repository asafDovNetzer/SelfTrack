import React, { useContext, useEffect, useState } from "react";
import * as types from "../../../Types";
import classes from "./Checker.module.css";
import DbContext from "../../../Context/DbContext";
import Checkbox from "@material-ui/core/Checkbox";
import { connect, ConnectedProps } from "react-redux";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const Checker = (props: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const userDb = useContext(DbContext);
  const [entry, setEntry] = useState<types.CheckerEntry | null>(null);

  useEffect(() => {
    setEntry(null);
    setIsChecked(false);

    const entriesRef = collection(userDb!, "entries");

    const q = query(
      entriesRef,
      where("trackerId", "==", props.checker.id),
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
          trackerId: data.trackerId,
          entryId: doc.id,
          year: data.year,
          month: data.month,
          day: data.day,
          type: `checkerEntry`,
          checked: data.checked,
        };

        setEntry(entry);
        setIsChecked(data.checked);
      });
    });

    return unsubscribe;
  }, [userDb, props.date, props.checker.id, props.user]);

  const checkerHandler = () => {
    const timestamp = Date.now();

    const newIsChecked: boolean = isChecked ? false : true;

    if (!entry) {
      userDb!
        .collection(`entries`)
        .add({
          timestamp: timestamp,
          trackerId: props.checker.id,
          year: props.date.getFullYear(),
          month: props.date.getMonth(),
          day: props.date.getDate(),
          type: `checkerEntry`,
          checked: newIsChecked,
        })
        .then(() => {})
        .catch((err: any) => console.log(err));
    }

    if (entry) {
      userDb!
        .collection(`entries`)
        .doc(entry.entryId)
        .update({ checked: newIsChecked })
        .then(() => {})
        .catch((err: any) => console.log(err));
    }
  };

  const select = (event: any) => {
    if (!!event.target.closest(`.main-button`)) return;

    props.selector(props.checker.id);
  };

  return (
    <div
      onClick={select}
      className={classes.Checker}
      style={{
        borderRightColor: props.isSelected
          ? props.checker.color
          : `rgb(128, 128, 128)`,
        borderTopColor: props.isSelected
          ? props.checker.color
          : `rgb(128, 128, 128)`,
        borderBottomColor: props.isSelected
          ? props.checker.color
          : `rgb(128, 128, 128)`,
        borderLeftColor: props.checker.color,
      }}
    >
      <div className={classes.Content}>
        <h5>{props.checker.name}</h5>
        <Checkbox
          checked={isChecked}
          onChange={checkerHandler}
          className="main-button"
          color="primary"
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
  checker: types.CheckerType;
  date: Date;
  isSelected: boolean;
  selector: (id: string) => void;
};

export default connector(Checker);
