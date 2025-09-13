import React from 'react';
import type { Resource } from '../types/resource';

interface ResourceCardProps {
  resource: Resource;
  onClick: (resource: Resource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick }) => {
  const handleClick = () => {
    onClick(resource);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 overflow-hidden hover:-translate-y-1"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={resource.thumbnail} 
          alt={resource.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
          {resource.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {resource.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-1">⏱️</span>
          {resource.duration} min
        </div>
      </div>
    </div>
  );
};
