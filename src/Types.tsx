import firebase from "firebase/compat/app";
import {
  Rater,
  Stopwatch,
  Checker,
  Counter,
} from "./HalperFunctions/CreateTrackers";

export type User = firebase.User | null;

export type RaterType = Rater;
export type StopwatchType = Stopwatch;
export type CheckerType = Checker;
export type CounterType = Counter;
export type Tracker = Stopwatch | Rater | Counter | Checker;

export type StopwatchEntry = {
  timestamp: number;
  trackerId: string;
  entryId: string;
  year: number;
  month: number;
  day: number;
  type: string;
};

export type CheckerEntry = {
  timestamp: number;
  trackerId: string;
  entryId: string;
  year: number;
  month: number;
  day: number;
  type: string;
  checked: boolean;
};

export type CounterEntry = {
  timestamp: number;
  trackerId: string;
  count: number;
  entryId: string;
  year: number;
  month: number;
  day: number;
  type: string;
};

export type RaterEntry = {
  timestamp: number;
  value: number;
  trackerId: string;
  entryId: string;
  year: number;
  month: number;
  day: number;
  type: string;
};

export type CompleteEntry = {
  stopwatchId: string;
  from: {
    timestamp: number;
    id: string;
    limit: number | null;
  };
  to: {
    timestamp: number;
    id: string;
    limit: number | null;
  };
  subTotal: number;
  total: number;
  index: number;
};

export type Entry = StopwatchEntry | CheckerEntry | RaterEntry;

export type Survey = {
  name: string;
  trackers: string[];
};

export type ArrangedEntries = CompleteEntry[];

export type DbRef = firebase.firestore.DocumentReference | null;

export type Batch = firebase.firestore.WriteBatch;

export type TimeRef = number;

export type State = {
  user: boolean;
};

export type LoginData = {
  email: string;
  password: string;
};

export type Datasets = {
  data: number[];
  backgroundColor: string;
}[];

export type inputEditError = {
  to: boolean;
  from: boolean;
};

export type BarChartDataset = {
  data: (number | null)[];
  backgroundColor: string;
  borderColor: string;
  type: string;
  stepped: string | boolean;
  order: number;
  yAxisID: string;
  tension: number;
};

export type CustomDate = {
  year: number;
  month: number;
  day: number;
};
