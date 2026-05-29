import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

['.env.local', '.env'].forEach((name) => {
  const file = resolve(process.cwd(), name);
  if (!existsSync(file)) return;

  readFileSync(file, 'utf8').split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) return;
    const [key, ...valueParts] = trimmed.split('=');
    const value = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '');
    if (!process.env[key]) process.env[key] = value;
  });
});

const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN || process.env.REACT_APP_SHOPIFY_STORE_DOMAIN;
const token = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN || process.env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN;
const apiVersion = process.env.VITE_SHOPIFY_API_VERSION || process.env.REACT_APP_SHOPIFY_API_VERSION || '2026-04';

if (!domain || !token) {
  console.error('Missing Shopify env vars.');
  process.exit(1);
}

const apiUrl = `https://${domain}/api/${apiVersion}/graphql.json`;

async function shopifyFetch(query, variables = {}) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const result = await response.json();
  if (result.errors?.length) throw new Error(result.errors.map((error) => error.message).join(', '));
  return result.data;
}

const productsData = await shopifyFetch(`
  query FindAvailableVariant {
    products(first: 20) {
      edges {
        node {
          title
          handle
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`);

const product = productsData.products.edges
  .map((edge) => edge.node)
  .find((item) => item.variants.edges.some((variant) => variant.node.availableForSale));

const variant = product?.variants.edges.find((edge) => edge.node.availableForSale)?.node;

if (!product || !variant) {
  console.error('No available product variant found in the Storefront API.');
  process.exit(1);
}

const cartData = await shopifyFetch(`
  mutation CreateCartWithLine($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        cost { totalAmount { amount currencyCode } }
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product { title handle }
                }
              }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`, { lines: [{ merchandiseId: variant.id, quantity: 1 }] });

const errors = cartData.cartCreate.userErrors || [];
if (errors.length) {
  console.error('Cart creation returned user errors:');
  errors.forEach((error) => console.error(`- ${error.message}`));
  process.exit(1);
}

const cart = cartData.cartCreate.cart;

console.log(`Cart flow passed for ${domain}.`);
console.log(`Added: ${product.title} (${product.handle})`);
console.log(`Line count: ${cart.lines.edges.length}`);
console.log(`Total: ${cart.cost.totalAmount.amount} ${cart.cost.totalAmount.currencyCode}`);
console.log(`Checkout URL: ${cart.checkoutUrl ? 'available' : 'missing'}`);
