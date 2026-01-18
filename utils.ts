
/**
 * Formats currency to match the German style with Euro symbol (e.g., 1.840 €)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\s/g, ' '); // Keep space before € sign as per German standard
};
