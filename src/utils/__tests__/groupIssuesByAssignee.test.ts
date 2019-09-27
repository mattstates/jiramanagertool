import groupIssuesByAssignee from '../groupIssuesByAssignee';
import mockJiraIssueFields from '../../../mockData/mockJiraFields';

describe('groupIssuesByAssignee', () => {
    const groupedIssues = groupIssuesByAssignee([mockJiraIssueFields])['Matt States'];

    test('Returns 1 issue', () => {
        expect(groupedIssues.length).toBe(1);
    });

    test('Returned issue matches the assignee', () => {
        expect(groupedIssues[0].assignee.displayName).toMatch('Matt States');
    });
});
