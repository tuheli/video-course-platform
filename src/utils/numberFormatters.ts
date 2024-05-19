const locale = 'en-US';
const currency = 'EUR';

export const currencyFormatter = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: currency,
});

export const format = (value: number) => {
  return value.toLocaleString(locale);
};
