import React from "react";
import classes from "./ZeroView.module.css";

const ZeroView = (props: Props) => {
  const [isIntersecting, setIsIntersecting] = React.useState<boolean>(false);

  React.useEffect(() => {
    const wrapper: any = document.querySelector(`.first-view`);

    const stickyNav = function (entries: any) {
      const [entry] = entries;
      if (entry.isIntersecting) setIsIntersecting(true);
      if (!entry.isIntersecting) setIsIntersecting(false);
    };

    const headerObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0.4,
      rootMargin: `-0px`,
    });

    headerObserver.observe(wrapper);
  }, []);

  return (
    <div className={[classes.Main, `first-view`].join(` `)}>
      <img
        className={classes.Logo}
        src={`./Images/logo6.svg`}
        alt="Stableyez"
      />
      <div className={classes.SubTitle}>
        <div className={classes.Question}>
          <h2>Don't know if your'e making the right decision?</h2>
        </div>
        <div
          className={classes.Question}
          style={{
            animationDelay: `4s`,
          }}
        >
          <h2>Can't notice the change?</h2>
        </div>
        <div
          className={classes.Question}
          style={{
            animationDelay: `8s`,
          }}
        >
          <h2>Unsure your'e focusing on the RIGHT things?</h2>
        </div>
        <div
          className={classes.Question}
          style={{
            animationDelay: `12s`,
          }}
        >
          <h2>Question the accuracy of your memory?</h2>
        </div>
      </div>
      <div className={classes.AllIcons}>
        <div className={classes.SmallIcons}>
          <img
            style={{ animationDelay: `-6.4s` }}
            src={`./Images/svg/bicycle.svg`}
            alt="bicycle"
            height="70"
          />
          <img
            style={{ animationDelay: `-4.8s` }}
            src={`./Images/svg/piano.svg`}
            alt="piano"
            height="50"
          />
          <img
            style={{ animationDelay: `-3.2s` }}
            src={`./Images/svg/social.svg`}
            alt="social"
            height="60"
          />
          <img
            style={{ animationDelay: `-1.6s` }}
            src={`./Images/svg/bowl.svg`}
            alt="bowl"
            height="60"
          />
          <img
            style={{ animationDelay: `0s` }}
            src={`./Images/svg/laptop.svg`}
            alt="laptop"
            height="60"
          />
        </div>
        <img
          className={classes.Confused}
          src={`./Images/svg/confused.svg`}
          alt="confused?"
        />
      </div>
      <div
        className={classes.ActionCall}
        style={{ display: isIntersecting ? `` : `none` }}
      >
        <button onClick={props.onClick}>Find Out</button>
      </div>
    </div>
  );
};

type Props = {
  onClick: () => void;
};

export default ZeroView;
