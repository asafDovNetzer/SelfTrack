import { BarChartDataset } from "../../Types";

const options: any = {
  animation: false,
  elements: {
    point: {
      radius: 1,
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  scales: {
    y: {
      type: "linear",
      display: true,
      suggestedMax: 4.5,
      position: "left",
      title: {
        display: true,
        text: `Hours`,
      },
    },
    y1: {
      suggestedMax: 5,
      ticks: {
        stepSize: 1,
      },
      type: "linear",
      display: true,
      position: "right",
      title: {
        display: true,
        text: `Rating`,
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
  plugins: {
    tooltip: {
      enabled: false,
      displayColors: false,
    },
    legend: {
      display: false,
    },
  },
};

const createLabels = (num: number) => {
  const labels: string[] = [];

  for (let i = 11; i < 11 + num; i++) {
    const date: Date = new Date(2021, 6, i);

    const month: string = date.getMonth().toString().padStart(2, `0`);
    const day: string = date.getDate().toString().padStart(2, `0`);

    labels.push(`${day}/${month}`);
  }

  return labels;
};

const datasets: BarChartDataset[] = [
  {
    data: [
      1.23, 1.3, 2.5, 0, 0, 0, 0.8, 2.2, 2, 2.1, 1.3, 0, 1.9, 2, 1.67, 2.3, 0,
      2.9, 0, 0.5, 0, 0, 0, 0, 1.1, 0, 1.23, 1.5, 1.45, 0, 2.2, 1.8, 1.5, 0,
      1.3, 2, 2.1, 1.1, 1.3, 3.8, 1.4, 0, 1.2, 2, 2.2, 0, 1.2, 1.8, 1.9, 0, 3.4,
      4.2, 0,
    ],
    backgroundColor: `rgb(18, 145, 248)`,
    borderColor: `rgb(18, 145, 248)`,
    type: `bar`,
    stepped: false,
    order: 1,
    yAxisID: `y`,
    tension: 1,
  },
  {
    data: [
      4, 4, 4, 5, 4, 4.5, 2.5, 4, 4.5, 5, 5, 5, 4, 4, 4.5, 4.5, 5, 5, 5, 5, 4,
      4, 3.5, 3.5, 3, 3, 4, 4, 3.5, 4, 4, 4.5, 4, 4.5, 4.5, 4.5, 4.5, 4, 4, 4.5,
      4, 4.5, 4.5, 4.5, 5, 4.5, 5, 5, 5, 4.5, 4.5, 4, 4.5,
    ],
    backgroundColor: `rgb(250, 198, 87)`,
    borderColor: `rgb(250, 198, 87)`,
    type: `line`,
    stepped: false,
    order: 0,
    yAxisID: "y1",
    tension: 0.4,
  },
];

export const galila = {
  options: options,
  labels: createLabels(54),
  datasets: datasets,
  displayName: `Galila`,
  discovery: `I found out that I'm significantly happier when i spend more time with my girlfriends`,
  objData: [
    1.23, 1.3, 2.5, 0, 0, 0, 0.8, 2.2, 2, 2.1, 1.3, 0, 1.9, 2, 1.67, 2.3, 0,
    2.9, 0, 0.5, 0, 0, 0, 0, 1.1, 0, 1.23, 1.5, 1.45, 0, 2.2, 1.8, 1.5, 0, 1.3,
    2, 2.1, 1.1, 1.3, 3.8, 1.4, 0, 1.2, 2, 2.2, 0, 1.2, 1.8, 1.9, 0, 3.4, 4.2,
    0,
  ],
  subjData: [
    4, 4, 4, 5, 4, 4.5, 2.5, 4, 4.5, 5, 5, 5, 4, 4, 4.5, 4.5, 5, 5, 5, 5, 4, 4,
    3.5, 3.5, 3, 3, 4, 4, 3.5, 4, 4, 4.5, 4, 4.5, 4.5, 4.5, 4.5, 4, 4, 4.5, 4,
    4.5, 4.5, 4.5, 5, 4.5, 5, 5, 5, 4.5, 4.5, 4, 4.5,
  ],
};

export const data = {
  options: {
    ...options,
    animation: true,
  },
  labels: createLabels(100),
  purple: [
    1.23, 1.3, 2.5, 0, 0, 0, 0.8, 2.2, 2, 2.1, 1.3, 0, 1.9, 2, 1.67, 2.3, 0,
    2.9, 0, 0.5, 0, 0, 0, 0, 1.1, 0, 1.23, 1.5, 1.45, 0, 2.2, 1.8, 1.5, 0, 1.3,
    2, 2.1, 1.1, 1.3, 3.8, 1.4, 0, 1.2, 2, 2.2, 0, 1.2, 1.8, 1.9, 0, 3.4, 4.2,
    0, 0, 0, 0, 0, 1.1, 0, 1.23, 1.5, 1.45, 0, 2.2, 1.8, 1.5, 0, 1.3, 2, 2.1,
    1.1, 1.3, 3.8, 1.4, 0, 1.2, 2, 2.2, 0, 1.2, 1.8, 1.9,
  ],
  blue: [
    4, 4, 4, 5, 4, 4.5, 2.5, 4, 4.5, 5, 5, 5, 4, 4, 4.5, 4.5, 5, 5, 5, 5, 4, 4,
    3.5, 3.5, 3, 3, 4, 4, 3.5, 4, 4, 4.5, 4, 4.5, 4.5, 4.5, 4.5, 4, 4, 4.5, 4,
    4.5, 4.5, 4.5, 5, 4.5, 5, 5, 5, 4.5, 4.5, 4, 4.5, 3, 3, 4, 4, 3.5, 4, 4,
    4.5, 4, 4.5, 4.5, 4.5, 4.5, 4, 4, 4.5, 4, 4.5, 4.5, 4.5, 5, 4.5, 5, 5, 5,
    4.5, 4.5, 4, 4.5,
  ],
  orange: [
    1.23, 1.3, 0, 0, 1.1, 0, 1.23, 1.5, 1.45, 0, 2.2, 1.8, 1.5, 0, 1.3, 2, 2.1,
    1.1, 1.3, 3.8, 1.4, 0, 1.2, 2, 2.2, 0, 1.2, 1.8, 1.9, 1.8, 1.5, 0, 1.3, 2,
    2.1, 1.1, 1.3, 3.8, 1.4, 0, 1.2, 2, 2.2, 0, 1.2, 1.8, 1.9, 0, 3.4, 4.2, 0,
    0, 0, 0, 0, 1.1, 0, 1.23, 1.5, 1.45, 0, 2.2, 1.8, 1.5, 0, 1.3, 2, 2.1, 1.1,
    1.3, 3.8, 1.4, 0, 1.2, 2, 2.2, 0, 1.2, 1.8, 1.9,
  ],
};
