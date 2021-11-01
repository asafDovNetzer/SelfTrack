import React from "react";
import classes from "./FirstView.module.css";
import TrackView from "./TrackView";
import InsightView from "./InsightView";

const FirstView = () => {
  return (
    <div className={[classes.Main, `how-view`].join(` `)}>
      <TrackView />
      <InsightView />
    </div>
  );
};

export default FirstView;
