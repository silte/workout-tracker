const addThousandSeparatorsToNumberString = (numberStr: string) =>
  numberStr?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const metresToKilometres = (distance: number): string =>
  `${(distance / 1000)?.toFixed(2)} km`;

export const getRoundedMetres = (distance: number): string =>
  `${addThousandSeparatorsToNumberString(distance?.toFixed(0))} m`;
