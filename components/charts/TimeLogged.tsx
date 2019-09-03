import React from 'react';
import { LineChart } from './LineChart';
import { ChartDataPoint, ChartData } from '../../types/chartTypes';
import { JiraResponse, JiraIssueField, JiraIssue, JiraIssueWorklog } from '../../types/jiraTypes';

interface ITimeLoggedProps {
    data: ChartData;
}

export const TimeLogged: React.FC<ITimeLoggedProps> = ({ data }) => {
    const formattedData = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            const mappedIssues = cur[1].issues.map((issue: JiraIssue): JiraIssueField => issue.fields);

            const assignees = Array.from(
                mappedIssues.reduce((assigneeCollection: Set<string>, issue: JiraIssueField): Set<string> => {
                    assigneeCollection.add(issue.assignee.name);
                    return assigneeCollection;
                }, new Set())
            );

            return [
                ...acc,
                {
                    // { date: string, info: totalTimeInSeconds / (60 * 60)}
                    date: cur[0],
                    info:
                        mappedIssues.reduce((total: number, issue: JiraIssueField) => {
                            // We only want time logged by the assignee counted here, not total time on the task
                            return (
                                total +
                                issue.worklog.worklogs
                                    .filter((log: JiraIssueWorklog): boolean => {
                                        return assignees.indexOf(log.updateAuthor.name) > -1;
                                    })
                                    .reduce((timeInSeconds: number, worklog: JiraIssueWorklog): number => {
                                        return timeInSeconds + worklog.timeSpentSeconds;
                                    }, 0)
                            );
                        }, 0) / 3600
                }
            ];
        }, [])
        .reverse();

    return (
        <LineChart
            chartId={'timeLoggedChart'}
            chartTitle={'Total Hours Logged on Tasks Completed in the Date Range'}
            data={formattedData}
            lineColor={'orange'}
        />
    );
};
