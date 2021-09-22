import React from "react";
import stopwatchClasses from "../../Tracker/Stopwatch/Stopwatch.module.css";
import raterClasses from "../../Tracker/Rater/Rater.module.css";
import counterClasses from "../../Tracker/Counter/Counter.module.css";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import Rating from "@material-ui/lab/Rating";
import { Checkbox, Button, ButtonGroup } from "@material-ui/core";
import { useState } from "react";

const FakeTracker: React.FC<{
  type: string;
  color: string;
  name: string;
  size: number;
}> = React.memo(({ type, color, name, size }) => {
  const [count, setCount] = useState<number>(0);
  let trackerElement: JSX.Element;

  console.log(type);

  switch (type) {
    case `stopwatch`:
      trackerElement = (
        <div className={stopwatchClasses.Content}>
          <button className={`${stopwatchClasses.MainButton}     main-button`}>
            <svg width="50" height="50" fill="currentColor">
              <use href={`${icons}#play-circle`} />
            </svg>
          </button>
          <h5 style={{ color: `grey` }}>{name}</h5>
          <h3
            style={{
              margin: `auto auto`,
              display: `block`,
              textAlign: `center`,
            }}
          >
            00:00:00
          </h3>
        </div>
      );
      break;
    case `checker`:
      trackerElement = (
        <div className={raterClasses.Content}>
          <h5 style={{ color: `grey ` }}>{name}</h5>
          <Checkbox
            checked={true}
            // onChange={checkerHandler}
            className="main-button"
            color="primary"
          />
        </div>
      );
      break;
    case `counter`:
      trackerElement = (
        <div className={counterClasses.Content}>
          <h5 style={{ color: `grey ` }}>{name}</h5>
          <ButtonGroup color="primary">
            <Button onClick={() => setCount(count + size)}>
              <svg width="20" height="20" fill="currentColor">
                <use href={`${icons}#plus`} />
              </svg>
            </Button>
            <Button color="primary">{count}</Button>
            <Button
              onClick={() => setCount(count - size < 0 ? 0 : count - size)}
              disabled={count === 0}
            >
              <svg width="20" height="20" fill="currentColor">
                <use href={`${icons}#dash`} />
              </svg>
            </Button>
          </ButtonGroup>
        </div>
      );
      break;
    default:
      trackerElement = (
        <div className={raterClasses.Content}>
          <h5 style={{ color: `grey ` }}>{name}</h5>
          <Rating
            className={raterClasses.Rating}
            name="stars"
            defaultValue={3}
            size="large"
          />
        </div>
      );
      break;
  }

  return (
    <div className={raterClasses.Rater} style={{ borderLeftColor: color }}>
      {trackerElement}
    </div>
  );
});

export default FakeTracker;
