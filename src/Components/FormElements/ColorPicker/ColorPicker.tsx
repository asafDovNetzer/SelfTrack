import React from "react";
import classes from "./ColorPicker.module.css";
import { CirclePicker, ChromePicker } from "react-color";

const ColorPicker = (props: Props) => {
  const [type, setType] = React.useState<number>(0);

  return (
    <div className={classes.ColorPicker}>
      <div className={classes.Switch}>
        <button
          style={{ backgroundColor: !type ? `rgb(231, 231, 231)` : `unset` }}
          onClick={() => setType(0)}
        >
          Circles
        </button>
        <button
          style={{ backgroundColor: !!type ? `rgb(231, 231, 231)` : `unset` }}
          onClick={() => setType(280)}
        >
          Chrome
        </button>
      </div>
      <div className={classes.Pickers}>
        <div
          className={classes.Slider}
          style={{ transform: `translateX(-${type}px)` }}
        >
          <div className={classes.Picker}>
            <CirclePicker
              onChangeComplete={props.onChange}
              color={props.color}
            />
          </div>
          <div className={classes.Picker}>
            <ChromePicker
              onChangeComplete={props.onChange}
              color={props.color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {
  color: string;
  onChange: (color: any) => void;
};

export default ColorPicker;
