import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategorySection } from './CategorySection';
import { SearchAndFilter } from './SearchAndFilter';
import { mockResources } from '../data/mockData';
import { groupResourcesByCategory, filterResources, sortResources } from '../utils/resourceUtils';
import type { Resource, ResourceFilters } from '../types/resource';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState<ResourceFilters>({
    searchTerm: '',
    category: 'All',
    sortBy: 'category',
    sortOrder: 'asc'
  });
  
  const handleResourceClick = (resource: Resource) => {
    navigate(`/resource/${resource.id}`);
  };

  const filteredAndSortedResources = useMemo(() => {
    const filtered = filterResources(mockResources, filters);
    const sorted = sortResources(filtered, filters.sortBy, filters.sortOrder);
    return sorted;
  }, [filters]);

  const groupedResources = groupResourcesByCategory(filteredAndSortedResources);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-black" style={{fontFamily: 'serif'}}>Resource Centre</h1>
            <p className="text-sm text-black" style={{fontFamily: 'serif'}}>Supporting your wellbeing journey</p>
          </div>
          <p className="text-center text-gray-600 mb-8">physical and mental wellbeing.</p>
        </header>


        {/* Search and Filter */}
        <SearchAndFilter 
          filters={filters} 
          onFiltersChange={setFilters} 
        />

        {/* Resources by Category */}
        <main>
          {groupedResources.length > 0 ? (
            groupedResources.map((group) => (
              <CategorySection
                key={group.category}
                category={group.category}
                resources={group.resources}
                onResourceClick={handleResourceClick}
              />
            ))
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-500 text-xl mb-4">No resources found</div>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
