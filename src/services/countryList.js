import { getCodeList, overwrite } from 'country-list';

overwrite([{
  code: 'RU',
  name: 'Russia'
}]);

export default Object.entries(getCodeList())
  .sort(([, country1], [, country2]) => {
    if (country1 > country2) return 1;
    if (country1 < country2) return -1;
    return 0;
  });
