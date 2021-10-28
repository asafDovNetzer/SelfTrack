import React from "react";
import classes from "./FirstView.module.css";
import Left from "./Left";
import Right from "./Right";

const FirstView = (props: Props) => {
  return (
    <div className={classes.Main}>
      <div className={classes.Left}>
        <Left />
      </div>
      <div className={classes.RightBackground}>
        <div className={classes.Right}>
          <Right />
        </div>
      </div>
      <button onClick={props.onClick} className={classes.Button}>
        START
      </button>
    </div>
  );
};

type Props = {
  onClick: () => void;
};

export default FirstView;
