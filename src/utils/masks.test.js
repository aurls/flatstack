import { getCardNumberMask, getExpireDateMask } from './masks';

describe('Masks', () => {
  describe('Card number mask', () => {
    test('Too long value', () => {
      const cardNumber = '12345678901234567890';
      const gaps = [4, 8, 12];
      const length = 16;
      const expectedResult = '1234 5678 9012 3456';

      expect(getCardNumberMask(cardNumber, gaps, length)).toBe(expectedResult);
    });

    test('Too short value', () => {
      const cardNumber = '12345';
      const gaps = [4, 8, 12];
      const length = 16;
      const expectedResult = '1234 5';

      expect(getCardNumberMask(cardNumber, gaps, length)).toBe(expectedResult);
    });
  });

  describe('Expire date mask', () => {
    test('Too long value', () => {
      const expireDate = '123456';
      const expectedResult = '12 / 34';

      expect(getExpireDateMask(expireDate)).toBe(expectedResult);
    });

    test('Too short value', () => {
      const expireDate = '12';
      const expectedResult = '12';

      expect(getExpireDateMask(expireDate)).toBe(expectedResult);
    });
  });
});
