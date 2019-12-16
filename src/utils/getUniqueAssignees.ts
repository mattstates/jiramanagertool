
import { JiraIssueField } from "../types/JiraTypes";

/**
 * @param issueCollection {Array<JiraIssueField>}
 * @description Returns an array of unique assignees from the issueCollection.
 */
// TODO: Write tests.
export default function getUniqueAssignees(issueCollection: JiraIssueField[]) {
    return Array.from(
        issueCollection.reduce((assigneeCollection: Set<string>, issue: JiraIssueField): Set<string> => {
            assigneeCollection.add(issue.assignee.name);
            return assigneeCollection;
        }, new Set())
    );
}
