import { JiraChangelogHistory, JiraHistoryItem, JiraIssue } from '../types/JiraTypes';

export function getJiraStatusCount(issueFieldCollection: JiraIssue[], jiraStatus: string): number {
    return issueFieldCollection.reduce((total: number, jiraIssue: JiraIssue): number => {
        return (
            total +
            jiraIssue.changelog.histories.filter((history: JiraChangelogHistory) => {
                return history.items.some((item: JiraHistoryItem) => {
                    return item.toString === jiraStatus;
                });
            }).length
        );
    }, 0);
}
