import React, { useState, useContext, useEffect } from "react";
import * as actions from "../../Store/Actions/ActionsIndex";
import { connect, ConnectedProps } from "react-redux";
import { DbRef, State } from "../../Types";
import * as yup from "yup";
import { useFormik } from "formik";
import { Tracker } from "../../Types";
// import Divider from "../UI/Divider";
import classes from "./TrackersForm.module.css";
import { CirclePicker } from "react-color";
// import { Formik, Form, Field } from "formik";
// import Select from "@material-ui/core/Select";
import DbContext from "../../Context/DbContext";
import {
  // createNewTracker,
  updateTracker,
} from "../../HalperFunctions/CreateTrackers";
// import FakeTracker from "./FakeTracker/FakeTracker";
import { TextField } from "@material-ui/core";
import Spinner from "../Spinner/Spinner";

const TrackersForm = React.memo((props: Props) => {
  const [color, setColor] = useState<string>(`#000000`);

  const userDb = useContext(DbContext);

  useEffect(() => {
    if (props.selected) {
      setColor(props.selected.color);
    }
  }, [props.selected]);

  const formik = useFormik({
    initialValues: {
      name: props.selected ? props.selected.name : "",
      description: props.selected ? props.selected.description : "",
      size: props.selected?.size ? props.selected.size.toString() : `1`,
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .max(20, "Name is too long")
        .required("Must have a name"),
      description: yup.string(),
      size: yup.number().positive("Must be a possitive number").required(""),
    }),
    onSubmit: (values) => {
      console.log(values);

      props.attemptSubmition();

      if (!props.selected) {
        console.log(`creating`);
        props.createNewTracker(
          userDb,
          props.type,
          values.name,
          values.description,
          color,
          values.size
        );
      }

      if (props.selected) {
        updateTracker(
          userDb,
          props.selected.id,
          values.name,
          values.description,
          color,
          values.size
        );
      }

      closeForm();
    },
  });

  const closeForm = () => {
    setColor(`#000000`);
    props.onFinish();
  };

  const handleChangeComplete = (color: any) => {
    setColor(color.hex);
  };

  const formElement: JSX.Element = (
    <form className={classes.Form} onSubmit={formik.handleSubmit}>
      {/* style={{ display: page === 1 ? `unset` : `none` }} */}
      <div className={classes.Field}>
        <TextField
          inputProps={{
            autoComplete: "new-password",
            form: {
              autoComplete: "off",
            },
          }}
          id="name"
          name="name"
          label={
            <p>
              Name <small> (required)</small>
            </p>
          }
          variant="outlined"
          placeholder="e.g Watching T.V..."
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </div>
      <div className={classes.Field}>
        <TextField
          inputProps={{
            autoComplete: "new-password",
            form: {
              autoComplete: "off",
            },
          }}
          id="description"
          name="description"
          multiline
          label={
            <p>
              Description<small> (optional)</small>
            </p>
          }
          variant="outlined"
          maxRows={4}
          placeholder="e.g The amount of time i spend on watching T.V..."
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
      </div>
      <div
        style={{ display: props.type === `counter` ? `unset` : `none` }}
        className={classes.Field}
      >
        <TextField
          value={formik.values.size}
          onChange={formik.handleChange}
          id="size"
          name="size"
          type="number"
          label={
            <p>
              Step size<small> (optional)</small>
            </p>
          }
          variant="outlined"
          style={{ width: `100px` }}
          error={formik.touched.size && Boolean(formik.errors.size)}
          helperText={formik.touched.size && formik.errors.size}
        />
      </div>
      <div className={classes.ColorField}>
        <label>
          Color <small> (required)</small>
        </label>
        <CirclePicker onChangeComplete={handleChangeComplete} color={color} />
      </div>
      <div className={classes.Field}>
        <button
          disabled={color === `#000000`}
          type="submit"
          className={classes.FloatingButton}
        >
          {props.selected ? `Save` : `Create new Tracker`}
        </button>
      </div>
    </form>
  );

  let display = formElement;

  if (props.submitionState === `attempt`) {
    display = <Spinner />;
  }

  // if (props.submitionState === true) {
  //   display = (
  //     <div>
  //       <h2>Successfully created</h2>
  //       {/* <button onClick={props.onFinish}>Make another one</button> */}
  //     </div>
  //   );
  // }

  return display;
  //  (
  //   <div className={classes.Modal}>
  //     {/* <FakeTracker type={type} color={color} name={name} size={+size!} /> */}
  //     {formElement}

  //     {/* <Button onClick={closeForm} variant="secondary">
  //       Close
  //     </Button> */}
  //     {/* <Pagination count={pages} page={page} onChange={changePage} /> */}
  //     {/* <Button
  //       disabled={!!errors.name || color === `#000000`}
  //       variant="primary"
  //       onClick={saveForm}
  //     >
  //       Save
  //     </Button> */}
  //   </div>
  // );
});

const mapStateToProps = (state: State) => ({
  submitionState: state.submitionState,
});

const mapDispatchToProps = {
  attemptSubmition: () => actions.setSubmitionState(`attempt`),
  createNewTracker: (
    userDb: DbRef,
    type: string,
    name: string,
    description: string,
    color: string,
    size: string
  ) => actions.createNewTracker(userDb, type, name, description, color, size),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  selected: Tracker | null;
  type: string;
  onFinish: () => void;
};

export default connector(TrackersForm);
