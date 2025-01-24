import React from 'react';
import { PieChart, BarChart2 } from 'lucide-react';
import { Expense } from '../types';
import { categories } from '../data';

interface ExpenseChartProps {
  expenses: Expense[];
  view: 'category' | 'timeline';
  setView: (view: 'category' | 'timeline') => void;
}

export function ExpenseChart({ expenses, view, setView }: ExpenseChartProps) {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const timelineTotals = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    acc[date] = (acc[date] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const renderCategoryChart = () => {
    const total = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
    return (
      <div className="grid grid-cols-1 gap-4">
        {categories.map((category) => {
          const amount = categoryTotals[category.name] || 0;
          const percentage = total > 0 ? (amount / total) * 100 : 0;
          return (
            <div key={category.name} className="flex items-center gap-4">
              <div className="w-32 text-sm">{category.name}</div>
              <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${category.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-32 text-right text-sm">
                ${amount.toFixed(2)} ({percentage.toFixed(1)}%)
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderTimelineChart = () => {
    const maxAmount = Math.max(...Object.values(timelineTotals));
    return (
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(timelineTotals).map(([date, amount]) => {
          const percentage = maxAmount > 0 ? (amount / maxAmount) * 100 : 0;
          return (
            <div key={date} className="flex items-center gap-4">
              <div className="w-32 text-sm">{date}</div>
              <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-32 text-right text-sm">${amount.toFixed(2)}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Expense Analysis</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setView('category')}
            className={`p-2 rounded-md ${
              view === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <PieChart className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView('timeline')}
            className={`p-2 rounded-md ${
              view === 'timeline' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <BarChart2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      {view === 'category' ? renderCategoryChart() : renderTimelineChart()}
    </div>
  );
}