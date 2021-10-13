import type { AppDispatch } from "../../index";
import * as types from "../../Types";
import {
  Stopwatch,
  Checker,
  Counter,
  Rater,
  trackerConverter,
} from "../../HalperFunctions/CreateTrackers";
import { setSubmitionState } from "./FormActions";

export const createNewTracker = (
  userDb: types.DbRef,
  type: string,
  name: string,
  description: string,
  color: string,
  size: string
) => {
  console.log(`creating 2`);
  return (dispatch: AppDispatch) => {
    let tracker: types.Tracker;

    console.log(`creating 3`);
    switch (type) {
      case `stopwatch`:
        tracker = new Stopwatch(name, description, color);
        break;
      case `checker`:
        tracker = new Checker(name, description, color);
        break;
      case `counter`:
        tracker = new Counter(name, description, color, +size);
        break;
      default:
        tracker = new Rater(name, description, color);
        break;
    }

    userDb!
      .collection(`trackers`)
      .doc(tracker!.id)
      .withConverter(trackerConverter)
      .set(tracker!)
      .then(() => {
        dispatch(setSubmitionState(true));
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(setSubmitionState(false));
      });
  };
};
