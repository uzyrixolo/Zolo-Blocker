import { analyzeOrder } from '../../../lib/analysis';
import { notifyAdmin } from '../../../lib/notify';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(process.cwd(), 'flagged_orders.json');

function saveFlaggedOrder(order, reason) {
  let orders = [];
  if (fs.existsSync(DATA_FILE)) {
    orders = JSON.parse(fs.readFileSync(DATA_FILE));
  }
  orders.push({
    id: order.id,
    customer: order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : 'Unknown',
    reason,
    created_at: order.created_at,
  });
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const order = req.body;
  const analysis = analyzeOrder(order);

  if (analysis.flagged) {
    await notifyAdmin(order, analysis.reason);
    saveFlaggedOrder(order, analysis.reason);
    console.log(`Flagged order ${order.id}: ${analysis.reason}`);
  }

  res.status(200).send('Webhook received');
}