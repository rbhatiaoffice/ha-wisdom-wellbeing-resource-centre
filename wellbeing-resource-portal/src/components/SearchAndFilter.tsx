import React from 'react';
import type { ResourceFilters, ResourceCategory } from '../types/resource';

interface SearchAndFilterProps {
  filters: ResourceFilters;
  onFiltersChange: (filters: ResourceFilters) => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ 
  filters, 
  onFiltersChange 
}) => {
  const categories: (ResourceCategory | 'All')[] = [
    'All',
    'Podcasts',
    'Articles', 
    'Newsletters',
    'Recipes',
    'Fitness',
    'Meditation'
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchTerm: e.target.value
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      category: e.target.value as ResourceCategory | 'All'
    });
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      sortBy: e.target.value as 'category' | 'date'
    });
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      sortOrder: e.target.value as 'asc' | 'desc'
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchTerm: '',
      category: 'All',
      sortBy: 'category',
      sortOrder: 'asc'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Resources
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by title or tags..."
            value={filters.searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div className="lg:w-48">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="lg:w-32">
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={handleSortByChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="category">Category</option>
            <option value="date">Date</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="lg:w-32">
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-2">
            Order
          </label>
          <select
            id="sortOrder"
            value={filters.sortOrder}
            onChange={handleSortOrderChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Clear Filters */}
        <div className="lg:w-32 flex items-end">
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
