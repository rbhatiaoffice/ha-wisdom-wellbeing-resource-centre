import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Container } from './layout';
import { CategorySection, SearchAndFilter } from './features';
import { ResourceService } from '../services';
import { groupResourcesByCategory } from '../utils/resourceUtils';
import { APP_CONFIG } from '../constants/app';
import type { Resource } from '../types/resource';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const data = await ResourceService.getAllResources();
        setResources(data);
        setFilteredResources(data);
      } catch (error) {
        console.error('Failed to load resources:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const handleResourceClick = (resource: Resource) => {
    navigate(`/resource/${resource.id}`);
  };

  const handleFiltersChange = (filtered: Resource[]) => {
    setFilteredResources(filtered);
  };

  const groupedResources = groupResourcesByCategory(filteredResources);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Container>
        {/* Header */}
        <Header
          title={APP_CONFIG.title}
          tagline={APP_CONFIG.tagline}
        />
        <p className="text-center text-gray-600 mb-8">{APP_CONFIG.description}</p>

        {/* Search and Filter */}
        <SearchAndFilter 
          resources={resources}
          onFiltersChange={handleFiltersChange}
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
      </Container>
    </div>
  );
};
