import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({})
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    return () => { isMounted.current = false }
  }, [])

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then(data => {
        if (isMounted.current) {
          setProduct(data)
          setFormData(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (isMounted.current) setLoading(false)
      })
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }))
  }

  const handleSave = () => {
    setSaving(true)
    fetch(`http://localhost:3001/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(updated => {
        setProduct(updated)
        setEditMode(false)
        setSaving(false)
        setSuccessMsg('Product updated successfully! ✨')
        setTimeout(() => setSuccessMsg(''), 3000)
      })
  }

  const handleDelete = () => {
    if (!window.confirm(`Delete "${product.name}"?`)) return
    fetch(`http://localhost:3001/products/${id}`, { method: 'DELETE' })
      .then(() => navigate('/shop'))
  }

  if (loading) return (
    <div className="flex justify-center py-32">
      <p style={{ color: '#e0a0b0' }}>Loading...</p>
    </div>
  )

  if (!product) return (
    <div className="flex justify-center py-32">
      <p className="text-red-400">Product not found.</p>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/shop')}
        className="text-sm mb-6 flex items-center gap-1 hover:underline"
        style={{ color: '#e0a0b0' }}
      >
        ← Back to Shop
      </button>

      {successMsg && (
        <div className="rounded-lg px-4 py-3 mb-6 text-sm" style={{ backgroundColor: '#1a2e1a', color: '#86efac' }}>
          {successMsg}
        </div>
      )}

      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
        <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />

        <div className="p-6">
          {editMode ? (
            <div className="space-y-4">
              <h2 className="font-bold text-lg mb-2" style={{ color: '#f5f5f5' }}>
                Editing: {product.name}
              </h2>

              {[
                { label: 'Product Name', name: 'name', type: 'text' },
                { label: 'Price ($)', name: 'price', type: 'number' },
                { label: 'Shade', name: 'shade', type: 'text' },
              ].map(field => (
                <div key={field.name}>
                  <label className="text-xs mb-1 block" style={{ color: '#e0a0b0' }}>{field.label}</label>
                  <input
                    name={field.name}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
                    style={{ backgroundColor: '#2a2a2a', color: '#f5f5f5', border: '1px solid #444' }}
                  />
                </div>
              ))}

              <div>
                <label className="text-xs mb-1 block" style={{ color: '#e0a0b0' }}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
                  style={{ backgroundColor: '#2a2a2a', color: '#f5f5f5', border: '1px solid #444' }}
                >
                  {['Lips', 'Eyes', 'Face', 'Skincare'].map(cat => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs mb-1 block" style={{ color: '#e0a0b0' }}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
                  style={{ backgroundColor: '#2a2a2a', color: '#f5f5f5', border: '1px solid #444' }}
                />
              </div>

              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#aaa' }}>
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                  className="accent-pink-400"
                />
                In Stock
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                  style={{ backgroundColor: '#e0a0b0', color: '#0d0d0d' }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => { setEditMode(false); setFormData(product) }}
                  className="px-5 py-2 rounded-lg text-sm border"
                  style={{ borderColor: '#444', color: '#aaa' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <span className="text-xs tracking-widest" style={{ color: '#e0a0b0' }}>
                {product.category.toUpperCase()}
              </span>
              <h1 className="text-2xl font-bold mt-1 mb-2" style={{ color: '#f5f5f5' }}>
                {product.name}
              </h1>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#888' }}>
                {product.description}
              </p>

              <div className="flex gap-8 mb-2">
                <div>
                  <span className="text-xs block mb-1" style={{ color: '#666' }}>Price</span>
                  <span className="text-xl font-bold" style={{ color: '#e0a0b0' }}>
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                {product.shade !== 'N/A' && (
                  <div>
                    <span className="text-xs block mb-1" style={{ color: '#666' }}>Shade</span>
                    <span className="font-semibold" style={{ color: '#f5f5f5' }}>{product.shade}</span>
                  </div>
                )}
              </div>

              <p className="text-sm mb-6">
                {product.inStock
                  ? <span style={{ color: '#86efac' }}>✓ In Stock</span>
                  : <span className="text-red-400">✗ Out of Stock</span>
                }
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditMode(true)}
                  className="px-5 py-2 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: '#e0a0b0', color: '#0d0d0d' }}
                >
                  Edit Product
                </button>
                <button
                  onClick={handleDelete}
                  className="px-5 py-2 rounded-lg text-sm border border-red-800 text-red-400 hover:bg-red-950"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail