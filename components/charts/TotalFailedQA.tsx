import React from 'react';
import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { JiraIssue, JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';

interface ITotalFailedQAProps {
    data: ChartData;
}

// customfield_13381
export const TotalFailedQA: React.FC<ITotalFailedQAProps> = ({ data }) => {
    const formattedData: ChartDataPoint[] = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            return [
                ...acc,
                {
                    date: cur[0],
                    info: cur[1].issues.reduce((total: number, issue: JiraIssue): number => {
                        total += issue.fields.customfield_13381;

                        return total;
                    }, 0)
                }
            ];
        }, [])
        .reverse();

    return <LineChart chartId={'totalFailedQAChart'} chartTitle={'Total Times Failed QA'} data={formattedData} lineColor={'#0000cc'} />;
};
