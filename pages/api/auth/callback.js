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
  try {
    const callback = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const { session } = callback;

    // Register the webhook
    await shopify.webhooks.register({
      session,
      path: '/api/webhooks/orders_create',
      topic: 'ORDERS_CREATE',
      webhookHandler: async (topic, shop, body) => {
        // You can process the webhook here if needed
      },
    });

    // Redirect to billing
    res.redirect(`/api/billing?shop=${session.shop}&accessToken=${session.accessToken}`);
  } catch (e) {
    res.status(500).send(e.message);
  }
}