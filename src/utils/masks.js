export const getCardNumberMask = (cardNumber, gaps, length) => {
  let result = '';
  for (let i = 0; i < cardNumber.length; i++) {
    if (i >= length) break;
    if (gaps.includes(i)) result += ' ';
    result += cardNumber[i];
  }
  return result;
};

export const getExpireDateMask = (expireDate) => {
  const month = expireDate.slice(0, 2);
  const year = expireDate.slice(2, 4);
  if (expireDate.length <= 2) return month;
  return `${month} / ${year}`;
};
