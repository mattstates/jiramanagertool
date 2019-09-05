import { JiraIssueField } from "../types/JiraTypes";

type GroupedIssues = {
    [assignee: string]: JiraIssueField[];
};

/**
 * @description
 * Generate a hash where each key is an assignee and the value is a collection of jira tasks assigned to them.
 */
export default function groupIssuesByAssignee(issues: JiraIssueField[]): GroupedIssues {
    return issues.reduce((aggregate: GroupedIssues, issue: JiraIssueField): GroupedIssues => {
        const assignee = issue.assignee.displayName.trim();
        if (!aggregate[assignee]) {
            aggregate[assignee] = [];
        }
        aggregate[assignee].push(issue);

        return aggregate;
    }, {});
}
