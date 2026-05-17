import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Home() {
  const [storeInfo, setStoreInfo] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/store_info')
      .then(res => res.json())
      .then(data => setStoreInfo(data[0]))
      .catch(err => console.error('Could not load store info:', err))
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <div
        className="flex flex-col items-center justify-center text-center py-40 px-4"
        style={{ backgroundColor: '#0d0d0d', minHeight: '70vh' }}
      >
        {/* Decorative line */}
        <div className="w-16 h-px mb-6" style={{ backgroundColor: '#e0a0b0' }}></div>

        <h1 className="text-6xl font-bold tracking-widest mb-4" style={{ color: '#f5f5f5' }}>
          {storeInfo ? storeInfo.name.toUpperCase() : 'VELVET BEAUTY'}
        </h1>

        <div className="w-16 h-px mb-6" style={{ backgroundColor: '#e0a0b0' }}></div>

        <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-10">
          {storeInfo ? storeInfo.description : 'Your go-to store for premium skincare and makeup'}
        </p>

        <div className="flex gap-4">
          <Link
            to="/shop"
            className="px-10 py-3 text-sm font-medium tracking-widest transition-colors"
            style={{ backgroundColor: '#e0a0b0', color: '#0d0d0d' }}
          >
            SHOP NOW
          </Link>
          <Link
            to="/admin"
            className="px-10 py-3 text-sm font-medium tracking-widest border transition-colors"
            style={{ borderColor: '#e0a0b0', color: '#e0a0b0' }}
          >
            ADMIN
          </Link>
        </div>
      </div>

      {/* Store info strip */}
      {storeInfo && (
        <div className="py-8 px-4" style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid #333' }}>
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-12 text-sm">
            <div className="text-center">
              <span className="block font-semibold tracking-widest mb-1" style={{ color: '#e0a0b0' }}>PHONE</span>
              <span className="text-gray-400">{storeInfo.phone_number}</span>
            </div>
            <div className="text-center">
              <span className="block font-semibold tracking-widest mb-1" style={{ color: '#e0a0b0' }}>EMAIL</span>
              <span className="text-gray-400">{storeInfo.email}</span>
            </div>
            <div className="text-center">
              <span className="block font-semibold tracking-widest mb-1" style={{ color: '#e0a0b0' }}>LOCATION</span>
              <span className="text-gray-400">{storeInfo.address}</span>
            </div>
          </div>
        </div>
      )}

      {/* Categories section */}
      <div className="py-16 px-4" style={{ backgroundColor: '#111' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl font-bold tracking-widest mb-10" style={{ color: '#f5f5f5' }}>
            SHOP BY CATEGORY
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Lips', 'Eyes', 'Face', 'Skincare'].map(cat => (
              <Link
                to="/shop"
                key={cat}
                className="py-8 text-center rounded-lg text-sm font-medium tracking-widest transition-all hover:scale-105"
                style={{ backgroundColor: '#1a1a1a', color: '#e0a0b0', border: '1px solid #333' }}
              >
                {cat.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home