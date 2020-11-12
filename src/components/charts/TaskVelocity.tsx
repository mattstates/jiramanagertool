import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { Description } from './Description';
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
            const mappedIssues: JiraIssueField[] = cur[1].issues.map((issue: JiraIssue) => issue.fields);
            const uniqueAssigneeCount = new Set(mappedIssues.map((task) => task.assignee.name)).size || 1;
            const uniqueWorkedDaysCount = countUniqueWorkLogDays(mappedIssues) || 1;

            return [
                ...acc,
                {
                    date: cur[0],
                    info:
                        // Total Task Count / Count of Unique Assignees / Count of Unique Days
                        mappedIssues.length / uniqueAssigneeCount / uniqueWorkedDaysCount,
                },
            ];
        }, [])
        .reverse();

    const dataMax = Math.max(...formattedData.map((data: ChartDataPoint) => data.info));

    return (
        <div>
            <LineChart
                chartId={'taskVelocityChart'}
                chartTitle={'Task Velocity'}
                data={formattedData}
                lineColor={'forestgreen'}
                tooltipPrecision={2}
                yLabel={'Tasks Closed per Day'}
                yMax={getYMaxThreshold({ dataMax, yThreshold: VELOCITY_THRESHOLD })}
            />
            <Description
                description={`The number of tasks put into a "Done" status per person (unique) per day (unique).`}
                calculatedBy={`(Number of tasks in the result set / Number of unique assigness / Number of unique days with work logged on one or more of the tasks in the result set.)`}
            />
        </div>
    );
};
