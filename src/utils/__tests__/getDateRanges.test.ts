import { getDateRanges } from '../getDateRanges';
import { DateRanges } from '../../enums/DateRanges';

const FROM_DATE = new Date('11-05-1955');
const END_DATE_YEAR = new Date('11-05-1956');

describe('getDateRanges', () => {
    test('One month intervals for a year returns 12 results', () => {
        expect(getDateRanges(FROM_DATE, END_DATE_YEAR, DateRanges.Months, 1).length).toEqual(12);
    });
    test('One day intervals for a leap year returns 366 results', () => {
        expect(getDateRanges(FROM_DATE, END_DATE_YEAR, DateRanges.Days, 1).length).toEqual(366);
    });
    test('One quarter intervals for a year returns 4 results', () => {
        expect(getDateRanges(FROM_DATE, END_DATE_YEAR, DateRanges.Quarters, 1).length).toEqual(4);
    });
    test('One week intervals for a year returns 53 results', () => {
        expect(getDateRanges(FROM_DATE, END_DATE_YEAR, DateRanges.Weeks, 1).length).toEqual(53);
    });
    test('One year intervals for a year returns 1 results', () => {
        expect(getDateRanges(FROM_DATE, END_DATE_YEAR, DateRanges.Years, 1).length).toEqual(1);
    });
});
