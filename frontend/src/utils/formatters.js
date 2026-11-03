/**
 * Formats ISO date string (e.g. 2026-12-15) to human-readable Indian style (15 Dec 2026)
 */
export function formatDate(dateStr, fallback = 'To be announced') {
  if (!dateStr) return fallback;
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
      }
    }
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return fallback;
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return fallback;
  }
}

/**
 * Formats vacancies count with commas and plural suffix
 */
export function formatVacancies(count, fallback = 'As per rules') {
  if (count === undefined || count === null || count === '') return fallback;
  const num = Number(count);
  if (isNaN(num) || num <= 0) return fallback;
  return `${num.toLocaleString('en-IN')} Posts`;
}

/**
 * Formats application fee
 */
export function formatFee(amount) {
  if (amount === 0 || amount === '0') return '₹0 / Exempted';
  if (!amount) return 'Refer Notification';
  if (typeof amount === 'number') return `₹${amount.toLocaleString('en-IN')}`;
  return amount.startsWith('₹') ? amount : `₹${amount}`;
}

/**
 * Truncates string with ellipsis
 */
export function truncate(text, max = 80) {
  if (!text) return '';
  if (text.length <= max) return text;
  return text.substring(0, max).trim() + '...';
}

