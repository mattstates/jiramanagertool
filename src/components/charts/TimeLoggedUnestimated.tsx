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

export const TimeLoggedUnestimated: React.FC<ITimeLoggedProps> = ({ data }) => {
    const formattedData = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            const unestimatedIssues = cur[1].issues
                .map((issue: JiraIssue): JiraIssueField => issue.fields)
                .filter(task => task.timeoriginalestimate === null);

            const assignees = getUniqueAssignees(unestimatedIssues);

            return [
                ...acc,
                {
                    // { date: string, info: totalTimeInSeconds / (60 * 60)}
                    date: cur[0],
                    info: getTimeLoggedByAssignee(unestimatedIssues, assignees) / 3600
                }
            ];
        }, [])
        .reverse();

    return (
        <div>
            <LineChart
                chartId={'timeLoggedUnestimatedChart'}
                chartTitle={'Time Logged on Unestimated Tasks'}
                data={formattedData}
                lineColor={'brown'}
                yLabel={'Hours'}
            />
            <Description
                description={`
The aggregate of the time logged on tasks in the result set in hours for tasks that were never estimated.`}
                calculatedBy={`Total time logged on unestimated tasks by the assignee.`}
                footNote={`*Does not include time logged on the same tasks by someone who is not the assignee.`}
            />
        </div>
    );
};
