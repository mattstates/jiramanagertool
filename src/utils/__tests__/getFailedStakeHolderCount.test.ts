import { getFailedStakeHolderCount } from '../getFailedStakeholderCount';
import mockJiraIssue from '../../../__mocks__/mockJiraIssue';

describe('getFailedStakeHolderCount', () => {
    test('Returns Zero', () => {
        expect(getFailedStakeHolderCount([mockJiraIssue])).toBe(0);
    });
});
