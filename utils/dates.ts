import { format, isBefore, addDays, addMonths } from 'date-fns';

//TODO: Write helper functions to calculate dates using parameter intervals...
export const getDateRanges = (fromDate: string, endDate: string): Array<[string, string]> => {
    const fromDateObj = new Date(fromDate + ','); // Adding a comma is hacky, makes sure the date doesn't give the prior date
    const endDateObj = new Date(endDate + ',');
    let dateCounter = endDateObj;
    const dateFormat = 'YYYY-MM-DD';
    const dates: Array<[string, string]> = [];

    // from... to...
    while (isBefore(fromDateObj, dateCounter)) {
        // let firstDate = addDays(dateCounter, -13);
        let firstDate = addMonths(dateCounter, -1);


        if (isBefore(fromDateObj, firstDate)) {
            dates.push([format(firstDate, dateFormat), format(dateCounter, dateFormat)]);
        } else {
            dates.push([format(fromDateObj, dateFormat), format(dateCounter, dateFormat)]);
        }

        // dateCounter = addDays(firstDate, -1);
        dateCounter = firstDate;

    }

    return dates;
};
