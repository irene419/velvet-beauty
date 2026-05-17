# Velvet Beauty 💄

A beauty store admin portal built with React and Vite.
This was my first time building a full React SPA with routing, 
a fake backend, and CRUD operations.

## What the app does

- Home page with store info
- Shop page where you can browse and search products
- Click on a product to view and edit its details
- Admin portal to add new products
- You can also delete products

## Tech I used

- React
- Vite
- Tailwind CSS
- React Router DOM
- JSON Server (for the fake backend)
- Vitest and React Testing Library (for tests)

## How to run it

First make sure you have Node.js installed.

1. Clone the repo
```bash
git clone https://github.com/your-username/velvet-beauty.git
cd velvet-beauty
```

2. Install dependencies
```bash
npm install
```

3. Start the fake backend (open a terminal for this)
```bash
npm run server
```

4. Start the app (open another terminal for this)
```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

## Pages and routes

- `/` - Home page
- `/shop` - All products with search and filter
- `/shop/:id` - Single product detail and edit
- `/admin` - Add a new product

## Folder structure
src/
├── components/
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── SearchSidebar.jsx
├── hooks/
│   └── useProducts.js
├── pages/
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetail.jsx
│   └── AdminPortal.jsx
└── tests/
├── Navbar.test.jsx
├── ProductCard.test.jsx
└── AdminPortal.test.jsx

## Known issues

- No real authentication on the admin portal
- Images are placeholders since we dont have real product photos
- Data resets if you delete db.json

## Author

Irene 