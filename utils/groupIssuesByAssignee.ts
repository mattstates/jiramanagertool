type GroupedIssues = {
    [key: string]: JiraIssue[];
};

type JiraIssue = {
    assignee: { displayName: string };
};

export default function groupIssuesByAssignee(issues: JiraIssue[]): GroupedIssues {
    return issues.reduce((aggregate: GroupedIssues, issue) => {
        const assignee = issue.assignee.displayName.trim();
        if (!aggregate[assignee]) {
            aggregate[assignee] = [];
        }
        aggregate[assignee].push(issue);

        return aggregate;
    }, {});
}
