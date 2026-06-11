// ─── CalAda & Co — Shopify Storefront API Service ───────────────────────────
const env = import.meta.env;
const DOMAIN = env.VITE_SHOPIFY_STORE_DOMAIN || env.REACT_APP_SHOPIFY_STORE_DOMAIN;
const TOKEN = env.VITE_SHOPIFY_STOREFRONT_TOKEN || env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = env.VITE_SHOPIFY_API_VERSION || env.REACT_APP_SHOPIFY_API_VERSION || '2026-04';

function getShopifyConfig() {
  if (!DOMAIN || !TOKEN) {
    throw new Error(
      'Missing Shopify Storefront env vars. Add VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN to .env, then restart Vite.'
    );
  }
  return {
    apiUrl: `https://${DOMAIN}/api/${API_VERSION}/graphql.json`,
    token: TOKEN,
  };
}

async function shopifyFetch(query, variables = {}) {
  const { apiUrl, token } = getShopifyConfig();
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data;
}

function throwOnUserErrors(result, label = 'Shopify request') {
  const errors = result?.userErrors || result?.customerUserErrors || [];
  if (errors.length > 0) {
    throw new Error(errors.map((e) => e.message).join(', ') || `${label} failed`);
  }
}

// ─── Shared cart fields ───────────────────────────────────────────────────────
// Single source of truth for what we fetch on every cart operation.
// attributes { key value } powers gift card personalization in the cart drawer.
const CART_FIELDS = `
  id checkoutUrl
  cost { totalAmount { amount currencyCode } subtotalAmount { amount currencyCode } }
  lines(first: 20) {
    edges {
      node {
        id
        quantity
        attributes { key value }
        merchandise {
          ... on ProductVariant {
            id title
            price { amount currencyCode }
            product {
              title handle
              images(first: 1) { edges { node { url altText } } }
            }
          }
        }
      }
    }
  }
`;

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts({ first = 12, after = null, query = '' } = {}) {
  const data = await shopifyFetch(`
    query GetProducts($first: Int!, $after: String, $query: String) {
      products(first: $first, after: $after, query: $query) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            id handle title
            priceRange { minVariantPrice { amount currencyCode } }
            compareAtPriceRange { minVariantPrice { amount currencyCode } }
            tags
            images(first: 2) {
              edges { node { url altText } }
            }
            variants(first: 1) {
              edges {
                node {
                  id title availableForSale
                  selectedOptions { name value }
                  price { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  `, { first, after, query });
  return data.products;
}

export async function getProductByHandle(handle) {
  const data = await shopifyFetch(`
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id handle title description
        tags
        priceRange { minVariantPrice { amount currencyCode } }
        compareAtPriceRange { minVariantPrice { amount currencyCode } }
        images(first: 10) {
          edges { node { url altText } }
        }
        variants(first: 50) {
          edges {
            node {
              id title availableForSale
              selectedOptions { name value }
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
            }
          }
        }
        options { name values }
      }
    }
  `, { handle });
  return data.productByHandle;
}

// ─── Collections ─────────────────────────────────────────────────────────────

export async function getCollections(first = 10) {
  const data = await shopifyFetch(`
    query GetCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id handle title
            image { url altText }
            description
          }
        }
      }
    }
  `, { first });
  return data.collections.edges.map(e => e.node);
}

export async function getCollectionByHandle(handle, first = 12) {
  const data = await shopifyFetch(`
    query GetCollection($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        id handle title description
        image { url altText }
        products(first: $first) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id handle title tags
              priceRange { minVariantPrice { amount currencyCode } }
              compareAtPriceRange { minVariantPrice { amount currencyCode } }
              images(first: 2) {
                edges { node { url altText } }
              }
              variants(first: 1) {
                edges {
                  node {
                    id title availableForSale
                    selectedOptions { name value }
                    price { amount currencyCode }
                  }
                }
              }
            }
          }
        }
      }
    }
  `, { handle, first });
  return data.collectionByHandle;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function createCart() {
  const data = await shopifyFetch(`
    mutation CreateCart {
      cartCreate {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `);
  throwOnUserErrors(data.cartCreate, 'Create cart');
  return data.cartCreate.cart;
}

// attributes: array of { key, value } — used for gift card personalization
export async function addToCart(cartId, variantId, quantity = 1, attributes = []) {
  const data = await shopifyFetch(`
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `, {
    cartId,
    lines: [{
      merchandiseId: variantId,
      quantity,
      attributes,           // ← gift card personalization flows through here
    }],
  });
  throwOnUserErrors(data.cartLinesAdd, 'Add to cart');
  return data.cartLinesAdd.cart;
}

export async function updateCartLine(cartId, lineId, quantity) {
  const data = await shopifyFetch(`
    mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `, { cartId, lines: [{ id: lineId, quantity }] });
  throwOnUserErrors(data.cartLinesUpdate, 'Update cart');
  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId, lineIds) {
  const data = await shopifyFetch(`
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `, { cartId, lineIds });
  throwOnUserErrors(data.cartLinesRemove, 'Remove from cart');
  return data.cartLinesRemove.cart;
}

export async function getCart(cartId) {
  const data = await shopifyFetch(`
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ${CART_FIELDS} }
    }
  `, { cartId });
  return data.cart;
}

// ─── Customer Auth ────────────────────────────────────────────────────────────

export async function customerCreate(firstName, lastName, email, password) {
  const data = await shopifyFetch(`
    mutation CustomerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id email firstName lastName }
        customerUserErrors { field message code }
      }
    }
  `, { input: { firstName, lastName, email, password } });
  return data.customerCreate;
}

export async function customerLogin(email, password) {
  const data = await shopifyFetch(`
    mutation CustomerLogin($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { field message code }
      }
    }
  `, { input: { email, password } });
  return data.customerAccessTokenCreate;
}

export async function customerLogout(accessToken) {
  const data = await shopifyFetch(`
    mutation CustomerLogout($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        userErrors { field message }
      }
    }
  `, { customerAccessToken: accessToken });
  return data.customerAccessTokenDelete;
}

export async function getCustomer(accessToken) {
  const data = await shopifyFetch(`
    query GetCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id email firstName lastName phone
        defaultAddress {
          address1 address2 city province country zip
        }
        orders(first: 10) {
          edges {
            node {
              id orderNumber processedAt
              financialStatus fulfillmentStatus
              currentTotalPrice { amount currencyCode }
              lineItems(first: 5) {
                edges { node { title quantity } }
              }
            }
          }
        }
      }
    }
  `, { customerAccessToken: accessToken });
  return data.customer;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatPrice(amount, currencyCode = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: currencyCode,
  }).format(parseFloat(amount));
}

export function isBestSeller(product) {
  return product.tags?.includes('best-seller') || product.tags?.includes('bestseller');
}

export function isNew(product) {
  return product.tags?.includes('new') || product.tags?.includes('new-arrival');
}