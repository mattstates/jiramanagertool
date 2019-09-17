import { ChartDataPoint, ChartData } from '../../types/ChartTypes';
import { Description } from './Description';
import { JiraIssue, JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
import React from 'react';

interface ITaskCountFailedQAProps {
    data: ChartData;
}

// customfield_13381
export const TaskCountFailedQA: React.FC<ITaskCountFailedQAProps> = ({ data }) => {
    const formattedData: ChartDataPoint[] = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            return [
                ...acc,
                {
                    date: cur[0],
                    info:
                        Number(
                            (
                                (cur[1].issues.reduce((total: number, issue: JiraIssue) => {
                                    if (issue.fields.customfield_13381) {
                                        total++;
                                    }
                                    return total;
                                }, 0) /
                                    cur[1].issues.length) *
                                100
                            ).toFixed(2)
                        ) || 0
                }
            ];
        }, [])
        .reverse();

    return (
        <div>
            <LineChart
                chartId={'taskCountFailedQAChart'}
                chartTitle={'Percentage of Tasks with Failed QA'}
                data={formattedData}
                lineColor={'#0000ff'}
                yMax={100}
                tooltipPrecision={2}
                yLabel={'Percent'}
            />
            <Description
                description={`
The percentage of the tasks in the result set that have ever failed QA.`}
                calculatedBy={`(Number Tasks that Have Ever Failed QA / Total Tasks)`}
                footNote={`*Does not count multiple fails. EX: A task that fails 3 times is counted as one.`}
            />
        </div>
    );
};
