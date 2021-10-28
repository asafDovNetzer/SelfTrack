import React from "react";
import classes from "./Parts.module.css";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import FakeTracker from "../TrackersForm/FakeTracker/FakeTracker";

const Left = () => {
  return (
    <div
      className={classes.Left}
      // style={{ animationDelay: `5s`, marginLeft: `50px` }}
    >
      <div className={classes.Par}>
        <h1>
          TRACK{" "}
          <svg
            className={classes.Stopwatch}
            width="60"
            height="60"
            fill="currentColor"
          >
            <use href={`${icons}#stopwatch`} />
          </svg>
        </h1>
        <p>{`Using intuitive widgets to monitor your activity\n and well-being.`}</p>
      </div>
      <div className={classes.Trackers}>
        <div className={[classes.Tracker1, classes.Tracker].join(` `)}>
          <FakeTracker
            type="rater"
            name="Rater"
            options={null}
            // color="rgb(207, 181, 141)"
            color="rgb(12, 223, 238)"
            size={1}
          />
        </div>
        <div className={[classes.Tracker2, classes.Tracker].join(` `)}>
          <FakeTracker
            type="checker"
            name="Checker"
            options={null}
            // color="rgb(207, 181, 141)"
            color="rgb(12, 136, 238)"
            size={1}
          />
        </div>
        <div className={[classes.Tracker3, classes.Tracker].join(` `)}>
          <FakeTracker
            type="stopwatch"
            name="Stopwatch"
            options={{
              isRunning: true,
            }}
            // color="rgb(207, 181, 141)"
            color="rgb(152, 29, 135)"
            size={1}
          />
        </div>
        <div className={[classes.Tracker4, classes.Tracker].join(` `)}>
          <FakeTracker
            type="counter"
            name="Counter"
            options={null}
            // color="rgb(207, 181, 141)"
            color="rgb(236, 54, 141)"
            size={1}
          />
        </div>
      </div>
      {/* <div className={classes.TrackerSlide}>
        <div className={classes.Tracker} style={{ animationDelay: `0s` }}>
          <FakeTracker
            type="rater"
            name="Rater"
            options={null}
            // color="rgb(207, 181, 141)"
            color="rgb(12, 223, 238)"
            size={1}
          />
        </div>
        <div className={classes.Tracker} style={{ animationDelay: `4s` }}>
          <FakeTracker
            type="checker"
            name="Checker"
            options={null}
            // color="rgb(207, 181, 141)"
            color="rgb(12, 136, 238)"
            size={1}
          />
        </div>
        <div className={classes.Tracker} style={{ animationDelay: `8s` }}>
          <FakeTracker
            type="stopwatch"
            name="Stopwatch"
            options={{
              isRunning: true,
            }}
            // color="rgb(207, 181, 141)"
            color="rgb(152, 29, 135)"
            size={1}
          />
        </div>
        <div className={classes.Tracker} style={{ animationDelay: `12s` }}>
          <FakeTracker
            type="counter"
            name="Counter"
            options={null}
            // color="rgb(207, 181, 141)"
            color="rgb(236, 54, 141)"
            size={1}
          />
        </div>
      </div> */}
    </div>
  );
};

export default Left;
