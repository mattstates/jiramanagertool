import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { getYMaxThreshold } from '../../utils/getYMaxThreshold';
import { JiraIssue, JiraIssueField, JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
import countUniqueWorkLogDays from '../../utils/countUniqueWorkLogDays';
import React from 'react';

const VELOCITY_THRESHOLD = 4;

interface ITaskVelocityProps {
    data: ChartData;
}

export const TaskVelocity: React.FC<ITaskVelocityProps> = ({ data }) => {
    const formattedData: ChartDataPoint[] = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]) => {
            const mappedIssues: JiraIssueField[] = cur[1].issues.map(
                (issue: JiraIssue) => issue.fields
            );

            return [
                ...acc,
                {
                    date: cur[0],
                    info: mappedIssues.length / (countUniqueWorkLogDays(mappedIssues) || 1)
                }
            ];
        }, [])
        .reverse();

    const dataMax = Math.max(...formattedData.map((data: ChartDataPoint) => data.info));

    return (
        <LineChart
            chartId={'taskVelocityChart'}
            chartTitle={'Task Velocity on Tasks Completed in the Date Range'}
            data={formattedData}
            lineColor={'forestgreen'}
            tooltipPrecision={2}
            yMax={getYMaxThreshold({ dataMax, yThreshold: VELOCITY_THRESHOLD })}
        />
    );
};
