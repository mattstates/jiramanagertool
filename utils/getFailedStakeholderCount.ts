import { JiraChangelogHistory, JiraHistoryItem, JiraIssue } from '../types/JiraTypes';

const FAILED_STAKEHOLDER_STATUS = 'Failed Stakeholder Test';

export function getFailedStakeHolderCount(issueFieldCollection: JiraIssue[]): number {
    return issueFieldCollection.reduce((total: number, jiraIssue: JiraIssue): number => {
        return (
            total +
            jiraIssue.changelog.histories.filter((history: JiraChangelogHistory) => {
                return history.items.some((item: JiraHistoryItem) => {
                    return item.toString === FAILED_STAKEHOLDER_STATUS;
                });
            }).length
        );
    }, 0);
}
