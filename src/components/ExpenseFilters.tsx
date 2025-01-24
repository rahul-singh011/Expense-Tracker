import React from 'react';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { categories } from '../data';
import { DateRange, SortField, SortOrder } from '../types';

interface ExpenseFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  sortConfig: { field: SortField; order: SortOrder };
  setSortConfig: (config: { field: SortField; order: SortOrder }) => void;
}

export function ExpenseFilters({
  selectedCategory,
  setSelectedCategory,
  dateRange,
  setDateRange,
  sortConfig,
  setSortConfig,
}: ExpenseFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Filters & Sorting</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <div className="flex gap-2">
            <select
              value={sortConfig.field}
              onChange={(e) => setSortConfig({ ...sortConfig, field: e.target.value as SortField })}
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="description">Description</option>
              <option value="category">Category</option>
            </select>
            <button
              onClick={() => setSortConfig({ 
                ...sortConfig, 
                order: sortConfig.order === 'asc' ? 'desc' : 'asc' 
              })}
              className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              {sortConfig.order === 'asc' ? (
                <SortAsc className="w-5 h-5" />
              ) : (
                <SortDesc className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}