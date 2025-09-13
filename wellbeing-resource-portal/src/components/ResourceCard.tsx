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
      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden hover:-translate-y-1 group max-w-sm mx-auto"
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
      <div className="h-48 overflow-hidden relative">
        <img 
          src={resource.thumbnail} 
          alt={resource.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-white/95 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-md text-xs font-medium shadow-sm">
            {resource.category}
          </span>
        </div>
        {/* Duration Badge */}
        <div className="absolute top-2 right-2">
          <span className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium">
            {resource.duration}min
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {resource.title}
        </h3>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {resource.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center">
            <span className="mr-1">📅</span>
            {new Date(resource.date_uploaded).toLocaleDateString()}
          </span>
          <span className="text-blue-600 font-medium group-hover:text-blue-700">
            View →
          </span>
        </div>
      </div>
    </div>
  );
};
