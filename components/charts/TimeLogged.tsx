import { ChartDataPoint, ChartData } from '../../types/ChartTypes';
import { Description } from './Description';
import { JiraResponse, JiraIssueField, JiraIssue, JiraIssueWorklog } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
import React from 'react';

interface ITimeLoggedProps {
    data: ChartData;
}

export const TimeLogged: React.FC<ITimeLoggedProps> = ({ data }) => {
    const formattedData = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            const mappedIssues = cur[1].issues.map(
                (issue: JiraIssue): JiraIssueField => issue.fields
            );

            const assignees = Array.from(
                mappedIssues.reduce((assigneeCollection: Set<string>, issue: JiraIssueField): Set<
                    string
                > => {
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
                                    .reduce(
                                        (
                                            timeInSeconds: number,
                                            worklog: JiraIssueWorklog
                                        ): number => {
                                            return timeInSeconds + worklog.timeSpentSeconds;
                                        },
                                        0
                                    )
                            );
                        }, 0) / 3600
                }
            ];
        }, [])
        .reverse();

    return (
        <div>
            <LineChart
                chartId={'timeLoggedChart'}
                chartTitle={'Total Hours Logged on Tasks Completed in the Date Range'}
                data={formattedData}
                lineColor={'orange'}
                yLabel={'Hours'}
            />
            <Description
                description={`
The aggregate of the time logged on tasks in the result set in hours.`}
                calculatedBy={`Total time logged on tasks by the assignee.`}
                footNote={`*Does not include time logged on the same tasks by someone who is not the assignee.`}
            />
        </div>
    );
};
