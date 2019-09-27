import { addDays, addMonths, addQuarters, addWeeks, addYears, isBefore } from 'date-fns';
import { DateRanges } from '../enums/DateRanges';

type DateFunction = (date: string | number | Date, amount: number) => Date;

//TODO: Write helper functions to calculate dates using parameter intervals...
export const getDateRanges = (
    fromDate: Date,
    endDate: Date,
    interval: DateRanges,
    intervalMultiple: number
): Array<[Date, Date]> => {
    const dateAdder = getDateFunction(interval);
    const dates: Array<[Date, Date]> = [];
    const endDateObj = endDate;
    const fromDateObj = fromDate;
    let dateCounter = endDateObj;

    // from... to...
    while (isBefore(fromDateObj, dateCounter)) {
        let firstDate = dateAdder(dateCounter, -1 * intervalMultiple);

        if (isBefore(fromDateObj, firstDate)) {
            dates.push([firstDate, dateCounter]);
        } else {
            dates.push([fromDateObj, dateCounter]);
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
