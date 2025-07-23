import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(process.cwd(), 'flagged_orders.json');

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }
  let orders = [];
  if (fs.existsSync(DATA_FILE)) {
    orders = JSON.parse(fs.readFileSync(DATA_FILE));
  }
  res.status(200).json(orders);
}