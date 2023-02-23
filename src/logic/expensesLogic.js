import { kea } from 'kea';
import { supabase } from '../supabase/init';

const expensesLogic = kea({
  actions: {
    loadExpenses: true,
    setExpenses: (expenses) => ({ expenses }),
    addExpense: (expense) => ({ expense }),
    updateExpense: (expense) => ({ expense }),
    deleteExpense: (id) => ({ id }),
    selectExpense: (id) => ({ id }),
  },
  reducers: {
    expenses: [[], {
      setExpenses: (_, { expenses }) => expenses,
      addExpense: (state, { expense }) => [expense, ...state],
      updateExpense: (state, { expense }) => state.map((e) => (e.id === expense.id ? expense : e)),
      deleteExpense: (state, { id }) => state.filter((item) => item.id !== id),
    }],
    selectedExpenseId: [null, {
      selectExpense: (_, { id }) => id,
    }],
  },
  selectors: {
    selectedExpense: [
      (s) => [s.expenses, s.selectedExpenseId],
      (expenses, selectedExpenseId) => expenses.find((expense) => expense.id === selectedExpenseId)
    ],
  },
  listeners: ({ actions }) => ({
    loadExpenses: async () => {
      try {
        const { data: expenses } = await supabase
          .from('expenses')
          .select('*');
        actions.setExpenses(expenses);
      } catch (error) {
        throw new Error(`Failed to load expenses: ${error.message}`);
      }
    },
    addExpense: async ({ expense }) => {
      try {
        const { data } = await supabase
          .from('expenses')
          .insert(expense).select();
      } catch (error) {
        throw new Error(`Failed to save expense: ${error.message}`);
      }
    },
    updateExpense: async ({ expense }) => {
      try {
        const { error } = await supabase
          .from('expenses')
          .update(expense).eq('id', expense.id);
      } catch (error) {
        throw new Error(`Failed to update expense: ${error.message}`);
      }
    },
    deleteExpense: async ({ id }) => {
      try {
        const { error } = await supabase.from("expenses").delete().eq("id", id);
      } catch (error) {
        throw new Error(`Failed to delete expense: ${error.message}`);
      }
    }

  }),
});

export default expensesLogic;