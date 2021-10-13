import classes from "./LandingPage.module.css";
import { connect, ConnectedProps } from "react-redux";
import { LoginData, State } from "../../Types";
import * as actions from "../../Store/Actions/ActionsIndex";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Footer from "../../Components/Footer/Footer";

const LandingPage = (props: PropsFromRedux) => {
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
    <div className={classes.LandingPage}>
      <div className={classes.Marketing}>
        <div className={classes.Par}>
          <h1>
            TRACK{" "}
            <svg width="50" height="50" fill="currentColor">
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
            {/* <img width="900px" alt="left-img" src="/Images/trackers9.png" /> */}
          </div>
        </div>
        <div className={classes.Par}>
          <h1>
            GROW and IMPROVE{" "}
            <svg width="50" height="50" fill="currentColor">
              <use href={`${icons}#graph-up`} />
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
      {/* <div className={classes.Marketing}>
        <div className={classes.Text}>
          <h5 style={{ textAlign: `center`, lineHeight: `30px` }}>
            A tool designed to <mark>assist</mark> you <br /> with monitoring
            your <mark>well-Being</mark> and <mark>Activity</mark>.
          </h5>
          <h5>
            <mark>Ultimatly</mark> showing you what you
            <mark>
              <i>REALLY</i>
            </mark>{" "}
            should be doing...
          </h5>
        </div>
      </div> */}
      {window.innerWidth > 500 ? <Footer /> : null}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
});

const mapDispatchToProps = {
  onLogin: (data: LoginData) => actions.loginAsync(data),
  onLogout: () => actions.logout(),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LandingPage);
