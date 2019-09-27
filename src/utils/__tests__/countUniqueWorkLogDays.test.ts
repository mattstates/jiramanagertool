import countUniqueWorkLogDays from "../countUniqueWorkLogDays";
import mockJiraIssueFields from "../../../mockData/mockJiraFields";

describe('countUniqueWorkLogDays', () => {
    test('Returns One', () => {
        expect(countUniqueWorkLogDays([mockJiraIssueFields])).toBe(1);
    })

    test('Only counts unique days', () => {
        expect(countUniqueWorkLogDays([mockJiraIssueFields, mockJiraIssueFields])).toBe(1);
    })

    test('Accepts empty array', () => {
        expect(countUniqueWorkLogDays([])).toBe(0);
    })
})
