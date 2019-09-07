import React from 'react';
import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { JiraIssue, JiraIssueField, JiraIssueWorklog, JiraResponse } from '../../types/JiraTypes';
import getVelocityDivisor from '../../utils/getVelocityDivisor';
import { LineChart } from './LineChart';

const VELOCITY_THRESHOLD = 6;

interface IVelocityProps {
    data: ChartData;
}

export const Velocity: React.FC<IVelocityProps> = ({ data }) => {

    const formattedData: ChartDataPoint[] = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]) => {

            const mappedIssues: JiraIssueField[] = cur[1].issues.map((issue: JiraIssue) => issue.fields);

            const assignees: string[] = Array.from(
                mappedIssues.reduce((assigneeCollection: Set<string>, issueField: JiraIssueField) => {
                    assigneeCollection.add(issueField.assignee.name);
                    return assigneeCollection;
                }, new Set())
            );

            return [
                ...acc,
                {
                    // { date: string, info: totalTimeInSeconds / (60 * 60)}
                    date: cur[0],
                    info:
                        mappedIssues.reduce((total: number, issueField: JiraIssueField) => {
                            // Only want time logged by the assignee counted here, not total time on the task
                            return (
                                total +
                                issueField.worklog.worklogs
                                    .filter((log: JiraIssueWorklog) => {
                                        return assignees.indexOf(log.updateAuthor.name) > -1;
                                    })
                                    .reduce((totalTimeSpentInSeconds: number, worklog: JiraIssueWorklog) => {
                                        return totalTimeSpentInSeconds + worklog.timeSpentSeconds;
                                    }, 0)
                            );
                        }, 0) /
                        getVelocityDivisor(mappedIssues) /
                        3600
                }
            ];
        }, [])
        .reverse();
    
    const largestVelocity = Math.max(...formattedData.map((data: ChartDataPoint) => data.info ));

    return <LineChart chartId={'velocityChart'} chartTitle={'Velocity on Tasks Completed in the Date Range'} data={formattedData} lineColor={'green'} tooltipPrecision={2} yMax={largestVelocity >= VELOCITY_THRESHOLD ? largestVelocity + 1 : VELOCITY_THRESHOLD} />;
};
