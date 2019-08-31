import countUniqueWorkLogDays from './countUniqueWorkLogDays.ts';
import { JiraIssueField } from '../types/jiraTypes';

type AssignedTasksMap = {
    [key: string]: object[];
};

/**
 * @description When the issueCollection has been attributed to a sole assignee, there should not be multiple keys
 * on the accumulator in the reduce method. But for issueCollections that are an aggregation like the
 * Full Record Set or collections for a Resource Queue, the .reduce accumulator will have a key for every
 * assignee in that set. Each one of the keys in the accumulator will need to have its unique number of days
 * calculated.
 *
 * If for some reason there is no assignee, we will exclude that issue.
 */
export default function getVelocityDivisor(issueFieldsCollection: JiraIssueField[]): number {
    const issuesByAssignee: AssignedTasksMap = issueFieldsCollection.reduce((accumulator: AssignedTasksMap, issue: JiraIssueField): AssignedTasksMap => {
        let assignee = '';

        if (issue.assignee && issue.assignee.name) {
            assignee = issue.assignee.name;
        } else {
            return accumulator;
        }

        if (!accumulator.hasOwnProperty(assignee)) {
            accumulator[assignee] = [];
        }

        accumulator[assignee].push(issue);

        return accumulator;
    }, {});

    // Sum unique days to use as a divisor for estimation.
    return (
        Object.values(issuesByAssignee)
            .map(countUniqueWorkLogDays)
            .reduce((total: number, assignee: number): number => {
                return total + assignee;
            }, 0) || 1
    );
}
