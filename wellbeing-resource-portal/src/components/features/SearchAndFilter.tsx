import React from 'react';
import { Input, Select } from '../ui';
import { useResourceFilters } from '../../hooks';
import { CATEGORY_OPTIONS, SORT_OPTIONS, SORT_ORDER_OPTIONS } from '../../constants/filters';
import { SEARCH_CONFIG } from '../../constants/app';
import type { Resource } from '../../types/resource';

interface SearchAndFilterProps {
  resources: Resource[];
  onFiltersChange: (resources: Resource[]) => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ 
  resources, 
  onFiltersChange 
}) => {
  const { filters, filteredAndSortedResources, updateFilters } = useResourceFilters(resources);

  // Notify parent component when filters change
  React.useEffect(() => {
    onFiltersChange(filteredAndSortedResources);
  }, [filteredAndSortedResources, onFiltersChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ searchTerm: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ category: e.target.value as any });
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ sortBy: e.target.value as 'category' | 'date' });
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ sortOrder: e.target.value as 'asc' | 'desc' });
  };

  return (
    <div className="mb-8">
      <div className="search-filter-container">
        <div className="flex flex-col items-center gap-4">
          {/* Search and Category Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-2xl">
            {/* Search Input */}
            <div className="flex-1">
              <Input
                type="search"
                placeholder={SEARCH_CONFIG.PLACEHOLDER}
                value={filters.searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>

            {/* Category Filter */}
            <div className="w-32">
              <Select
                value={filters.category}
                onChange={handleCategoryChange}
                options={CATEGORY_OPTIONS}
                className="filter-select w-full"
              />
            </div>
          </div>

          {/* Sort Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <span className="filter-label">Sort:</span>
              <Select
                value={filters.sortBy}
                onChange={handleSortByChange}
                options={SORT_OPTIONS}
                className="filter-select"
              />
            </div>

            {/* Sort Order */}
            <Select
              value={filters.sortOrder}
              onChange={handleSortOrderChange}
              options={SORT_ORDER_OPTIONS}
              className="filter-select"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
