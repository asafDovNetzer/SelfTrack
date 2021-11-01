import React from "react";
import classes from "./TrackView.module.css";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import FakeTrackerView from "./FakeTrackerView";

const elements: Element[] = [
  {
    type: "rater",
    name: `Rater`,
    options: null,
    color: `rgb(152, 29, 135)`,
    exp: `Track your Feelings, Emotions, Sensations, etc`,
  },
  {
    type: "checker",
    name: `Checker`,
    options: null,
    color: `rgb(12, 136, 238)`,
    exp: `Track whether an Activity / Occurence did or didn't happen`,
  },
  {
    type: "stopwatch",
    name: `Stopwatch`,
    options: {
      isRunning: true,
    },
    color: `rgb(24, 169, 153)`,
    exp: `Track the duration of an Activity / Occurrence`,
  },
  {
    type: "counter",
    name: `Counter`,
    options: null,
    color: `rgb(236, 54, 141)`,
    exp: `Track the Iteration (i.e 'amount' or 'repetition'...) of an Activity / Occurrence`,
  },
];

type Element = {
  type: string;
  name: string;
  color: string;
  exp: string;
  options: any;
};

const TrackView = () => {
  const [isIntersecting, setIsIntersecting] = React.useState<boolean>(false);
  const [height, setHeight] = React.useState<number>(0);

  React.useEffect(() => {
    const wrapper: any = document.querySelector(`.wrapper`);
    const header: any = document.querySelector(`.track-view-header`);
    const relPosition = header.getBoundingClientRect();
    const nHeight: number = relPosition.top + header.offsetHeight;

    setHeight(nHeight);

    const stickyNav = function (entries: any) {
      const [entry] = entries;
      if (entry.isIntersecting) setIsIntersecting(true);
      if (!entry.isIntersecting) setIsIntersecting(false);
    };

    const headerObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0.1,
      rootMargin: `-0px`,
    });

    headerObserver.observe(wrapper);
  }, []);

  const iconWidth: string = window.innerWidth > 500 ? `60` : `50`;

  return (
    <div className={[classes.Wraper, `wrapper`].join(` `)}>
      {elements.map((el, index) => (
        <div key={el.type}>
          <FakeTrackerView
            type={el.type}
            name={el.name}
            color={el.color}
            options={el.options}
            height={height}
            index={index}
            visible={isIntersecting}
            exp={el.exp}
          />
        </div>
      ))}
      <div
        className={classes.FixedMain}
        style={{
          zIndex: !!isIntersecting ? 0 : -2,
          opacity: !!isIntersecting ? 1 : 0,
        }}
      >
        <div className={classes.Par}>
          <div
            className={[
              classes.Header,
              `track-view-header`,
              isIntersecting ? classes.Show : ``,
            ].join(` `)}
          >
            <h1>TRACK </h1>
            <h2>
              <small>your</small> ACTIVITY
            </h2>
            <h2>
              <small>and</small> WELL BEING
            </h2>
            <svg
              className={classes.Stopwatch}
              width={iconWidth}
              height={iconWidth}
              fill="currentColor"
            >
              <use href={`${icons}#stopwatch`} />
            </svg>
          </div>
          {/* <p
            style={{
              transform: !isIntersecting
                ? `translateY(-100px) scale(0.8)`
                : `translateY(0px) scale(1)`,
              opacity: !isIntersecting ? `0` : `1`,
            }}
          >{`Using these intuitive widgets:`}</p> */}
        </div>
      </div>
    </div>
  );
};

export default TrackView;
