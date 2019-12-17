import { JiraIssueField } from '../../types/JiraTypes';
import getTimeLoggedByAssignee from '../getTimeLoggedByAssignee';
import mockJiraFields from '../../../__mocks__/mockJiraFields';

const multipleIssueCollection = [mockJiraFields, mockJiraFields, mockJiraFields];
const oneIssueCollection = [mockJiraFields];
const emptyIssueCollection: JiraIssueField[] = [];

describe('getTimeLoggedByAssignee', () => {
    test('Returns aggregated time for issue collection length of one.', () => {
        expect(getTimeLoggedByAssignee(oneIssueCollection, ['mstates'])).toEqual(1800);
    });

    test('Returns aggregated time for issue collection with multiple items.', () => {
        expect(getTimeLoggedByAssignee(multipleIssueCollection, ['mstates'])).toEqual(5400);
    });

    test('Only aggregates time for specified assignees.', () => {
        expect(getTimeLoggedByAssignee(multipleIssueCollection, ['aturing', 'mstates'])).toEqual(5400);
    });

    test('No matching assignees returns zero.', () => {
        expect(getTimeLoggedByAssignee(multipleIssueCollection, ['achurch', 'alovelace', 'aturing'])).toEqual(0);
    });

    test('Empty issue collection returns zero.', () => {
        expect(getTimeLoggedByAssignee(emptyIssueCollection, ['aturing', 'mstates'])).toEqual(0);
    });

    test('Empty assignee collection returns zero.', () => {
        expect(getTimeLoggedByAssignee(multipleIssueCollection, [])).toEqual(0);
    });

    test('Empty issue collection and empty assignee collection returns zero.', () => {
        expect(getTimeLoggedByAssignee(emptyIssueCollection, [])).toEqual(0);
    });
});
