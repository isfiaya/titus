import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import expensesLogic from "../../logic/expensesLogic";
import { useValues } from "kea";
import { useState } from "react";

Chart.register(...registerables);

const Stats = () => {
  const { expenses } = useValues(expensesLogic);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const groupedExpenses = Array(12).fill(0);

  const filteredExpenses = expenses.filter((expense) => {
    const year = new Date(expense.expense_date).getFullYear();
    return year === selectedYear;
  });

  filteredExpenses.forEach((expense) => {
    const month = new Date(expense.expense_date).getMonth();
    groupedExpenses[month] += expense.amount;
  });

  const handleChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

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
        data: groupedExpenses,
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className=" flex items-center gap-4 max-w-2xl  mb-4">
        <label
          htmlFor="year-select"
          className="block font-medium text-lg text-gray-700"
        >
          Select year:
        </label>
        <div className="flex-1 mt-1 relative rounded-md shadow-sm">
          <select
            name="year-select"
            className="form-input"
            value={selectedYear}
            onChange={handleChange}
          >
            <option value="">-- Select a year --</option>
            {Array.from({ length: 150 }, (_, i) => 1900 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Bar data={data} />
    </div>
  );
};

export default Stats;
