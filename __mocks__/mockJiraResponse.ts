export default {
    expand: 'names,schema',
    startAt: 0,
    maxResults: 100,
    total: 1,
    issues: [
        {
            expand: 'operations,versionedRepresentations,editmeta,changelog,renderedFields',
            id: '103595',
            self: 'https://mycompany.com/rest/api/2/issue/103595',
            key: 'JIRAKEY-14384',
            fields: {
                customfield_13380: 0,
                timeestimate: 0,
                customfield_13381: 0,
                timespent: 1800,
                timeoriginalestimate: 1800,
                worklog: {
                    startAt: 0,
                    maxResults: 20,
                    total: 1,
                    worklogs: [
                        {
                            self:
                                'https://mycompany.com/rest/api/2/issue/103595/worklog/73479',
                            author: {
                                self:
                                    'https://mycompany.com/rest/api/2/user?username=mstates',
                                name: 'mstates',
                                key: 'mstates',
                                emailAddress: 'mstates@mycompany.com',
                                avatarUrls: {
                                    '48x48':
                                        'https://mycompany.com/secure/useravatar?ownerId=mstates&avatarId=16530',
                                    '24x24':
                                        'https://mycompany.com/secure/useravatar?size=small&ownerId=mstates&avatarId=16530',
                                    '16x16':
                                        'https://mycompany.com/secure/useravatar?size=xsmall&ownerId=mstates&avatarId=16530',
                                    '32x32':
                                        'https://mycompany.com/secure/useravatar?size=medium&ownerId=mstates&avatarId=16530'
                                },
                                displayName: 'Matt States',
                                active: true,
                                timeZone: 'America/Los_Angeles'
                            },
                            updateAuthor: {
                                self:
                                    'https://mycompany.com/rest/api/2/user?username=mstates',
                                name: 'mstates',
                                key: 'mstates',
                                emailAddress: 'mstates@mycompany.com',
                                avatarUrls: {
                                    '48x48':
                                        'https://mycompany.com/secure/useravatar?ownerId=mstates&avatarId=16530',
                                    '24x24':
                                        'https://mycompany.com/secure/useravatar?size=small&ownerId=mstates&avatarId=16530',
                                    '16x16':
                                        'https://mycompany.com/secure/useravatar?size=xsmall&ownerId=mstates&avatarId=16530',
                                    '32x32':
                                        'https://mycompany.com/secure/useravatar?size=medium&ownerId=mstates&avatarId=16530'
                                },
                                displayName: 'Matt States',
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
                        }
                    ]
                },
                assignee: {
                    self: 'https://mycompany.com/rest/api/2/user?username=mstates',
                    name: 'mstates',
                    key: 'mstates',
                    emailAddress: 'mstates@mycompany.com',
                    avatarUrls: {
                        '48x48':
                            'https://mycompany.com/secure/useravatar?ownerId=mstates&avatarId=16530',
                        '24x24':
                            'https://mycompany.com/secure/useravatar?size=small&ownerId=mstates&avatarId=16530',
                        '16x16':
                            'https://mycompany.com/secure/useravatar?size=xsmall&ownerId=mstates&avatarId=16530',
                        '32x32':
                            'https://mycompany.com/secure/useravatar?size=medium&ownerId=mstates&avatarId=16530'
                    },
                    displayName: 'Matt States',
                    active: true,
                    timeZone: 'America/Los_Angeles'
                }
            },
            changelog: {
                startAt: 0,
                maxResults: 4,
                total: 4,
                histories: [
                    {
                        id: '1279460',
                        author: {
                            self:
                                'https://mycompany.com/rest/api/2/user?username=JiraUserFive',
                            name: 'JiraUserFive',
                            key: 'jirauserfive',
                            emailAddress: 'JiraUserFive@mycompany.com',
                            avatarUrls: {
                                '48x48':
                                    'https://mycompany.com/secure/useravatar?avatarId=10152',
                                '24x24':
                                    'https://mycompany.com/secure/useravatar?size=small&avatarId=10152',
                                '16x16':
                                    'https://mycompany.com/secure/useravatar?size=xsmall&avatarId=10152',
                                '32x32':
                                    'https://mycompany.com/secure/useravatar?size=medium&avatarId=10152'
                            },
                            displayName: 'JiraUser Five',
                            active: true,
                            timeZone: 'America/Los_Angeles'
                        },
                        created: '2017-11-09T04:52:29.973-0800',
                        items: [
                            {
                                field: 'Epic Link',
                                fieldtype: 'custom',
                                from: null,
                                fromString: null,
                                to: '102570',
                                toString: 'JIRAKEY-14148'
                            }
                        ]
                    },
                    {
                        id: '1279530',
                        author: {
                            self:
                                'https://mycompany.com/rest/api/2/user?username=mstates',
                            name: 'mstates',
                            key: 'mstates',
                            emailAddress: 'mstates@mycompany.com',
                            avatarUrls: {
                                '48x48':
                                    'https://mycompany.com/secure/useravatar?ownerId=mstates&avatarId=16530',
                                '24x24':
                                    'https://mycompany.com/secure/useravatar?size=small&ownerId=mstates&avatarId=16530',
                                '16x16':
                                    'https://mycompany.com/secure/useravatar?size=xsmall&ownerId=mstates&avatarId=16530',
                                '32x32':
                                    'https://mycompany.com/secure/useravatar?size=medium&ownerId=mstates&avatarId=16530'
                            },
                            displayName: 'Matt States',
                            active: true,
                            timeZone: 'America/Los_Angeles'
                        },
                        created: '2017-11-09T09:24:23.580-0800',
                        items: [
                            {
                                field: 'assignee',
                                fieldtype: 'jira',
                                from: null,
                                fromString: null,
                                to: 'mstates',
                                toString: 'Matt States'
                            }
                        ]
                    },
                    {
                        id: '1920133',
                        author: {
                            self:
                                'https://mycompany.com/rest/api/2/user?username=jirauserfour',
                            name: 'jirauserfour',
                            key: 'jirauserfour',
                            emailAddress: 'jirauserfour@mycompany.com',
                            avatarUrls: {
                                '48x48':
                                    'https://mycompany.com/secure/useravatar?ownerId=jirauserfour&avatarId=13930',
                                '24x24':
                                    'https://mycompany.com/secure/useravatar?size=small&ownerId=jirauserfour&avatarId=13930',
                                '16x16':
                                    'https://mycompany.com/secure/useravatar?size=xsmall&ownerId=jirauserfour&avatarId=13930',
                                '32x32':
                                    'https://mycompany.com/secure/useravatar?size=medium&ownerId=jirauserfour&avatarId=13930'
                            },
                            displayName: 'JiraUser Four',
                            active: true,
                            timeZone: 'America/Los_Angeles'
                        },
                        created: '2019-07-12T14:25:23.643-0700',
                        items: [
                            {
                                field: 'resolution',
                                fieldtype: 'jira',
                                from: null,
                                fromString: null,
                                to: '6',
                                toString: 'Completed'
                            },
                            {
                                field: 'status',
                                fieldtype: 'jira',
                                from: '10012',
                                fromString: 'Stakeholder Test - Prod',
                                to: '6',
                                toString: 'Closed'
                            }
                        ]
                    },
                    {
                        id: '1966357',
                        author: {
                            self:
                                'https://mycompany.com/rest/api/2/user?username=jirauserthree',
                            name: 'jirauserthree',
                            key: 'jirauserthree',
                            emailAddress: 'jirauserthree@mycompany.com',
                            avatarUrls: {
                                '48x48':
                                    'https://mycompany.com/secure/useravatar?ownerId=jirauserthree&avatarId=14440',
                                '24x24':
                                    'https://mycompany.com/secure/useravatar?size=small&ownerId=jirauserthree&avatarId=14440',
                                '16x16':
                                    'https://mycompany.com/secure/useravatar?size=xsmall&ownerId=jirauserthree&avatarId=14440',
                                '32x32':
                                    'https://mycompany.com/secure/useravatar?size=medium&ownerId=jirauserthree&avatarId=14440'
                            },
                            displayName: 'JiraUser Three',
                            active: true,
                            timeZone: 'America/Los_Angeles'
                        },
                        created: '2019-07-29T16:45:31.693-0700',
                        items: [
                            {
                                field: 'Workflow',
                                fieldtype: 'jira',
                                from: '321007',
                                fromString: 'Project_V1',
                                to: '432055',
                                toString: 'Project_V2'
                            }
                        ]
                    }
                ]
            }
        }
    ]
};
