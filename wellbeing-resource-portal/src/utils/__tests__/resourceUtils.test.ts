import { describe, it, expect } from 'vitest';
import { 
  filterResources, 
  sortResources, 
  groupResourcesByCategory, 
  getAllCategories 
} from '../resourceUtils';
import type { Resource, ResourceFilters } from '../../types/resource';

// Mock data for testing
const mockResources: Resource[] = [
  {
    id: "001",
    category: "Podcasts",
    title: "Mindful Moments",
    thumbnail: "https://example.com/image1.jpg",
    tags: ["wellbeing", "mindfulness", "relaxation"],
    duration: 25,
    description: "A calming podcast focused on mindfulness techniques.",
    date_uploaded: "2025-07-10"
  },
  {
    id: "002",
    category: "Articles",
    title: "The Science of Sleep",
    thumbnail: "https://example.com/image2.jpg",
    tags: ["wellbeing", "sleep", "science"],
    duration: 8,
    description: "Explore the latest research on sleep.",
    date_uploaded: "2025-06-22"
  },
  {
    id: "003",
    category: "Podcasts",
    title: "Wellness Weekly",
    thumbnail: "https://example.com/image3.jpg",
    tags: ["community", "tips", "mindfulness"],
    duration: 5,
    description: "Weekly wellness tips and updates.",
    date_uploaded: "2025-08-01"
  }
];

describe('resourceUtils', () => {
  describe('filterResources', () => {
    it('should return all resources when no filters applied', () => {
      const filters: ResourceFilters = {
        searchTerm: '',
        category: 'All',
        sortBy: 'category',
        sortOrder: 'asc'
      };
      
      const result = filterResources(mockResources, filters);
      expect(result).toHaveLength(3);
    });

    it('should filter by category', () => {
      const filters: ResourceFilters = {
        searchTerm: '',
        category: 'Podcasts',
        sortBy: 'category',
        sortOrder: 'asc'
      };
      
      const result = filterResources(mockResources, filters);
      expect(result).toHaveLength(2);
      expect(result.every(r => r.category === 'Podcasts')).toBe(true);
    });

    it('should filter by search term in title', () => {
      const filters: ResourceFilters = {
        searchTerm: 'sleep',
        category: 'All',
        sortBy: 'category',
        sortOrder: 'asc'
      };
      
      const result = filterResources(mockResources, filters);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Science of Sleep');
    });

    it('should filter by search term in tags', () => {
      const filters: ResourceFilters = {
        searchTerm: 'mindfulness',
        category: 'All',
        sortBy: 'category',
        sortOrder: 'asc'
      };
      
      const result = filterResources(mockResources, filters);
      expect(result).toHaveLength(2);
      expect(result.every(r => r.tags.includes('mindfulness'))).toBe(true);
    });

    it('should combine category and search filters', () => {
      const filters: ResourceFilters = {
        searchTerm: 'mindfulness',
        category: 'Podcasts',
        sortBy: 'category',
        sortOrder: 'asc'
      };
      
      const result = filterResources(mockResources, filters);
      expect(result).toHaveLength(2);
      expect(result.every(r => r.category === 'Podcasts' && r.tags.includes('mindfulness'))).toBe(true);
    });
  });

  describe('sortResources', () => {
    it('should sort by category ascending', () => {
      const result = sortResources(mockResources, 'category', 'asc');
      expect(result[0].category).toBe('Articles');
      expect(result[1].category).toBe('Podcasts');
      expect(result[2].category).toBe('Podcasts');
    });

    it('should sort by category descending', () => {
      const result = sortResources(mockResources, 'category', 'desc');
      expect(result[0].category).toBe('Podcasts');
      expect(result[1].category).toBe('Podcasts');
      expect(result[2].category).toBe('Articles');
    });

    it('should sort by date ascending', () => {
      const result = sortResources(mockResources, 'date', 'asc');
      expect(result[0].date_uploaded).toBe('2025-06-22');
      expect(result[1].date_uploaded).toBe('2025-07-10');
      expect(result[2].date_uploaded).toBe('2025-08-01');
    });

    it('should sort by date descending', () => {
      const result = sortResources(mockResources, 'date', 'desc');
      expect(result[0].date_uploaded).toBe('2025-08-01');
      expect(result[1].date_uploaded).toBe('2025-07-10');
      expect(result[2].date_uploaded).toBe('2025-06-22');
    });
  });

  describe('groupResourcesByCategory', () => {
    it('should group resources by category', () => {
      const result = groupResourcesByCategory(mockResources);
      
      expect(result).toHaveLength(2);
      
      const podcastsGroup = result.find(g => g.category === 'Podcasts');
      const articlesGroup = result.find(g => g.category === 'Articles');
      
      expect(podcastsGroup?.resources).toHaveLength(2);
      expect(articlesGroup?.resources).toHaveLength(1);
    });

    it('should sort groups by category name', () => {
      const result = groupResourcesByCategory(mockResources);
      expect(result[0].category).toBe('Articles');
      expect(result[1].category).toBe('Podcasts');
    });
  });

  describe('getAllCategories', () => {
    it('should return all available categories', () => {
      const categories = getAllCategories();
      expect(categories).toEqual([
        'Podcasts',
        'Articles', 
        'Newsletters',
        'Recipes',
        'Fitness',
        'Meditation'
      ]);
    });
  });
});
