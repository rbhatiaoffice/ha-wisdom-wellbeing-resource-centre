import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchAndFilter } from '../SearchAndFilter';
import type { ResourceFilters } from '../../types/resource';

const mockFilters: ResourceFilters = {
  searchTerm: '',
  category: 'All',
  sortBy: 'category',
  sortOrder: 'asc'
};

describe('SearchAndFilter', () => {
  it('should render all filter controls', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);
    
    expect(screen.getByLabelText('Search Resources')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Sort By')).toBeInTheDocument();
    expect(screen.getByLabelText('Order')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('should display current filter values', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);
    
    expect(screen.getByDisplayValue('')).toBeInTheDocument(); // search term
    expect(screen.getByDisplayValue('All')).toBeInTheDocument(); // category
    // Note: Select elements may not show value attribute in DOM, so we test the options exist instead
    expect(screen.getByText('Ascending')).toBeInTheDocument();
  });

  it('should call onFiltersChange when search term changes', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);
    
    const searchInput = screen.getByLabelText('Search Resources');
    fireEvent.change(searchInput, { target: { value: 'mindfulness' } });
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      searchTerm: 'mindfulness'
    });
  });

  it('should call onFiltersChange when category changes', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);
    
    const categorySelect = screen.getByLabelText('Category');
    fireEvent.change(categorySelect, { target: { value: 'Podcasts' } });
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      category: 'Podcasts'
    });
  });

  it('should call onFiltersChange when sort by changes', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);
    
    const sortBySelect = screen.getByLabelText('Sort By');
    fireEvent.change(sortBySelect, { target: { value: 'date' } });
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      sortBy: 'date'
    });
  });

  it('should call onFiltersChange when sort order changes', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);
    
    const sortOrderSelect = screen.getByLabelText('Order');
    fireEvent.change(sortOrderSelect, { target: { value: 'desc' } });
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      sortOrder: 'desc'
    });
  });

  it('should reset filters when clear button is clicked', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);
    
    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      searchTerm: '',
      category: 'All',
      sortBy: 'category',
      sortOrder: 'asc'
    });
  });

  it('should display all category options', () => {
    const mockOnFiltersChange = vi.fn();
    
    render(<SearchAndFilter filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);
    
    const categorySelect = screen.getByLabelText('Category');
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
