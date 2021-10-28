import React, { useState, useContext, useEffect } from "react";
import * as actions from "../../Store/Actions/ActionsIndex";
import { connect, ConnectedProps } from "react-redux";
import { DbRef, State } from "../../Types";
import * as yup from "yup";
import { useFormik } from "formik";
// import { Tracker } from "../../Types";
import classes from "./TrackersForm.module.css";
import { CirclePicker } from "react-color";
import DbContext from "../../Context/DbContext";
// import { updateTracker } from "../../HalperFunctions/CreateTrackers";
import Divider from "../UI/Divider";
import { TextField } from "@material-ui/core";
import Spinner from "../Spinner/Spinner";
import FakeTracker from "./FakeTracker/FakeTracker";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Auxiliary from "../../hoc/Auxiliary";
// import InputField from "../FormElements/InputField/InputField";

const TrackersForm = React.memo((props: Props) => {
  const [color, setColor] = useState<string>(`#00bcd4`);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [choosenType, setType] = React.useState<string>(``);
  const [finalStep, setFinalStep] = React.useState<number>(2);
  const types: string[] = [`Rater`, `Checker`, `Stopwatch`, `Counter`];

  const userDb = useContext(DbContext);

  const chooseColorBasedOnType = React.useCallback((type) => {
    let color: string;

    switch (type) {
      case `stopwatch`:
        color = `rgb(152, 29, 135)`;
        break;
      case `rater`:
        color = `rgb(12, 223, 238)`;
        break;
      case `checker`:
        color = `rgb(12, 136, 238)`;
        break;
      default:
        color = `rgb(236, 54, 141)`;
    }

    setColor(color);
  }, []);

  useEffect(() => {
    setType(props.type);
    setFinalStep(props.type === `counter` ? 3 : 2);
    chooseColorBasedOnType(props.type);
  }, [props, chooseColorBasedOnType]);

  const checkNext = () => {
    return activeStep === 0 && !!formik.errors.name;
  };

  const changeType = (event: any) => {
    setType(event.target.value);
    chooseColorBasedOnType(event.target.value);
  };

  const handleNext = () => {
    formik.setFieldTouched(`name`, true, true);
    if (!formik.values.name) return;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeComplete = (color: any) => {
    setColor(color.hex);
  };

  const formik = useFormik({
    initialValues: {
      name: ``,
      description: ``,
      size: 1,
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
      props.attemptSubmition();

      props.createNewTracker(
        userDb,
        props.type,
        values.name,
        values.description,
        color,
        values.size
      );

      closeForm();
    },
  });

  const steps = [
    {
      label: "Name",
      description: (
        <Auxiliary>
          <TextField
            id="name"
            name="name"
            label={
              <p>
                Name <small> (required)</small>
              </p>
            }
            variant="outlined"
            placeholder="e.g With friends..."
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <p>
            Choose a name that describes best what the tracker tracks, with the
            least amount of words.
          </p>
        </Auxiliary>
      ),
    },
    {
      label: "Description",
      description: (
        <Auxiliary>
          <TextField
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
            placeholder="e.g The amount of time i spend hanging out with friends..."
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <p>
            A description would remind you what this tracker is meant to track
            in case you forget.
          </p>
        </Auxiliary>
      ),
    },
    choosenType === `counter`
      ? {
          label: "Step size",
          description: (
            <Auxiliary>
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
              <p>
                The `step size` is the amount by which the count goes up or down
                per click.
              </p>
            </Auxiliary>
          ),
        }
      : null,
    {
      label: "Color",
      description: (
        <Auxiliary>
          <CirclePicker onChangeComplete={handleChangeComplete} color={color} />
          <p>
            The color will be displayed in all graphs and charts (It can be
            changed at any time).
          </p>
        </Auxiliary>
      ),
    },
  ];

  const closeForm = () => {
    setColor(`#00bcd4`);
    props.onFinish();
  };

  let display = (
    <div className={classes.Modal}>
      <div className={classes.Header}>
        <div className={classes.Selector}>
          <select onChange={changeType} value={choosenType}>
            {types.map((type) => (
              <option key={type} value={type.toLowerCase()}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <FakeTracker
          type={choosenType}
          color={color}
          options={null}
          name={
            formik.values.name
              ? formik.values.name
              : choosenType.slice(0, 1).toUpperCase() + choosenType.slice(1)
          }
          size={+formik.values.size}
        />
      </div>
      <Divider />
      <div className={classes.Body}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => {
            if (!step) return null;
            return (
              <Step
                className={
                  step.label === `Name` && !!formik.errors.name
                    ? classes.RedCircle
                    : classes.Circle
                }
                key={step.label}
              >
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <div className={classes.Step}>
                    <div className={classes.StepContent}>
                      {step.description}
                    </div>
                    <div className={classes.Buttons}>
                      <button
                        className={classes.Button}
                        onClick={
                          activeStep !== finalStep
                            ? handleNext
                            : formik.submitForm
                        }
                        disabled={checkNext()}
                      >
                        {index === steps.length - 1 ? "Create" : "Continue"}
                      </button>
                      <button
                        className={classes.BackButton}
                        disabled={index === 0}
                        onClick={handleBack}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </div>
    </div>
  );

  if (props.submitionState === `attempt`) {
    display = <Spinner />;
  }

  return display;
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
    size: number
  ) => actions.createNewTracker(userDb, type, name, description, color, size),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  type: string;
  onFinish: () => void;
};

export default connector(TrackersForm);
