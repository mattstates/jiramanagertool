import { JiraIssueField, JiraIssueWorklog } from '../types/JiraTypes';
import getDateFromJiraTimeStamp from './getDateFromJiraTimeStamp';

// TODO: Use the .reduce method to refactor this.
export default function countUniqueWorkLogDays(issueCollection: JiraIssueField[]): number {
    const days: string[] = [];

    issueCollection.forEach((issue: JiraIssueField) => {
        const { worklog } = issue;
        worklog.worklogs.forEach((log: JiraIssueWorklog) => {
            if (issue.assignee.name === log.updateAuthor.name) {
                days.push(getDateFromJiraTimeStamp(log.updated)); // "2018-08-29T16:46:14.470-0700" => "2018-08-29"
            }
        });
    });
    // The number of unique values in the days array.
    return new Set(days).size;
}
