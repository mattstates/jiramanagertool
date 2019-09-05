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
    const fromDateObj = new Date(fromDate + ','); // Adding a comma is hacky, makes sure the date doesn't give the prior date
    const endDateObj = new Date(endDate + ',');
    let dateCounter = endDateObj;
    const dateFormat = 'YYYY-MM-DD';
    const dates: Array<[string, string]> = [];
    const dateAdder = getDateFunction(interval);

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
