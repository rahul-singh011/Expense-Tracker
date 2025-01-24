import React, { useState, useMemo, useEffect } from 'react';
import { Receipt } from 'lucide-react';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseStats } from './components/ExpenseStats';
import { ExpenseFilters } from './components/ExpenseFilters';
import { ExpenseChart } from './components/ExpenseChart';
import { BudgetManager } from './components/BudgetManager';
import { Expense, DateRange, SortField, SortOrder, Budget } from './types';
import { defaultBudgets } from './data';

// Load data from localStorage
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => 
    loadFromStorage('expenses', [])
  );
  const [budgets, setBudgets] = useState<Budget[]>(() => 
    loadFromStorage('budgets', defaultBudgets)
  );
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: '',
    endDate: '',
  });
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    order: SortOrder;
  }>({
    field: 'date',
    order: 'desc',
  });
  const [chartView, setChartView] = useState<'category' | 'timeline'>('category');

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  const addExpense = (expense: Expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const filteredAndSortedExpenses = useMemo(() => {
    return expenses
      .filter(expense => {
        const matchesCategory = !selectedCategory || expense.category === selectedCategory;
        const matchesDateRange = (!dateRange.startDate || expense.date >= dateRange.startDate) &&
          (!dateRange.endDate || expense.date <= dateRange.endDate);
        return matchesCategory && matchesDateRange;
      })
      .sort((a, b) => {
        const order = sortConfig.order === 'asc' ? 1 : -1;
        switch (sortConfig.field) {
          case 'date':
            return (new Date(a.date).getTime() - new Date(b.date).getTime()) * order;
          case 'amount':
            return (a.amount - b.amount) * order;
          case 'description':
            return a.description.localeCompare(b.description) * order;
          case 'category':
            return a.category.localeCompare(b.category) * order;
          default:
            return 0;
        }
      });
  }, [expenses, selectedCategory, dateRange, sortConfig]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center mb-8">
          <Receipt className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
        </div>

        <ExpenseStats 
          expenses={filteredAndSortedExpenses}
          budgets={budgets}
        />
        <BudgetManager
          budgets={budgets}
          onUpdateBudgets={setBudgets}
        />
        <ExpenseChart 
          expenses={filteredAndSortedExpenses}
          view={chartView}
          setView={setChartView}
        />
        <ExpenseFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          dateRange={dateRange}
          setDateRange={setDateRange}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
        />
        <ExpenseForm onAddExpense={addExpense} />
        <ExpenseList 
          expenses={filteredAndSortedExpenses}
          onDeleteExpense={deleteExpense}
        />
      </div>
    </div>
  );
}

export default App;