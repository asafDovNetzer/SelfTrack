import { nanoid } from "nanoid";
import * as types from "../Types";

export class Stopwatch {
  name: string;
  description: string;
  color: string;
  id: string;
  type: string;
  size: number;

  constructor(name: string, description: string, color: string, id?: string) {
    this.name = name;
    this.description = description;
    this.color = color;
    this.type = `stopwatch`;
    this.id = id ? id : nanoid();
    this.size = 0;
  }
}

export class Checker {
  name: string;
  description: string;
  color: string;
  id: string;
  type: string;
  size: number;

  constructor(name: string, description: string, color: string, id?: string) {
    this.name = name;
    this.description = description;
    this.color = color;
    this.id = id ? id : nanoid();
    this.type = `checker`;
    this.size = 0;
  }
}

export class Counter {
  name: string;
  description: string;
  color: string;
  id: string;
  type: string;
  size: number;

  constructor(
    name: string,
    description: string,
    color: string,
    size: number,
    id?: string
  ) {
    this.name = name;
    this.description = description;
    this.color = color;
    this.id = id ? id : nanoid();
    this.type = `counter`;
    this.size = size;
  }
}

export class Rater {
  name: string;
  description: string;
  color: string;
  id: string;
  type: string;
  size: number;

  constructor(name: string, description: string, color: string, id?: string) {
    this.name = name;
    this.description = description;
    this.color = color;
    this.id = id ? id : nanoid();
    this.type = `rater`;
    this.size = 0;
  }
}

export const trackerConverter = {
  toFirestore: (tracker: types.Tracker) => {
    return {
      name: tracker.name,
      description: tracker.description,
      color: tracker.color,
      id: tracker.id,
      type: tracker.type,
      size: tracker.size,
    };
  },
  fromFirestore: (snapshot: any) => {
    const data = snapshot.data();

    let tracker: types.Tracker;
    switch (data.type) {
      case `stopwatch`:
        tracker = new Stopwatch(
          data.name,
          data.description,
          data.color,
          data.id
        );
        break;
      case `rater`:
        tracker = new Rater(data.name, data.description, data.color, data.id);
        break;
      case `counter`:
        tracker = new Counter(
          data.name,
          data.description,
          data.color,
          data.size,
          data.id
        );
        break;
      default:
        tracker = new Checker(data.name, data.description, data.color, data.id);
        break;
    }
    return tracker!;
  },
};

export const createNewTracker = (
  userDb: types.DbRef,
  type: string,
  name: string,
  description: string,
  color: string,
  size: string
) => {
  let tracker: types.Tracker;

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
    .then(() => {})
    .catch((err: any) => {
      console.log(err);
    });
};

export const updateTracker = (
  userDb: types.DbRef,
  id: string,
  name: string,
  description: string,
  color: string,
  size: string
) => {
  console.log(id);
  userDb!
    .collection(`trackers`)
    .doc(id)
    .update({
      name: name,
      description: description,
      color: color,
      size: +size,
    })
    .then(() => {})
    .catch((err: any) => {
      console.log(err);
    });
};

export const deleteTracker = (userDb: types.DbRef, tracker: types.Tracker) => {
  userDb!
    .collection(`trackers`)
    .doc(tracker.id)
    .delete()
    .then(() => {
      userDb!
        .collection(`entries`)
        .where("trackerId", "==", tracker.id)
        .get()
        .then((res: any) => {
          const ids: string[] = [];

          res.forEach((entry: any) => {
            ids.push(entry.id);
          });
          console.log(ids);

          const deleteEntries = async function () {
            const promises: Promise<any>[] = [];

            ids.forEach((id) => {
              const promise = userDb!.collection(`entries`).doc(id).delete();

              promises.push(promise);
            });

            const responses = await Promise.all(promises);

            return responses;
          };

          deleteEntries()
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err: any) => {
          console.log(err);
        });
    })
    .catch((err: any) => {
      console.log(err);
    });
};
