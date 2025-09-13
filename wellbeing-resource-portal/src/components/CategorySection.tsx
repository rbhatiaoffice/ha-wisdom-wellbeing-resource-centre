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
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        {category}
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
          {resources.length}
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
