import React from "react";
import classes from "./Label.module.css";

const Label: React.FC<{
  color: string;
  name: string;
  id: string;
  selected: boolean;
  selectHandler: (stopwatchId: string) => void;
}> = React.memo(({ color, name, selectHandler, id, selected }) => {
  return (
    <button
      onClick={() => selectHandler(id)}
      className={classes.Label}
      // style={{ transform: selected ? `translateX(20px)` : `none` }}
    >
      <div
        // className="select"
        style={{
          backgroundColor: selected ? color : `transparent`,
          borderColor: color,
        }}
      ></div>
      <p>{name}</p>
    </button>
  );
});

export default Label;
