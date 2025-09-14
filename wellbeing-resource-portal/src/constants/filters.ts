import type { ResourceCategory } from '../types/resource';

export const SORT_OPTIONS = [
  { value: 'category', label: 'Category' },
  { value: 'date', label: 'Date' },
] as const;

export const SORT_ORDER_OPTIONS = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
] as const;

export const CATEGORY_OPTIONS: Array<{ value: ResourceCategory | 'All'; label: string }> = [
  { value: 'All', label: 'All' },
  { value: 'Podcasts', label: 'Podcasts' },
  { value: 'Articles', label: 'Articles' },
  { value: 'Newsletters', label: 'Newsletters' },
  { value: 'Recipes', label: 'Recipes' },
  { value: 'Fitness', label: 'Fitness' },
  { value: 'Meditation', label: 'Meditation' },
];
