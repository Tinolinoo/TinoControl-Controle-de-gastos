import { Expense } from '../types/expense';

const STORAGE_KEY = 'tino-control-expenses';

export const saveExpenses = (expenses: Expense[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const loadExpenses = (): Expense[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const addExpense = (expense: Expense): Expense[] => {
  const expenses = loadExpenses();
  const newExpenses = [...expenses, expense];
  saveExpenses(newExpenses);
  return newExpenses;
};

export const deleteExpense = (id: string): Expense[] => {
  const expenses = loadExpenses();
  const newExpenses = expenses.filter(expense => expense.id !== id);
  saveExpenses(newExpenses);
  return newExpenses;
};