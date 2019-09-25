import { JiraIssue } from '../types/JiraTypes';
import { getJiraStatusCount } from './getJiraStatusCount';

const FAILED_STAKEHOLDER_STATUS = 'Failed Stakeholder Test';

export function getFailedStakeHolderCount(issueFieldCollection: JiraIssue[]): number {
    return getJiraStatusCount(issueFieldCollection, FAILED_STAKEHOLDER_STATUS);
}
