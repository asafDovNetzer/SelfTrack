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
import { setError } from "./ActionsIndex";

export const updateField = (
  userDb: types.DbRef,
  id: string,
  field: string,
  value: string | number
) => {
  return (dispatch: AppDispatch) => {
    userDb!
      .collection(`trackers`)
      .doc(id)
      .update({
        [field]: field === `size` ? +value : value,
      })
      .then(() => {
        const upperCase = field.slice(0, 1).toUpperCase() + field.slice(1);
        dispatch(setError(`${upperCase} successfully updated`, () => {}));
      })
      .catch((err: any) => {
        dispatch(
          setError(`Something went wrong... please try again`, () => {})
        );
      });
  };
};

export const createNewTracker = (
  userDb: types.DbRef,
  type: string,
  name: string,
  description: string,
  color: string,
  size: number
) => {
  // console.log(`creating 2`);
  return (dispatch: AppDispatch) => {
    let tracker: types.Tracker;

    // console.log(`creating 3`);
    switch (type) {
      case `stopwatch`:
        tracker = new Stopwatch(name, description, color);
        break;
      case `checker`:
        tracker = new Checker(name, description, color);
        break;
      case `counter`:
        tracker = new Counter(name, description, color, size);
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

export const deleteTracker = (userDb: types.DbRef, id: string) => {
  return (dispatch: AppDispatch) => {
    userDb!
      .collection(`trackers`)
      .doc(id)
      .delete()
      .then(() => {
        // console.log(`deleted tracker`);
        // dispatch(setSubmitionState(true));
      })
      .catch((err: any) => {
        // dispatch(setSubmitionState(false));
      });
  };
};

const deleteEntriesAsync = async function (userDb: types.DbRef, ids: string[]) {
  // console.log(`this is called`);
  const promises: Promise<any>[] = [];

  ids.forEach((id) => {
    const promise = userDb!.collection(`entries`).doc(id).delete();

    promises.push(promise);
  });

  const responses = await Promise.all(promises);

  return responses;
};

export const deleteEntries = (userDb: types.DbRef, id: string) => {
  return (dispatch: AppDispatch) => {
    // console.log(`deleting entries`);
    userDb!
      .collection(`entries`)
      .where("trackerId", "==", id)
      .get()
      .then((res: any) => {
        const ids: string[] = [];

        res.forEach((entry: any) => {
          ids.push(entry.id);
        });
        // console.log(ids);

        deleteEntriesAsync(userDb!, ids)
          .then(() => {
            // console.log(`one`);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
};
