import getDateFromJiraTimeStamp from '../utils/getDateFromJiraTimeStamp';

describe('getDateFromJiraTimeStamp', () => {
    test('2018-08-29T16:46:14.470-0700 returns 2018-08-29', () => {
        expect(getDateFromJiraTimeStamp('2018-08-29T16:46:14.470-0700')).toBe('2018-08-29');
    });

    test('Matches a regex', () => {
        expect(getDateFromJiraTimeStamp('2018-08-29T16:46:14.470-0700')).toMatch(
            /([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])/
        );
    });

    test('String length is 10 -> YYYY-MM-DD', () => {
        expect(getDateFromJiraTimeStamp('2018-08-29T16:46:14.470-0700').length).toBe(10);
    });
});
