export const getNumberOfPermutations = (
  numberOfItems: number,
  numberOfRepetitions: number,
): bigint => BigInt(numberOfItems) ** BigInt(numberOfRepetitions);
