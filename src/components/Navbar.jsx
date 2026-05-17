import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <nav style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #333' }} className="px-8 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Brand name */}
        <Link to="/" className="text-xl font-bold tracking-widest" style={{ color: '#e0a0b0' }}>
          VELVET BEAUTY
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium tracking-wide transition-colors ${
              isActive('/') ? 'text-pink-300 border-b border-pink-300 pb-1' : 'text-gray-400 hover:text-pink-300'
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`text-sm font-medium tracking-wide transition-colors ${
              isActive('/shop') ? 'text-pink-300 border-b border-pink-300 pb-1' : 'text-gray-400 hover:text-pink-300'
            }`}
          >
            Shop
          </Link>
          <Link
            to="/admin"
            className={`text-sm font-medium tracking-wide transition-colors ${
              isActive('/admin') ? 'text-pink-300 border-b border-pink-300 pb-1' : 'text-gray-400 hover:text-pink-300'
            }`}
          >
            Admin Portal
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar