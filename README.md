# HA Wisdom Wellbeing Resource Centre

A wellness resource portal built with React and TypeScript. Browse podcasts, articles, recipes, and more in a clean, searchable interface.

## Quick Start

```bash
git clone https://github.com/rbhatiaoffice/ha-wisdom-wellbeing-resource-centre.git
cd ha-wisdom-wellbeing-resource-centre/wellbeing-resource-portal
npm install
npm run dev
```

Visit `http://localhost:5173`

## My Approach

**Feature-based Architecture**: Organized components by what they do - `features/` for business logic, `ui/` for reusable components, `layout/` for page structure.

**Test-First**: Wrote tests as I built features. 28 tests covering components and utilities.

**Mobile-First**: Everything works on phones first, then scales up.

## What's Done ✅

- Resource cards with images, categories, duration, and tags
- Search and filter functionality
- Category-based organization (Podcasts, Articles, Recipes, etc.)
- Responsive design with Tailwind CSS
- Loading states and error handling

## What's Left 🔄

- Real API integration (currently mock data)
- User authentication
- Favorites/bookmarks


## Tech Stack

React 19 + TypeScript + Tailwind CSS
