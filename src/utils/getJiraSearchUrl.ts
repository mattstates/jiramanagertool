import {
    hostName,
    jiraBaseApiEndpoint,
    jiraApiSearchEndpoint,
    doneStatusDefinitions,
    jiraApiMaxResults,
    jiraCustomFields
} from '../init';
import { format } from 'date-fns';
import { YYYY_MM_DD } from '../constants/dateFormats';

const CONCATENATED_DONE_STATUSES = doneStatusDefinitions.join(',');

const CUSTOM_FIELD_NAMES = jiraCustomFields
    .map(jiraCustomField => {
        return jiraCustomField.hasOwnProperty('fieldName') ? jiraCustomField.fieldName : '';
    })
    .join(',');

export default function getJiraSearchUrl(assignee: string, fromDate: Date, endDate: Date, startAt: number = 0): string {
    const search = encodeURIComponent(
        `assignee in (${assignee}) and ((status changed to (${CONCATENATED_DONE_STATUSES}) during ("${format(
            fromDate,
            YYYY_MM_DD
        )}", "${format(endDate, YYYY_MM_DD)}"))) and status in (${CONCATENATED_DONE_STATUSES})`
    );

    return (
        hostName +
        jiraBaseApiEndpoint +
        jiraApiSearchEndpoint +
        '?jql=' +
        encodeURIComponent(
            search +
                `&startAt=${startAt}&maxResults=${jiraApiMaxResults}&fields=key,timeestimate,timeoriginalestimate,timespent,assignee,worklog,${CUSTOM_FIELD_NAMES}&expand=changelog`
        )
    );
}
