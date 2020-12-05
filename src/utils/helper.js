export const getNumberLocale = (number) => {
  return Intl.NumberFormat().format(number);
};
