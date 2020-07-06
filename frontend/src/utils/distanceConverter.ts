export const metresToKilometres = (distance: number) => `${(distance / 1000).toFixed(2)} km`;

export const getRoundedMetres = (distance: number) => `${addThousandSeparatorsToNumberString(distance.toFixed(0))} m`;

const addThousandSeparatorsToNumberString = (numberStr: string) => numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
