import { useState, useMemo } from 'react';
import type { Resource, ResourceFilters } from '../types/resource';
import { filterResources, sortResources } from '../utils/resourceUtils';

export const useResourceFilters = (resources: Resource[]) => {
  const [filters, setFilters] = useState<ResourceFilters>({
    searchTerm: '',
    category: 'All',
    sortBy: 'category',
    sortOrder: 'asc',
  });

  const filteredAndSortedResources = useMemo(() => {
    const filtered = filterResources(resources, filters);
    const sorted = sortResources(filtered, filters.sortBy, filters.sortOrder);
    return sorted;
  }, [resources, filters]);

  const updateFilters = (newFilters: Partial<ResourceFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      category: 'All',
      sortBy: 'category',
      sortOrder: 'asc',
    });
  };

  return {
    filters,
    filteredAndSortedResources,
    updateFilters,
    clearFilters,
  };
};
