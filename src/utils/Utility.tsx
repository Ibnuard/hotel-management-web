export const formatCurrency = (num: string) => {
  if (!num) return 'Rp 0';

  // Remove any non-digit characters
  let cleanNum = String(num).replace(/[^0-9]/g, '');

  // Allow a single leading zero or remove leading zeros
  if (cleanNum.startsWith('0') && cleanNum.length > 1) {
    cleanNum = cleanNum.replace(/^0+/, '');
  }

  // If the input is empty after removing zeros, reset to "0"
  if (cleanNum === '') cleanNum = '0';

  // Format the number with dots as thousand separators
  const formatted = cleanNum.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Add the 'Rp ' prefix
  return `Rp ${formatted}`;
};
