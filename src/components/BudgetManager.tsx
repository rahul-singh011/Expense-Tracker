import React, { useState } from 'react';
import { Wallet, Plus, X } from 'lucide-react';
import { Budget } from '../types';
import { categories } from '../data';

interface BudgetManagerProps {
  budgets: Budget[];
  onUpdateBudgets: (budgets: Budget[]) => void;
}

export function BudgetManager({ budgets, onUpdateBudgets }: BudgetManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newBudget, setNewBudget] = useState<Partial<Budget>>({
    period: 'monthly',
  });

  const handleAddBudget = () => {
    if (!newBudget.category || !newBudget.limit) return;

    const category = categories.find(c => c.name === newBudget.category);
    const budget: Budget = {
      category: newBudget.category,
      limit: Number(newBudget.limit),
      period: newBudget.period as 'monthly' | 'yearly',
      color: category?.color || 'bg-gray-500',
    };

    onUpdateBudgets([...budgets, budget]);
    setIsAdding(false);
    setNewBudget({ period: 'monthly' });
  };

  const handleRemoveBudget = (category: string) => {
    onUpdateBudgets(budgets.filter(b => b.category !== category));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Budget Management</h2>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isAdding ? 'Cancel' : 'Add Budget'}
        </button>
      </div>

      {isAdding && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-md">
          <select
            value={newBudget.category || ''}
            onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories
              .filter((cat) => !budgets.find((b) => b.category === cat.name))
              .map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>
          <input
            type="number"
            placeholder="Budget Limit"
            value={newBudget.limit || ''}
            onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newBudget.period || 'monthly'}
            onChange={(e) => setNewBudget({ ...newBudget, period: e.target.value })}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button
            onClick={handleAddBudget}
            className="md:col-span-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Add Budget
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {budgets.map((budget) => {
          const category = categories.find((c) => c.name === budget.category);
          return (
            <div
              key={budget.category}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-md"
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${category?.color}`} />
                <div>
                  <h3 className="font-medium">{budget.category}</h3>
                  <p className="text-sm text-gray-500">
                    ${budget.limit.toFixed(2)} / {budget.period}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveBudget(budget.category)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}