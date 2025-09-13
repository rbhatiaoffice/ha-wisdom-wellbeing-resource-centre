// Core resource interface based on the provided JSON structure
export interface Resource {
  id: string;
  category: ResourceCategory;
  title: string;
  thumbnail: string;
  tags: string[];
  duration: number; // in minutes
  description: string;
  date_uploaded: string; // ISO date string
}

// Resource categories as specified in the requirements
export type ResourceCategory = 
  | 'Podcasts'
  | 'Articles'
  | 'Newsletters'
  | 'Recipes'
  | 'Fitness'
  | 'Meditation';

// Filter interface for search and sorting functionality
export interface ResourceFilters {
  searchTerm: string;
  category: ResourceCategory | 'All';
  sortBy: 'category' | 'date';
  sortOrder: 'asc' | 'desc';
}

// Grouped resources for category-based display
export interface ResourceGroup {
  category: ResourceCategory;
  resources: Resource[];
}
