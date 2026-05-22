# CalAda & Co — React Storefront

Custom React frontend for CalAda & Co, connected to Shopify via the Storefront API.

## Setup

1. Clone the repo
2. Copy `.env.example` to `.env` and fill in your credentials:
   ```
   REACT_APP_SHOPIFY_STORE_DOMAIN=calada-co.myshopify.com
   REACT_APP_SHOPIFY_STOREFRONT_TOKEN=your-token-here
   REACT_APP_SHOPIFY_API_VERSION=2026-04
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── components/
│   ├── layout/        # AnnouncementBar, Navbar, Footer
│   ├── cart/          # CartDrawer
│   └── product/       # ProductCard
├── context/
│   ├── CartContext.js # Global cart state
│   └── AuthContext.js # Customer auth state
├── pages/
│   ├── HomePage.js
│   ├── ShopPage.js
│   ├── ProductPage.js
│   ├── AboutPage.js
│   ├── ContactPage.js
│   └── Account*.js
├── services/
│   └── shopify.js     # All Shopify Storefront API calls
└── styles/
    └── globals.css    # Brand design system
```

## Tech Stack
- React 18 + React Router v6
- Shopify Storefront API (2026-04)
- Custom CSS with CalAda & Co brand tokens (pink & navy)

## Shopify Store
- Store: calada-co.myshopify.com
- Domain: www.caladaco.com
- API Version: 2026-04
