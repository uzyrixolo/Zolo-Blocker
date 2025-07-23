import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SHOPIFY_SCOPES.split(','),
  hostName: process.env.SHOPIFY_APP_URL.replace(/^https?:\/\//, ''),
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
});

export default async function handler(req, res) {
  const { shop, accessToken } = req.query;
  if (!shop || !accessToken) {
    return res.status(400).send('Missing shop or accessToken');
  }

  const response = await fetch(`https://${shop}/admin/api/${LATEST_API_VERSION}/recurring_application_charges.json`, {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recurring_application_charge: {
        name: 'COD Order Analyzer Pro',
        price: 9.99,
        return_url: `${process.env.SHOPIFY_APP_URL}/?shop=${shop}`,
        test: true // Set to false for production
      }
    }),
  });

  const data = await response.json();
  if (data.recurring_application_charge && data.recurring_application_charge.confirmation_url) {
    return res.redirect(data.recurring_application_charge.confirmation_url);
  } else {
    return res.status(500).send('Failed to create charge');
  }
}