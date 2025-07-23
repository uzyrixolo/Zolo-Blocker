export function analyzeOrder(order) {
  // Example: Flag if order is COD and has suspicious patterns
  const isCOD = order.gateway && order.gateway.toLowerCase().includes('cod');
  const suspiciousName = order.customer && /test|script|bot/i.test(order.customer.first_name);

  if (isCOD && suspiciousName) {
    return {
      flagged: true,
      reason: 'Suspicious COD order (possible automation/script)',
    };
  }

  if (isCOD) {
    return {
      flagged: true,
      reason: 'COD order',
    };
  }

  return { flagged: false };
}