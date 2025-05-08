export const getRandomBigInt = (length = 1) => {
  let result = '';

  for (let i = 0; i < length; i++) {
    result += `${Math.floor(Math.random() * 10)}`;
  }

  return BigInt(result);
};
