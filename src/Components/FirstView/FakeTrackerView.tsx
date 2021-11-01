import React from "react";
import classes from "./TrackView.module.css";
import FakeTracker from "../TrackersForm/FakeTracker/FakeTracker";

const FakeTrackerView = (props: Props) => {
  const [position, setPosition] = React.useState<number | null>(null);

  React.useEffect(() => {
    const element: any = document.querySelector(`.${props.type}`);
    let newPosition: number | null;

    const eventListener = () => {
      const position = element.getBoundingClientRect();

      if (position.top < props.height + 10 * props.index) {
        newPosition = props.height + 10 * props.index;
      } else {
        newPosition = null;
      }

      setPosition(newPosition);
    };

    window.addEventListener(`scroll`, eventListener);

    return () => {
      window.removeEventListener(`scroll`, eventListener);
    };
  }, [props.index, props.height, props.type]);

  return (
    <div
      key={props.type}
      className={[classes.Static, props.type].join(` `)}
      style={{ opacity: props.visible ? 1 : 0 }}
    >
      <div
        className={[
          classes.Option,
          position !== null ? classes.FixedTracker : ``,
        ].join(` `)}
        style={{
          top: position !== null ? position! + -1 * props.index : ``,
          left: position !== null ? 5 * props.index : ``,
        }}
      >
        <FakeTracker
          type={props.type}
          name={props.name}
          options={props.options}
          color={props.color}
          size={1}
        />
        <div
          className={classes.Exp}
          style={{
            opacity: position === null ? 1 : 0,
          }}
        >
          <p>{props.exp}</p>
        </div>
      </div>
    </div>
  );
};

type Props = {
  type: string;
  name: string;
  options: any;
  color: string;
  height: number;
  index: number;
  visible: boolean;
  exp: string;
};

export default FakeTrackerView;
