const positionsNumber = (minimum: number, maximum: number) =>
  Math.floor(Math.random() * (maximum - minimum) + 1);

export const randomPosition = (minimum: number, maximum: number): number[] => {
  let position: number[] = [];
  while (position.length !== 10) {
    const value = positionsNumber(minimum, maximum);
    if (!position.includes(value)) {
      position.push(value);
    }
  }
  return position;
};
