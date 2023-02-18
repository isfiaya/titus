import React from "react";

function Home() {
  return (
    <div>
      {/* From */}
      <form className="max-w-lg mx-auto">
        <div className="my-4">
          <label className="block font-medium text-gray-700">
            Claimer name
          </label>
          <select className="block w-full p-2 border rounded">
            <option>Employee A</option>
            <option>Employee B</option>
            <option>Employee C</option>
          </select>
        </div>
        <div className="my-4">
          <label className="block font-medium text-gray-700">
            Date of expense
          </label>
          <input type="date" className="block w-full p-2 border rounded" />
        </div>
        <div className="my-4">
          <label className="block font-medium text-gray-700">Description</label>
          <input type="text" className="block w-full p-2 border rounded" />
        </div>
        <div className="my-4">
          <label className="block font-medium text-gray-700">
            Amount (EUR)
          </label>
          <input type="number" className="block w-full p-2 border rounded" />
        </div>
        <div className="my-4">
          <label className="block font-medium text-gray-700">Approved</label>
          <input type="checkbox" className="inline-block mr-2" />
        </div>
        <div className="my-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add expense
          </button>
        </div>
      </form>
      {/* Table */}
      <table className="table-auto w-full mb-12">
        <thead>
          <tr>
            <th className="px-4 py-2">Claimer</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Amount (EUR)</th>
            <th className="px-4 py-2">Approved</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Employee A</td>
            <td className="border px-4 py-2">2022-01-01</td>
            <td className="border px-4 py-2">Lunch with partners</td>
            <td className="border px-4 py-2">25.00</td>
            <td className="border px-4 py-2">Yes</td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                Edit
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2">
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Employee B</td>
            <td className="border px-4 py-2">2022-01-05</td>
            <td className="border px-4 py-2">Taxi to airport</td>
            <td className="border px-4 py-2">30.00</td>
            <td className="border px-4 py-2">No</td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                Edit
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Home;
