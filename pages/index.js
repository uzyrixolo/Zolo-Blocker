import { useEffect, useState } from 'react';
import { Page, Card, DataTable } from '@shopify/polaris';

export default function Home() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/flagged-orders')
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <Page title="COD Order Analyzer">
      <Card title="Flagged Orders" sectioned>
        <DataTable
          columnContentTypes={['text', 'text', 'text', 'text']}
          headings={['Order ID', 'Customer', 'Reason', 'Created At']}
          rows={orders.map(o => [o.id, o.customer, o.reason, o.created_at])}
        />
      </Card>
    </Page>
  );
}