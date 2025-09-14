import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchAndFilter } from '../features/SearchAndFilter';
import { mockResources } from '../../data/mockData';

describe('SearchAndFilter', () => {
  it('should render all filter controls', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter resources={mockResources} onFiltersChange={mockOnFiltersChange} />);
    
    expect(screen.getByPlaceholderText('Search resources title or')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Category')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Ascending')).toBeInTheDocument();
  });

  it('should display current filter values', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter resources={mockResources} onFiltersChange={mockOnFiltersChange} />);
    
    expect(screen.getByDisplayValue('')).toBeInTheDocument(); // search term
    expect(screen.getByDisplayValue('All')).toBeInTheDocument(); // category
    expect(screen.getByDisplayValue('Category')).toBeInTheDocument(); // sort by
    expect(screen.getByDisplayValue('Ascending')).toBeInTheDocument(); // sort order
  });

  it('should call onFiltersChange when search term changes', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter resources={mockResources} onFiltersChange={mockOnFiltersChange} />);
    
    const searchInput = screen.getByPlaceholderText('Search resources title or');
    fireEvent.change(searchInput, { target: { value: 'mindfulness' } });
    
    // The component should call onFiltersChange with filtered resources
    expect(mockOnFiltersChange).toHaveBeenCalled();
  });

  it('should call onFiltersChange when category changes', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter resources={mockResources} onFiltersChange={mockOnFiltersChange} />);
    
    const categorySelect = screen.getByDisplayValue('All');
    fireEvent.change(categorySelect, { target: { value: 'Podcasts' } });
    
    expect(mockOnFiltersChange).toHaveBeenCalled();
  });

  it('should call onFiltersChange when sort by changes', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter resources={mockResources} onFiltersChange={mockOnFiltersChange} />);
    
    const sortBySelect = screen.getByDisplayValue('Category');
    fireEvent.change(sortBySelect, { target: { value: 'date' } });
    
    expect(mockOnFiltersChange).toHaveBeenCalled();
  });

  it('should call onFiltersChange when sort order changes', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter resources={mockResources} onFiltersChange={mockOnFiltersChange} />);
    
    const sortOrderSelect = screen.getByDisplayValue('Ascending');
    fireEvent.change(sortOrderSelect, { target: { value: 'desc' } });
    
    expect(mockOnFiltersChange).toHaveBeenCalled();
  });

  it('should display all category options', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter resources={mockResources} onFiltersChange={mockOnFiltersChange} />);
    
    const categorySelect = screen.getByDisplayValue('All');
    const options = categorySelect.querySelectorAll('option');
    
    expect(options).toHaveLength(7); // All + 6 categories
    expect(Array.from(options).map(opt => opt.textContent)).toEqual([
      'All',
      'Podcasts',
      'Articles',
      'Newsletters',
      'Recipes',
      'Fitness',
      'Meditation'
    ]);
  });
});
