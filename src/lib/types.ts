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

export const currencies = {
  USD: { symbol: "$", name: "US Dollar" },
  EUR: { symbol: "€", name: "Euro" },
  JPY: { symbol: "¥", name: "Japanese Yen" },
  GBP: { symbol: "£", name: "British Pound" },
  INR: { symbol: "₹", name: "Indian Rupee" },
};

export type Currency = keyof typeof currencies;

export interface Event {
  id:string;
  name: string;
  description: string;
  currency: Currency;
  expenses: Expense[];
  imageUrl?: string;
}
