import React from 'react';
import { LineChart } from './LineChart';
import { JiraIssue, JiraResponse } from '../../types/JiraTypes';
import { ChartData, ChartDataPoint } from '../../types/ChartTypes';

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
                                }, 0) / cur[1].issues.length) * 100
                            ).toFixed(2)
                        ) || 0
                }
            ];
        }, [])
        .reverse();

    return (
        <LineChart
            chartId={'taskCountFailedCodeReviewChart'}
            chartTitle={'Percentage of Tasks with Failed Code Review'}
            data={formattedData}
            lineColor={'#ff0000'}
            tooltipPrecision={2}
            yMax={100}
        />
    );
};
