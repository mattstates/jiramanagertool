import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { Description } from './Description';
import { JiraIssue, JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
import React from 'react';

interface ITotalFailedCodeReviewProps {
    data: ChartData;
}

// customfield_13380
export const TotalFailedCodeReview: React.FC<ITotalFailedCodeReviewProps> = ({ data }) => {
    const formattedData: ChartDataPoint[] = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            return [
                ...acc,
                {
                    date: cur[0],
                    info: cur[1].issues.reduce((total: number, issue: JiraIssue): number => {
                        total += issue.fields.customfield_13380;

                        return total;
                    }, 0)
                }
            ];
        }, [])
        .reverse();

    return (
        <div>
            <LineChart
                chartId={'totalFailedCodeReviewChart'}
                chartTitle={'Total Times Failed Code Review'}
                data={formattedData}
                lineColor={'#cc0000'}
                yLabel={'Total'}
            />
            <Description
                description={`
Count of the number of times tasks have failed code review.`}
                calculatedBy={`Aggregate of all tasks failed code review count`}
                footNote={`*Each instance of a failed code review is counted.`}
            />
        </div>
    );
};
