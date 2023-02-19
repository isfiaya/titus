import { kea } from 'kea';
import { supabase } from '../supabase/init';

const expensesLogic = kea({
  actions: {
    setExpenses: (expenses) => ({ expenses }),
    addExpense: (expense) => ({ expense }),
    loadExpenses: true,
    saveExpense: (expense) => ({ expense }),
    deleteExpense: (id) => ({ id }),
    setSelectedExpenseId: (id) => ({ id }),


  },
  reducers: {
    expenses: [[], {
      setExpenses: (_, { expenses }) => expenses,
      addExpense: (expenses, { expense }) => [...expenses, expense],
    }],
    selectedExpenseId: [null, {
      setSelectedExpenseId: (_, { id }) => id,
    }],
  },
  selectors: {
    selectedExpense: [
      // (state) => state.expenses,
      // (state) => state.selectedExpenseId,
      (s) => [s.expenses, s.selectedExpenseId],
      (expenses, selectedExpenseId) => expenses.find((expense) => expense.id === selectedExpenseId)
    ]
    ,
  },
  listeners: ({ actions }) => ({
    loadExpenses: async () => {
      const { data: expenses, error } = await supabase
        .from('expenses')
        .select('*');

      if (error) {
        console.error(error);
      } else {
        actions.setExpenses(expenses);
      }
    },
    saveExpense: async ({ expense }) => {
      const { error } = await supabase
        .from('expenses')
        .insert(expense);

      if (error) {
        console.log(error);
      } else {
        console.log("Expense inserted successfully:");

      }
    },
    deleteExpense: async ({ id }) => {
      const { error } = await supabase.from("expenses").delete().eq("id", id);
      if (error) {
        console.log("Error deleting expense:", error.message);
      } else {
        console.log(`Expense with ID ${id} deleted successfully.`);
      }
    }

  }),
});

export default expensesLogic;