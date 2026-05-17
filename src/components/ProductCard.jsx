import { useNavigate } from 'react-router-dom'

function ProductCard({ product }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/shop/${product.id}`)}
      className="rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-2xl"
      style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <span className="text-xs tracking-widest font-medium" style={{ color: '#e0a0b0' }}>
          {product.category.toUpperCase()}
        </span>
        <h3 className="font-semibold mt-1 mb-1" style={{ color: '#f5f5f5' }}>
          {product.name}
        </h3>
        <p className="text-xs mb-2 line-clamp-2" style={{ color: '#888' }}>
          {product.description}
        </p>
        {product.shade !== 'N/A' && (
          <p className="text-xs mb-2" style={{ color: '#aaa' }}>Shade: {product.shade}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold" style={{ color: '#e0a0b0' }}>${product.price.toFixed(2)}</span>
          {!product.inStock && (
            <span className="text-xs text-red-400">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard