import React, { useState, useContext, useEffect } from "react";
import Trackers from "./Containers/TrackerContainer/TrackerContainer";
import { collection, onSnapshot, QuerySnapshot } from "firebase/firestore";
import DataPanel from "./Containers/DataPanel/DataPanel";
import classes from "./Components/UI/General.module.css";
import Aux from "./hoc/Auxiliary";
import { State } from "./Types";
import { connect, ConnectedProps } from "react-redux";
import {
  Rater,
  Stopwatch,
  Checker,
  Counter,
  // trackerConverter,
} from "./HalperFunctions/CreateTrackers";
import DbContext from "./Context/DbContext";
import DateContext from "./Context/DateContext";
import * as types from "./Types";
// import Footer from "./Components/Footer/Footer"
// import LoginModal from "./Components/AuthModals/LoginModal/LoginModal";

const Control = (props: PropsFromRedux) => {
  const [stopwatches, setStopwatches] = useState<Stopwatch[]>([]);
  const [raters, setRaters] = useState<Rater[]>([]);
  const [checkers, setCheckers] = useState<Checker[]>([]);
  const [counters, setCounters] = useState<Counter[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const userDb = useContext(DbContext);
  const todaysDate = useContext(DateContext);

  // console.log(props);

  useEffect(() => {
    if (!userDb) return;

    const unsubscribe = onSnapshot(
      collection(userDb!, "trackers"),
      {},
      (snapshot: QuerySnapshot) => {
        const stopwatches: Stopwatch[] = [];
        const raters: Rater[] = [];
        const checkers: Checker[] = [];
        const counters: Counter[] = [];

        // console.log(snapshot.empty);
        if (snapshot.empty) {
          setIsEmpty(true);
        }

        snapshot.forEach((doc: any) => {
          const tracker: types.Tracker = doc.data();

          switch (tracker.type) {
            case `stopwatch`:
              stopwatches.push(tracker);
              break;
            case `rater`:
              raters.push(tracker);
              break;
            case `counter`:
              counters.push(tracker);
              break;
            default:
              checkers.push(tracker);
              break;
          }
        });
        setStopwatches(stopwatches);
        setCheckers(checkers);
        setRaters(raters);
        setCounters(counters);
      }
    );

    if (!props.user) unsubscribe();

    return unsubscribe;
  }, [userDb, props.user]);

  let dataPanel = null;
  let trackersEl = null;

  if (!!todaysDate && props.user) {
    dataPanel = (
      <DataPanel
        stopwatches={stopwatches}
        raters={raters}
        checkers={checkers}
        counters={counters}
      />
    );
    trackersEl = (
      <Trackers
        stopwatches={stopwatches}
        raters={raters}
        checkers={checkers}
        counters={counters}
        higherIsEmpty={isEmpty}
      />
    );
  }

  let view = trackersEl;

  if (props.selectedView === `data`) view = dataPanel;

  return (
    <Aux>
      <div className={classes.Background}>{view}</div>
    </Aux>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
  selectedView: state.selectedView,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Control);
