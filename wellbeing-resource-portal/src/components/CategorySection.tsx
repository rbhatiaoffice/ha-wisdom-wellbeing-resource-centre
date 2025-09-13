import React from 'react';
import type { Resource } from '../types/resource';
import { ResourceCard } from './ResourceCard';

interface CategorySectionProps {
  category: string;
  resources: Resource[];
  onResourceClick: (resource: Resource) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ 
  category, 
  resources, 
  onResourceClick 
}) => {
  if (resources.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-4">
          {category}
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
            {resources.length} {resources.length === 1 ? 'resource' : 'resources'}
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onClick={onResourceClick}
          />
        ))}
      </div>
    </section>
  );
};
