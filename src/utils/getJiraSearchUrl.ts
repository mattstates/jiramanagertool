import {
    hostName,
    jirabaseApiEndpoint,
    jiraApiSearchEndpoint,
    doneStatusDefinitions,
    jiraApiMaxResults,
    jiraCustomFields
} from '../init';

const CONCATENATED_DONE_STATUSES = doneStatusDefinitions.join(',');

const CUSTOM_FIELD_NAMES = jiraCustomFields
    .map(jiraCustomField => jiraCustomField.fieldName)
    .join(',');

export default function getJiraSearchUrl(
    assignee: string,
    fromDate: string,
    endDate: string,
    startAt: number = 0
): string {
    const search = encodeURIComponent(
        `assignee in (${assignee}) and ((status changed to (${CONCATENATED_DONE_STATUSES}) during ("${fromDate}", "${endDate}"))) and status in (${CONCATENATED_DONE_STATUSES})`
    );

    return (
        hostName +
        jirabaseApiEndpoint +
        jiraApiSearchEndpoint +
        '?jql=' +
        encodeURIComponent(
            search +
                `&startAt=${startAt}&maxResults=${jiraApiMaxResults}&fields=key,timeestimate,timeoriginalestimate,timespent,assignee,worklog,${CUSTOM_FIELD_NAMES}&expand=changelog`
        )
    );
}