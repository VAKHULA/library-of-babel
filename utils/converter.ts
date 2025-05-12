export const generatePage = (
  page: string,
  characterSet: string,
  numCharsPerPage: number,
): string => {
  let state = BigInt(page);
  let output = '';
  let isValuable = true

  const length = BigInt(characterSet.length);

  for (let i = 0; i < numCharsPerPage; i++) {
    const operation: bigint = state % length;

    output =isValuable ?  output + characterSet[Number(operation.toString())] : characterSet[Number(operation.toString())] + output
    state = state / length; // it should be Math.floor(state / length) if number
    isValuable = state === BigInt(0)
  }

  return output;
};

export const search = (query: string, characterSet: string): bigint => {
  let state = BigInt(0);

  for (const c of query) {
    const operation = BigInt(characterSet.indexOf(c));
    state = state * BigInt(characterSet.length) + operation;
  }

  return state;
};
