import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useProducts from '../hooks/useProducts'

function AdminPortal() {
  const navigate = useNavigate()
  const { addProduct } = useProducts()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Lips',
    price: '',
    shade: '',
    image: '',
    inStock: true
  })

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Product name is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Enter a valid price'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSubmitting(true)
    const newProduct = {
      ...formData,
      price: Number(formData.price),
      image: formData.image || `https://placehold.co/300x200/1a1a2e/ffffff?text=${encodeURIComponent(formData.name)}`
    }

    addProduct(newProduct)
      .then(added => navigate(`/shop/${added.id}`))
      .catch(() => setSubmitting(false))
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ backgroundColor: '#0d0d0d' }}>

      <div className="w-full max-w-lg rounded-2xl p-8"
        style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>

        <h1 className="text-2xl font-bold tracking-widest mb-1" style={{ color: '#f5f5f5' }}>
          ADMIN PORTAL
        </h1>
        <p className="text-sm mb-8" style={{ color: '#e0a0b0' }}>Add a new product to Velvet Beauty</p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Product Name */}
          <div>
            <label className="block text-xs tracking-widest mb-1" style={{ color: '#e0a0b0' }}>
              PRODUCT NAME
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Matte Lipstick"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{
                backgroundColor: '#2a2a2a',
                color: '#f5f5f5',
                border: errors.name ? '1px solid #f87171' : '1px solid #444'
              }}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs tracking-widest mb-1" style={{ color: '#e0a0b0' }}>
              CATEGORY
            </label>
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

          {/* Price and Shade */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-widest mb-1" style={{ color: '#e0a0b0' }}>
                PRICE ($)
              </label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
                style={{
                  backgroundColor: '#2a2a2a',
                  color: '#f5f5f5',
                  border: errors.price ? '1px solid #f87171' : '1px solid #444'
                }}
              />
              {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-xs tracking-widest mb-1" style={{ color: '#e0a0b0' }}>
                SHADE
              </label>
              <input
                type="text"
                name="shade"
                placeholder="e.g. Deep Red"
                value={formData.shade}
                onChange={handleChange}
                className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
                style={{ backgroundColor: '#2a2a2a', color: '#f5f5f5', border: '1px solid #444' }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs tracking-widest mb-1" style={{ color: '#e0a0b0' }}>
              DESCRIPTION
            </label>
            <textarea
              name="description"
              placeholder="Describe the product..."
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{
                backgroundColor: '#2a2a2a',
                color: '#f5f5f5',
                border: errors.description ? '1px solid #f87171' : '1px solid #444'
              }}
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs tracking-widest mb-1" style={{ color: '#e0a0b0' }}>
              IMAGE URL <span style={{ color: '#666' }}>(OPTIONAL)</span>
            </label>
            <input
              type="text"
              name="image"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{ backgroundColor: '#2a2a2a', color: '#f5f5f5', border: '1px solid #444' }}
            />
          </div>

          {/* In Stock */}
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#aaa' }}>
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="accent-pink-400"
            />
            In Stock
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg text-sm font-medium tracking-widest disabled:opacity-50 transition-colors mt-2"
            style={{ backgroundColor: '#e0a0b0', color: '#0d0d0d' }}
          >
            {submitting ? 'ADDING...' : 'ADD PRODUCT'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default AdminPortal