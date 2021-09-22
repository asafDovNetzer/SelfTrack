// import React, { useState, useEffect, useContext } from "react";
// import ColorScheme from "color-scheme";
// import classes from "./TrackerForm.module.css";
// import { CirclePicker } from "react-color";
// import { Formik, Form, Field } from "formik";
// import DbContext from "../../../Context/DbContext";
// import {
//   deleteTracker,
//   createNewTracker,
//   updateTracker,
// } from "../../../HalperFunctions/CreateTrackers";
import * as types from "../../../Types";

const TrackerForm: React.FC<{
  selected: types.StopwatchType | null;
  closeForm: () => void;
  type: string;
}> = ({ selected, closeForm, type }) => {
  // const [color, setColor] = useState<string>(selected ? selected.color : ``);
  // const [colors, setColors] = useState<string[]>([]);

  // const userDb = useContext(DbContext);

  // useEffect(() => {
  //   const scheme = new ColorScheme();
  //   scheme.from_hue(0).scheme(`tetrade`).variation(`pastel`);

  //   const colors = scheme.colors().map((color: string) => `#${color}`);
  //   setColors(colors);

  //   if (!selected) {
  //     setColor(colors[0]);
  //   }
  // }, [selected]);

  // const saveForm = (values: { name: string; description: string }) => {
  //   console.log(values);

  //   if (!selected) {
  //     createNewTracker(
  //       userDb,
  //       `stopwatch`,
  //       values.name,
  //       values.description,
  //       color
  //     );
  //   }

  //   if (selected) {
  //     updateTracker(
  //       userDb,
  //       selected.id,
  //       values.name,
  //       values.description,
  //       color
  //     );
  //   }

  //   closeForm();
  // };

  // // const deleteTracker = () => {};

  // const handleChangeComplete = (color: any) => {
  //   setColor(color.hex);
  // };

  // const initialValues: any = {
  //   name: selected ? selected.name : ``,
  //   description: selected ? selected.description : ``,
  // };

  return (
    <div>
      {/* <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          saveForm(values);
        }}
        validate={(values) => {
          const errors: any = {};

          if (!values.name) {
            errors.name = `Required`;
          } else if (values.name.length > 15) {
            errors.name = "Must be 15 characters or less";
          } else if (values.name.length < 4) {
            errors.name = "Must be 4 characters or more";
          }

          return errors;
        }}
      >
        {({ errors }) => (
          <Form className={classes.Form}>
            <div className={classes.Field}>
              <label>Name:</label>
              <Field
                type="text"
                name="name"
                placeholder="e.g Watching T.V..."
              />
            </div>
            <p style={{ color: `red` }}>{errors.name}</p>
            <div className={classes.Field}>
              <label>Description:</label>
              <Field
                type="text"
                as="textarea"
                name="description"
                placeholder="e.g The amount of time i spend on watching T.V..."
              />
            </div>
            <CirclePicker
              onChangeComplete={handleChangeComplete}
              color={color}
              colors={colors}
            />
            <button type="submit" disabled={!!errors.name}>
              Save
            </button>
            {selected ? (
              <button
                type="button"
                onClick={() => {
                  deleteTracker(userDb, selected!);
                  closeForm();
                }}
                style={{
                  backgroundColor: `red`,
                }}
              >
                Delete
              </button>
            ) : null}
          </Form>
        )}
      </Formik> */}
    </div>
  );
};

export default TrackerForm;
