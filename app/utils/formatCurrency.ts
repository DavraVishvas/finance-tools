/**
 * Formats a number as Indian Rupee (INR) currency.
 * @param value The numerical value to format
 * @param maximumFractionDigits The maximum number of decimal places (default is 0)
 * @returns The formatted currency string (e.g., ₹5,000)
 */
export function formatCurrency(value: number, maximumFractionDigits: number = 0): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits,
    }).format(value);
}
