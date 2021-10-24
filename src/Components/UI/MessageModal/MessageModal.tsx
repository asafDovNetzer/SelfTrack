import React from "react";
import classes from "./MessageModal.module.css";

const MessageModal = (props: Props) => {
  return (
    <div className={classes.Backdrop}>
      <div className={classes.Modal}>
        <div className={classes.Message}>
          <h2>{props.main}</h2>
          <p>{props.sub}</p>
        </div>
        <div className={classes.ButtonPanel}>
          <button className={classes.No} onClick={props.onNo}>
            Cancel
          </button>
          <button className={classes.Yes} onClick={props.onYes}>
            I'm sure
          </button>
        </div>
      </div>
    </div>
  );
};

type Props = {
  main: string;
  sub: string;
  onYes: () => void;
  onNo: () => void;
};

export default MessageModal;
