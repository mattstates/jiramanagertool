import { getFailedStakeHolderCount } from '../utils/getFailedStakeholderCount';
import mockJiraIssue from '../mockData/mockJiraIssue';

describe('getFailedStakeHolderCount', () => {
    test('Returns Zero', () => {
        expect(getFailedStakeHolderCount([mockJiraIssue])).toBe(0);
    });
});
