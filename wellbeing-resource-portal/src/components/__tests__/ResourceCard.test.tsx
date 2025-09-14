import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResourceCard } from '../features/ResourceCard';
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
    expect(screen.getByText(/25\s*m/)).toBeInTheDocument();
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

  it('should display image with correct alt text', () => {
    const mockOnClick = vi.fn();
    
    render(<ResourceCard resource={mockResource} onClick={mockOnClick} />);
    
    const image = screen.getByAltText('Mindful Moments');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  it('should have proper card structure', () => {
    const mockOnClick = vi.fn();
    
    render(<ResourceCard resource={mockResource} onClick={mockOnClick} />);
    
    // Check that the card has the proper structure
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Mindful Moments')).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    const mockOnClick = vi.fn();
    
    render(<ResourceCard resource={mockResource} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabIndex', '0');
  });
});
