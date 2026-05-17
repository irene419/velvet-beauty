import { useState } from 'react'
import SearchSidebar from '../components/SearchSidebar'
import ProductCard from '../components/ProductCard'
import useProducts from '../hooks/useProducts'

function Shop() {
  const { products, loading, error } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category)

    return matchesSearch && matchesCategory
  })

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <p className="text-pink-300 text-xl">Loading products...</p>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center py-32">
      <p className="text-red-400">Error: {error} — Is the server running? Try: npm run server</p>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-widest mb-8" style={{ color: '#f5f5f5' }}>
        ALL PRODUCTS
        <span className="text-sm font-normal ml-3" style={{ color: '#888' }}>
          ({filteredProducts.length} items)
        </span>
      </h1>

      <div className="flex gap-6">
        {/* Sidebar */}
        <SearchSidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        {/* Product grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20" style={{ color: '#888' }}>
              No products found. Try a different search!
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Shop