import getCreditTypes from 'credit-card-type';

export default (cardNumber) => {
  const cardTypes = getCreditTypes(cardNumber);
  if (cardTypes.length !== 1) {
    return {
      cardNumberGaps: [4, 8, 12],
      cardNumberMinLength: 16,
      cardNumberMaxLength: 16,
      securityCodeSize: 3
    };
  }
  const cardType = cardTypes[0];

  return {
    service: cardType.type,
    cardNumberGaps: cardType.gaps,
    cardNumberMinLength: cardType.lengths[0],
    cardNumberMaxLength: cardType.lengths[cardType.lengths.length - 1],
    securityCodeSize: cardType.code.size
  };
};
