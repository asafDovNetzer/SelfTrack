import React from "react";
import classes from "./InsightView.module.css";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";

const elements: string[] = [`fifth`, `sixth`, `seventh`];

const InsightView = () => {
  const [isIntersecting, setIsIntersecting] = React.useState<boolean>(false);

  React.useEffect(() => {
    const wrapper: any = document.querySelector(`.wrapper2`);

    const stickyNav = function (entries: any) {
      const [entry] = entries;
      if (!entry.isIntersecting) setIsIntersecting(false);
      if (entry.isIntersecting) setIsIntersecting(true);
    };

    const headerObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0.1,
      rootMargin: `-0px`,
    });

    headerObserver.observe(wrapper);
  }, []);

  const iconWidth: string = window.innerWidth > 500 ? `50` : `40`;

  return (
    <div className={[classes.Wraper, `wrapper2`].join(` `)}>
      {elements.map((el) => (
        <div key={el} className={[classes.Static, el].join(` `)}></div>
      ))}
      <div
        className={classes.Fixed}
        style={{
          zIndex: !!isIntersecting ? 0 : -2,
          opacity: !!isIntersecting ? 1 : 0,
        }}
      >
        <div className={classes.Content}>
          <div className={classes.Par}>
            <div className={classes.Icons}>
              <svg
                className={classes.Graph}
                width="100"
                height="100"
                fill="currentColor"
              >
                <use href={`${icons}#graph-up`} />
              </svg>
              <svg
                className={classes.Inspect}
                width={iconWidth}
                height={iconWidth}
                fill="currentColor"
              >
                <use href={`${icons}#search`} />
              </svg>
            </div>
            <div
              className={[
                classes.Header,
                isIntersecting ? classes.Show : ``,
              ].join(` `)}
            >
              <h1>
                <small>and</small> GAIN INSIGHT
              </h1>
              <h2>into WHAT YOU REALY SHOULD BE DOING</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightView;
