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
    let filtered = filterResources(mockResources, filters);
    let sorted = sortResources(filtered, filters.sortBy, filters.sortOrder);
    return sorted;
  }, [filters]);

  const groupedResources = groupResourcesByCategory(filteredAndSortedResources);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Wellbeing Resource Portal
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover wellness resources to support your physical and mental wellbeing. 
            Explore podcasts, articles, recipes, and more.
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
            <div className="text-xl font-bold text-blue-600">{mockResources.length}</div>
            <div className="text-sm text-gray-600">Resources</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
            <div className="text-xl font-bold text-green-600">{groupedResources.length}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
            <div className="text-xl font-bold text-purple-600">
              {mockResources.reduce((acc, r) => acc + r.duration, 0)}
            </div>
            <div className="text-sm text-gray-600">Minutes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
            <div className="text-xl font-bold text-orange-600">
              {new Set(mockResources.flatMap(r => r.tags)).size}
            </div>
            <div className="text-sm text-gray-600">Tags</div>
          </div>
        </div>

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
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">No resources found</div>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
