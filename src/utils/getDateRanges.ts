import { addDays, addMonths, addQuarters, addWeeks, addYears, format, isBefore } from 'date-fns';
import { DateRanges } from '../enums/DateRanges';

type DateFunction = (date: string | number | Date, amount: number) => Date;

//TODO: Write helper functions to calculate dates using parameter intervals...
export const getDateRanges = (
    fromDate: string,
    endDate: string,
    interval: DateRanges,
    intervalMultiple: number
): Array<[string, string]> => {
    const dateFormat = 'YYYY/MM/DD';
    const dateAdder = getDateFunction(interval);
    const dates: Array<[string, string]> = [];
    const endDateObj = new Date(format(endDate, dateFormat));
    const fromDateObj = new Date(format(fromDate, dateFormat));
    let dateCounter = endDateObj;

    // from... to...
    while (isBefore(fromDateObj, dateCounter)) {
        let firstDate = dateAdder(dateCounter, -1 * intervalMultiple);

        if (isBefore(fromDateObj, firstDate)) {
            dates.push([format(firstDate, dateFormat), format(dateCounter, dateFormat)]);
        } else {
            dates.push([format(fromDateObj, dateFormat), format(dateCounter, dateFormat)]);
        }

        dateCounter = firstDate;
    }

    return dates;
};

function getDateFunction(interval: DateRanges): DateFunction {
    switch (interval) {
        case DateRanges.Days:
            return addDays;
        case DateRanges.Months:
            return addMonths;
        case DateRanges.Quarters:
            return addQuarters;
        case DateRanges.Weeks:
            return addWeeks;
        case DateRanges.Years:
            return addYears;
        default:
            return null;
    }
}
