export type JiraIssue = {
    expand: string;
    fields: JiraIssueField;
    id: string;
    key: string;
    self: string;
};

export type JiraIssueField = {
    assignee: JiraIdentity;
    customfield_13380: number; // Failed Code Review Count
    customfield_13381: number; // Failed QA Count
    timeestimate: number;
    timeoriginalestimate: number;
    timespent: number;
    worklog: {
        worklogs: JiraIssueWorklog[];
    };
};

export type JiraIdentity = {
    name: string;
    key: string;
    displayName: string;
};

export type JiraIssueWorklog = {
    author: JiraIdentity;
    updateAuthor: JiraIdentity;
    created: string; // EX: "2018-09-06T17:47:00.000-0700"
    id: string;
    issueId: string;
    started: string; // EX: "2018-09-06T17:47:00.000-0700"
    timeSpent: string; // EX: "2h"
    timeSpentSeconds: number;
    updated: string; // EX: "2018-09-06T17:47:00.000-0700"
};

export type JiraResponse = {
    expand: string;
    issues: JiraIssue[];
    maxResults: number;
    startAt: number;
    total: number;
}
