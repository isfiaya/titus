import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Expenses (EUR)",
      data: [500, 750, 900, 1200, 800, 1000, 1100, 950, 1400, 1600, 1800, 2000],
      backgroundColor: "#3182CE",
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "EUR",
        font: {
          size: 16,
        },
      },
    },
    x: {
      title: {
        display: true,
        text: "Month",
        font: {
          size: 16,
        },
      },
    },
  },
};

function Stats() {
  return (
    <div className="max-w-lg mx-auto">
      <Bar data={data} />
    </div>
  );
}

export default Stats;
