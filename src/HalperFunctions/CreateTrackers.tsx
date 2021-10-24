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
