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
      className="resource-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden group"
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
      {/* Image Container - Fixed Height */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img 
          src={resource.thumbnail} 
          alt={resource.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-purple-600 text-white px-3 py-1 rounded text-xs font-medium">
            {resource.category}
          </span>
        </div>
        
        {/* Duration Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-gray-800 text-white px-3 py-1 rounded text-xs font-medium">
            {resource.duration}m
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {resource.title}
        </h3>
      </div>
    </div>
  );
};
