import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { Description } from './Description';
// import { getYMaxThreshold } from '../../utils/getYMaxThreshold';
import { JiraIssue, JiraIssueField, JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
// import getUniqueAssignees from '../../utils/getUniqueAssignees';
import getVelocityDivisor from '../../utils/getVelocityDivisor';
import React from 'react';


interface ITimeVelocityProps {
    data: ChartData;
}

export const UniqueDaysWorked: React.FC<ITimeVelocityProps> = ({ data }) => {
    const formattedData: ChartDataPoint[] = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]) => {
            const mappedIssues: JiraIssueField[] = cur[1].issues.map((issue: JiraIssue) => issue.fields);

            // const assignees = getUniqueAssignees(mappedIssues);
            // let total = mappedIssues.reduce((total: number, issueField: JiraIssueField) => {
            //     /**
            //      * Only want time logged by the assignees counted here, not total time on the task
            //      * (unless one of the assignees in the result set logged time on one of these tasks as well.)
            //      */
            //     return (
            //         total +
            //         issueField.worklog.worklogs
            //             // Filter the worklogs to only people in the {{assignees}} collection
            //             .filter((log: JiraIssueWorklog) => {
            //                 return assignees.indexOf(log.updateAuthor.name) > -1;
            //             })
            //             // Aggregate the total time logged from the filtered worklogs
            //             .reduce((totalTimeSpentInSeconds: number, worklog: JiraIssueWorklog) => {
            //                 return totalTimeSpentInSeconds + worklog.timeSpentSeconds;
            //             }, 0)
            //     );
            // }, 0)
            // console.log(total, 'Time Velocity')
            return [
                ...acc,
                {
                    date: cur[0],
                    info: getVelocityDivisor(mappedIssues)
                },
            ];
        }, [])
        .reverse();

    // const dataMax = Math.max(...formattedData.map((data: ChartDataPoint) => data.info));

    return (
        <div>
            <LineChart
                chartId={'workedDaysChart'}
                chartTitle={'Unique Days Worked'}
                data={formattedData}
                lineColor={'purple'}
                tooltipPrecision={2}
                yLabel={'Days Count'}
                // yMax={getYMaxThreshold({ dataMax, yThreshold: 31 })}
            />
            <Description
                description={`Number of days worked within the time period`}
                calculatedBy={``}
                // footNote={``}
            />
        </div>
    );
};
