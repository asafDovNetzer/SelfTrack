import React from "react";
import classes from "./LandingPage.module.css";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Footer from "../../Components/Footer/Footer";
import Slider from "../../Components/Slider/Slider";

const LandingPage = () => {
  const leftImage =
    window.innerWidth > 500 ? (
      <img width="900px" alt="left-img" src="/Images/trackers9.png" />
    ) : (
      <img width="300px" alt="left-img" src="/Images/trackers10.png" />
    );

  const rightImage =
    window.innerWidth > 500 ? (
      <img width="600px" alt="left-img" src="/Images/data4.png" />
    ) : (
      <img width="300px" alt="left-img" src="/Images/data5.png" />
    );

  return (
    <div className={`${classes.LandingPage} landing`}>
      <div className={classes.Marketing}>
        <div
          className={classes.Par}
          style={{ marginLeft: window.innerWidth > 500 ? `150px` : `30px` }}
        >
          <h1>
            TRACK{" "}
            <svg
              className={classes.Stopwatch}
              width="50"
              height="50"
              fill="currentColor"
            >
              <use href={`${icons}#stopwatch`} />
            </svg>
          </h1>
          <p>Using intuitive widgets to monitor you activity and well-being.</p>
          <div className={classes.LeftPic}>
            <LazyLoadImage
              alt={leftImage.props.alt}
              height={leftImage.props.height}
              width={leftImage.props.width}
              src={leftImage.props.src}
            />
          </div>
        </div>
        <div className={classes.Par}>
          <h1>
            GROW and IMPROVE{" "}
            <svg
              className={classes.Flower}
              width="40"
              height="40"
              fill="currentColor"
            >
              <use href={`${icons}#flower1`} />
            </svg>
          </h1>
          <p>
            Using charts and graphs to find out what you REALLY should be doing.
          </p>
          <div className={classes.RightPic}>
            <LazyLoadImage
              alt={rightImage.props.alt}
              height={rightImage.props.height}
              width={rightImage.props.width}
              src={rightImage.props.src}
            />
          </div>
        </div>
      </div>
      <Slider />
      {window.innerWidth > 500 ? <Footer /> : null}
    </div>
  );
};

export default LandingPage;
