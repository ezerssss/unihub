// TODO: add more parameters like currency sign, number of decimal places, etc...
export function formatNumber(num: number, decimals = 2) {
  return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
