export const validateValue = (value, regExp) => {
  let result = '';
  for (const char of value) {
    if (char.match(regExp)) result += char;
  }
  return result;
};
