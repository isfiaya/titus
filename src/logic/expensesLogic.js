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
      try {
        const { data: expenses } = await supabase
          .from('expenses')
          .select('*').order('created_at', { ascending: false });
        actions.setExpenses(expenses);
      } catch (error) {
        throw new Error(`Failed to load expenses: ${error.message}`);
      }
    },
    saveExpense: async ({ expense }) => {
      try {
        const { data } = await supabase
          .from('expenses')
          .insert(expense).select();
        actions.addExpense(data[0]);
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