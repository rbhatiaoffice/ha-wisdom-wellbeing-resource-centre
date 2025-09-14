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
      <div className="flex items-center gap-4 mb-6">
        <div className="w-1 h-8 bg-red-500"></div>
        <h2 className="text-3xl font-bold text-black" style={{fontFamily: 'serif'}}>{category}</h2>
        <span className="text-sm text-gray-500">{resources.length} items</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
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
