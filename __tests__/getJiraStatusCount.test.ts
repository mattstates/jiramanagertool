import mockJiraIssue from '../mockData/mockJiraIssue';
import { getJiraStatusCount } from '../src/utils/getJiraStatusCount';
/*
const uniqueStatuses: string[] = Array.from(
    // This is too cute, just use a .reduce...
    new Set(
        mockJiraIssue.changelog.histories
            .filter(history => history.items.filter(item => item.field === 'status').length)
            .map(history => history.items.filter(item => item.field === 'status').map(item => item.toString))
            .reduce((statusCollection, statusArray) => {
                return [...statusCollection, ...statusArray];
            }, [])
    )
);
*/

const mockDataUniqueStatuses = [
    'Evaluating',
    'Requirements Review',
    'Evaluated',
    'Assigned',
    'In Progress',
    'Code Review',
    'Code Review In Progress',
    'Approved Code Review',
    'QA on PPE',
    'QA on PPE In Progress',
    'Deployment - PPE',
    'Stakeholder Test - Prod',
    'Closed'
];

describe('getJiraStatusCount', () => {
    test('"Evaluating" status count returns 1', () => {
        expect(getJiraStatusCount([mockJiraIssue], mockDataUniqueStatuses[0])).toBe(1);
    });
    test('"Evaluated" status count returns 1', () => {
        expect(getJiraStatusCount([mockJiraIssue], mockDataUniqueStatuses[2])).toBe(1);
    });
    test('"In Progress" status count returns 2', () => {
        expect(getJiraStatusCount([mockJiraIssue], mockDataUniqueStatuses[4])).toBe(2);
    });
    test('Empty String status returns 0', () => {
        expect(getJiraStatusCount([mockJiraIssue], '')).toBe(0);
    });
});
