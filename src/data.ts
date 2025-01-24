import { ExpenseCategory, Budget } from './types';
import { DollarSign, Car, Film, ShoppingBag, Receipt, Package } from 'lucide-react';

export const categories: ExpenseCategory[] = [
  { name: 'Food', color: 'bg-blue-500', icon: 'DollarSign' },
  { name: 'Transportation', color: 'bg-green-500', icon: 'Car' },
  { name: 'Entertainment', color: 'bg-purple-500', icon: 'Film' },
  { name: 'Shopping', color: 'bg-yellow-500', icon: 'ShoppingBag' },
  { name: 'Bills', color: 'bg-red-500', icon: 'Receipt' },
  { name: 'Other', color: 'bg-gray-500', icon: 'Package' },
];

export const defaultBudgets: Budget[] = [
  { category: 'Food', limit: 500, period: 'monthly', color: 'bg-blue-500' },
  { category: 'Transportation', limit: 300, period: 'monthly', color: 'bg-green-500' },
  { category: 'Entertainment', limit: 200, period: 'monthly', color: 'bg-purple-500' },
  { category: 'Shopping', limit: 400, period: 'monthly', color: 'bg-yellow-500' },
  { category: 'Bills', limit: 1000, period: 'monthly', color: 'bg-red-500' },
];

export const icons = {
  DollarSign,
  Car,
  Film,
  ShoppingBag,
  Receipt,
  Package,
};