import { JiraIssueField, JiraIssueWorklog } from "../types/JiraTypes";

/**
 * @param issueCollection {Array<JiraIssueField>}
 * @param assignees {Array<String>}
 * @description Returns an aggregate of the timeSpentSeconds in a JiraIssueField collection filtered by the JiraIssueField's assigne based on the assignee collection parameter.
 */
// TODO: Add tests.
export default function getTimeLoggedByAssignee(issueCollection: JiraIssueField[], assignees: string[]) {
    return issueCollection.reduce((total: number, issue: JiraIssueField) => {
        // We only want time logged by the assignee counted here, not total time on the task
        return (
            total +
            issue.worklog.worklogs
                .filter((log: JiraIssueWorklog): boolean => {
                    return assignees.indexOf(log.updateAuthor.name) > -1;
                })
                .reduce((timeInSeconds: number, worklog: JiraIssueWorklog): number => {
                    return timeInSeconds + worklog.timeSpentSeconds;
                }, 0)
        );
    }, 0);
}