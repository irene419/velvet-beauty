import { useState, useEffect } from 'react'


const API_URL = 'http://localhost:3001/products'

function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products')
        return res.json()
      })
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // POST - add a new product
  const addProduct = (newProduct) => {
    return fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
      .then(res => res.json())
      .then(added => {
        setProducts(prev => [...prev, added])
        return added
      })
  }

  // PATCH - update an existing product
  const updateProduct = (id, updatedFields) => {
    return fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    })
      .then(res => res.json())
      .then(updated => {
        setProducts(prev =>
          prev.map(p => p.id === id ? updated : p)
        )
        return updated
      })
  }

  // DELETE - remove a product
  const deleteProduct = (id) => {
    return fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        setProducts(prev => prev.filter(p => p.id !== id))
      })
  }

  return { products, loading, error, addProduct, updateProduct, deleteProduct }
}

export default useProducts