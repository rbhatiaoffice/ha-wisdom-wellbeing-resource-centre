export const APP_CONFIG = {
  name: 'HA Wisdom Wellbeing',
  title: 'Resource Centre',
  tagline: 'Supporting your wellbeing journey',
  description: 'physical and mental wellbeing.',
  version: '1.0.0',
  environment: process.env.NODE_ENV || 'development',
} as const;

export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  retries: 3,
} as const;

export const UI_CONFIG = {
  itemsPerPage: 12,
  searchDebounceMs: 300,
  animationDuration: 200,
} as const;
