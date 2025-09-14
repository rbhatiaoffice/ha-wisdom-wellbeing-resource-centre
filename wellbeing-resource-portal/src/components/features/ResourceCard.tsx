import React from 'react';
import { Card, Badge } from '../ui';
import type { Resource } from '../../types/resource';

interface ResourceCardProps {
  resource: Resource;
  onClick: (resource: Resource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick }) => {
  const handleClick = () => {
    onClick(resource);
  };

  return (
    <Card 
      className="resource-card overflow-hidden group"
      hover
      onClick={handleClick}
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
          <Badge variant="primary" size="sm">
            {resource.category}
          </Badge>
        </div>
        
        {/* Duration Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" size="sm">
            {resource.duration}m
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
          {resource.title}
        </h3>
        
        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {resource.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full font-medium bg-primary-100 text-primary-800 px-2 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="inline-flex items-center rounded-full font-medium bg-gray-100 text-gray-600 px-2 py-1 text-xs">
                +{resource.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
