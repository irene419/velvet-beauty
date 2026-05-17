const CATEGORIES = ['Lips', 'Eyes', 'Face', 'Skincare']

function SearchSidebar({ searchTerm, setSearchTerm, selectedCategories, setSelectedCategories }) {

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  return (
    <aside
      className="w-52 flex-shrink-0 rounded-lg p-5"
      style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
    >
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none mb-6"
        style={{ backgroundColor: '#2a2a2a', color: '#f5f5f5', border: '1px solid #444' }}
      />

      <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: '#e0a0b0' }}>
        CATEGORY
      </p>

      <div className="space-y-3">
        {CATEGORIES.map(category => (
          <label
            key={category}
            className="flex items-center gap-2 text-sm cursor-pointer"
            style={{ color: '#aaa' }}
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryToggle(category)}
              className="accent-pink-400"
            />
            {category}
          </label>
        ))}
      </div>
    </aside>
  )
}

export default SearchSidebar