import React, { MutableRefObject } from "react";
import classes from "./NewTracker.module.css";
import FakeTracker from "../TrackersForm/FakeTracker/FakeTracker";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import Divider from "../UI/Divider";

const NewTracker = (props: Props) => {
  const [selected, setSelected] = React.useState<string>(`rater`);
  const [color, setColor] = React.useState<string>(`rgb(12, 223, 238)`);

  React.useEffect(() => {
    return () => {
      setSelected(`rater`);
      setColor(`rgb(12, 223, 238)`);
    };
  }, [props]);

  const trackers = [
    {
      name: `Rater`,
      type: `rater`,
      color: `rgb(12, 223, 238)`,
    },
    {
      name: `Checker`,
      type: `checker`,
      color: `rgb(12, 136, 238)`,
    },
    {
      name: `Stopwatch`,
      type: `stopwatch`,
      color: `rgb(152, 29, 135)`,
    },
    {
      name: `Counter`,
      type: `counter`,
      color: `rgb(236, 54, 141)`,
    },
  ];
  return (
    <div className={classes.Modal}>
      <div className={classes.Header}>
        <h1>Choose a Tracker type</h1>
      </div>
      <Divider />
      <div className={classes.Options}>
        {trackers.map((tracker) => {
          return (
            <div
              key={tracker.name}
              className={classes.Option}
              onClick={() => {
                setSelected(tracker.type);
                setColor(tracker.color);
              }}
            >
              <div className={classes.Arrow}>
                <svg
                  width="30"
                  height="30"
                  fill={tracker.color}
                  color={tracker.type === selected ? tracker.color : `white`}
                >
                  <use href={`${icons}#caret-right-fill`} />
                </svg>
              </div>
              <FakeTracker
                type={tracker.type}
                color={tracker.color}
                name={tracker.name}
                size={1}
                options={null}
              />
            </div>
          );
        })}
      </div>
      <div className={classes.NotSure}>
        <div className={classes.Large} style={{ backgroundColor: color }}>
          <button onClick={props.onNotSure} className={classes.Left}>
            Not Sure?
          </button>
          <button
            onClick={() => {
              // props.colorRef.current = color;
              props.onNext(selected);
            }}
            className={classes.Right}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

type Props = {
  onNext: (type: string) => void;
  onNotSure: () => void;
  // colorRef: React.MutableRefObject<string>;
};

export default NewTracker;
