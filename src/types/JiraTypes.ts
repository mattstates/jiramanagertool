export type JiraIssue = {
    changelog: JiraIssueChangeLog;
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
    worklog: JiraWorklogResponse;
};

export type JiraWorklogResponse = {
    maxResults: number;
    startAt: number;
    total: number;
    worklogs: JiraIssueWorklog[];
}

export type JiraIdentity = {
    displayName: string;
    key: string;
    name: string;
};

export type JiraIssueWorklog = {
    author: JiraIdentity;
    comment: string;
    created: string; // EX: "2018-09-06T17:47:00.000-0700"
    id: string;
    issueId: string;
    self: string;
    started: string; // EX: "2018-09-06T17:47:00.000-0700"
    timeSpent: string; // EX: "2h"
    timeSpentSeconds: number;
    updateAuthor: JiraIdentity;
    updated: string; // EX: "2018-09-06T17:47:00.000-0700"
};

export type JiraResponse = {
    expand: string;
    issues: JiraIssue[];
    maxResults: number;
    startAt: number;
    total: number;
};

export type JiraIssueChangeLog = {
    histories: JiraChangelogHistory[];
    maxResults: number;
    startAt: number;
    total: number;
};

export type JiraChangelogHistory = {
    author: JiraIdentity;
    created: string; // EX: "2016-10-19T14:44:23.830-0700"
    id: string;
    items: JiraHistoryItem[];
};

export type JiraHistoryItem = {
    field: string;
    fieldtype: string;
    from?: string;
    fromString?: string;
    to: string;
    toString: string;
};

export type JiraAutocompleteIdentity = {
    displayName: string;
    value: string;
};
