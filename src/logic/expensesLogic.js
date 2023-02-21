import { kea } from 'kea';
import { supabase } from '../supabase/init';

const expensesLogic = kea({
  actions: {
    setExpenses: (expenses) => ({ expenses }),
    addExpense: (expense) => ({ expense }),
    loadExpenses: true,
    saveExpense: (expense) => ({ expense }),
    updateExpense: (expense) => ({ expense }),
    deleteExpense: (id) => ({ id }),
    setSelectedExpenseId: (id) => ({ id }),
  },
  reducers: {
    expenses: [[], {
      setExpenses: (_, { expenses }) => expenses,
      addExpense: (expenses, { expense }) => [expense, ...expenses],
      updateExpense: (expenses, { expense }) => expenses.map((e) => (e.id === expense.id ? expense : e)),
      deleteExpense: (expenses, { id }) => expenses.filter((item) => item.id !== id),
    }],
    selectedExpenseId: [null, {
      setSelectedExpenseId: (_, { id }) => id,
    }],
  },
  selectors: {
    selectedExpense: [
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

      const { data, error } = await supabase
        .from('expenses')
        .insert(expense).select();

      if (error) {
        console.log(error);
      } else {
        console.log("Expense inserted successfully:");
        actions.addExpense(data[0]);
      }
    },
    updateExpense: async ({ expense }) => {
      const { error } = await supabase
        .from('expenses')
        .update(expense).eq('id', expense.id);

      if (error) {
        console.log(error);
      } else {
        console.log("Expense updated successfully:");
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