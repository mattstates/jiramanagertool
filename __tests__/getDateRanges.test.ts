import { getDateRanges } from '../src/utils/getDateRanges';
import { DateRanges } from '../src/enums/DateRanges';

describe('getDateRanges', () => {
    test('One month intervals for a year returns 12 results', () => {
        expect(getDateRanges('09-01-2018', '09-01-2019', DateRanges.Months, 1).length).toEqual(12);
    });
    test('One day intervals for a year returns 365 results', () => {
        expect(getDateRanges('01-01-2018', '01-01-2019', DateRanges.Days, 1).length).toEqual(365);
    });
    test('One quarter intervals for a year returns 4 results', () => {
        expect(getDateRanges('01-01-2018', '01-01-2019', DateRanges.Quarters, 1).length).toEqual(4);
    });
    test('One week intervals for a year returns 52 results', () => {
        expect(getDateRanges('01-01-2018', '12-31-2018', DateRanges.Weeks, 1).length).toEqual(52);
    });
    test('One year intervals for a year returns 1 results', () => {
        expect(getDateRanges('01-01-2018', '01-01-2019', DateRanges.Years, 1).length).toEqual(1);
    });
});

describe('getDateRanges Accepts different date string formats', () => {
    const params: [DateRanges, number] = [DateRanges.Months, 1];

    test('YYYY-MM-DD', () => {
        const dateRanges = getDateRanges('2019-01-01', '2019-02-01', ...params);
        expect(dateRanges.length).toEqual(1);
        expect(dateRanges[0][0]).toEqual('2019-01-01');
        expect(dateRanges[0][1]).toEqual('2019-02-01');
    });
    test('YYYY/MM/DD', () => {
        const dateRanges = getDateRanges('2019/01/01', '2019/02/01', ...params);
        expect(dateRanges.length).toEqual(1);
        expect(dateRanges[0][0]).toEqual('2019-01-01');
        expect(dateRanges[0][1]).toEqual('2019-02-01');
    });
    test('MM-DD-YYYY', () => {
        const dateRanges = getDateRanges('01-01-2019', '02-01-2019', ...params);
        expect(dateRanges.length).toEqual(1);
        expect(dateRanges[0][0]).toEqual('2019-01-01');
        expect(dateRanges[0][1]).toEqual('2019-02-01');
    });
    test('MM/DD/YYYY', () => {
        const dateRanges = getDateRanges('01/01/2019', '02/01/2019', ...params);
        expect(dateRanges.length).toEqual(1);
        expect(dateRanges[0][0]).toEqual('2019-01-01');
        expect(dateRanges[0][1]).toEqual('2019-02-01');
    });
    test('MM-DD-YY', () => {
        const dateRanges = getDateRanges('01-01-19', '02-01-19', ...params);
        expect(dateRanges.length).toEqual(1);
        expect(dateRanges[0][0]).toEqual('2019-01-01');
        expect(dateRanges[0][1]).toEqual('2019-02-01');
    });
    test('MM/DD/YY', () => {
        const dateRanges = getDateRanges('01/01/19', '02/01/19', ...params);
        expect(dateRanges.length).toEqual(1);
        expect(dateRanges[0][0]).toEqual('2019-01-01');
        expect(dateRanges[0][1]).toEqual('2019-02-01');
    });
});

describe('getDateRanges does NOT accept date strings in YY-MM-DD or YY/MM/DD formats', () => {
    const params: [DateRanges, number] = [DateRanges.Months, 1];

    test('!YY-MM-DD', () => {
        const dateRanges = getDateRanges('19-01-01', '19-02-01', ...params);
        expect(dateRanges.length).toEqual(0);
    });
    test('!YY/MM/DD', () => {
        const dateRanges = getDateRanges('19/01/01', '19/02/01', ...params);
        expect(dateRanges.length).toEqual(0);
    });
});
