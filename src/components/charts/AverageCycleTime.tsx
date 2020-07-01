import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { Description } from './Description';
import { JiraIssue, JiraIssueField, JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
import { parseISO } from 'date-fns';
import differenceInBusinessDays from 'date-fns/differenceInBusinessDays';
import getDateFromJiraTimeStamp from '../../utils/getDateFromJiraTimeStamp';
import React from 'react';
interface CycleTimeProps {
    data: ChartData;
}

export const AverageCycleTime: React.FC<CycleTimeProps> = ({ data }) => {
    const formattedData = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            const issueFields = cur[1].issues.map((issue: JiraIssue): JiraIssueField => issue.fields);

            const worklogs = issueFields.map((issue) => issue.worklog.worklogs);

            const daysCount = worklogs.reduce((total, logs, _i) => {
                const dates = logs.map((log) => parseISO(getDateFromJiraTimeStamp(log.started)));
                if (dates[dates.length - 1] === undefined || dates[0] === undefined) {
                    return total;
                }
                return total + Math.abs(differenceInBusinessDays(dates[dates.length - 1], dates[0]));
            }, 0);
            return [
                ...acc,
                {
                    date: cur[0],
                    info: daysCount / (worklogs.length || 1),
                },
            ];
        }, [])
        .reverse();

    return (
        <div>
            <LineChart
                chartId={'averageCycleTime'}
                chartTitle={'Average Cycle Time'}
                data={formattedData}
                lineColor={'green'}
                yLabel={'Avg. Days'}
            />
            <Description
                description={`
The average number of business days (may not account for time zones) it took for all of the completed tasks to finish.`}
                calculatedBy={`Averaging the distance in end time - start time totals on each task.`}
            />
        </div>
    );
};
