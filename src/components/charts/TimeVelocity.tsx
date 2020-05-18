import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { Description } from './Description';
import { getYMaxThreshold } from '../../utils/getYMaxThreshold';
import { JiraIssue, JiraIssueField, JiraIssueWorklog, JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
import getUniqueAssignees from '../../utils/getUniqueAssignees';
import getVelocityDivisor from '../../utils/getVelocityDivisor';
import React from 'react';

const VELOCITY_THRESHOLD = 6;

interface ITimeVelocityProps {
    data: ChartData;
}

export const TimeVelocity: React.FC<ITimeVelocityProps> = ({ data }) => {
    const formattedData: ChartDataPoint[] = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]) => {
            const mappedIssues: JiraIssueField[] = cur[1].issues.map((issue: JiraIssue) => issue.fields);

            const assignees = getUniqueAssignees(mappedIssues);

            return [
                ...acc,
                {
                    date: cur[0],
                    info:
                        mappedIssues.reduce((total: number, issueField: JiraIssueField) => {
                            /**
                             * Only want time logged by the assignees counted here, not total time on the task
                             * (unless one of the assignees in the result set logged time on one of these tasks as well.)
                             */
                            return (
                                total +
                                issueField.worklog.worklogs
                                    // Filter the worklogs to only people in the {{assignees}} collection
                                    .filter((log: JiraIssueWorklog) => {
                                        return assignees.indexOf(log.updateAuthor.name) > -1;
                                    })
                                    // Aggregate the total time logged from the filtered worklogs
                                    .reduce((totalTimeSpentInSeconds: number, worklog: JiraIssueWorklog) => {
                                        return totalTimeSpentInSeconds + worklog.timeSpentSeconds;
                                    }, 0)
                            );
                        }, 0) /
                        getVelocityDivisor(mappedIssues) /
                        3600 // seconds in an hour
                }
            ];
        }, [])
        .reverse();

    const dataMax = Math.max(...formattedData.map((data: ChartDataPoint) => data.info));

    return (
        <div>
            <LineChart
                chartId={'velocityChart'}
                chartTitle={'Time Velocity'}
                data={formattedData}
                lineColor={'green'}
                tooltipPrecision={2}
                yLabel={'Hours Logged per Day'}
                yMax={getYMaxThreshold({ dataMax, yThreshold: VELOCITY_THRESHOLD })}
            />
            <Description
                description={`Average amount of time logged per day.`}
                calculatedBy={`(Total time logged on tasks in the result set / Number of unique days where the task's assignee logged time on one of the tasks)`}
                footNote={`*Does not include time logged on the same tasks by someone who is not the task's assignee, unless the person who logged time is also an assignee for one of the tasks in the result set.`}
            />
        </div>
    );
};
