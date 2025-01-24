export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
  tags?: string[];
}

export interface Budget {
  category: string;
  limit: number;
  period: 'monthly' | 'yearly';
  color: string;
}

export type ExpenseCategory = {
  name: string;
  color: string;
  icon?: string;
  budget?: number;
};

export type DateRange = {
  startDate: string;
  endDate: string;
};

export type SortField = 'date' | 'amount' | 'description' | 'category';
export type SortOrder = 'asc' | 'desc';

export type Period = 'all' | 'yearly' | 'monthly' | 'weekly' | 'daily';