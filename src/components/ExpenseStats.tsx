import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Expense } from '../types';

interface ExpenseStatsProps {
  expenses: Expense[];
}

export function ExpenseStats({ expenses }: ExpenseStatsProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  const highestExpense = expenses.length > 0 ? Math.max(...expenses.map(e => e.amount)) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Expenses</p>
            <p className="text-2xl font-semibold text-gray-900">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-blue-500 bg-opacity-10 rounded-full">
            <DollarSign className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Average Expense</p>
            <p className="text-2xl font-semibold text-gray-900">${averageExpense.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-green-500 bg-opacity-10 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Highest Expense</p>
            <p className="text-2xl font-semibold text-gray-900">${highestExpense.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-red-500 bg-opacity-10 rounded-full">
            <TrendingDown className="w-6 h-6 text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
}