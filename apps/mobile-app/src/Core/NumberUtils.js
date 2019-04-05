export function numberFormatMaxDecimalPlaces(number, decimalPlaces = 2) {
  return +parseFloat(number).toFixed(decimalPlaces);
}