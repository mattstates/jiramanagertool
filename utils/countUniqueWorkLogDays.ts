type WorkLog = {
    updateAuthor: { name: string };
    updated: string;
};

type WorkLoggedJiraIssue = {
    worklog: { worklogs: WorkLog[] };
    assignee: { name: string };
};

/**
 * @param {Array} issueCollection - fields
 * @returns {Number}
 * */
export default function countUniqueWorkLogDays(issueCollection: WorkLoggedJiraIssue[]): number {
    const days: string[] = [];

    issueCollection.forEach((issue) => {
        const { worklog } = issue;
        worklog.worklogs.forEach((log) => {
            if (issue.assignee.name === log.updateAuthor.name) {
                days.push(log.updated.slice(0, 10)); // "2018-08-29T16:46:14.470-0700" => "2018-08-29"
            }
        });
    });
    // The number of unique values in the days array.
    return new Set(days).size;
}
