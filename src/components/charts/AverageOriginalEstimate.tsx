import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { Description } from './Description';
import { JiraIssue, JiraIssueField, JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
import React from 'react';

interface IAverageOriginalEstimateProps {
    data: ChartData;
}

export const AverageOriginalEstimate: React.FC<IAverageOriginalEstimateProps> = ({ data }) => {
    const formattedData = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            const mappedIssues = cur[1].issues.map((issue: JiraIssue): JiraIssueField => issue.fields);

            const total = mappedIssues.reduce((total: number, issue: JiraIssueField) => {
                // We only want time logged by the assignee counted here, not total time on the task
                return total + issue.timeoriginalestimate;
            }, 0);

            return [
                ...acc,
                {
                    // { date: string, info: totalTimeInSeconds / (60 * 60)}
                    date: cur[0],
                    info: total !== 0 ? total / mappedIssues.length / 3600 : 0
                }
            ];
        }, [])
        .reverse();

    return (
        <div>
            <LineChart
                chartId={'averageOriginalEstimateChart'}
                chartTitle={'Average Original Estimate'}
                data={formattedData}
                lineColor={'purple'}
                tooltipPrecision={2}
                yLabel={'Avg. Original Est. in Hours'}
            />
            <Description
                description={`
        Average estimates for each task completed in the date range.
        Could be useful to get an idea for average task complexity in the result set.`}
                calculatedBy={`Total Original Estimates / Number of Tasks`}
            />
        </div>
    );
};
