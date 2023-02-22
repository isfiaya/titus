# Titus Ltd Expense Claims WebApp

This is a simple web application that allows Titus Ltd employees to track their travel-related expenses. It provides two main features:

**Expenses page**: where the user can add, edit, and delete expenses.

**Stats page: where** the user can see monthly statistics about the submitted expenses.

## Features

- Add, edit, and delete expenses
- See stats per month about submitted expenses
- Each expense claim has :
  - The name of the claimer
  - The date of the expense
  - The description
  - The amount (in EUR)
  - Approval status (anyone can approve)
  - Modal component implemented using React Portal

## Technology Used

- React
- Kea (for state management)
- Supabase (for data storage)
- PropTypes (for type checking)

## Installation

1. Clone this repository: `git clone https://github.com/isfiaya/titus`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Backend

We used Supabase to store the data for this project. Supabase is a cloud-based database service that allows you to quickly and easily build applications with data persistence. It provides an easy-to-use API for querying, inserting, updating, and deleting data.
