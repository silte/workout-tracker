export const roundToThousands = (number: number) =>
  Math.round(number / 1000) * 1000;
export const roundToSingleDecimal = (number: number): number =>
  Math.round(number * 10) / 10;
