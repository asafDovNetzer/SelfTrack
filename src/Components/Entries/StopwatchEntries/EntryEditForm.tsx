import React, { useState } from "react";
import classes from "./EntryEditForm.module.css";

import { Formik, Form, Field } from "formik";
import * as types from "../../../Types";
import {
  timeStringFromTimestamp,
  stringPlusDayToTimestamp,
} from "../../../HalperFunctions/General";
import { reletiveTimestampToString } from "../../../HalperFunctions/HandleStopwatches";

const EntryEditForm: React.FC<{
  entry: types.CompleteEntry | null;
  submitHandler: (newFrom: number, newTo: number) => void;
}> = React.memo(({ entry, submitHandler }) => {
  const [newFrom, setNewFrom] = useState<number>(entry!.from.timestamp);
  const [newTo, setNewTo] = useState<number>(entry!.to.timestamp);
  const [newSubTotal, setNewSubTotal] = useState<number>(newTo - newFrom);

  const fromInitValue = new Date(entry!.from.timestamp);
  const toInitValue = new Date(entry!.to.timestamp);

  const initialValues: any = {
    fromHour: fromInitValue.getHours(),
    fromMinute: fromInitValue.getMinutes(),
    fromSecond: fromInitValue.getSeconds(),
    toHour: toInitValue.getHours(),
    toMinute: toInitValue.getMinutes(),
    toSecond: toInitValue.getSeconds(),
  };

  // console.log(`rendering form`, entry);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {}}
        validate={(values) => {
          const errors: types.inputEditError = {
            to: false,
            from: false,
          };

          const fromInputTimestamp: number = stringPlusDayToTimestamp(
            values.fromHour,
            values.fromMinute,
            values.fromSecond,
            entry!.from.timestamp
          );

          const toInputTimestamp: number = stringPlusDayToTimestamp(
            values.toHour,
            values.toMinute,
            values.toSecond,
            entry!.to.timestamp
          );

          const isFromBiggerThanLimit: boolean =
            fromInputTimestamp >= entry!.from.limit!;

          const isFromSmallerThanTo: boolean =
            fromInputTimestamp <= toInputTimestamp;

          const isToSmallerThanLimit: boolean =
            toInputTimestamp <= entry!.to.limit!;

          const isToBiggerThanFrom: boolean =
            toInputTimestamp > fromInputTimestamp;

          if (!isFromBiggerThanLimit || !isFromSmallerThanTo) {
            errors.from = true;
          }

          if (!isToBiggerThanFrom || !isToSmallerThanLimit) {
            errors.to = true;
          }

          setNewFrom(fromInputTimestamp);
          setNewTo(toInputTimestamp);
          setNewSubTotal(toInputTimestamp - fromInputTimestamp);

          return errors;
        }}
      >
        {({ errors, values }) => (
          <Form className={classes.Form}>
            <div
              className={classes.Field}
              style={{ borderColor: errors.from ? `red` : `green` }}
            >
              <label>From:</label>
              <Field min={0} max={23} type="number" name="fromHour" />
              <p>:</p>
              <Field min={0} max={59} type="number" name="fromMinute" />
              <p>:</p>
              <Field min={0} max={59} type="number" name="fromSecond" />
            </div>
            <div className={classes.Limit}>
              {`Must be between ${timeStringFromTimestamp(
                entry!.from.limit!
              )} and ${timeStringFromTimestamp(
                stringPlusDayToTimestamp(
                  values.toHour,
                  values.toMinute,
                  values.toSecond,
                  entry!.to.timestamp
                )
              )}`}
            </div>
            <div
              className={classes.Field}
              style={{ borderColor: errors.to ? `red` : `green` }}
            >
              <label>To:</label>
              <Field min={0} max={23} type="number" name="toHour" />
              <p>:</p>
              <Field min={0} max={59} type="number" name="toMinute" />
              <p>:</p>
              <Field min={0} max={59} type="number" name="toSecond" />
            </div>
            <div className={classes.Limit}>
              {`Must be between ${timeStringFromTimestamp(
                stringPlusDayToTimestamp(
                  values.fromHour,
                  values.fromMinute,
                  values.fromSecond,
                  entry!.from.timestamp
                )
              )} and ${timeStringFromTimestamp(entry!.to.limit!)}`}
            </div>
            <div
              className={classes.Field}
              style={{
                width: `100%`,
                borderColor: errors.from ? `red` : `green`,
              }}
            >
              <p style={{ fontWeight: "normal", width: `100%` }}>
                Sub-Total: {reletiveTimestampToString(newSubTotal)}
              </p>
            </div>
            <button
              onClick={() => submitHandler(newFrom, newTo)}
              type="submit"
              disabled={!!errors.to || !!errors.from}
            >
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default EntryEditForm;
