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
- Tailwind CSS (for styling)
- Supabase (for data storage)
- PropTypes (for type checking)

## Installation

1. Clone this repository: `git clone https://github.com/isfiaya/titus`
2. Install dependencies: `npm install`
3. Create a .env file in the root of the project and add the following environment variables:
   VITE_SUPABASE_URL: the URL of your Supabase project
   VITE_SUPABASE_ANON_KEY: your Supabase project's anonymous key
4. Start the development server: `npm run dev`

## Backend

I used Supabase to store the data for this project. Supabase is a cloud-based database service that allows you to quickly and easily build applications with data persistence. It provides an easy-to-use API for querying, inserting, updating, and deleting data.

## Supabase Setup

I have created an `expenses` table in Supabase with the following columns:

- `id`: the unique identifier for each expense
- `expense_date`: the date of the expense
- `description`: a short description of the expense
- `amount`: the amount of the expense in EUR
- `claimer_name`: the name of the person who made the claim
- `approved`: a boolean value indicating whether the expense is approved or not
