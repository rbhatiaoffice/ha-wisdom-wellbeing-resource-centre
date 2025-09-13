import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResourceCard } from '../ResourceCard';
import type { Resource } from '../../types/resource';

const mockResource: Resource = {
  id: "001",
  category: "Podcasts",
  title: "Mindful Moments",
  thumbnail: "https://example.com/image1.jpg",
  tags: ["wellbeing", "mindfulness", "relaxation"],
  duration: 25,
  description: "A calming podcast focused on mindfulness techniques.",
  date_uploaded: "2025-07-10"
};

describe('ResourceCard', () => {
  it('should render resource information correctly', () => {
    const mockOnClick = vi.fn();
    
    render(<ResourceCard resource={mockResource} onClick={mockOnClick} />);
    
    expect(screen.getByText('Mindful Moments')).toBeInTheDocument();
    expect(screen.getByText('Podcasts')).toBeInTheDocument();
    expect(screen.getByText('25min')).toBeInTheDocument();
    expect(screen.getByText('wellbeing')).toBeInTheDocument();
    expect(screen.getByText('mindfulness')).toBeInTheDocument();
    expect(screen.getByText('relaxation')).toBeInTheDocument();
  });

  it('should call onClick when card is clicked', () => {
    const mockOnClick = vi.fn();
    
    render(<ResourceCard resource={mockResource} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(mockOnClick).toHaveBeenCalledWith(mockResource);
  });

  it('should call onClick when Enter key is pressed', () => {
    const mockOnClick = vi.fn();
    
    render(<ResourceCard resource={mockResource} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    
    expect(mockOnClick).toHaveBeenCalledWith(mockResource);
  });

  it('should call onClick when Space key is pressed', () => {
    const mockOnClick = vi.fn();
    
    render(<ResourceCard resource={mockResource} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: ' ' });
    
    expect(mockOnClick).toHaveBeenCalledWith(mockResource);
  });

  it('should display only first 3 tags', () => {
    const resourceWithManyTags: Resource = {
      ...mockResource,
      tags: ["tag1", "tag2", "tag3", "tag4", "tag5"]
    };
    
    const mockOnClick = vi.fn();
    
    render(<ResourceCard resource={resourceWithManyTags} onClick={mockOnClick} />);
    
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
    expect(screen.getByText('tag3')).toBeInTheDocument();
    expect(screen.queryByText('tag4')).not.toBeInTheDocument();
    expect(screen.queryByText('tag5')).not.toBeInTheDocument();
  });

  it('should display formatted date', () => {
    const mockOnClick = vi.fn();
    
    render(<ResourceCard resource={mockResource} onClick={mockOnClick} />);
    
    // The date should be formatted and displayed (format may vary by locale)
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    const mockOnClick = vi.fn();
    
    render(<ResourceCard resource={mockResource} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabIndex', '0');
  });
});
