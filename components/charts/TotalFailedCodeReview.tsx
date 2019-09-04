import React from 'react';
import { ChartData, ChartDataPoint } from '../../types/chartTypes';
import { JiraIssue, JiraResponse } from '../../types/jiraTypes';
import { LineChart } from './LineChart';

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

    return <LineChart chartId={'totalFailedCodeReviewChart'} chartTitle={'Total Times Failed Code Review'} data={formattedData} lineColor={'#cc0000'} />;
};
