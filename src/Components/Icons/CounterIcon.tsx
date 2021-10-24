import React from "react";
import classes from "./Icons.module.css";

const CounterIcon = (props: Props) => {
  const plus = () => {
    props.plus(+props.count + props.size);
  };

  const minus = () => {
    const newValue = props.count - props.size;
    if (newValue < 0) return;

    props.minus(newValue);
  };

  const checkDisabled = () => {
    const newValue = props.count - props.size;

    return newValue < 0;
  };

  return (
    <div className={`${classes.Counter} main-button`}>
      <button className={classes.Left} onClick={plus}>
        +
      </button>
      <div className={classes.Count}>
        <h3>{props.count}</h3>
      </div>
      <button
        disabled={checkDisabled()}
        className={classes.Right}
        onClick={minus}
      >
        -
      </button>
    </div>
  );
};

type Props = {
  size: number;
  count: number;
  plus: (count: number) => void;
  minus: (count: number) => void;
};

export default CounterIcon;
