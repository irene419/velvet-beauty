import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import AdminPortal from '../pages/AdminPortal'

vi.mock('../hooks/useProducts', () => ({
  default: () => ({
    products: [],
    loading: false,
    error: null,
    addProduct: vi.fn().mockResolvedValue({ id: '99' })
  })
}))

describe('AdminPortal', () => {
  it('renders the admin portal heading', () => {
    render(<MemoryRouter><AdminPortal /></MemoryRouter>)
    expect(screen.getByText('ADMIN PORTAL')).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<MemoryRouter><AdminPortal /></MemoryRouter>)
    expect(screen.getByText('ADD PRODUCT')).toBeInTheDocument()
  })

  it('shows validation error when name is empty', () => {
    render(<MemoryRouter><AdminPortal /></MemoryRouter>)
    fireEvent.click(screen.getByText('ADD PRODUCT'))
    expect(screen.getByText('Product name is required')).toBeInTheDocument()
  })

  it('allows typing in the product name field', () => {
    render(<MemoryRouter><AdminPortal /></MemoryRouter>)
    const input = screen.getByPlaceholderText('e.g. Matte Lipstick')
    fireEvent.change(input, { target: { value: 'Velvet Blush' } })
    expect(input.value).toBe('Velvet Blush')
  })
})