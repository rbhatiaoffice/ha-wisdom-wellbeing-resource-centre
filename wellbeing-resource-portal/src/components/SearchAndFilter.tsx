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
    <div className="mb-8">
      <div className="search-filter-container">
        <div className="flex flex-col items-center gap-4">
          {/* Search and Category Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-2xl">
            {/* Search Input */}
            <div className="flex-1">
              <input
                id="search"
                type="text"
                placeholder="Search resources title or"
                value={filters.searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>

            {/* Category Filter */}
            <div className="w-32">
              <select
                id="category"
                value={filters.category}
                onChange={handleCategoryChange}
                className="filter-select w-full"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <span className="filter-label">Sort:</span>
              <select
                id="sortBy"
                value={filters.sortBy}
                onChange={handleSortByChange}
                className="filter-select"
              >
                <option value="category">Category</option>
                <option value="date">Date</option>
              </select>
            </div>

            {/* Sort Order */}
            <select
              id="sortOrder"
              value={filters.sortOrder}
              onChange={handleSortOrderChange}
              className="filter-select"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
