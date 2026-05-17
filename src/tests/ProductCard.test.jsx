import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import ProductCard from '../components/ProductCard'

const mockProduct = {
  id: '1',
  name: 'Matte Lipstick',
  description: 'Long-lasting matte finish lipstick.',
  category: 'Lips',
  price: 18.00,
  image: 'https://placehold.co/300x200',
  shade: 'Deep Red',
  inStock: true
}

describe('ProductCard', () => {
  it('displays the product name', () => {
    render(<MemoryRouter><ProductCard product={mockProduct} /></MemoryRouter>)
    expect(screen.getByText('Matte Lipstick')).toBeInTheDocument()
  })

  it('displays the price correctly', () => {
    render(<MemoryRouter><ProductCard product={mockProduct} /></MemoryRouter>)
    expect(screen.getByText('$18.00')).toBeInTheDocument()
  })

  it('displays the shade', () => {
    render(<MemoryRouter><ProductCard product={mockProduct} /></MemoryRouter>)
    expect(screen.getByText('Shade: Deep Red')).toBeInTheDocument()
  })

  it('shows out of stock when inStock is false', () => {
    render(<MemoryRouter><ProductCard product={{ ...mockProduct, inStock: false }} /></MemoryRouter>)
    expect(screen.getByText('Out of Stock')).toBeInTheDocument()
  })
})