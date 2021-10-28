import React from "react";
import stopwatchClasses from "../../Tracker/Stopwatch/Stopwatch.module.css";
import raterClasses from "../../Tracker/Rater/Rater.module.css";
import counterClasses from "../../Tracker/Counter/Counter.module.css";
import checkerClasses from "../../Tracker/Checker/Checker.module.css";
import trackerClasses from "../../Tracker/Tracker.module.css";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import Rating from "@material-ui/lab/Rating";
// import { Checkbox } from "@material-ui/core";
import CounterIcon from "../../Icons/CounterIcon";
import Clock from "../../Clock/Clock";

const FakeTracker: React.FC<{
  type: string;
  color: string;
  name: string;
  size: number;
  options: any;
}> = React.memo(({ type, color, name, size, options }) => {
  const [count, setCount] = React.useState<number>(0);
  const [check, setCheck] = React.useState<boolean>(true);
  const [accum, setAccum] = React.useState<number>(0);
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [lastEntry, setLastEntry] = React.useState<number>(Date.now());

  React.useEffect(() => {
    if (!options) return;

    if (options.isRunning) setIsRunning(true);
  }, [options]);

  const checkerHandler = () => {
    const newCheck = !check;
    setCheck(newCheck);
  };

  const handleStopwatch = () => {
    const wasRunning = isRunning;
    setIsRunning(!wasRunning);
    if (!wasRunning) {
      setLastEntry(Date.now());
    } else {
      const newAccum = accum + Date.now() - lastEntry;
      setAccum(newAccum);
    }
  };

  let trackerElement: JSX.Element;

  // console.log(type);

  switch (type) {
    case `stopwatch`:
      trackerElement = (
        <div className={stopwatchClasses.Content}>
          <button
            className={`${stopwatchClasses.MainButton}     main-button`}
            onClick={handleStopwatch}
          >
            <svg width="50" height="50" fill="currentColor">
              <use href={`${icons}#${isRunning ? `pause` : `play`}-circle`} />
            </svg>
          </button>
          <h5 className={stopwatchClasses.Header}>{name}</h5>
          <Clock accum={accum} isRunning={isRunning} lastEntry={lastEntry} />
        </div>
      );
      break;
    case `checker`:
      trackerElement = (
        <div className={checkerClasses.Content}>
          <h5 className={checkerClasses.Header}>{name}</h5>
          <div className={checkerClasses.CheckBox}>
            <svg
              onClick={checkerHandler}
              width="22"
              height="22"
              fill="currentColor"
            >
              <use href={`${icons}#${check ? `check-` : ``}square`} />
            </svg>
          </div>
        </div>
      );
      break;
    case `counter`:
      trackerElement = (
        <div className={counterClasses.Content}>
          <h5 className={counterClasses.Header}>{name}</h5>
          <CounterIcon
            count={count}
            size={size}
            plus={(newCount: number) => setCount(newCount)}
            minus={(newCount: number) => setCount(newCount)}
          />
        </div>
      );
      break;
    default:
      trackerElement = (
        <div className={raterClasses.Content}>
          <h5 className={raterClasses.Header}>{name}</h5>
          <Rating
            className={raterClasses.Rating}
            name="stars"
            defaultValue={4}
            size="large"
          />
        </div>
      );
      break;
  }

  return (
    <div className={trackerClasses.Tracker} style={{ borderColor: color }}>
      {trackerElement}
      <div className={trackerClasses.Expand}>
        <svg width="30" height="30" fill="currentColor">
          <use href={`${icons}#chevron-expand`} />
        </svg>
      </div>
    </div>
  );
});

export default FakeTracker;
