export function safeAdd(num1: number, num2: number, decimalPlaces = 2) {
  const result = (num1 + num2).toFixed(decimalPlaces);
  return Number(result);
}

export function safeSub(num1: number, num2: number, decimalPlaces = 2) {
  const result = (num1 - num2).toFixed(decimalPlaces);
  return Number(result);
}
