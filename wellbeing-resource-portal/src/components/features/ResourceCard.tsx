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
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {resource.title}
        </h3>
      </div>
    </Card>
  );
};
