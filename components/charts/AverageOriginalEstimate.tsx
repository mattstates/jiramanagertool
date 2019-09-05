import React from 'react';
import { LineChart } from './LineChart';
import { ChartDataPoint, ChartData } from '../../types/ChartTypes';
import { JiraResponse, JiraIssueField, JiraIssue } from '../../types/JiraTypes';

interface IAverageOriginalEstimateProps {
    data: ChartData;
}

export const AverageOriginalEstimate: React.FC<IAverageOriginalEstimateProps> = ({ data }) => {
    const formattedData = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            const mappedIssues = cur[1].issues.map((issue: JiraIssue): JiraIssueField => issue.fields);
            const total = mappedIssues.reduce((total: number, issue: JiraIssueField) => {
                // We only want time logged by the assignee counted here, not total time on the task
                return (
                    total +
                    issue.timeoriginalestimate
                );
            }, 0);

            return [
                ...acc,
                {
                    // { date: string, info: totalTimeInSeconds / (60 * 60)}
                    date: cur[0],
                    info: total !== 0 ? (total / mappedIssues.length) / 3600 : 0
                }
            ];
        }, [])
        .reverse();

    return (
        <LineChart
            chartId={'averageOriginalEstimateChart'}
            chartTitle={'Average Original Estimate for Tasks Completed in the Date Range'}
            data={formattedData}
            lineColor={'purple'}
            tooltipPrecision={2}
        />
    );
};
