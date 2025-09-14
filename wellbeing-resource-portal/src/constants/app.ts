export const APP_CONFIG = {
  name: 'HA Wisdom Wellbeing',
  title: 'Resource Centre',
  tagline: 'Supporting your wellbeing journey',
  description: 'physical and mental wellbeing.',
} as const;

export const ROUTES = {
  HOME: '/',
  RESOURCE_DETAIL: '/resource/:id',
} as const;

export const SEARCH_CONFIG = {
  PLACEHOLDER: 'Search resources title or',
  MIN_SEARCH_LENGTH: 2,
} as const;
