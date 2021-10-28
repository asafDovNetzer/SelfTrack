import React, { useRef, useEffect, useCallback } from "react";
import Chart from "chart.js/auto";
import Aux from "../../../hoc/Auxiliary";
import classes from "./BarLineChart.module.css";
import * as types from "../../../Types";

const BarChart: React.FC<{
  datasets: types.BarChartDataset[];
  labels: string[];
  options: any;
  width: string;
}> = React.memo(({ labels, datasets, options, width }) => {
  const chartRef = useRef<Chart | null>(null);

  const canvasCallback = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          datasets: [],
        },
      });
    }
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data = {
        labels: labels,
        datasets: datasets,
      };

      chartRef.current.options = options;

      chartRef.current.update();
    }
  }, [datasets, labels, options]);

  return (
    <Aux>
      <div className={classes.BarChart} style={{ width: width }}>
        <canvas ref={canvasCallback}></canvas>
      </div>
    </Aux>
  );
});

export default BarChart;
