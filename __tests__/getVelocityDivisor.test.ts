import getVelocityDivisor from '../src/utils/getVelocityDivisor';
import mockJiraIssueFields from '../mockData/mockJiraFields';

describe('getVelocityDivisor', () => {

    test('Returns 1 with one issue passed in', () => {
        expect(getVelocityDivisor([mockJiraIssueFields])).toBe(1)
    })

    test('Returns 1 with multiple issues of the same assignee passed in', () => {
        expect(getVelocityDivisor([mockJiraIssueFields, mockJiraIssueFields])).toBe(1)
    })

    test('Correctly returns 2 when there are two assignees and 2 users in the worklogs', () => {

        // Add an Alan Turing user and aturing username to a copied Jira Fields and add a worklogs entry.
        const modifiedMockData = {...mockJiraIssueFields, assignee: {
            self: 'https://mycompany.com/rest/api/2/user?username=aturing',
            name: 'aturing',
            key: 'aturing',
            emailAddress: 'aturing@mycompany.com',
            avatarUrls: {
                '48x48':
                    'https://mycompany.com/secure/useravatar?ownerId=aturing&avatarId=16530',
                '24x24':
                    'https://mycompany.com/secure/useravatar?size=small&ownerId=aturing&avatarId=16530',
                '16x16':
                    'https://mycompany.com/secure/useravatar?size=xsmall&ownerId=aturing&avatarId=16530',
                '32x32':
                    'https://mycompany.com/secure/useravatar?size=medium&ownerId=aturing&avatarId=16530'
            },
            displayName: 'Alan Turing',
            active: true,
            timeZone: 'America/Los_Angeles'
        }}

        modifiedMockData.worklog.worklogs.push({
            self: 'https://mycompany.com/rest/api/2/issue/103595/worklog/73479',
            author: {
                self: 'https://mycompany.com/rest/api/2/user?username=aturing',
                name: 'aturing',
                key: 'aturing',
                emailAddress: 'aturing@mycompany.com',
                avatarUrls: {
                    '48x48':
                        'https://mycompany.com/secure/useravatar?ownerId=aturing&avatarId=16530',
                    '24x24':
                        'https://mycompany.com/secure/useravatar?size=small&ownerId=aturing&avatarId=16530',
                    '16x16':
                        'https://mycompany.com/secure/useravatar?size=xsmall&ownerId=aturing&avatarId=16530',
                    '32x32':
                        'https://mycompany.com/secure/useravatar?size=medium&ownerId=aturing&avatarId=16530'
                },
                displayName: 'Alan Turing',
                active: true,
                timeZone: 'America/Los_Angeles'
            },
            updateAuthor: {
                self: 'https://mycompany.com/rest/api/2/user?username=aturing',
                name: 'aturing',
                key: 'aturing',
                emailAddress: 'aturing@mycompany.com',
                avatarUrls: {
                    '48x48':
                        'https://mycompany.com/secure/useravatar?ownerId=aturing&avatarId=16530',
                    '24x24':
                        'https://mycompany.com/secure/useravatar?size=small&ownerId=aturing&avatarId=16530',
                    '16x16':
                        'https://mycompany.com/secure/useravatar?size=xsmall&ownerId=aturing&avatarId=16530',
                    '32x32':
                        'https://mycompany.com/secure/useravatar?size=medium&ownerId=aturing&avatarId=16530'
                },
                displayName: 'Alan Turing',
                active: true,
                timeZone: 'America/Los_Angeles'
            },
            comment: '',
            created: '2017-11-09T10:44:22.373-0800',
            updated: '2017-11-09T10:44:22.373-0800',
            started: '2017-11-09T10:02:00.000-0800',
            timeSpent: '30m',
            timeSpentSeconds: 1800,
            id: '73479',
            issueId: '103595'
        })

        expect(getVelocityDivisor([mockJiraIssueFields, modifiedMockData])).toBe(2)
    })

    test('Returns 1 with empty data. (we don\'t want to divide by zero :p)', () => {
        expect(getVelocityDivisor([])).toBe(1)
    })
})
