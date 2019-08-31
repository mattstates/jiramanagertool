import React from 'react';
import { JiraIssue, JiraIssueField, JiraIssueWorklog, JiraResponse } from '../../types/jiraTypes';
import { LineChart } from './LineChart.tsx';
import { ChartData, ChartDataPoint } from '../../types/chartTypes';

interface IEstimationAccuracyProps {
    data: ChartData;
}

export const EstimationAccuracy: React.FC<IEstimationAccuracyProps> = ({ data }) => {

    const formattedData = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            const mappedIssues: JiraIssueField[] = cur[1].issues.map((issue: JiraIssue) => issue.fields);

            const assignees: string[] = Array.from(
                mappedIssues.reduce((assigneeCollection: Set<string>, issueField: JiraIssueField) => {
                    assigneeCollection.add(issueField.assignee.name);
                    return assigneeCollection;
                }, new Set())
            );

            const [totalTimeInSeconds, totalTimeEstimated] = mappedIssues
                .map((issueField: JiraIssueField) => {
                    return [getTotalSecondsLoggedFromWorklogsByAssignee(issueField.worklog.worklogs, assignees), issueField.timeoriginalestimate];
                })
                .reduce(
                    (totals: [number, number], issueTimeLoggedAndEstimate: [number, number]) => {
                        return [totals[0] + issueTimeLoggedAndEstimate[0], totals[1] + issueTimeLoggedAndEstimate[1]];
                    },
                    [0, 0]
                );

            return [
                ...acc,
                {
                    date: cur[0],
                    info: calculateAccuracyPercentage(totalTimeEstimated, totalTimeInSeconds)
                }
            ];
        }, [])
        .reverse();

    const yMin = Math.min(
        ...formattedData.map((data: ChartDataPoint): number => {
            return data.info;
        })
    );

    return (
        <LineChart
            chartId={'estimationAccuracyChart'}
            chartTitle={'Estimation Accuracy on Tasks Completed in the Date Range'}
            data={formattedData}
            lineColor={'gold'}
            tooltipPrecision={2}
            yMin={yMin >= 0 ? 0 : yMin - 10}
        />
    );
};

function getTotalSecondsLoggedFromWorklogsByAssignee(worklogs: JiraIssueWorklog[], assigneeList: string[]): number {
    const filteredWorklogs = worklogs.filter((worklog: JiraIssueWorklog) => {
        return assigneeList.indexOf(worklog.author.name) > -1;
    });
    return filteredWorklogs.reduce((total: number, worklog: JiraIssueWorklog) => {
        return total + worklog.timeSpentSeconds;
    }, 0);
}

function calculateAccuracyPercentage(originalEstimate: number, actualTimeSpent: number): number {
    const decrease = originalEstimate - actualTimeSpent;
    return -1 * ((decrease / (originalEstimate || 1)) * 100);
}
