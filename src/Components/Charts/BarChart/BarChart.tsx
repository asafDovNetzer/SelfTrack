import React, { useRef, useEffect, useCallback } from "react";
import Chart from "chart.js/auto";
import Aux from "../../../hoc/Auxiliary";
import classes from "./BarChart.module.css";
import * as types from "../../../Types";

const BarChart: React.FC<{
  chartData: types.Datasets;
}> = React.memo(({ chartData }) => {
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
        options: {
          aspectRatio: 8,
          scales: {
            x: {
              stacked: true,
              max: 24,
              grid: {
                display: false,
              },
              ticks: {
                stepSize: 4,
                callback: (value: string) => {
                  console.log(value);
                  return `${value}:00`;
                },
              },
            },
            y: {
              stacked: true,
            },
          },
          indexAxis: "y",
          onClick: (e: any) => {
            const data: any = e.chart.config._config.data.datasets;
            console.log(data);
            const dataset: number = e.chart._active[0]?.datasetIndex;
            if (!dataset) return;
            const index: number = e.chart._active[0]?.index;
            console.log(dataset);
            console.log(index);

            console.log(data[dataset].data[index]);
          },
          elements: {
            bar: {
              borderWidth: 1,
              barThickness: 2,
            },
          },
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      // console.log(`current`);
      chartRef.current.data = {
        labels: [``],
        datasets: chartData,
      };
      chartRef.current.update();
    }
  }, [chartData]);

  return (
    <Aux>
      <div className={classes.BarChart}>
        <canvas ref={canvasCallback}></canvas>
      </div>
    </Aux>
  );
});

export default BarChart;
