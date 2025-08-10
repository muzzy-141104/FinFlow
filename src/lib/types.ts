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

export const currencies = Object.freeze({
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  BRL: { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  CAD: { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  CHF: { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  CNY: { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  EUR: { code: "EUR", symbol: "€", name: "Euro" },
  GBP: { code: "GBP", symbol: "£", name: "British Pound" },
  HKD: { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee" },
  JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  KRW: { code: "KRW", symbol: "₩", name: "South Korean Won" },
  MXN: { code: "MXN", symbol: "Mex$", name: "Mexican Peso" },
  NOK: { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
  NZD: { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
  RUB: { code: "RUB", symbol: "₽", name: "Russian Ruble" },
  SEK: { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  SGD: { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  TRY: { code: "TRY", symbol: "₺", name: "Turkish Lira" },
  USD: { code: "USD", symbol: "$", name: "US Dollar" },
  ZAR: { code: "ZAR", symbol: "R", name: "South African Rand" },
});


export type Currency = keyof typeof currencies;

export interface Event {
  id:string;
  userId: string;
  name: string;
  description: string;
  currency: Currency;
  imageUrl?: string;
  // expenses array removed for performance
}

export interface EventWithSubcollections extends Event {
    expenses: Expense[];
}