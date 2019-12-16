import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { Description } from './Description';
import { JiraIssue, JiraIssueField, JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
import getTimeLoggedByAssignee from '../../utils/getTimeLoggedByAssignee';
import getUniqueAssignees from '../../utils/getUniqueAssignees';
import React from 'react';

interface ITimeLoggedProps {
    data: ChartData;
}

export const TimeLoggedUnestimatedPercentage: React.FC<ITimeLoggedProps> = ({ data }) => {
    const formattedData = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            const mappedIssues = cur[1].issues.map((issue: JiraIssue): JiraIssueField => issue.fields);

            const unestimatedIssues = mappedIssues.filter(task => task.timeoriginalestimate === null);

            const assignees = getUniqueAssignees(mappedIssues);

            return [
                ...acc,
                {
                    // { date: string, info: totalTimeInSeconds / (60 * 60)}
                    date: cur[0],
                    info:
                        (getTimeLoggedByAssignee(unestimatedIssues, assignees) /
                            (getTimeLoggedByAssignee(mappedIssues, assignees) || 1)) *
                        100
                }
            ];
        }, [])
        .reverse();

    return (
        <div>
            <LineChart
                chartId={'timeLoggedUnestimatedPercentageChart'}
                chartTitle={'Percentage of Time Logged on Unestimated Tasks'}
                data={formattedData}
                lineColor={'pink'}
                tooltipPrecision={2}
                yLabel={'Percent'}
                yMax={100}
            />
            <Description
                description={`
Percentage of time spent on unestimated tasks vs. estimated tasks among the tasks in the result set.`}
                calculatedBy={`Aggregate of all of the time logged in the result set divided by the aggregate of time on tasks that were not estimated.`}
                footNote={`*Does not include time logged on the same tasks by someone who is not the assignee.`}
            />
        </div>
    );
};
