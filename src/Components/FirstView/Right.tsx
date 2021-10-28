import React from "react";
import classes from "./Parts.module.css";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import BarLineChart from "../Charts/BarLineChart/BarLineChart";
import { data } from "../DiscoverySection/Discoverers";
import { BarChartDataset } from "../../Types";

const Right = () => {
  const [purple, setPurple] = React.useState<number[]>([]);
  const [blue, setBlue] = React.useState<number[]>([]);
  const [orange, setOrange] = React.useState<number[]>([]);

  const startAdding = () => {
    let count: number = 0;
    setInterval(() => {
      switch (count % 3) {
        case 0:
          setPurple([]);
          setOrange(data.orange);
          break;
        case 1:
          setPurple(data.purple);
          setBlue([]);
          break;
        case 2:
          setBlue(data.blue);
          setOrange([]);
          break;
      }
      count++;
    }, 3000);
  };

  React.useEffect(() => {
    startAdding();
  }, []);

  const datasets: BarChartDataset[] = [
    {
      data: purple,
      backgroundColor: `rgb(68, 3, 129)`,
      borderColor: `rgb(68, 3, 129)`,
      type: `bar`,
      stepped: false,
      order: 1,
      yAxisID: `y`,
      tension: 1,
    },
    {
      data: orange,
      backgroundColor: `orange`,
      borderColor: `orange`,
      type: `bar`,
      stepped: false,
      order: 1,
      yAxisID: `y`,
      tension: 1,
    },
    {
      data: blue,
      backgroundColor: `rgb(18, 145, 248)`,
      borderColor: `rgb(18, 145, 248)`,
      type: `line`,
      stepped: false,
      order: 0,
      yAxisID: "y1",
      tension: 0.4,
    },
  ];

  const width: string = window.innerWidth > 500 ? `500px` : `360px`;

  return (
    <div
      className={classes.Right}
      // style={{ paddingRight: `200px`, alignItems: `end` }}
    >
      <div className={classes.Par}>
        <h1 style={{ animationDelay: `5s` }}>
          GAIN INSIGHT{" "}
          <svg
            className={classes.Inspect}
            width="60"
            height="60"
            fill="currentColor"
          >
            <use href={`${icons}#search`} />
          </svg>
        </h1>
        <p style={{ animationDelay: `5s` }}>
          Using charts and graphs to find out what you REALLY should be doing.
        </p>
      </div>
      <div className={classes.Chart}>
        <BarLineChart
          datasets={datasets}
          width={width}
          options={data.options}
          labels={data.labels}
        />
      </div>
    </div>
  );
};

export default Right;
