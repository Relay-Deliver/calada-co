import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ENV_FILES = ['.env.local', '.env'];

function loadEnvFile(file) {
  if (!existsSync(file)) return;

  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;

    const [key, ...valueParts] = trimmed.split('=');
    const value = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '');
    if (!process.env[key]) process.env[key] = value;
  }
}

ENV_FILES.forEach((file) => loadEnvFile(resolve(process.cwd(), file)));

const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN || process.env.REACT_APP_SHOPIFY_STORE_DOMAIN;
const token = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN || process.env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN;
const apiVersion = process.env.VITE_SHOPIFY_API_VERSION || process.env.REACT_APP_SHOPIFY_API_VERSION || '2026-04';

if (!domain || !token) {
  console.error('Missing Shopify env vars.');
  console.error('Add VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN to .env.local, then rerun this command.');
  process.exit(1);
}

const apiUrl = `https://${domain}/api/${apiVersion}/graphql.json`;

const query = `
  query CheckStorefront {
    products(first: 5) {
      edges {
        node {
          id
          title
          handle
          onlineStoreUrl
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 1) { edges { node { url altText } } }
          variants(first: 1) { edges { node { id availableForSale } } }
        }
      }
    }
    collections(first: 5) {
      edges { node { title handle } }
    }
  }
`;

const response = await fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token,
  },
  body: JSON.stringify({ query }),
});

if (!response.ok) {
  console.error(`Shopify Storefront request failed with HTTP ${response.status}.`);
  console.error('Check the store domain, Storefront token, and Storefront API permissions.');
  process.exit(1);
}

const result = await response.json();

if (result.errors?.length) {
  console.error('Shopify returned GraphQL errors:');
  result.errors.forEach((error) => console.error(`- ${error.message}`));
  process.exit(1);
}

const products = result.data?.products?.edges?.map((edge) => edge.node) || [];
const collections = result.data?.collections?.edges?.map((edge) => edge.node) || [];

console.log(`Connected to Shopify Storefront API for ${domain}.`);
console.log(`Products visible to storefront: ${products.length}`);

products.forEach((product) => {
  const price = product.priceRange?.minVariantPrice;
  const variant = product.variants?.edges?.[0]?.node;
  const image = product.images?.edges?.[0]?.node;
  console.log(`- ${product.title} (${product.handle}) ${price ? `${price.amount} ${price.currencyCode}` : ''}`);
  console.log(`  variant: ${variant?.id ? 'yes' : 'missing'}, available: ${variant?.availableForSale ?? 'unknown'}, image: ${image?.url ? 'yes' : 'missing'}`);
});

console.log(`Collections visible to storefront: ${collections.length}`);
collections.forEach((collection) => {
  console.log(`- ${collection.title} (${collection.handle})`);
});
