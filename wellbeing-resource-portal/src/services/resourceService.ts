import type { Resource } from '../types/resource';
import { mockResources } from '../data/mockData';

export class ResourceService {
  static async getAllResources(): Promise<Resource[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockResources);
      }, 100);
    });
  }

  static async getResourceById(id: string): Promise<Resource | null> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const resource = mockResources.find(r => r.id === id);
        resolve(resource || null);
      }, 100);
    });
  }

  static async getResourcesByCategory(category: string): Promise<Resource[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const resources = mockResources.filter(r => r.category === category);
        resolve(resources);
      }, 100);
    });
  }
}
