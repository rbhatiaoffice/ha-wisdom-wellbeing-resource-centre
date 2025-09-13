import { Resource, ResourceCategory, ResourceFilters, ResourceGroup } from '../types/resource';

export const filterResources = (resources: Resource[], filters: ResourceFilters): Resource[] => {
  let filtered = [...resources];

  // Filter by category
  if (filters.category !== 'All') {
    filtered = filtered.filter(resource => resource.category === filters.category);
  }

  // Filter by search term (title and tags)
  if (filters.searchTerm.trim()) {
    const searchLower = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(resource => 
      resource.title.toLowerCase().includes(searchLower) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  return filtered;
};

export const sortResources = (resources: Resource[], sortBy: 'category' | 'date', sortOrder: 'asc' | 'desc'): Resource[] => {
  const sorted = [...resources].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'category') {
      comparison = a.category.localeCompare(b.category);
    } else if (sortBy === 'date') {
      comparison = new Date(a.date_uploaded).getTime() - new Date(b.date_uploaded).getTime();
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sorted;
};

export const groupResourcesByCategory = (resources: Resource[]): ResourceGroup[] => {
  const grouped = resources.reduce((acc, resource) => {
    const existingGroup = acc.find(group => group.category === resource.category);
    
    if (existingGroup) {
      existingGroup.resources.push(resource);
    } else {
      acc.push({
        category: resource.category,
        resources: [resource]
      });
    }

    return acc;
  }, [] as ResourceGroup[]);

  // Sort groups by category name
  return grouped.sort((a, b) => a.category.localeCompare(b.category));
};

export const getAllCategories = (): ResourceCategory[] => {
  return ['Podcasts', 'Articles', 'Newsletters', 'Recipes', 'Fitness', 'Meditation'];
};
