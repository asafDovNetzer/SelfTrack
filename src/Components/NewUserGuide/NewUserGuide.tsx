import React from "react";
import classes from "./NewUserGuide.module.css";
import * as actions from "../../Store/Actions/ActionsIndex";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../../Types";
import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import Divider from "../UI/Divider";
import FakeTracker from "../TrackersForm/FakeTracker/FakeTracker";
import TrackersForm from "../TrackersForm/TrackersForm";

const trackersArray = [`stopwatch`, `counter`, `checker`, `rater`];

const NewUserGuide = (props: Props) => {
  const [step, setStep] = React.useState<number>(1);

  const [line, setLine] = React.useState<string | null>(null);

  const [answer1, setAnswer1] = React.useState<null | string>(null);
  const [answer2, setAnswer2] = React.useState<null | string>(null);

  const [trackers, setTrackers] = React.useState<Map<string, string>>(
    new Map()
  );

  const [selected, setSelected] = React.useState<null | string>(null);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer1((event.target as HTMLInputElement).value);
  };
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer2((event.target as HTMLInputElement).value);
  };

  // const restartModal = () => {
  //   setStep(1);
  //   setLine(null);
  //   setAnswer1(null);
  //   setAnswer2(null);
  // };

  React.useEffect(() => {
    if (props.submitionState === true) {
      props.onClose();
    }
    const map: Map<string, string> = new Map();
    map.set(`stopwatch`, `Recommended`);
    map.set(`counter`, `Possible`);
    map.set(`rater`, `Possible`);
    map.set(`checker`, ``);

    setTrackers(map);
  }, [props]);

  const handleToggle = (event: any) => {
    if (event.target.closest(".obj")) {
      setLine(`obj`);
    }
    if (event.target.closest(".subj")) {
      setLine(`subj`);
    }
  };

  const handleSkip = () => {
    props.onClose();
  };

  const nextHandler = () => {
    const map: Map<string, string> = new Map();

    if (step === 4) {
      props.onFinish(selected!);
      return;
    }

    if (line === `subj`) {
      setStep(4);
      map.set(`stopwatch`, ``);
      map.set(`counter`, ``);
      map.set(`rater`, `Recommended`);
      map.set(`checker`, ``);

      // setTrackers(map);
      setSelected(`rater`);
    } else {
      if (answer1 && answer2) {
        if (answer2 === `yes`) {
          map.set(`stopwatch`, ``);
          map.set(`counter`, `Recommended`);
          map.set(`rater`, ``);
          map.set(`checker`, `Possible`);

          setSelected(`counter`);
        } else {
          map.set(`stopwatch`, `Possible`);
          map.set(`counter`, `Possible`);
          map.set(`rater`, ``);
          map.set(`checker`, `Recommended`);

          setSelected(`checker`);
        }
        setStep(step + 1);
      }
      if (answer1 && !answer2) {
        if (answer1 === `yes`) {
          map.set(`stopwatch`, `Recommended`);
          map.set(`counter`, ``);
          map.set(`rater`, ``);
          map.set(`checker`, `Possible`);

          setStep(4);
          setSelected(`stopwatch`);
        } else {
          setStep(3);
        }
      }
      if (step === 1) setStep(2);
    }
    setTrackers(map);
  };

  const backHandler = () => {
    if (line === `subj` && step === 4) {
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };

  const checkNext = () => {
    let disabled: boolean;

    switch (step) {
      case 1:
        disabled = !line;
        break;
      case 2:
        disabled = !answer1;
        break;
      case 3:
        disabled = !answer2;
        break;
      case 4:
        disabled = !selected;
        break;
      default:
        disabled = true;
        break;
    }

    return disabled!;
  };

  let explanetion: string;

  switch (line) {
    case "obj":
      explanetion = `Something that also an outsider looking at me could have measured`;
      break;
    case "subj":
      explanetion = `Somebody looking from the outside couldn't tell, only i can know`;
      break;
    default:
      explanetion = `Please select one`;
  }

  let body: any;

  switch (step) {
    case 1:
      body = (
        <div className={classes.Card}>
          <div className={classes.Toggle}>
            <h5>I want to track something</h5>
            <div onClick={handleToggle} className={classes.Togglegroup}>
              <button
                style={{
                  borderRadius: `10px 0px 0px 10px`,
                  backgroundColor:
                    line === `obj` ? `rgb(75, 198, 255)` : `white`,
                }}
                className="obj"
              >
                objective
              </button>
              <div></div>
              <button
                style={{
                  borderRadius: `0px 10px 10px 0px`,
                  backgroundColor:
                    line === `subj` ? `rgb(75, 198, 255)` : `white`,
                }}
                className="subj"
              >
                subjective
              </button>
            </div>
          </div>
          <p>{explanetion}</p>
        </div>
      );
      break;
    case 2:
      body = (
        <div className={classes.Card}>
          <FormControl component="fieldset">
            <h5>Does duration matter?</h5>
            <RadioGroup
              aria-label="gender"
              name="controlled-radio-buttons-group"
              value={answer1}
              onChange={handleChange1}
            >
              <div className={classes.RadioOptions}>
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="Definitely not."
                />
                <FormControlLabel
                  value="neutral"
                  control={<Radio />}
                  label="It's pretty much the same duration every time."
                />
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Duration is exactly what i want to track about it."
                />
              </div>
            </RadioGroup>
          </FormControl>
        </div>
      );
      break;
    case 3:
      body = (
        <div className={classes.Card}>
          <FormControl component="div">
            <h5>
              Does iteration matter? <small>(i.e how many times...)</small>
            </h5>
            <RadioGroup value={answer2} onChange={handleChange2}>
              <div className={classes.RadioOptions}>
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="Definitely not."
                />
                <FormControlLabel
                  value="neutral"
                  control={<Radio />}
                  label="It's the same iteration every time."
                />
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Iteration is exactly what i want to track about it."
                />
              </div>
            </RadioGroup>
          </FormControl>
        </div>
      );
      break;
    default:
      body = (
        <div className={classes.Card} style={{ boxShadow: `none` }}>
          <h5>Choose a tracker:</h5>
          <div className={classes.Options}>
            {trackersArray.map((type, index) => {
              let color: string;
              let order: number;
              let className;

              switch (trackers.get(type)) {
                case `Recommended`:
                  color = `rgb(3, 219, 57)`;
                  order = 1;
                  className = classes.Recommended;
                  break;
                case `Possible`:
                  color = `rgb(255, 145, 0)`;
                  order = 2;
                  className = classes.Possible;
                  break;
                default:
                  color = `rgb(143, 143, 143)`;
                  order = 4;
                  className = classes.NotRec;
                  break;
              }
              return (
                <div
                  key={index}
                  style={{
                    order: order,
                    boxShadow:
                      selected === type ? `1px 1px 20px 3px ${color}` : ``,
                  }}
                  onClick={() => setSelected(type)}
                  className={`${classes.Option}  ${className}`}
                >
                  <h5 style={{ color: color }}>{trackers.get(type)}</h5>
                  <FakeTracker
                    type={type}
                    color={color}
                    name={type.slice(0, 1).toUpperCase() + type.slice(1)}
                    size={0}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
  }

  return (
    <div className={classes.NewUser}>
      <div className={classes.Header}>
        <h1>Let's get you started!</h1>
        <p>In just a minute, we'll choose the right Tracker type for you</p>
      </div>
      <Divider />
      <div className={classes.Body}>{body}</div>
      <Divider />
      <div className={classes.ButtonPanel}>
        <div className={classes.LeftButtons}>
          <button
            onClick={backHandler}
            disabled={step === 1}
            className={classes.Back}
          >
            Back
          </button>
          <button onClick={handleSkip} className={classes.Skip}>
            Close
          </button>
        </div>
        <button
          disabled={checkNext()}
          onClick={nextHandler}
          className={classes.Next}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
  userName: state.userName,
  submitionState: state.submitionState,
});

const mapDispatchToProps = {
  noActiveUser: () => actions.logout(),
  onSignout: () => actions.setUserName(``),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  onClose: () => void;
  onFinish: (type: string) => void;
};

export default connector(NewUserGuide);
