const locale = 'fi-FI';
const currency = 'EUR';

interface Duration {
  hours: number;
  minutes: number;
  seconds: number;
}

export const currencyFormatter = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: currency,
});

export const formatValue = (value: number) => {
  return value.toLocaleString(locale);
};

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString(locale);
};

export const getDuration = (durationSeconds: number): Duration => {
  const date = new Date(0);
  date.setSeconds(durationSeconds);

  const isoString = date.toISOString();

  // Cast to num to remove trailing zeroes
  const hours = Number(isoString.substring(11, 13));
  const minutes = Number(isoString.substring(14, 16));
  const seconds = Number(isoString.substring(17, 19));

  return { hours, minutes, seconds };
};
