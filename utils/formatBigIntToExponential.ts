export const formatBigIntToExponential = (value: bigint): string => {
  if (typeof value !== 'bigint') {
    throw new Error(
      'Argument must be a bigint, but a ' + typeof value + ' was supplied.',
    );
  }

  const isNegative = value < 0;
  if (isNegative) value = -value; // Using the absolute value for the digits.

  const str = value.toString();

  const exp = str.length - 1;
  if (exp == 0) return (isNegative ? '-' : '') + str + 'e+0';

  const mantissaDigits = str.replace(/(0+)$/, ''); // Remove any mathematically insignificant zeroes.

  // Use the single first digit for the integral part of the mantissa, and all following digits for the fractional part (if any).
  let mantissa = mantissaDigits.charAt(0);
  if (mantissaDigits.length > 1) {
    mantissa += '.' + mantissaDigits.substring(1);
  }

  return (isNegative ? '-' : '') + mantissa.slice(0, 3) + 'e+' + exp.toString();
};
