import React from "react";
import classes from "./SecondView.module.css";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";

const SecondView = () => {
  return (
    <div className={[classes.Main, `second-view`].join(` `)}>
      <h1>Why Stableyez?</h1>
      <div className={classes.Boxes}>
        <div className={classes.Box}>
          <div className={classes.Icon}>
            <svg width="35" height="35" fill="currentColor">
              <use href={`${icons}#piggy-bank`} />
            </svg>
          </div>
          <h2>Money Saver</h2>
          <p>
            We employ a `Forever free` attitude, you'll never have to pay and
            your information will never be sold.
          </p>
        </div>
        <div className={classes.Box}>
          <div className={classes.Icon}>
            <svg
              width="30"
              height="30"
              fill="currentColor"
              style={{ transform: `rotateZ(6deg)` }}
            >
              <use href={`${icons}#dice-6`} />
            </svg>
            <svg
              width="30"
              height="30"
              fill="currentColor"
              style={{ transform: `rotateZ(-6deg)` }}
            >
              <use href={`${icons}#dice-6-fill`} />
            </svg>
          </div>
          <h2>Uniqe</h2>
          <p>
            Fucus on well-being instead of accomplishment. We believe a happy
            person achive's much more.
          </p>
        </div>
        <div className={classes.Box}>
          <div className={classes.Icon}>
            <svg width="30" height="30" fill="currentColor">
              <use href={`${icons}#hourglass-split`} />
            </svg>
          </div>
          <h2>Time Saver</h2>
          <p>
            Our team works around the clock to make sure you don't have to spend
            time on the app.
          </p>
          {/* Everything that can be automated - will be. */}
        </div>
      </div>
    </div>
  );
};

export default SecondView;
