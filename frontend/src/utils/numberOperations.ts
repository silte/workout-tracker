export const sumNumbers = (
  number1: number | undefined,
  number2: number | undefined
): number => {
  const escapedNumber1 = typeof number1 !== "undefined" ? number1 : 0;
  const escapedNumber2 = typeof number2 !== "undefined" ? number2 : 0;
  return escapedNumber1 + escapedNumber2;
};
