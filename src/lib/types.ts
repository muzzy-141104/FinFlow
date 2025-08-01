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
  AUD: { symbol: "A$", name: "Australian Dollar" },
  CAD: { symbol: "C$", name: "Canadian Dollar" },
  CHF: { symbol: "Fr", name: "Swiss Franc" },
  CNY: { symbol: "¥", name: "Chinese Yuan" },
  SEK: { symbol: "kr", name: "Swedish Krona" },
  NZD: { symbol: "NZ$", name: "New Zealand Dollar" },
  MXN: { symbol: "Mex$", name: "Mexican Peso" },
  SGD: { symbol: "S$", name: "Singapore Dollar" },
  HKD: { symbol: "HK$", name: "Hong Kong Dollar" },
  NOK: { symbol: "kr", name: "Norwegian Krone" },
  KRW: { symbol: "₩", name: "South Korean Won" },
  TRY: { symbol: "₺", name: "Turkish Lira" },
  RUB: { symbol: "₽", name: "Russian Ruble" },
  BRL: { symbol: "R$", name: "Brazilian Real" },
  ZAR: { symbol: "R", name: "South African Rand" },
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
