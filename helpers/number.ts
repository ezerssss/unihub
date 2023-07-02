// TODO: add more parameters like currency sign, number of decimal places, etc...
export function formatNumber(num: number) {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
