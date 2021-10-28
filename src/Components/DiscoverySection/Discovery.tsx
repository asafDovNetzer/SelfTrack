import React from "react";
import classes from "./DiscoverySection.module.css";
import BarLineChart from "../Charts/BarLineChart/BarLineChart";
import { galila } from "./Discoverers";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BarChartDataset } from "../../Types";
import FakeTracker from "../TrackersForm/FakeTracker/FakeTracker";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";

const Discovery: React.FC<{ discoverer: string }> = (props) => {
  const [objData, setObjData] = React.useState<number[]>([]);
  const [subjData, setSubjData] = React.useState<number[]>([]);
  const [isOn, setIsOn] = React.useState<boolean>(false);

  const addData = (count: number) => {
    const newObjData: number[] = galila.objData.slice(0, count);
    setObjData(newObjData);
    const newSubjData: number[] = galila.subjData.slice(0, count);
    setSubjData(newSubjData);
  };

  const startAdding = () => {
    let count: number = 0;
    const interval = setInterval(() => {
      addData(count);
      count++;
      if (count === 54) clearInterval(interval);
    }, 15);
  };

  const start = () => {
    setIsOn(true);
    startAdding();
  };

  let discoverer;

  switch (props.discoverer) {
    case `galila`:
      discoverer = galila;
      break;
    default:
      discoverer = galila;
  }

  const img = (
    <img
      width="100px"
      height="100px"
      alt={`galila-pic`}
      src={`Images/galila.jpg`}
    />
  );

  const datasets: BarChartDataset[] = [
    {
      data: objData,
      backgroundColor: `rgb(18, 145, 248)`,
      borderColor: `rgb(18, 145, 248)`,
      type: `bar`,
      stepped: false,
      order: 1,
      yAxisID: `y`,
      tension: 1,
    },
    {
      data: subjData,
      backgroundColor: `rgb(250, 198, 87)`,
      borderColor: `rgb(250, 198, 87)`,
      type: `line`,
      stepped: false,
      order: 0,
      yAxisID: "y1",
      tension: 0.4,
    },
  ];

  return (
    <div className={classes.Discovery}>
      <div className={classes.Left}>
        {/* <div className={classes.Header}>
            <h1 className={classes.Name}>{`${
              discoverer!.displayName
            }'s Discovery`}</h1>
            <div className={classes.Img}>
              <LazyLoadImage
                alt={img.props.alt}
                height={img.props.height}
                width={img.props.width}
                src={img.props.src}
              />
            </div>
          </div> */}
        <div className={classes.Par}>
          <h1>"</h1>
          <p>{discoverer.discovery}"</p>
        </div>
        <div
          className={classes.Chart}
          style={{ right: isOn ? `-370px` : `-1300px` }}
        >
          <BarLineChart
            datasets={datasets}
            options={discoverer.options}
            labels={discoverer.labels}
            width="600px"
          />
        </div>
        <button
          className={classes.StartButton}
          style={{ display: isOn ? `none` : `unset` }}
          onClick={start}
        >
          Click to find out
        </button>
        <div
          className={classes.Trackers}
          style={{ left: isOn ? `20px` : `-400px` }}
        >
          <div className={classes.TopTracker}>
            <FakeTracker
              type="rater"
              color="rgb(250, 198, 87)"
              name="Happiness"
              options={null}
              size={1}
            />
          </div>
          <div className={classes.BottomTracker}>
            <FakeTracker
              type="stopwatch"
              color="rgb(18, 145, 248)"
              options={null}
              name="Out w Girlfriends"
              size={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discovery;
