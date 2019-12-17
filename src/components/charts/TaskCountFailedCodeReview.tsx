import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { Description } from './Description';
import { JiraIssue, JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
import React from 'react';

interface ITaskCountFailedCodeReviewProps {
    data: ChartData;
}

// customfield_13380
export const TaskCountFailedCodeReview: React.FC<ITaskCountFailedCodeReviewProps> = ({ data }) => {
    const formattedData: ChartDataPoint[] = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            return [
                ...acc,
                {
                    date: cur[0],
                    info:
                        Number(
                            (
                                (cur[1].issues.reduce((total: number, issue: JiraIssue): number => {
                                    if (issue.fields.customfield_13380) {
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
                chartId={'taskCountFailedCodeReviewChart'}
                chartTitle={'Failed Code Review Percentage'}
                data={formattedData}
                lineColor={'#ff0000'}
                tooltipPrecision={2}
                yLabel={'Percent'}
                yMax={100}
            />
            <Description
                description={`
The percentage of the tasks in the result set that have ever failed a code review.`}
                calculatedBy={`(Number Tasks that Have Ever Failed Code Review / Total Tasks)`}
                footNote={`*Does not count multiple fails. EX: A task that fails 3 times is counted as one.`}
            />
        </div>
    );
};
