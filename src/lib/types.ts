export const expenseCategories = [
  "Travel",
  "Food",
  "Housing",
  "Shopping",
  "Entertainment",
  "Other",
] as const;

export type ExpenseCategory = typeof expenseCategories[number];

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // ISO string
}

export interface Event {
  id:string;
  name: string;
  description: string;
  expenses: Expense[];
  imageUrl?: string;
}
